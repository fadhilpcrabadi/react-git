import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";

// Lazy import pages utama
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Tambah    = React.lazy(() => import("./pages/Tambah"));
const Antrian   = React.lazy(() => import("./pages/Antrian"));
const Status    = React.lazy(() => import("./pages/Status"));
const Laporan   = React.lazy(() => import("./pages/Laporan"));

// Lazy import pages auth
const Login    = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot   = React.lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/"        element={<Dashboard />} />
          <Route path="/tambah"  element={<Tambah />} />
          <Route path="/antrian" element={<Antrian />} />
          <Route path="/status"  element={<Status />} />
          <Route path="/laporan" element={<Laporan />} />
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;
