import {
  useEffect,
  useState,
} from "react";
import {
  hasSupabaseConfig,
  supabase,
} from "../lib/supabaseClient";
import "./PlayPlatformLoginPage.css";

function PlayPlatformLoginPage() {
  const [mode, setMode] = useState("login");
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) {
      return undefined;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({
      data,
    }) => {
      if (isMounted) {
        setSession(data.session ?? null);
      }
    });

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const submit = async (event) => {
    event.preventDefault();

    if (!hasSupabaseConfig || !supabase) {
      setMessage("Falta configurar Supabase.");
      return;
    }

    if (!email.trim() || password.length < 6) {
      setMessage("Ingresa email y una contrasena de al menos 6 caracteres.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      if (mode === "register") {
        const {
          error,
        } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              display_name: displayName.trim(),
            },
          },
        });

        if (error) {
          throw error;
        }

        setMessage("Registro creado. Si Supabase pide confirmacion, revisa tu correo antes de iniciar sesion.");
      } else {
        const {
          error,
        } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          throw error;
        }

        setMessage("Sesion iniciada correctamente.");
      }
    } catch (error) {
      setMessage(`No se pudo continuar: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    setMessage("Sesion cerrada.");
  };

  return (
    <main className="login-screen">
      <section className="login-shell">
        <header className="login-header">
          <a href="/" className="login-logo">
            P
          </a>
          <div>
            <span>Cuenta PlayPlatform</span>
            <h1>{mode === "register" ? "Registrarse" : "Iniciar sesion"}</h1>
          </div>
        </header>

        <section className="login-card">
          {session ? (
            <div className="login-session">
              <span>Sesion activa</span>
              <strong>{session.user.email}</strong>
              <p>Tu cuenta queda lista para la siguiente fase: conservar fichas y entrar a mesas disponibles.</p>
              <div className="login-actions">
                <a href="/">Volver al lobby</a>
                <button type="button" onClick={signOut}>
                  Cerrar sesion
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="login-tabs">
                <button
                  type="button"
                  className={mode === "login" ? "is-active" : ""}
                  onClick={() => setMode("login")}
                >
                  Iniciar sesion
                </button>
                <button
                  type="button"
                  className={mode === "register" ? "is-active" : ""}
                  onClick={() => setMode("register")}
                >
                  Registrarse
                </button>
              </div>

              <form className="login-form" onSubmit={submit}>
                {mode === "register" && (
                  <label>
                    Nombre en la mesa
                    <input
                      value={displayName}
                      onChange={(event) => setDisplayName(event.target.value)}
                      placeholder="Ej: Rodrigo"
                      disabled={saving}
                    />
                  </label>
                )}

                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="tu@email.com"
                    disabled={saving}
                  />
                </label>

                <label>
                  Contrasena
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Minimo 6 caracteres"
                    disabled={saving}
                  />
                </label>

                <button type="submit" disabled={saving}>
                  {saving ? "Procesando..." : mode === "register" ? "Crear cuenta" : "Entrar"}
                </button>
              </form>
            </>
          )}

          {message && (
            <div className="login-message">
              {message}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default PlayPlatformLoginPage;
