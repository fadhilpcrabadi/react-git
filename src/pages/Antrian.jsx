import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cucianAPI } from "../service/cucianAPI";
import PageHeader2 from "../components/PageHeader2";

export default function Antrian() {
  const navigate = useNavigate();
  const [listCucian, setListCucian] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCucian();
  }, []);

  const loadCucian = async () => {
    try {
      setLoading(true);
      const data = await cucianAPI.fetchCucian();
      setListCucian(data);
    } catch (err) {
      setError("Gagal memuat data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatWaktu = (isoString) => {
    if (!isoString) return "--:--";
    return new Date(isoString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getHarga = (jenis) => {
    if (jenis === "Cuci Mobil") return "Rp 50.000";
    if (jenis === "Cuci Motor") return "Rp 25.000";
    return "Rp 35.000";
  };

  const getStatusStyle = (status) => {
    if (status === "Selesai") return "bg-green-500";
    if (status === "Proses") return "bg-blue-500";
    return "bg-yellow-400";
  };

  // Filter hanya hari ini
  const hariIni = new Date().toDateString();
  const dataHariIni = listCucian.filter((c) =>
    new Date(c.created_at).toDateString() === hariIni
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <PageHeader2 />

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">{error}</div>
      )}

      {loading && (
        <div className="mt-6 text-center text-gray-400">Memuat data...</div>
      )}

      <div className="mt-6 space-y-3">
        {!loading && dataHariIni.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium text-gray-500">Belum ada antrian hari ini</p>
            <p className="text-sm text-gray-400 mt-1">Tambah pelanggan baru untuk memulai</p>
            <button
              onClick={() => navigate("/tambah")}
              className="mt-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-md transition"
            >
              + Tambah Cucian
            </button>
          </div>
        )}

        {dataHariIni.map((cucian, index) => (
          <div
            key={cucian.id}
            className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition flex items-center justify-between"
          >
            {/* Kiri */}
            <div className="flex items-center gap-4">

              {/* Nomor Antrian */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-500 text-white w-14 h-14 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0">
                A{String(index + 1).padStart(3, "0")}
              </div>

              {/* Foto */}
              {cucian.foto ? (
                <img
                  src={`http://127.0.0.1:8000/storage/${cucian.foto}`}
                  alt="Foto"
                  className="w-14 h-14 object-cover rounded-xl border border-gray-100 flex-shrink-0"
                />
              ) : (
                <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-gray-300 flex-shrink-0">
                  📷
                </div>
              )}

              {/* Info */}
              <div>
                <p className="font-semibold text-gray-800">{cucian.nama_pelanggan}</p>
                <p className="text-sm text-gray-500">{cucian.no_kendaraan}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  🕐 {formatWaktu(cucian.created_at)} &nbsp;•&nbsp;
                  {cucian.jenis_layanan === "Cuci Mobil" ? "🚗" :
                   cucian.jenis_layanan === "Cuci Motor" ? "🏍️" : "🪣"} {cucian.jenis_layanan}
                </p>
              </div>
            </div>

            {/* Kanan */}
            <div className="text-right flex-shrink-0 pl-4 border-l border-gray-100">
              <span className={`${getStatusStyle(cucian.status)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                {cucian.status || "Menunggu"}
              </span>
              <p className="text-xs text-gray-400 mt-2">Harga</p>
              <p className="font-bold text-gray-800">{getHarga(cucian.jenis_layanan)}</p>
            </div>

          </div>
        ))}
      </div>

      {/* Tombol Tambah */}
      {dataHariIni.length > 0 && (
        <button
          onClick={() => navigate("/tambah")}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-medium"
        >
          + Tambah Cucian
        </button>
      )}
    </div>
  );
}