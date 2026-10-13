// Keep pending identities so approval can activate the same device later.
export function resolveTablePlayerId(players, candidateIds) {
  return candidateIds.filter(Boolean).find((id) => (
    players.some((player) => player.id === id &&
      ["pending_approval", "approved", "seated"].includes(player.status))
  )) ?? "";
}

// Rotate only the display; the roster and turn order stay in server order.
export function getSeatDisplayIndex(index, players, currentPlayerId) {
  const currentIndex = players.findIndex((player) => player.id === currentPlayerId);
  return currentIndex < 0 ? index : (index - currentIndex + 4 + 8) % 8;
}
