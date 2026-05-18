import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm rounded-xl">
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <input
          className="w-full border border-gray-200 bg-gray-50 p-2 pl-4 pr-10 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Search Here..."
        />
        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 ml-4">
        {/* Icon */}
        <div className="flex items-center gap-3">
          <div className="relative p-2 bg-blue-100 rounded-xl text-blue-500 cursor-pointer hover:scale-105 transition">
            <FaBell size={16} />
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] px-1.5 rounded-full">
              50
            </span>
          </div>

          <div className="p-2 bg-blue-100 rounded-xl cursor-pointer hover:scale-105 transition">
            <FcAreaChart size={18} />
          </div>

          <div className="p-2 bg-red-100 rounded-xl text-red-500 cursor-pointer hover:scale-105 transition">
            <SlSettings size={16} />
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 border-l pl-3">
          <img
            src="https://i.pravatar.cc/150"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-xs text-gray-500">Hello,</p>
            <p className="text-sm font-semibold">Fadhil</p>
          </div>
        </div>
      </div>
    </div>
  );
}
