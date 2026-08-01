import PlayPlatformCasinoExperience from "./games/Pase/ui/PlayPlatformCasinoExperience";
import PlayPlatformAdminPanel from "./admin/PlayPlatformAdminPanel";
import PlayPlatformJoinPage from "./join/PlayPlatformJoinPage";

function App() {
  if (window.location.pathname === "/admin") {
    return <PlayPlatformAdminPanel />;
  }

  if (window.location.pathname === "/join") {
    return <PlayPlatformJoinPage />;
  }

  return <PlayPlatformCasinoExperience />;
}

export default App;
