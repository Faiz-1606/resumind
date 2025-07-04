import { useEffect, useState } from "react";
import { auth } from "../firebase"; // or Firebase context
import UploadBox from "../components/UploadBox";
import JobCard from "../components/JobCard";
import DashboardNavbar from "../components/DashboardNavbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      // Optional: Fetch recommended jobs for this user from Supabase here
      setJobs([
        {
          id: 1,
          title: "Frontend Developer",
          company: "Google",
          location: "Remote",
        },
        {
          id: 2,
          title: "AI Research Intern",
          company: "OpenAI",
          location: "San Francisco",
        },
        {
          id: 3,
          title: "Backend Engineer",
          company: "Netflix",
          location: "Bangalore",
        },
      ]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 font-sans">
        <DashboardNavbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          Welcome{user ? `, ${user.displayName || user.email}` : ""} 
        </h1>

        <p className="text-gray-300 mb-8">
          Upload a resume to get fresh job recommendations powered by AI.
        </p>

        <UploadBox />

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-yellow-400">
          Your Recommended Jobs
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-gray-400">No recommendations yet. Upload a resume to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
