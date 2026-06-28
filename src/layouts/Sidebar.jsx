import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { BiListUl } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleKeluar = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menus = [
    { id: 1, path: "/",        icon: <RxDashboard className="text-xl" />,           label: "Dashboard" },
    { id: 2, path: "/tambah",  icon: <AiOutlinePlus className="text-xl" />,          label: "Tambah" },
    { id: 3, path: "/antrian", icon: <BiListUl className="text-xl" />,               label: "Antrian" },
    { id: 4, path: "/status",  icon: <AiOutlineCheckCircle className="text-xl" />,   label: "Status" },
    { id: 5, path: "/laporan", icon: <HiOutlineDocumentReport className="text-xl" />, label: "Laporan" },
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 flex flex-col shadow-xl">

      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-xl">
            <span className="text-white text-lg">🚿</span>
          </div>
          <h1 className="text-white font-bold text-lg leading-tight">WashTrack</h1>
        </div>
        <p className="text-gray-400 text-xs ml-1">Sistem Manajemen Cucian</p>

        <div className="mt-4 border-t border-gray-700"></div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <Link
              key={menu.id}
              to={menu.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm
                ${isActive
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
            >
              <span className={isActive ? "text-white" : "text-gray-400"}>
                {menu.icon}
              </span>
              {menu.label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-6 border-t border-gray-700 pt-4">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div>
            <p className="text-white text-sm font-medium">Admin</p>
            <p className="text-gray-400 text-xs">Administrator</p>
          </div>
        </div>

        <button
          onClick={handleKeluar}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl transition text-sm font-medium"
        >
          <span>🚪</span> Keluar
        </button>
      </div>

    </div>
  );
}