import { useState, useEffect } from "react";
import { BiNotepad } from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { cucianAPI } from "../service/cucianAPI";
import PageHeader4 from "../components/PageHeader4";

export default function Laporan() {
  const [listCucian, setListCucian] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [hasilCari, setHasilCari] = useState([]);
  const [filter, setFilter] = useState("semua");
  const [bulanDipilih, setBulanDipilih] = useState("");

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

  const filterByWaktu = (data) => {
    const now = new Date();
    return data.filter((c) => {
      const tgl = new Date(c.created_at);
      if (filter === "hari") {
        return tgl.toDateString() === now.toDateString();
      }
      if (filter === "minggu") {
        const diffDays = (now - tgl) / (1000 * 60 * 60 * 24);
        return diffDays <= 7;
      }
      if (filter === "bulan") {
        return tgl.getMonth() === now.getMonth() && tgl.getFullYear() === now.getFullYear();
      }
      if (filter === "pilihbulan" && bulanDipilih) {
        const [tahun, bulan] = bulanDipilih.split("-");
        return tgl.getMonth() === parseInt(bulan) - 1 && tgl.getFullYear() === parseInt(tahun);
      }
      return true;
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const selesai = listCucian.filter((c) => c.status === "Selesai");
      const terfilter = filterByWaktu(selesai);
      const hasil = terfilter.filter((c) =>
        c.nama_pelanggan.toLowerCase().includes(search.toLowerCase())
      );
      setHasilCari(hasil);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, listCucian, filter, bulanDipilih]);

  const getHarga = (jenis) => {
    if (jenis === "Cuci Mobil") return 50000;
    if (jenis === "Cuci Motor") return 25000;
    return 35000;
  };

  const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

  const selesaiFiltered = filterByWaktu(listCucian.filter((c) => c.status === "Selesai"));
  const totalPendapatan = selesaiFiltered.reduce((t, c) => t + getHarga(c.jenis_layanan), 0);
  const totalKendaraan = selesaiFiltered.filter((c) => c.jenis_layanan !== "Karpet").length;
  const totalKarpet = selesaiFiltered.filter((c) => c.jenis_layanan === "Karpet").length;

  const filterLabel = {
    semua: "Semua Waktu",
    hari: "Hari Ini",
    minggu: "Minggu Ini",
    bulan: "Bulan Ini",
    pilihbulan: bulanDipilih
      ? new Date(bulanDipilih + "-01").toLocaleDateString("id-ID", { month: "long", year: "numeric" })
      : "Pilih Bulan",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <PageHeader4 />

      {loading ? (
        <div className="mt-6 text-center text-gray-400">Memuat data...</div>
      ) : (
        <>
          {/* Filter Waktu */}
          <div className="mt-6 flex flex-wrap gap-2 items-center">
            {["semua", "hari", "minggu", "bulan"].map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setBulanDipilih(""); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  filter === f
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-gray-500 hover:bg-orange-50 hover:text-orange-500 shadow-sm"
                }`}
              >
                {f === "semua" ? "📅 Semua" :
                 f === "hari" ? "☀️ Hari Ini" :
                 f === "minggu" ? "📆 Minggu Ini" : "🗓️ Bulan Ini"}
              </button>
            ))}

            {/* Pilih Bulan Manual */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl shadow-sm border transition ${
              filter === "pilihbulan" ? "bg-orange-500 border-orange-500" : "bg-white border-gray-100"
            }`}>
              <span className="text-sm">📂</span>
              <input
                type="month"
                value={bulanDipilih}
                onChange={(e) => {
                  setBulanDipilih(e.target.value);
                  setFilter("pilihbulan");
                }}
                className={`text-sm focus:outline-none bg-transparent ${
                  filter === "pilihbulan" ? "text-white" : "text-gray-600"
                }`}
              />
            </div>
          </div>

          {/* Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border-t-4 border-orange-400">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <FaRegMoneyBillAlt className="text-orange-400" />
                <span>Total Pendapatan</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatRupiah(totalPendapatan)}</p>
              <p className="text-xs text-gray-400 mt-1">{filterLabel[filter]} • {selesaiFiltered.length} transaksi</p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border-t-4 border-green-500">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <AiFillCar className="text-green-500" />
                <span>Total Kendaraan Dicuci</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{totalKendaraan}</p>
              <p className="text-xs text-gray-400 mt-1">{filterLabel[filter]}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border-t-4 border-amber-400">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <BiNotepad className="text-amber-400" />
                <span>Layanan Karpet Selesai</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{totalKarpet}</p>
              <p className="text-xs text-gray-400 mt-1">{filterLabel[filter]}</p>
            </div>
          </div>

          {/* Tabel */}
          <div className="bg-white mt-6 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-gray-700">
                Riwayat Transaksi Selesai
                <span className="ml-2 text-xs text-orange-500 font-normal">({filterLabel[filter]})</span>
              </p>
              <input
                type="text"
                placeholder="🔍 Cari nama pelanggan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-200 bg-gray-50 px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 w-64"
              />
            </div>

            {hasilCari.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                {search
                  ? `Tidak ada hasil untuk "${search}"`
                  : `Belum ada transaksi ${filterLabel[filter].toLowerCase()}.`}
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b bg-gray-50">
                    <th className="text-left py-3 px-3">No</th>
                    <th className="text-left py-3 px-3">Nama Pelanggan</th>
                    <th className="text-left py-3 px-3">No. Kendaraan</th>
                    <th className="text-left py-3 px-3">Jenis Layanan</th>
                    <th className="text-left py-3 px-3">Total Bayar</th>
                    <th className="text-left py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hasilCari.map((cucian, i) => (
                    <tr key={cucian.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-3 text-gray-400">{i + 1}</td>
                      <td className="py-3 px-3 font-medium text-gray-800">{cucian.nama_pelanggan}</td>
                      <td className="py-3 px-3 text-gray-500">{cucian.no_kendaraan}</td>
                      <td className="py-3 px-3">
                        {cucian.jenis_layanan === "Cuci Mobil" ? "🚗" :
                         cucian.jenis_layanan === "Cuci Motor" ? "🏍️" : "🪣"} {cucian.jenis_layanan}
                      </td>
                      <td className="py-3 px-3 font-semibold text-green-600">
                        {formatRupiah(getHarga(cucian.jenis_layanan))}
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          ✅ Selesai
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 bg-gray-50">
                    <td colSpan={4} className="py-3 px-3 font-semibold text-gray-600">
                      Total ({hasilCari.length} transaksi)
                    </td>
                    <td className="py-3 px-3 font-bold text-green-600">
                      {formatRupiah(hasilCari.reduce((t, c) => t + getHarga(c.jenis_layanan), 0))}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}