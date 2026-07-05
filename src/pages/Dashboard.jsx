import { useState, useEffect } from "react";
import { FaUsers, FaClock, FaCheckCircle, FaDollarSign } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { cucianAPI } from "../service/cucianAPI";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  const [listCucian, setListCucian] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCucian();
  }, []);

  const loadCucian = async () => {
    try {
      setLoading(true);
      const data = await cucianAPI.fetchCucian();
      setListCucian(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getHarga = (jenis) => {
    if (jenis === "Cuci Mobil") return 50000;
    if (jenis === "Cuci Motor") return 25000;
    return 35000;
  };

  const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

  const hariIni = new Date().toDateString();
  const dataHariIni = listCucian.filter(
    (c) => new Date(c.created_at).toDateString() === hariIni,
  );

  const totalAntrian = dataHariIni.length;
  const dalamProses = dataHariIni.filter((c) => c.status === "Proses").length;
  const menunggu = dataHariIni.filter(
    (c) => c.status === "Menunggu" || !c.status,
  ).length;
  const selesai = dataHariIni.filter((c) => c.status === "Selesai").length;
  const pendapatan = dataHariIni
    .filter((c) => c.status === "Selesai")
    .reduce((total, c) => total + getHarga(c.jenis_layanan), 0);

  // Data grafik 7 hari terakhir
  const get7HariTerakhir = () => {
    const hasil = [];
    for (let i = 6; i >= 0; i--) {
      const tgl = new Date();
      tgl.setDate(tgl.getDate() - i);
      const label = tgl.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
      });
      const jumlah = listCucian.filter(
        (c) => new Date(c.created_at).toDateString() === tgl.toDateString(),
      ).length;
      hasil.push({ label, jumlah });
    }
    return hasil;
  };

  const grafik = get7HariTerakhir();

  const getStatusBadge = (status) => {
    if (status === "Selesai") return "bg-green-100 text-green-700";
    if (status === "Proses") return "bg-blue-100 text-blue-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const getEmoji = (jenis) => {
    if (jenis === "Cuci Mobil") return "🚗";
    if (jenis === "Cuci Motor") return "🏍️";
    return "🪣";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 text-sm">
          <p className="text-gray-500 mb-1">{label}</p>
          <p className="font-bold text-indigo-600">
            {payload[0].value} antrian
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <PageHeader title="Dashboard" />

      {loading ? (
        <div className="mt-6 text-center text-gray-400">Memuat data...</div>
      ) : (
        <>
          {/* Statistik Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                <FaUsers size={18} />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalAntrian}</p>
                <p className="text-gray-400 text-sm">Antrian Hari Ini</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition">
              <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">
                <FaClock size={18} />
              </div>
              <div>
                <p className="text-2xl font-bold">{dalamProses}</p>
                <p className="text-gray-400 text-sm">Dalam Proses</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition">
              <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                <FaCheckCircle size={18} />
              </div>
              <div>
                <p className="text-2xl font-bold">{selesai}</p>
                <p className="text-gray-400 text-sm">Selesai Hari Ini</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition">
              <div className="bg-green-200 text-green-700 p-3 rounded-xl">
                <FaDollarSign size={18} />
              </div>
              <div>
                <p className="text-lg font-bold">{formatRupiah(pendapatan)}</p>
                <p className="text-gray-400 text-sm">Pendapatan Hari Ini</p>
              </div>
            </div>
          </div>

          {/* Grafik + Ringkasan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Grafik Recharts */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="font-semibold text-gray-700 mb-1">
                📊 Antrian 7 Hari Terakhir
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Total antrian masuk per hari
              </p>

              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={grafik} barSize={32}>
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "#f3f4f6", radius: 8 }}
                  />
                  <Bar
                    dataKey="jumlah"
                    fill="url(#colorGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Ringkasan Status */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="font-semibold text-gray-700 mb-1">
                🎯 Ringkasan Status Hari Ini
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Breakdown status antrian hari ini
              </p>

              {totalAntrian === 0 ? (
                <div className="text-center text-gray-300 py-8">
                  <p className="text-3xl mb-2">📭</p>
                  <p className="text-sm">Belum ada antrian hari ini</p>
                </div>
              ) : (
                <div>
                  <div className="relative" style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Menunggu", value: menunggu },
                            { name: "Proses", value: dalamProses },
                            { name: "Selesai", value: selesai },
                          ]}
                          cx="50%"
                          cy="46%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          <Cell fill="#facc15" />
                          <Cell fill="#3b82f6" />
                          <Cell fill="#22c55e" />
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            fontSize: "12px",
                          }}
                          formatter={(value, name) => [`${value} antrian`, name]}
                        />
                        <Legend
                          iconType="circle"
                          iconSize={8}
                          formatter={(value) => (
                            <span className="text-xs text-gray-500">{value}</span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Angka di tengah donat */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                      style={{ marginBottom: 24 }}
                    >
                      <p className="text-2xl font-bold text-gray-800">
                        {totalAntrian}
                      </p>
                      <p className="text-xs text-gray-400">Antrian</p>
                    </div>
                  </div>

                  {/* Tingkat penyelesaian */}
                  <div className="mt-2 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      Tingkat penyelesaian
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {Math.round((selesai / totalAntrian) * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabel Antrian Hari Ini */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mt-4">
            <p className="font-semibold text-gray-700 mb-1">
              📋 Antrian Masuk Hari Ini
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Daftar pelanggan yang masuk hari ini
            </p>

            {dataHariIni.length === 0 ? (
              <div className="text-center text-gray-300 py-8">
                <p className="text-3xl mb-2">📭</p>
                <p className="text-sm">Belum ada antrian hari ini</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b bg-gray-50 text-xs uppercase">
                    <th className="text-left py-3 px-3">No</th>
                    <th className="text-left py-3 px-3">Pelanggan</th>
                    <th className="text-left py-3 px-3">Kendaraan</th>
                    <th className="text-left py-3 px-3">Layanan</th>
                    <th className="text-left py-3 px-3">Harga</th>
                    <th className="text-left py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dataHariIni.map((cucian, i) => (
                    <tr
                      key={cucian.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-3 text-gray-400">{i + 1}</td>
                      <td className="py-3 px-3 font-medium text-gray-800">
                        {cucian.nama_pelanggan}
                      </td>
                      <td className="py-3 px-3 text-gray-500">
                        {cucian.no_kendaraan}
                      </td>
                      <td className="py-3 px-3">
                        {getEmoji(cucian.jenis_layanan)} {cucian.jenis_layanan}
                      </td>
                      <td className="py-3 px-3 font-semibold text-gray-700">
                        {formatRupiah(getHarga(cucian.jenis_layanan))}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(cucian.status)}`}
                        >
                          {cucian.status || "Menunggu"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}