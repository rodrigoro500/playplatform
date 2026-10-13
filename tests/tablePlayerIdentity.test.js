import test from "node:test";
import assert from "node:assert/strict";
import { getSeatDisplayIndex, resolveTablePlayerId } from "../src/games/Pase/ui/tablePlayerIdentity.js";

test("a requested identity survives waiting and activates after approval", () => {
  const candidates = ["guest-2"];
  for (const status of ["pending_approval", "approved", "seated"]) {
    assert.equal(resolveTablePlayerId([{ id: "guest-2", status }], candidates), "guest-2");
  }
});

test("missing and removed identities cannot select another player's seat", () => {
  const players = [{ id: "host", status: "approved" }, { id: "guest", status: "removed" }];
  assert.equal(resolveTablePlayerId(players, ["unknown", "guest"]), "");
  assert.equal(resolveTablePlayerId(players, ["unknown", "host"]), "host");
});

test("each device has its own bottom-center seat without collisions or roster changes", () => {
  for (let count = 1; count <= 8; count += 1) {
    const players = Array.from({ length: count }, (_, index) => ({ id: `player-${index}` }));
    const originalIds = players.map((player) => player.id);
    for (const [currentIndex, current] of players.entries()) {
      const seats = Array.from({ length: 8 }, (_, index) => getSeatDisplayIndex(index, players, current.id));
      assert.equal(seats[currentIndex], 4);
      assert.equal(new Set(seats).size, 8);
      assert.deepEqual(players.map((player) => player.id), originalIds);
    }
  }
});

test("spectators keep the table's original layout", () => {
  assert.equal(getSeatDisplayIndex(2, [{ id: "host" }], ""), 2);
});
