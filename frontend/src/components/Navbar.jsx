import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="
        bg-base-100/80 border-b border-base-300 fixed w-full top-0 z-40
        backdrop-blur-lg
      "
    >
      {/* Max-width container with extra horizontal padding for more space */}
      <div className="max-w-7xl mx-auto px-12 h-16 flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <Link
          to="/"
          className="flex items-center gap-4 hover:opacity-80 transition-all"
          aria-label="Go to homepage"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold select-none tracking-tight">CodexChat</h1>
        </Link>

        {/* Right: Controls */}
        <nav className="flex items-center space-x-7">
          <Link
            to="/settings"
            className="btn btn-sm gap-2 transition-colors flex items-center"
            aria-label="Go to Themes settings"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Themes</span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="btn btn-sm gap-2 flex items-center"
                aria-label="View Profile"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                type="button"
                onClick={logout}
                className="btn btn-sm gap-2 flex items-center"
                aria-label="Log out"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
