import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Home } from "./pages/Home";
import { ValuProvider } from "./context/ValuContext";
import { AdminPanel } from "./pages/AdminPanel";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <ValuProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={<ProtectedRoute element={<AdminPanel />} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ValuProvider>
  );
}

export default App;
