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

function mapPlatformAccount(row) {
  return {
    id: row.id,
    authUserId: row.auth_user_id,
    email: row.email,
    displayName: row.display_name,
    role: row.role,
    status: row.status,
    creditLimit: row.credit_limit ?? 0,
    availableCredit: row.available_credit ?? 0,
    createdAt: row.created_at,
  };
}

function requireSupabase() {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error("Falta configurar Supabase.");
  }

  return supabase;
}

async function fetchPlatformAccounts() {
  if (!hasSupabaseConfig) {
    return [];
  }

  const client = requireSupabase();
  const {
    data,
    error,
  } = await client
    .from("platform_accounts")
    .select(`
      id,
      email,
      display_name,
      role,
      status,
      credit_limit,
      available_credit,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapPlatformAccount);
}

async function fetchCurrentPlatformAccount(session) {
  if (!hasSupabaseConfig || !session?.user?.email) {
    return null;
  }

  const client = requireSupabase();
  const cleanEmail =
    session.user.email.trim().toLowerCase();
  const userId =
    session.user.id;

  let account = null;

  if (userId) {
    const {
      data,
      error,
    } = await client
      .from("platform_accounts")
      .select(`
        id,
        auth_user_id,
        email,
        display_name,
        role,
        status,
        credit_limit,
        available_credit,
        created_at
      `)
      .eq("auth_user_id", userId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    account = data;
  }

  if (!account) {
    const {
      data,
      error,
    } = await client
      .from("platform_accounts")
      .select(`
        id,
        auth_user_id,
        email,
        display_name,
        role,
        status,
        credit_limit,
        available_credit,
        created_at
      `)
      .eq("email", cleanEmail)
      .maybeSingle();

    if (error) {
      throw error;
    }

    account = data;
  }

  if (!account) {
    return null;
  }

  if (userId && !account.auth_user_id) {
    await client
      .from("platform_accounts")
      .update({
        auth_user_id: userId,
      })
      .eq("id", account.id);
  }

  return mapPlatformAccount({
    ...account,
    auth_user_id: account.auth_user_id ?? userId,
  });
}

async function createPlatformAccount({
  displayName,
  email,
  role,
  creditLimit = 0,
}) {
  const client = requireSupabase();
  const cleanName =
    displayName.trim();
  const cleanEmail =
    email.trim().toLowerCase();
  const normalizedRole =
    ["super_admin", "balance_loader", "player"].includes(role) ? role : "player";
  const normalizedCredit =
    normalizedRole === "balance_loader" ?
      Math.max(0, Number(creditLimit) || 0) :
      0;

  if (cleanName.length < 2) {
    throw new Error("Nombre invalido.");
  }

  if (!cleanEmail.includes("@")) {
    throw new Error("Email invalido.");
  }

  const {
    data,
    error,
  } = await client
    .from("platform_accounts")
    .insert({
      display_name: cleanName,
      email: cleanEmail,
      role: normalizedRole,
      status: "active",
      credit_limit: normalizedCredit,
      available_credit: normalizedCredit,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapPlatformAccount(data);
}

async function updatePlatformAccountStatus(accountId, status) {
  const client = requireSupabase();
  const normalizedStatus =
    status === "suspended" ? "suspended" : "active";
  const {
    error,
  } = await client
    .from("platform_accounts")
    .update({
      status: normalizedStatus,
    })
    .eq("id", accountId);

  if (error) {
    throw error;
  }
}

async function adjustBalanceLoaderCredit(accountId, amount) {
  const client = requireSupabase();
  const creditAmount =
    Math.max(0, Number(amount) || 0);

  if (creditAmount <= 0) {
    throw new Error("Ingresa un monto mayor a cero.");
  }

  const {
    data: account,
    error: accountError,
  } = await client
    .from("platform_accounts")
    .select("id, credit_limit, available_credit")
    .eq("id", accountId)
    .single();

  if (accountError) {
    throw accountError;
  }

  const nextCreditLimit =
    (Number(account.credit_limit) || 0) + creditAmount;
  const nextAvailableCredit =
    (Number(account.available_credit) || 0) + creditAmount;

  const {
    error: updateError,
  } = await client
    .from("platform_accounts")
    .update({
      credit_limit: nextCreditLimit,
      available_credit: nextAvailableCredit,
    })
    .eq("id", accountId);

  if (updateError) {
    throw updateError;
  }

  const {
    error: ledgerError,
  } = await client
    .from("platform_account_events")
    .insert({
      account_id: accountId,
      event_type: "credit_limit_added",
      amount: creditAmount,
      description: "Credito operativo agregado por Super Admin",
    });

  if (ledgerError) {
    throw ledgerError;
  }
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
    data: tablePlayers,
    error: tablePlayersError,
  } = await client
    .from("table_players")
    .select("id, seat_number, joined_at, approved_at")
    .eq("table_id", tableId)
    .in("status", ["approved", "seated", "pending_approval"]);

  if (tablePlayersError) {
    throw tablePlayersError;
  }

  const sortedPlayers =
    [...(tablePlayers ?? [])].sort((left, right) => {
      if (left.seat_number && right.seat_number) {
        return left.seat_number - right.seat_number;
      }

      if (left.seat_number) {
        return -1;
      }

      if (right.seat_number) {
        return 1;
      }

      return new Date(left.joined_at ?? left.approved_at ?? 0) - new Date(right.joined_at ?? right.approved_at ?? 0);
    });
  const usedSeats =
    new Set(sortedPlayers.map((player) => player.seat_number).filter(Boolean));
  const seatUpdates = [];

  sortedPlayers.forEach((player) => {
    if (player.seat_number) {
      return;
    }

    const nextSeat =
      Array.from({ length: 8 }, (_item, index) => index + 1)
        .find((seat) => !usedSeats.has(seat));

    if (!nextSeat) {
      return;
    }

    usedSeats.add(nextSeat);
    seatUpdates.push({
      id: player.id,
      seatNumber: nextSeat,
    });
  });

  await Promise.all(seatUpdates.map(async (seatUpdate) => {
    const {
      error,
    } = await client
      .from("table_players")
      .update({
        seat_number: seatUpdate.seatNumber,
      })
      .eq("id", seatUpdate.id);

    if (error) {
      throw error;
    }
  }));

  const {
    error: playerError,
  } = await client
    .from("table_players")
    .update({
      status: "approved",
      approved_at: new Date().toISOString(),
      muted: false,
      mic_enabled: true,
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
  createPlatformAccount,
  createTable,
  deletePlayer,
  adjustBalanceLoaderCredit,
  fetchGameSnapshot,
  fetchCurrentPlatformAccount,
  fetchPlatformAccounts,
  fetchTableById,
  fetchTables,
  findInvite,
  hasSupabaseConfig,
  requestTableSeat,
  saveGameSnapshot,
  syncPlayerWalletBalances,
  updatePlatformAccountStatus,
  updatePlayerVoice,
};
