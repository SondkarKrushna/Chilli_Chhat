import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import NavBar from "./components/NavBar";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import HeroPage from "./pages/HeroPage";
import WaiterPannel from "./pages/WaiterPannel";
import ChefPannel from "./pages/ChiefPannel";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MenuPage from "./pages/MenuData";
import TableBooking from "./pages/BookTable";
import Testimonials from "./components/Testimonials";
import ForgotPassword from "./components/ForgotPassword";
import AdminPanel from "./pages/AdminPannel";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  // Hide navbar on auth pages
  const hideNavBar =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-pass";

    const hideFooter =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-pass";

  return (
    <>
      {!hideNavBar && <NavBar />}

      <Routes>
        {/* ================= AUTH ROUTES ================= */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-pass" element={<ForgotPassword />} />

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/home" element={<HeroPage />} />
        {/* <Route path="/menu" element={<MenuPage />} /> */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/testimonials" element={<Testimonials />} />

        {/* ================= PROTECTED ROUTES ================= */}

        {/* USER */}
        <Route
          path="/book-table"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <TableBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute allowedRoles={["admin", "waiter"]}>
              <MenuPage />
            </ProtectedRoute>
          }
        />

        {/* WAITER */}
        <Route
          path="/waiter"
          element={
            <ProtectedRoute allowedRoles={["waiter"]}>
              <WaiterPannel />
            </ProtectedRoute>
          }
        />

        {/* CHEF */}
        <Route
          path="/chief"
          element={
            <ProtectedRoute allowedRoles={["chef"]}>
              <ChefPannel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
