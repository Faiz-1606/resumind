import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import Avatar from "../assets/user.png"

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-black text-white font-medium ">
      <button
        onClick={() => navigate("/")}
        className="text-yellow-400 text-xl font-semibold hover:opacity-80"
      >
        Resumind
      </button>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-300 text-sm hidden sm:inline">
            {user.displayName || user.email}
          </span>
          <img
            src={Avatar} alt="avatar" className="w-10 h-10 rounded-full border border-gray-500 cursor-pointer"
            onClick={handleLogout}
            title="Click to logout"
          />
        </div>
      ) : (
        <span className="text-sm text-gray-400">Not logged in</span>
      )}
    </nav>
  );
};

export default DashboardNavbar;
