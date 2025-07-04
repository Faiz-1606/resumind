import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useState } from "react";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="bg-black min-h-screen w-full text-white font-Varela Round">
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />
      <main className="flex flex-col items-center justify-start mt-16 px-4 w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Find Your Best Job Matches with <span className="text-yellow-400">AI</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6 text-center">
          Job Search Made Easy
        </p>
        <UploadBox />
      </main>
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </div>
  );
};

export default LandingPage;
