import GoogleLogo from "../assets/google-logo.png";

import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);
      onClose(true);
      
    } catch (error) {
      console.error("Email Login Error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google signed-in user:", result.user);
      onClose(true);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-opacity-50 flex  max-h-700px items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl shadow-lg w-[25%] max-w-100px relative">
        <button
          className="absolute top-3 right-3  text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleEmailLogin}
          className="w-full bg-yellow-300 hover:bg-yellow-500 text-black py-2 px-4  font-medium mb-6 rounded-full"
        >
          Login
        </button>

        {/* Separator */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">or login with</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="min-w-full bg-gray-300 hover:bg-gray-500 text-black py-2 px-4 rounded-full   place-content-center flex-col font-medium"
        >
            <img src={GoogleLogo} alt="Google" className="w-4 h-4 inline-block mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
