import { useState } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  Clock3,
} from "lucide-react";

import { config } from "../config";
import "../admin/admin.css";


export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();


  /* =========================================================
     FORM STATE
  ========================================================= */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  /* =========================================================
     SESSION EXPIRED MESSAGE
  ========================================================= */

  const sessionExpired =
    location.state?.sessionExpired === true;


  /* =========================================================
     LOGIN
  ========================================================= */

  async function handleLogin(event) {
    event.preventDefault();

    setError("");


    /* ---------------------------------------------------------
       VALIDATION
    --------------------------------------------------------- */

    if (!email.trim() || !password) {
      setError(
        "Please enter your email and password."
      );

      return;
    }


    setLoading(true);


    try {

      /* -------------------------------------------------------
         SEND LOGIN TO GOOGLE APPS SCRIPT
      ------------------------------------------------------- */

      const response = await fetch(
        config.googleAppsScriptUrl,
        {
          method: "POST",

          mode: "cors",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },

          body: JSON.stringify({
            action: "adminLogin",
            email: email.trim(),
            password,
          }),
        }
      );


      /* -------------------------------------------------------
         READ RESPONSE
      ------------------------------------------------------- */

      const result =
        await response.json();


      /* -------------------------------------------------------
         INVALID LOGIN
      ------------------------------------------------------- */

      if (!result.success) {
        setError(
          result.error ||
            "Invalid email or password."
        );

        return;
      }


      /* -------------------------------------------------------
         CREATE ADMIN SESSION
      ------------------------------------------------------- */

      sessionStorage.setItem(
        "mkVisionAdmin",
        "authenticated"
      );


      /*
       * Save the time the session started.
       *
       * The AdminLayout inactivity system
       * will control the 10-minute timer.
       */

      sessionStorage.setItem(
        "mkVisionAdminLastActivity",
        String(Date.now())
      );


      /* -------------------------------------------------------
         GO TO DASHBOARD
      ------------------------------------------------------- */

      navigate("/admin", {
        replace: true,
      });

    } catch (error) {

      console.error(
        "Admin login failed:",
        error
      );


      setError(
        "Unable to connect to the admin server. Please try again."
      );

    } finally {

      setLoading(false);

    }
  }


  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">


        {/* =====================================================
            BRAND
        ===================================================== */}

        <div className="admin-login-brand">

          <div className="admin-login-logo">
            MK
          </div>


          <div>
            <h1>
              MK VISION
            </h1>

            <p>
              ADMIN PORTAL
            </p>
          </div>

        </div>


        {/* =====================================================
            HEADING
        ===================================================== */}

        <div className="admin-login-heading">

          <h2>
            Welcome Back
          </h2>

          <p>
            Sign in to manage customer requests.
          </p>


          {/* SESSION EXPIRED */}

          {sessionExpired && (
            <div className="admin-login-session-expired">

              <Clock3 size={17} />

              <div>
                <strong>
                  Session expired
                </strong>

                <span>
                  You were signed out after
                  10 minutes of inactivity.
                  Please sign in again.
                </span>
              </div>

            </div>
          )}

        </div>


        {/* =====================================================
            LOGIN FORM
        ===================================================== */}

        <form
          className="admin-login-form"
          onSubmit={handleLogin}
        >


          {/* EMAIL */}

          <div className="admin-login-field">

            <label htmlFor="admin-email">
              Email
            </label>


            <div className="admin-login-input">

              <Mail size={18} />


              <input
                id="admin-email"
                type="email"

                value={email}

                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }

                placeholder="admin@mkvision.ca"

                autoComplete="username"

                disabled={loading}

                autoFocus
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div className="admin-login-field">

            <label htmlFor="admin-password">
              Password
            </label>


            <div className="admin-login-input">

              <LockKeyhole size={18} />


              <input
                id="admin-password"

                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                value={password}

                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }

                placeholder="Enter your password"

                autoComplete="current-password"

                disabled={loading}
              />


              {/* SHOW / HIDE PASSWORD */}

              <button
                type="button"

                className="admin-password-toggle"

                onClick={() =>
                  setShowPassword(
                    (current) =>
                      !current
                  )
                }

                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }

                disabled={loading}
              >

                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}

              </button>

            </div>

          </div>


          {/* ERROR */}

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}


          {/* LOGIN BUTTON */}

          <button
            type="submit"

            className="admin-login-button"

            disabled={loading}
          >

            {loading ? (
              <>
                <span className="admin-login-spinner" />

                Signing in...
              </>
            ) : (
              <>
                <LogIn size={18} />

                Sign In
              </>
            )}

          </button>

        </form>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="admin-login-footer">

          <span />

          <p>
            MK Vision Management
          </p>

          <span />

        </div>

      </div>

    </div>
  );
}