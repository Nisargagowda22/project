import { useState } from "react";
import { auth, db, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const redirectUser = async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const role = userDoc.data().role;
      navigate(role === "admin" ? "/admin" : "/client");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await redirectUser(userCredential.user.uid);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await redirectUser(result.user.uid);
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/login-bg.jpeg')" }}
    >
      <div className="pt-16 flex-grow flex items-center justify-center">
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg w-80">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-3 rounded"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-3 rounded"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 w-full p-2 rounded text-white mb-3"
            >
              Login
            </button>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 w-full p-2 rounded text-white mb-3"
          >
            Continue with Google
          </button>
         

        </div>
      </div>
    </div>
  );
}

export default Login;
