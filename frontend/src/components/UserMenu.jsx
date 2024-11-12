import { useState } from "react";

export default function UserMenu({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      {user && (
        <div className="absolute right-8">
          <div
            className="w-12 h-12 bg-[#EE6C4D] text-white rounded-full flex items-center justify-center text-lg font-bold cursor-pointer"
            onClick={toggleDropdown}
          >
            {user.name[0].toUpperCase() + user.lastname[0].toUpperCase()}
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
              <button
                onClick={onLogout}
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
