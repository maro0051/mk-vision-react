import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Clock3,
} from "lucide-react";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./admin.css";


/* =========================================================
   SETTINGS
   ========================================================= */

const INACTIVITY_LIMIT =
  10 * 60 * 1000;


/* =========================================================
   ADMIN LAYOUT
   ========================================================= */

export default function AdminLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [language, setLanguage] =
    useState("en");

  const [showSessionWarning, setShowSessionWarning] =
    useState(false);

  const inactivityTimer =
    useRef(null);

  const warningTimer =
    useRef(null);


  /* =======================================================
     TRANSLATIONS
  ======================================================= */

  const translations = {
    en: {
      adminPanel: "ADMIN PANEL",
      management: "MANAGEMENT",
      dashboard: "Dashboard",
      administrator: "Administrator",
      company: "MK Vision",
      signOut: "Sign Out",
      managementPortal: "Management Portal",
      systemOnline: "System Online",

      sessionWarning:
        "You will be signed out soon because of inactivity.",

      staySignedIn:
        "Stay Signed In",

      signingOut:
        "Signing out...",
    },

    fr: {
      adminPanel: "PANNEAU ADMIN",
      management: "GESTION",
      dashboard: "Tableau de bord",
      administrator: "Administrateur",
      company: "MK Vision",
      signOut: "Déconnexion",
      managementPortal: "Portail de gestion",
      systemOnline: "Système en ligne",

      sessionWarning:
        "Vous serez bientôt déconnecté en raison d'une période d'inactivité.",

      staySignedIn:
        "Rester connecté",

      signingOut:
        "Déconnexion...",
    },
  };

  const t = translations[language];


  /* =======================================================
     CLEAR TIMERS
  ======================================================= */

  function clearInactivityTimers() {
    if (inactivityTimer.current) {
      clearTimeout(
        inactivityTimer.current
      );

      inactivityTimer.current = null;
    }

    if (warningTimer.current) {
      clearTimeout(
        warningTimer.current
      );

      warningTimer.current = null;
    }
  }


  /* =======================================================
     LOGOUT
  ======================================================= */

  function logout() {
    clearInactivityTimers();

    sessionStorage.removeItem(
      "mkVisionAdmin"
    );

    setShowSessionWarning(false);

    navigate("/admin/login", {
      replace: true,

      state: {
        sessionExpired: true,
      },
    });
  }


  /* =======================================================
     RESET ACTIVITY TIMER
  ======================================================= */

  function resetInactivityTimer() {
    const authenticated =
      sessionStorage.getItem(
        "mkVisionAdmin"
      ) === "authenticated";

    if (!authenticated) {
      return;
    }

    clearInactivityTimers();

    setShowSessionWarning(false);


    /*
     * Show a warning 60 seconds before
     * the 10-minute logout.
     */

    warningTimer.current =
      setTimeout(() => {
        setShowSessionWarning(true);
      }, INACTIVITY_LIMIT - 60 * 1000);


    /*
     * Automatically log out after
     * 10 minutes without activity.
     */

    inactivityTimer.current =
      setTimeout(() => {
        logout();
      }, INACTIVITY_LIMIT);
  }


  /* =======================================================
     ACTIVITY DETECTION
  ======================================================= */

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];


    let lastActivity = 0;


    function handleActivity() {
      const now = Date.now();


      /*
       * Prevent the timer from being reset
       * hundreds of times per second from
       * mouse movement.
       */

      if (
        now - lastActivity <
        1000
      ) {
        return;
      }

      lastActivity = now;

      resetInactivityTimer();
    }


    events.forEach((event) => {
      window.addEventListener(
        event,
        handleActivity
      );
    });


    resetInactivityTimer();


    return () => {
      events.forEach((event) => {
        window.removeEventListener(
          event,
          handleActivity
        );
      });

      clearInactivityTimers();
    };
  }, []);


  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navigation = [
    {
      label: t.dashboard,
      path: "/admin",
      icon: LayoutDashboard,
    },
  ];


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="admin-app">

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {sidebarOpen && (
        <div
          className="admin-mobile-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen
            ? "admin-sidebar-open"
            : ""
        }`}
      >

        {/* BRAND */}

        <div className="admin-brand">

          <div className="admin-brand-mark">
            MK
          </div>

          <div className="admin-brand-text">

            <strong>
              MK VISION
            </strong>

            <span>
              {t.adminPanel}
            </span>

          </div>


          <button
            type="button"
            className="admin-mobile-close"
            onClick={() =>
              setSidebarOpen(false)
            }
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

        </div>


        {/* NAVIGATION */}

        <div className="admin-nav-label">
          {t.management}
        </div>

        <nav className="admin-navigation">

          {navigation.map(
            (item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={
                    item.path ===
                    "/admin"
                  }
                  className={({
                    isActive,
                  }) =>
                    `admin-nav-link ${
                      isActive
                        ? "active"
                        : ""
                    }`
                  }
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                >

                  <Icon size={19} />

                  <span>
                    {item.label}
                  </span>

                </NavLink>
              );
            }
          )}

        </nav>


        {/* SIDEBAR BOTTOM */}

        <div className="admin-sidebar-bottom">

          <div className="admin-user">

            <div className="admin-avatar">
              A
            </div>

            <div className="admin-user-info">

              <strong>
                {t.administrator}
              </strong>

              <span>
                {t.company}
              </span>

            </div>

          </div>


          <button
            type="button"
            className="admin-logout"
            onClick={logout}
          >

            <LogOut size={18} />

            <span>
              {t.signOut}
            </span>

          </button>

        </div>

      </aside>


      {/* =================================================
          MAIN
      ================================================= */}

      <div className="admin-main">

        {/* TOPBAR */}

        <header className="admin-topbar">

          <button
            type="button"
            className="admin-menu-button"
            onClick={() =>
              setSidebarOpen(true)
            }
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>


          <div className="admin-topbar-title">
            <span>
              {t.managementPortal}
            </span>
          </div>


          <div className="admin-topbar-right">

            {/* LANGUAGE */}

            <div
              className="admin-language-toggle"
              aria-label="Language selector"
            >

              <button
                type="button"
                className={
                  language === "en"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setLanguage("en")
                }
              >
                EN
              </button>

              <button
                type="button"
                className={
                  language === "fr"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setLanguage("fr")
                }
              >
                FR
              </button>

            </div>


            {/* SYSTEM STATUS */}

            <div className="admin-status-indicator">

              <span />

              {t.systemOnline}

            </div>


            {/* AVATAR */}

            <div className="admin-top-avatar">
              A
            </div>

          </div>

        </header>


        {/* CONTENT */}

        <main className="admin-content">

          <Outlet
            context={{
              language,
            }}
          />

        </main>

      </div>


      {/* =================================================
          SESSION WARNING
      ================================================= */}

      {showSessionWarning && (
        <div className="admin-session-warning">

          <div className="admin-session-warning-card">

            <div className="admin-session-warning-icon">
              <Clock3 size={22} />
            </div>

            <div className="admin-session-warning-content">

              <strong>
                {language === "fr"
                  ? "Session bientôt expirée"
                  : "Session expiring soon"}
              </strong>

              <p>
                {t.sessionWarning}
              </p>

            </div>


            <button
              type="button"
              onClick={
                resetInactivityTimer
              }
            >
              {t.staySignedIn}
            </button>

          </div>

        </div>
      )}

    </div>
  );
}