import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-4 bg-black bg-opacity-60 text-white fixed top-0 z-50">
      <div className="text-xl font-bold">
        <Link to="/">Home</Link>
      </div>
      <div className="space-x-4">
        <Link
          to="/login"
          className="hover:text-green-400 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="hover:text-green-400 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
