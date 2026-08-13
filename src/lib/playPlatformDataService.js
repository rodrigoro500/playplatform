import {
  hasSupabaseConfig,
  supabase,
} from "./supabaseClient";

function createTableCode(gameType = "PASE") {
  return `${gameType}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function createInviteCode() {
  return crypto.randomUUID().slice(0, 8).toUpperCase();
}

function mapPlayer(row) {
  const wallet =
    Array.isArray(row.wallets) ? row.wallets[0] : row.wallets;

  return {
    id: row.id,
    name: row.display_name,
    chips: wallet?.balance ?? 0,
    status: row.status,
    muted: row.muted,
    micEnabled: row.mic_enabled,
    seatNumber: row.seat_number,
  };
}

function mapTable(row) {
  return {
    id: row.id,
    code: row.code,
    gameType: row.game_type ?? "PASE",
    name: row.name,
    status: row.status,
    minPot: row.min_main_pot,
    players: (row.table_players ?? []).map(mapPlayer),
    invites: row.table_invites ?? [],
    transactions: row.transactions ?? [],
    gameSnapshot: row.gameSnapshot ?? null,
  };
}

function requireSupabase() {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error("Falta configurar Supabase.");
  }

  return supabase;
}

async function fetchTables() {
  if (!hasSupabaseConfig) {
    return [];
  }

  const client = requireSupabase();
  const {
    data,
    error,
  } = await client
    .from("play_tables")
    .select(`
      id,
      code,
      game_type,
      name,
      status,
      min_main_pot,
      table_players (
        id,
        display_name,
        seat_number,
        status,
        muted,
        mic_enabled,
        wallets (
          balance
        )
      ),
      table_invites (
        id,
        invite_code,
        status,
        created_at
      )
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  const tables =
    (data ?? []).map(mapTable);
  const tableIds =
    tables.map((table) => table.id);

  if (tableIds.length === 0) {
    return tables;
  }

  const {
    data: transactions,
    error: transactionsError,
  } = await client
    .from("wallet_transactions")
    .select("table_id, player_id, amount, transaction_type, reference_type")
    .in("table_id", tableIds);

  if (transactionsError) {
    throw transactionsError;
  }

  const {
    data: snapshots,
    error: snapshotsError,
  } = await client
    .from("game_snapshots")
    .select("table_id, state, updated_at")
    .in("table_id", tableIds);

  if (snapshotsError) {
    throw snapshotsError;
  }

  const transactionsByTable =
    new Map();
  (transactions ?? []).forEach((transaction) => {
    const tableTransactions =
      transactionsByTable.get(transaction.table_id) ?? [];
    tableTransactions.push(transaction);
    transactionsByTable.set(transaction.table_id, tableTransactions);
  });
  const snapshotsByTable =
    new Map((snapshots ?? []).map((snapshot) => [snapshot.table_id, snapshot]));

  return tables.map((table) => ({
    ...table,
    transactions: transactionsByTable.get(table.id) ?? [],
    gameSnapshot: snapshotsByTable.get(table.id)?.state ?? null,
  }));
}

async function fetchTableById(tableId) {
  if (!hasSupabaseConfig || !tableId) {
    return null;
  }

  const client = requireSupabase();
  const {
    data,
    error,
  } = await client
    .from("play_tables")
    .select(`
      id,
      code,
      game_type,
      name,
      status,
      min_main_pot,
      table_players (
        id,
        display_name,
        seat_number,
        status,
        muted,
        mic_enabled,
        wallets (
          balance
        )
      ),
      table_invites (
        id,
        invite_code,
        status,
        created_at
      )
    `)
    .eq("id", tableId)
    .single();

  if (error) {
    throw error;
  }

  const table =
    mapTable(data);
  const {
    data: transactions,
    error: transactionsError,
  } = await client
    .from("wallet_transactions")
    .select("table_id, player_id, amount, transaction_type, reference_type")
    .eq("table_id", tableId);

  if (transactionsError) {
    throw transactionsError;
  }

  const {
    data: snapshot,
    error: snapshotError,
  } = await client
    .from("game_snapshots")
    .select("state, updated_at")
    .eq("table_id", tableId)
    .maybeSingle();

  if (snapshotError) {
    throw snapshotError;
  }

  return {
    ...table,
    transactions: transactions ?? [],
    gameSnapshot: snapshot?.state ?? null,
  };
}

