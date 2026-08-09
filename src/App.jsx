import PlayPlatformCasinoExperience from "./games/Pase/ui/PlayPlatformCasinoExperience";
import PlayPlatformAdminPanel from "./admin/PlayPlatformAdminPanel";
import PlayPlatformJoinPage from "./join/PlayPlatformJoinPage";
import PlayPlatformLobby from "./lobby/PlayPlatformLobby";

function App() {
  if (window.location.pathname === "/admin") {
    return <PlayPlatformAdminPanel />;
  }

  if (window.location.pathname === "/join") {
    return <PlayPlatformJoinPage />;
  }

  if (!new URLSearchParams(window.location.search).get("table")) {
    return <PlayPlatformLobby />;
  }

  return <PlayPlatformCasinoExperience />;
}

export default App;
