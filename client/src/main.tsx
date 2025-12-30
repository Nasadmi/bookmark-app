import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Dashboard } from "./features/dashboard/pages/Dashboard";
import { Login } from "./features/auth/pages/Login";
import { ThemeProvider } from "./providers/Theme.provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
