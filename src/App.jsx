import {
  useEffect,
  useState,
} from "react";
import PlayPlatformCasinoExperience from "./games/Pase/ui/PlayPlatformCasinoExperience";
import PlayPlatformAdminPanel from "./admin/PlayPlatformAdminPanel";
import PlayPlatformLoginPage from "./auth/PlayPlatformLoginPage";
import PlayPlatformJoinPage from "./join/PlayPlatformJoinPage";
import PlayPlatformLobby from "./lobby/PlayPlatformLobby";
import {
  fetchCurrentPlatformAccount,
} from "./lib/playPlatformDataService";
import {
  hasSupabaseConfig,
  supabase,
} from "./lib/supabaseClient";
import "./auth/PlayPlatformLoginPage.css";

function AdminAccessGate({
  initialView = "tables",
}) {
  const [status, setStatus] = useState("loading");
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState("Verificando acceso administrativo.");

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) {
      setStatus("blocked");
      setMessage("Falta configurar Supabase para proteger el panel.");
      return undefined;
    }

    let isMounted = true;

    async function verifyAccess() {
      try {
        const {
          data,
        } = await supabase.auth.getSession();
        const session =
          data.session ?? null;

        if (!session) {
          setStatus("login");
          setMessage("Inicia sesion para abrir el panel administrativo.");
          return;
        }

        const currentAccount =
          await fetchCurrentPlatformAccount(session);

        if (!isMounted) {
          return;
        }

        if (currentAccount?.role === "super_admin" && currentAccount.status === "active") {
          setAccount(currentAccount);
          setStatus("allowed");
          return;
        }

        setStatus("blocked");
        setMessage("Esta cuenta no tiene permiso de Super Admin activo.");
      } catch (error) {
        if (isMounted) {
          setStatus("blocked");
          setMessage(`No se pudo verificar el acceso: ${error.message}`);
        }
      }
    }

    verifyAccess();

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange(() => {
      verifyAccess();
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (status === "allowed") {
    return (
      <PlayPlatformAdminPanel
        initialView={initialView}
        adminAccount={account}
      />
    );
  }

  const nextPath =
    `${window.location.pathname}${window.location.search}`;

  return (
    <main className="login-screen">
      <section className="login-shell">
        <header className="login-header">
          <a href="/" className="login-logo">
            P
          </a>
          <div>
            <span>Acceso privado</span>
            <h1>Panel administrativo</h1>
          </div>
        </header>

        <section className="login-card">
          <div className="login-session">
            <span>{status === "loading" ? "Verificando" : "Acceso restringido"}</span>
            <strong>{message}</strong>
            <p>El lobby de jugadores no muestra este acceso. Solo cuentas autorizadas pueden entrar al panel.</p>
            <div className="login-actions">
              {status === "login" && (
                <a href={`/login?next=${encodeURIComponent(nextPath)}`}>
                  Iniciar sesion
                </a>
              )}
              <a href="/">Volver al lobby</a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function App() {
  if (window.location.pathname === "/login") {
    return <PlayPlatformLoginPage />;
  }

  if (window.location.pathname === "/admin") {
    return <AdminAccessGate />;
  }

  if (window.location.pathname === "/super-admin") {
    return <AdminAccessGate initialView="super" />;
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
