import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cleaning from "./pages/Cleaning";
import CleaningService from "./pages/CleaningService";
import Catering from "./pages/Catering";
import CateringService from "./pages/CateringService";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import ServiceAreas from "./pages/ServiceAreas";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

import AdminLayout from "./admin/AdminLayout";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* =================================================
          PUBLIC WEBSITE
      ================================================= */}

      <Route
        element={
          <>
            <Navbar />

            <main>
              <Outlet />
            </main>

            <Footer />
          </>
        }
      >

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cleaning"
          element={<Cleaning />}
        />

        <Route
          path="/cleaning/:slug"
          element={<CleaningService />}
        />

        <Route
          path="/catering"
          element={<Catering />}
        />

        <Route
          path="/catering/:slug"
          element={<CateringService />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/service-areas"
          element={<ServiceAreas />}
        />

        <Route
          path="/faq"
          element={<FAQ />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Route>


      {/* =================================================
          ADMIN LOGIN
      ================================================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =================================================
          PROTECTED ADMIN APPLICATION
      ================================================= */}

      <Route
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Route>


      {/* =================================================
          FALLBACK
      ================================================= */}

      <Route
        path="*"
        element={<Home />}
      />

    </Routes>
  );
}