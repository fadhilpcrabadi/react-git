import { useState, useEffect } from "react";
import { cucianAPI } from "../service/cucianAPI";
import PageHeader from "../components/PageHeader2";
import GenericTable from "../components/GenericTable";

export default function Antrian() {
  const [listCucian, setListCucian] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("Gagal memuat data antrean cucian.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatWaktu = (isoString) => {
    if (!isoString) return "--:--";

    const date = new Date(isoString);

    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <PageHeader />

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Daftar Antrean Cucian ({listCucian.length})
          </h3>

          {loading && (
            <span className="text-sm text-gray-400 animate-pulse">
              Memperbarui...
            </span>
          )}
        </div>

        {!loading && listCucian.length === 0 && (
          <div className="py-10 text-center text-gray-400">
            Belum ada data antrean masuk.
          </div>
        )}

        <GenericTable
          columns={[
            "Kode",
            "Pelanggan / Plat nomor",
            "Waktu & Layanan",
            "Status & Harga",
          ]}
          data={listCucian}
          renderRow={(cucian, index) => {
            const nomorAntrian = `A${String(index + 1).padStart(3, "0")}`;
            const statusSaatIni = cucian.status || "Menunggu";

            return (
              <tr
                key={cucian.id || index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Kode */}
                <td className="px-6 py-5 font-bold text-blue-600 whitespace-nowrap align-middle">
                  {nomorAntrian}
                </td>

                {/* Pelanggan / Plat Nomor */}
                <td className="px-6 py-5 align-middle">
                  <div className="font-semibold text-gray-800">
                    {cucian.nama_pelanggan}
                  </div>

                  <div className="mt-1 text-xs text-gray-500 uppercase tracking-wide">
                    {cucian.no_kendaraan}
                  </div>
                </td>

                {/* Waktu & Layanan */}
                <td className="px-6 py-5 align-middle">
                  <div className="text-sm text-gray-700">
                    {formatWaktu(cucian.created_at)} WIB
                  </div>

                  <span
                    className={`inline-flex items-center mt-2 px-2.5 py-1 rounded-md text-xs font-medium ${
                      cucian.jenis_layanan === "Cuci Mobil"
                        ? "bg-blue-100 text-blue-700"
                        : cucian.jenis_layanan === "Cuci Motor"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {cucian.jenis_layanan}
                  </span>
                </td>

                {/* Status & Harga */}
                <td className="px-6 py-5 align-middle">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${
                      statusSaatIni === "Selesai"
                        ? "bg-green-100 text-green-700"
                        : statusSaatIni === "Proses"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {statusSaatIni}
                  </span>

                  <div className="mt-2 text-xs text-gray-500">
                    Harga
                  </div>

                  <div className="font-semibold text-gray-800">
                    {cucian.jenis_layanan === "Cuci Mobil"
                      ? "Rp 50.000"
                      : cucian.jenis_layanan === "Cuci Motor"
                      ? "Rp 25.000"
                      : "Rp 35.000"}
                  </div>
                </td>
              </tr>
            );
          }}
        />
      </div>
    </div>
  );
}