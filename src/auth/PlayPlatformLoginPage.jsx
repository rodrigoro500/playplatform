import {
  useEffect,
  useState,
} from "react";
import {
  hasSupabaseConfig,
  supabase,
} from "../lib/supabaseClient";
import "./PlayPlatformLoginPage.css";

function getSafeNextPath() {
  const nextPath =
    new URLSearchParams(window.location.search).get("next");

  if (!nextPath?.startsWith("/") || nextPath.startsWith("//")) {
    return "/";
  }

  return nextPath;
}

function PlayPlatformLoginPage() {
  const [mode, setMode] = useState(() => (
    new URLSearchParams(window.location.search).get("recovery") === "1" ||
    new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery" ?
      "update" : new URLSearchParams(window.location.search).get("mode") === "recover" ? "recover" : "login"
  ));
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const nextPath = getSafeNextPath();

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
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("update");
        setPassword("");
      }
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

    if (mode === "recover") {
      if (!email.trim() || !email.includes("@")) {
        setMessage("Ingresa el correo de tu cuenta.");
        return;
      }
    } else if (mode === "update") {
      if (!session) {
        setMessage("Abri el enlace de recuperacion recibido por correo o solicita uno nuevo.");
        return;
      }
      if (password.length < 6 || password !== confirmPassword) {
        setMessage("Las contrasenas deben coincidir y tener al menos 6 caracteres.");
        return;
      }
    } else if (!email.trim() || password.length < 6) {
      setMessage("Ingresa email y una contrasena de al menos 6 caracteres.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      if (mode === "recover") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/login?recovery=1&next=${encodeURIComponent(nextPath)}`,
        });
        if (error) throw error;
        setMessage("Si ese correo tiene una cuenta, recibiras un enlace para cambiar tu contrasena. Revisa tambien spam y correo no deseado.");
      } else if (mode === "update") {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        setPassword("");
        setConfirmPassword("");
        setMode("login");
        window.history.replaceState(null, "", `/login?next=${encodeURIComponent(nextPath)}`);
        setMessage("Contrasena actualizada. Pulsa Continuar para entrar.");
      } else if (mode === "register") {
        const {
          error,
        } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login`,
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
        window.location.href = nextPath;
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

  const resendConfirmation = async () => {
    if (!hasSupabaseConfig || !supabase) {
      setMessage("Falta configurar Supabase.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setMessage("Ingresa tu email para reenviar la confirmacion.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const {
        error,
      } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        throw error;
      }

      setMessage("Te reenviamos el correo de confirmacion. Revisa entrada, spam y correo no deseado.");
    } catch (error) {
      setMessage(`No se pudo reenviar: ${error.message}`);
    } finally {
      setSaving(false);
    }
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
            <h1>{mode === "update" ? "Nueva contrasena" : mode === "recover" ? "Recuperar acceso" : mode === "register" ? "Registrarse" : "Iniciar sesion"}</h1>
          </div>
        </header>

        <section className="login-card">
          {session && mode !== "update" && mode !== "recover" ? (
            <div className="login-session">
              <span>Sesion activa</span>
              <strong>{session.user.email}</strong>
              <p>Tu cuenta queda lista para la siguiente fase: conservar fichas y entrar a mesas disponibles.</p>
              <div className="login-actions">
                <a href={nextPath === "/" ? "/" : nextPath}>
                  {nextPath === "/" ? "Volver al lobby" : "Continuar"}
                </a>
                <button type="button" onClick={signOut}>
                  Cerrar sesion
                </button>
              </div>
            </div>
          ) : (
            <>
              {mode !== "update" && <div className="login-tabs">
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
              </div>}

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

                {mode !== "update" && <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="tu@email.com"
                    autoComplete="email"
                    required
                    disabled={saving}
                  />
                </label>}

                {mode !== "recover" && <label>
                  {mode === "update" ? "Nueva contrasena" : "Contrasena"}
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Minimo 6 caracteres"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    required
                    minLength={6}
                    disabled={saving}
                  />
                </label>}
                {mode === "update" && <label>
                  Repetir nueva contrasena
                  <input type="password" autoComplete="new-password" required minLength={6}
                    value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} disabled={saving} />
                </label>}

                <button type="submit" disabled={saving}>
                  {saving ? "Procesando..." : mode === "recover" ? "Enviar enlace de recuperacion" : mode === "update" ? "Guardar nueva contrasena" : mode === "register" ? "Crear cuenta" : "Entrar"}
                </button>
                {mode !== "register" && (
                  <button type="button" className="login-secondary-action" disabled={saving}
                    onClick={() => { setMode(mode === "recover" ? "login" : "recover"); setMessage(""); setPassword(""); setConfirmPassword(""); }}>
                    {mode === "recover" ? "Volver a iniciar sesion" : mode === "update" ? "Solicitar otro enlace" : "Olvide mi contrasena"}
                  </button>
                )}
                {mode === "register" && (
                  <button
                    type="button"
                    className="login-secondary-action"
                    onClick={resendConfirmation}
                    disabled={saving}
                  >
                    Reenviar confirmacion
                  </button>
                )}
              </form>
            </>
          )}

          {message && (
            <div className="login-message" role="status">
              {message}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default PlayPlatformLoginPage;
