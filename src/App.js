import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import SignUp from "./pages/Signup";
import Login from "./pages/login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Link } from "react-router-dom";

function App() {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Router>
   <nav className="w-full bg-black bg-opacity-60 text-white fixed top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
    <div className="text-xl font-bold">
      <Link to="/">Home</Link>
    </div>
    <div className="flex gap-3">
      {!user ? (
        <>
          <Link
            to="/signup"
            className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
          >
            Login
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </div>
  </div>
</nav>


      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
       
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client"
            element={
              <ProtectedRoute role="client">
                <ClientDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
