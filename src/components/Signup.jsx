
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import GoogleLogo from "../assets/google-logo.png";

const Signup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up user:", userCredential.user);
      onClose();
    } catch (error) {
      console.error("Email Sign-Up Error:", error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Signed up user:", result.user);
      onClose();
    } catch (error) {
      console.error("Google Sign-Up Error:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md  bg-opacity-35 flex items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl shadow-lg w-[25%] max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleEmailSignup}
          className="w-full bg-yellow-300 hover:bg-yellow-500 text-black py-2 px-4  font-medium mb-6 rounded-full"
        >
          Sign Up 
        </button>

        <button
          onClick={handleGoogleSignUp}
          className="min-w-full bg-gray-300 hover:bg-gray-500 text-black py-2 px-4 rounded-full   place-content-center flex-col font-medium"
        >
            <img src={GoogleLogo} alt="Google" className="w-4 h-4 inline-block mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
