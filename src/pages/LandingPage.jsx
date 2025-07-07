import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import Login from "../components/Login";
import Signup from "../components/Signup";
import JobCard from "../components/JobCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const handleJobResults = (parsedJobs) => {
    setJobs(parsedJobs || []);
  };

  
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

        <UploadBox onJobData={handleJobResults} />

        {jobs.length > 0 && (
          <div className="mt-12 w-full max-w-5xl">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              Your Recommended Jobs
            </h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          </div>
        )}
      </main>

      {showLogin && (
  <Login
    onClose={(shouldRedirect = false) => {
      setShowLogin(false);
      if (shouldRedirect) navigate("/dashboard");
    }}
/>
)}
      {showSignup && (
  <Signup
    onClose={(shouldRedirect = false) => {
      setShowSignup(false);
      if (shouldRedirect) navigate("/dashboard");
    }}
/>
)}
    </div>
  );
};

export default LandingPage;
