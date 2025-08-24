import { useState } from "react";
import { auth, db, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), { email, role });
      alert("Account created!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await setDoc(doc(db, "users", result.user.uid), { email: result.user.email, role });
      alert("Signed up with Google!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/signup-bg.jpeg')" }}
    >
      <div className="pt-16 flex-grow flex items-center justify-center">
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg w-80">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Register</h2>
          <form onSubmit={handleSignUp}>
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
            <select
              className="w-full p-2 mb-3 rounded"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="bg-green-500 w-full p-2 rounded text-white mb-3"
            >
              Sign Up
            </button>
          </form>
          <button
            onClick={handleGoogleSignUp}
            className="bg-red-500 w-full p-2 rounded text-white"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
