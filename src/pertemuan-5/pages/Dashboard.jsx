import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  return (
    <div className="p-5">
      <PageHeader title="Dashboard" />

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">

        {/* Orders */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <FaShoppingCart size={18} />
          </div>
          <div>
            <p className="text-xl font-bold">75</p>
            <p className="text-gray-400 text-sm">Total Orders</p>
          </div>
        </div>

        {/* Delivered */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
            <FaTruck size={18} />
          </div>
          <div>
            <p className="text-xl font-bold">175</p>
            <p className="text-gray-400 text-sm">Total Delivered</p>
          </div>
        </div>

        {/* Canceled */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
          <div className="bg-red-100 text-red-600 p-3 rounded-xl">
            <FaBan size={18} />
          </div>
          <div>
            <p className="text-xl font-bold">40</p>
            <p className="text-gray-400 text-sm">Total Canceled</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">
            <FaDollarSign size={18} />
          </div>
          <div>
            <p className="text-xl font-bold">Rp 128K</p>
            <p className="text-gray-400 text-sm">Total Revenue</p>
          </div>
        </div>

      </div>
    </div>
  );
}