async function fetchGameSnapshot(tableId) {
  if (!hasSupabaseConfig || !tableId) {
    return null;
  }

  const client = requireSupabase();
  const {
    data,
    error,
  } = await client
    .from("game_snapshots")
    .select("state, updated_at")
    .eq("table_id", tableId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

async function saveGameSnapshot(tableId, state) {
  if (!hasSupabaseConfig || !tableId || !state) {
    return null;
  }

  const client = requireSupabase();
  const {
    data,
    error,
  } = await client
    .from("game_snapshots")
    .upsert({
      table_id: tableId,
      state,
    }, {
      onConflict: "table_id",
    })
    .select("updated_at")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function syncPlayerWalletBalances(players) {
  if (!hasSupabaseConfig || !Array.isArray(players)) {
    return;
  }

  const client = requireSupabase();
  await Promise.all(players.map(async (player) => {
    const balance =
      Math.max(0, Number(player.wallet) || 0);

    const {
      error,
    } = await client
      .from("wallets")
      .update({
        balance,
      })
      .eq("player_id", player.id);

    if (error) {
      throw error;
    }
  }));
}

async function createTable(name, gameType = "PASE") {
  const client = requireSupabase();
  const normalizedGameType =
    gameType === "MAKAI" ? "MAKAI" : "PASE";
  const tableCode =
    createTableCode(normalizedGameType);
  const {
    data,
    error,
  } = await client
    .from("play_tables")
    .insert({
      code: tableCode,
      name: `${name || `${normalizedGameType} VIP`} #${tableCode.replace(`${normalizedGameType}-`, "")}`,
      game_type: normalizedGameType,
      status: "open",
      min_main_pot: 20000,
      max_players: 8,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function createInvite(tableId) {
  const client = requireSupabase();
  const {
    data,
    error,
  } = await client
    .from("table_invites")
    .insert({
      table_id: tableId,
      invite_code: createInviteCode(),
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function updatePlayerVoice(playerId, muted) {
  const client = requireSupabase();
  const {
    error,
  } = await client
    .from("table_players")
    .update({
      muted,
      mic_enabled: !muted,
    })
    .eq("id", playerId);

  if (error) {
    throw error;
  }
}

async function deletePlayer(playerId) {
  const client = requireSupabase();

  const {
    error: transactionsError,
  } = await client
    .from("wallet_transactions")
    .delete()
    .eq("player_id", playerId);

  if (transactionsError) {
    throw transactionsError;
  }

  const {
    error: walletsError,
  } = await client
    .from("wallets")
    .delete()
    .eq("player_id", playerId);

  if (walletsError) {
    throw walletsError;
  }

  const {
    error: playerError,
  } = await client
    .from("table_players")
    .delete()
    .eq("id", playerId);

  if (playerError) {
    throw playerError;
  }
}

async function approvePlayerChips(playerId, tableId, amount) {
  const client = requireSupabase();
  const chips =
    Math.max(0, Number(amount) || 0);

  const {
    error: playerError,
  } = await client
    .from("table_players")
    .update({
      status: "approved",
      approved_at: new Date().toISOString(),
    })
    .eq("id", playerId);

  if (playerError) {
    throw playerError;
  }

  let {
    data: wallet,
    error: walletError,
  } = await client
    .from("wallets")
    .select("id")
    .eq("player_id", playerId)
    .maybeSingle();

  if (walletError) {
    throw walletError;
  }

  if (!wallet) {
    const {
      data: createdWallet,
      error: createWalletError,
    } = await client
      .from("wallets")
      .insert({
        player_id: playerId,
        balance: 0,
        currency: "Gs",
      })
      .select("id")
      .single();

    if (createWalletError) {
      throw createWalletError;
    }

    wallet = createdWallet;
  }

  const {
    error: transactionError,
  } = await client
    .from("wallet_transactions")
    .insert({
      wallet_id: wallet.id,
      table_id: tableId,
      player_id: playerId,
      amount: chips,
      transaction_type: "credit",
      reference_type: "admin_chip_load",
      description: "Carga de fichas aprobada por administrador",
    });

  if (transactionError) {
    throw transactionError;
  }

}

async function findInvite(inviteCode) {
  const client = requireSupabase();
  const {
    data,
    error,
  } = await client
    .from("table_invites")
    .select(`
      id,
      invite_code,
      status,
      table_id,
      play_tables (
        id,
        name,
        code
      ),
      table_players (
        id,
        status
      )
    `)
    .eq("invite_code", inviteCode)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function claimInvite({
  inviteId,
  tableId,
  displayName,
}) {
  const client = requireSupabase();
  const {
    data: player,
    error: playerError,
  } = await client
    .from("table_players")
    .insert({
      table_id: tableId,
      invite_id: inviteId,
      display_name: displayName,
      status: "pending_approval",
      muted: true,
      mic_enabled: false,
      joined_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (playerError) {
    throw playerError;
  }

  const {
    error: inviteError,
  } = await client
    .from("table_invites")
    .update({
      status: "claimed",
      claimed_at: new Date().toISOString(),
    })
    .eq("id", inviteId);

  if (inviteError) {
    throw inviteError;
  }

  return player;
}

async function requestTableSeat({
  tableId,
  displayName,
}) {
  const client = requireSupabase();
  const cleanName =
    displayName.trim();

  if (!tableId || cleanName.length < 2) {
    throw new Error("Nombre invalido.");
  }

  const {
    data: player,
    error,
  } = await client
    .from("table_players")
    .insert({
      table_id: tableId,
      display_name: cleanName,
      status: "pending_approval",
      muted: true,
      mic_enabled: false,
      joined_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return player;
}

export {
  approvePlayerChips,
  claimInvite,
  createInvite,
  createInviteCode,
  createTable,
  deletePlayer,
  fetchGameSnapshot,
  fetchTableById,
  fetchTables,
  findInvite,
  hasSupabaseConfig,
  requestTableSeat,
  saveGameSnapshot,
  syncPlayerWalletBalances,
  updatePlayerVoice,
};
