import { useEffect, useState } from "react";
import { auth } from "../firebase";
import UploadBox from "../components/UploadBox";
import JobCard from "../components/JobCard";
import DashboardNavbar from "../components/DashboardNavbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleJobResults = (parsedJobs) => {
    setJobs(parsedJobs || []);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 font-sans">
      <DashboardNavbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          Welcome{user ? `, ${user.displayName || user.email}` : ""}
        </h1>

        <p className="text-gray-300 mb-8">
          Upload a resume to get job recommendation by AI.
        </p>

        <UploadBox onJobData={handleJobResults} />

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-yellow-400">
          Your Recommended Jobs
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          ) : (
            <p className="text-gray-400 col-span-full">
              No recommendations yet. Upload a resume to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
