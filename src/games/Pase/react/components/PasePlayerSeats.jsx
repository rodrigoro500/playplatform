import usePaseGame from "../hooks/usePaseGame";

function PasePlayerSeats() {
  const {
    players,
  } = usePaseGame();

  if (players.length === 0) {
    return (
      <div className="pase-player-seats-empty">
        Sin jugadores
      </div>
    );
  }

  return (
    <div className="pase-player-seats">
      {players.map((player) => (
        <div
          key={player.id}
          className="pase-player-seat"
        >
          <div className="pase-player-name">
            {player.name ?? player.id}
          </div>

          <div className="pase-player-wallet">
            {player.wallet}
          </div>
        </div>
      ))}
    </div>
  );
}

export {
  PasePlayerSeats,
};

export default PasePlayerSeats;
