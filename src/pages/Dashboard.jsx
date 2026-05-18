import { FaUsers, FaClock, FaCheckCircle, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  return (
    <div className="p-5">
      <PageHeader title="Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">

        {/* Total Antrian */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
            <FaUsers size={18} />
          </div>
          <div>
            <p className="text-xl font-bold">12</p>
            <p className="text-gray-400 text-sm">Total Antrian</p>
          </div>
        </div>

        {/* Dalam Proses */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">
            <FaClock size={18} />
          </div>
          <div>
            <p className="text-xl font-bold">5</p>
            <p className="text-gray-400 text-sm">Dalam Proses</p>
          </div>
        </div>

        {/* Selesai */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <FaCheckCircle size={18} />
          </div>
          <div>
            <p className="text-xl font-bold">23</p>
            <p className="text-gray-400 text-sm">Selesai Hari Ini</p>
          </div>
        </div>

        {/* Pendapatan */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
          <div className="bg-green-200 text-green-700 p-3 rounded-xl">
            <FaDollarSign size={18} />
          </div>
          <div>
            <p className="text-xl font-bold">Rp 875.000</p>
            <p className="text-gray-400 text-sm">Pendapatan Hari Ini</p>
          </div>
        </div>

      </div>
    </div>
  );
}