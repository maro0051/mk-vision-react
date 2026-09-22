import { Navigate, useLocation } from "react-router-dom";

export default function AdminProtectedRoute({
  children,
}) {
  const location = useLocation();

  const authenticated =
    sessionStorage.getItem("mkVisionAdmin") ===
    "authenticated";

  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return children;
}