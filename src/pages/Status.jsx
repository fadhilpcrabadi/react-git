import { useState, useEffect } from "react";
import { cucianAPI } from "../service/cucianAPI";
import PageHeader from "../components/PageHeader3";

export default function Status() {
  const [listCucian, setListCucian] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ambil data otomatis saat halaman dibuka
  useEffect(() => {
    loadCucian();
  }, []);

  const loadCucian = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await cucianAPI.fetchCucian();
      setListCucian(data);
    } catch (err) {
      setError("Gagal memuat data dari database.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi yang dipicu saat tombol status diklik
  const handleUbahStatus = async (id, statusBaru) => {
    try {
      await cucianAPI.updateStatus(id, statusBaru);
      loadCucian(); // Memuat ulang data biar UI langsung ter-update otomatis
    } catch (err) {
      alert("Gagal memperbarui status: " + err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <PageHeader />

      {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
      {loading && <div className="text-gray-500 my-2 animate-pulse">Memperbarui data...</div>}

      <div className="mt-6 space-y-4">
        {!loading && listCucian.length === 0 && (
          <div className="text-center py-10 bg-white rounded-xl text-gray-400">Belum ada data antrean.</div>
        )}

        {listCucian.map((item, index) => {
          const nomorAntrian = `A${String(index + 1).padStart(3, "0")}`;
          // Jika di DB statusnya masih kosong (null), otomatis anggap "Menunggu"
          const statusSaatIni = item.status || "Menunggu";

          return (
            <div key={item.id || index} className="bg-white border rounded-xl p-5 shadow-sm">
              {/* Bagian Atas Card */}
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
                  {nomorAntrian}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.nama_pelanggan}</p>
                  <p className="text-sm text-gray-500 uppercase font-mono">
                    {item.no_kendaraan} • {item.jenis_layanan}
                  </p>
                </div>
              </div>

              <div className="border-t my-4"></div>

              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-gray-600 font-medium">Pilih Status:</p>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border">
                  Status Saat Ini: <strong className="text-blue-600">{statusSaatIni}</strong>
                </span>
              </div>

              {/* Tiga macam Tombol Status */}
              <div className="flex gap-3">
                <button 
                  onClick={() => handleUbahStatus(item.id, "Menunggu")}
                  className={`px-4 py-2 rounded-lg text-sm shadow-sm transition-all ${
                    statusSaatIni === "Menunggu" 
                      ? "bg-yellow-400 text-black font-semibold ring-2 ring-yellow-600" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Menunggu
                </button>

                <button 
                  onClick={() => handleUbahStatus(item.id, "Proses")}
                  className={`px-4 py-2 rounded-lg text-sm shadow-sm transition-all ${
                    statusSaatIni === "Proses" 
                      ? "bg-blue-500 text-white font-semibold ring-2 ring-blue-700" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Proses
                </button>

                <button 
                  onClick={() => handleUbahStatus(item.id, "Selesai")}
                  className={`px-4 py-2 rounded-lg text-sm shadow-sm transition-all ${
                    statusSaatIni === "Selesai" 
                      ? "bg-green-500 text-white font-semibold ring-2 ring-green-700" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Selesai
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}