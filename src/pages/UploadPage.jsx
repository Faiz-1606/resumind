import { useState } from "react";
import UploadBox from "../components/UploadBox";
import Login from "../components/Login";
import Signup from "../components/Signup";

const UploadPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20">
      {!showLogin && !showSignup && (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">Upload Your Resume</h1>
          <UploadBox />
        </>
      )}

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </div>
  );
};

export default UploadPage;
