import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import SweetsPage from "./pages/SweetsPage.tsx";
import AddSweetPage from "./pages/AddSweetPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ToastContainer from "./components/ToastContainer.tsx";

const App: React.FC = () => {
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {user && (
        <nav className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link
                  to="/sweets"
                  className="text-xl font-bold text-indigo-600 flex items-center gap-2"
                >
                  🍭 Sweet Shop
                </Link>
                <Link
                  to="/sweets"
                  className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-1"
                >
                  🍬 Browse Sweets
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/sweets/add"
                    className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-1"
                  >
                    ➕ Add Sweet
                  </Link>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 flex items-center gap-2">
                  👋 Welcome, {user.name}!
                  {user.role === "admin" && (
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      👨‍💼 Admin
                    </span>
                  )}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className={user ? "container mx-auto p-4" : ""}>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/sweets" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/sweets"
            element={
              <ProtectedRoute>
                <SweetsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sweets/add"
            element={
              <ProtectedRoute>
                {user?.role === "admin" ? (
                  <AddSweetPage />
                ) : (
                  <Navigate to="/sweets" replace />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/sweets" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={
              user ? <Navigate to="/sweets" replace /> : <RegisterPage />
            }
          />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
};

export default App;
