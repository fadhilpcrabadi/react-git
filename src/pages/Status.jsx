import { useState, useEffect } from "react";
import { cucianAPI } from "../service/cucianAPI";
import PageHeader3 from "../components/PageHeader3";

export default function Status() {
  const [listCucian, setListCucian] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null);

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

  const handleUpdateStatus = async (id, statusBaru) => {
    try {
      setUpdating(id);
      await cucianAPI.updateStatus(id, statusBaru);
      setListCucian((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: statusBaru } : item
        )
      );
    } catch (err) {
      console.error("Gagal update status:", err);
    } finally {
      setUpdating(null);
    }
  };

  // Filter hanya hari ini
  const hariIni = new Date().toDateString();
  const dataHariIni = listCucian.filter((c) =>
    new Date(c.created_at).toDateString() === hariIni
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <PageHeader3 />

      {loading && (
        <div className="mt-6 text-center text-gray-400">Memuat data...</div>
      )}

      <div className="mt-6 space-y-3">
        {!loading && dataHariIni.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium text-gray-500">Belum ada antrian hari ini</p>
            <p className="text-sm text-gray-400 mt-1">Data akan muncul saat ada pelanggan baru masuk</p>
          </div>
        )}

        {dataHariIni.map((cucian, index) => (
          <div key={cucian.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">

            {/* Info Atas */}
            <div className="flex items-center gap-4">

              {/* Nomor Antrian */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white w-14 h-14 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0">
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
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{cucian.nama_pelanggan}</p>
                <p className="text-sm text-gray-500">
                  {cucian.no_kendaraan} &nbsp;•&nbsp;
                  {cucian.jenis_layanan === "Cuci Mobil" ? "🚗" :
                   cucian.jenis_layanan === "Cuci Motor" ? "🏍️" : "🪣"} {cucian.jenis_layanan}
                </p>
              </div>

              {/* Badge Status */}
              <span className={`px-3 py-1 rounded-full text-xs font-medium text-white flex-shrink-0 ${
                cucian.status === "Selesai" ? "bg-green-500" :
                cucian.status === "Proses" ? "bg-blue-500" : "bg-yellow-400"
              }`}>
                {cucian.status || "Menunggu"}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-4"></div>

            {/* Tombol Status */}
            <div className="flex items-center gap-3">
              <p className="text-xs text-gray-400 mr-1">Ubah Status:</p>
              <button
                onClick={() => handleUpdateStatus(cucian.id, "Menunggu")}
                disabled={updating === cucian.id || cucian.status === "Menunggu"}
                className="flex-1 bg-yellow-400 disabled:opacity-40 text-black text-sm font-medium py-2 rounded-xl shadow-sm hover:bg-yellow-500 transition"
              >
                🟡 Menunggu
              </button>
              <button
                onClick={() => handleUpdateStatus(cucian.id, "Proses")}
                disabled={updating === cucian.id || cucian.status === "Proses"}
                className="flex-1 bg-blue-500 disabled:opacity-40 text-white text-sm font-medium py-2 rounded-xl shadow-sm hover:bg-blue-600 transition"
              >
                🔵 Proses
              </button>
              <button
                onClick={() => handleUpdateStatus(cucian.id, "Selesai")}
                disabled={updating === cucian.id || cucian.status === "Selesai"}
                className="flex-1 bg-green-500 disabled:opacity-40 text-white text-sm font-medium py-2 rounded-xl shadow-sm hover:bg-green-600 transition"
              >
                🟢 Selesai
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}