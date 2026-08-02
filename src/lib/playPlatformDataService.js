import {
  hasSupabaseConfig,
  supabase,
} from "./supabaseClient";

function createTableCode() {
  return `PASE-${Math.floor(1000 + Math.random() * 9000)}`;
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
    name: row.name,
    status: row.status,
    minPot: row.min_main_pot,
    players: (row.table_players ?? []).map(mapPlayer),
    invites: row.table_invites ?? [],
  };
}

async function fetchTables() {
  if (!hasSupabaseConfig) {
    return [];
  }

  const {
    data,
    error,
  } = await supabase
    .from("play_tables")
    .select(`
      id,
      code,
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

  return (data ?? []).map(mapTable);
}

async function fetchTableById(tableId) {
  if (!hasSupabaseConfig || !tableId) {
    return null;
  }

  const {
    data,
    error,
  } = await supabase
    .from("play_tables")
    .select(`
      id,
      code,
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

  return mapTable(data);
}

async function createTable(name) {
  const tableCode =
    createTableCode();
  const {
    data,
    error,
  } = await supabase
    .from("play_tables")
    .insert({
      code: tableCode,
      name: `${name || "Pase VIP"} #${tableCode.replace("PASE-", "")}`,
      game_type: "PASE",
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
  const {
    data,
    error,
  } = await supabase
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
  const {
    error,
  } = await supabase
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

async function approvePlayerChips(playerId, tableId, amount) {
  const chips =
    Math.max(0, Number(amount) || 0);

  const {
    error: playerError,
  } = await supabase
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
  } = await supabase
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
    } = await supabase
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
  } = await supabase
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
  const {
    data,
    error,
  } = await supabase
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
  const {
    data: player,
    error: playerError,
  } = await supabase
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
  } = await supabase
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

export {
  approvePlayerChips,
  claimInvite,
  createInvite,
  createInviteCode,
  createTable,
  fetchTableById,
  fetchTables,
  findInvite,
  hasSupabaseConfig,
  updatePlayerVoice,
};
