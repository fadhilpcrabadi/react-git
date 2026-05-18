import { BiNotepad } from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import PageHeader from "../components/PageHeader4";

export default function Laporan() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <PageHeader />

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Pendapatan */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaRegMoneyBillAlt className="text-blue-500" />
            <span>Total Pendapatan Hari Ini</span>
          </div>
          <p className="text-xl font-bold mt-2">Rp 1.350.000</p>
        </div>

        {/* Kendaraan */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AiFillCar className="text-blue-500" />
            <span>Total Kendaraan Dicuci</span>
          </div>
          <p className="text-xl font-bold mt-2">47</p>
        </div>

        {/* Karpet */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BiNotepad className="text-blue-500" />
            <span>Layanan Karpet Selesai</span>
          </div>
          <p className="text-xl font-bold mt-2">12</p>
        </div>
      </div>

      {/* Grafik (Dummy UI) */}
      <div className="bg-white mt-6 p-4 rounded-xl shadow-sm">
        <p className="font-semibold mb-4">Tren Pendapatan 7 Hari Terakhir</p>

        <div className="flex items-end gap-4 h-52">
          {[80, 60, 90, 50, 110, 140, 120].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500 rounded-t-lg"
                style={{ height: `${h}px` }} // 🔥 FIX DISINI
              ></div>

              <span className="text-xs mt-2 text-gray-500">
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white mt-6 p-4 rounded-xl shadow-sm">
        <p className="font-semibold mb-4">Riwayat Transaksi Selesai</p>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="text-left py-2">No</th>
              <th className="text-left py-2">Nama Pelanggan</th>
              <th className="text-left py-2">Jenis Layanan</th>
              <th className="text-left py-2">Total Bayar</th>
            </tr>
          </thead>

          <tbody>
            {[
              ["Budi Santoso", "Cuci Mobil Premium", "Rp 75.000"],
              ["Siti Aminah", "Cuci Motor", "Rp 25.000"],
              ["Ahmad Yani", "Cuci Karpet", "Rp 150.000"],
              ["Dewi Lestari", "Cuci Mobil Reguler", "Rp 50.000"],
              ["Eko Prasetyo", "Cuci Motor Premium", "Rp 35.000"],
              ["Fatimah Zahra", "Cuci Karpet", "Rp 120.000"],
              ["Gunawan Wijaya", "Cuci Mobil Premium", "Rp 75.000"],
              ["Hesti Rahmawati", "Cuci Motor", "Rp 25.000"],
            ].map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-2">{i + 1}</td>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td className="font-semibold">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
