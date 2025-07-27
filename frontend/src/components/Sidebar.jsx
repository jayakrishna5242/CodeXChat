import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Removed showOnlineOnly and related state/toggle
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // No filtering by online anymore, just search filtering
  const filteredUsers = users.filter((user) => {
    const name = user.fullName || user.name || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="
      h-full 
      w-16              /* Mobile: very narrow with only icons */
      md:w-56           /* Medium screens: wider */
      lg:w-72           /* Large screens: full width */
      border-r border-base-300 
      flex flex-col transition-all duration-200
    ">
      <div className="border-b border-base-300 w-full p-3 md:p-5 flex flex-col gap-3">
        {/* Available Users label above */}
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden md:inline-block">Available Users</span>
        </div>

        {/* Search bar below label */}
        <div className="flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search Users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-sm w-full bg-base-200 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary transition rounded-md"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 py-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-2 sm:p-3 flex items-center gap-2 sm:gap-3
                hover:bg-base-300 transition-colors
                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                rounded-md
                text-left
                sm:text-base
                text-sm
              `}
              aria-selected={selectedUser?._id === user._id}
              aria-label={`Select user ${user.fullName || user.name}`}
            >
              <div className="relative mx-auto sm:mx-0 shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name || "User avatar"}
                  className="w-10 h-10 sm:size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-zinc-900"
                    aria-label="User is online"
                    title="Online"
                  />
                )}
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-xs text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
