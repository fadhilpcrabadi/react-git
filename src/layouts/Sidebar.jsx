import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiListUl } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleKeluar = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      id="sidebar"
      className="w-64 min-h-screen bg-white shadow-lg p-6 flex flex-col"
    >
      {/* Logo */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Sistem Manajemen Cucian Kendaraan dan Karpet</h1>
        <p className="text-sm text-gray-400">Admin Panel</p>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          <li>
            <Link
              id="menu-1" to="/"
              className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
            >
              <RxDashboard className="mr-4 text-xl" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              id="menu-2" to="/tambah"
              className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
            >
              <AiOutlinePlus className="mr-4 text-xl" />
              Tambah
            </Link>
          </li>
          <li>
            <Link
              id="menu-3" to="/antrian"
              className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
            >
              <BiListUl className="mr-4 text-xl" />
              Antrian
            </Link>
          </li>
          <li>
            <Link
              id="menu-4" to="/status"
              className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
            >
              <AiOutlineCheckCircle className="mr-4 text-xl" />
              Status
            </Link>
          </li>
          <li>
            <Link
              id="menu-5" to="/laporan"
              className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
            >
              <HiOutlineDocumentReport className="mr-4 text-xl" />
              Laporan
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <button
          onClick={handleKeluar}
          className="w-full bg-red-500 text-white p-3 rounded-lg mt-10"
        >
          Keluar
        </button>
      </div>
    </div>
  );
}
