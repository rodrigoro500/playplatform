import PlayPlatformCasinoExperience from "./games/Pase/ui/PlayPlatformCasinoExperience";
import PlayPlatformAdminPanel from "./admin/PlayPlatformAdminPanel";

function App() {
  if (window.location.pathname === "/admin") {
    return <PlayPlatformAdminPanel />;
  }

  return <PlayPlatformCasinoExperience />;
}

export default App;
