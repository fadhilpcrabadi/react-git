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
  const [jenisFilter, setJenisFilter] = useState("semua");
  const [halaman, setHalaman] = useState(1);
  const perHalaman = 6;

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
      if (filter === "hari") return tgl.toDateString() === now.toDateString();
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
      let terfilter = filterByWaktu(selesai);
      if (jenisFilter !== "semua") {
        terfilter = terfilter.filter((c) => c.jenis_layanan === jenisFilter);
      }
      const hasil = terfilter.filter((c) =>
        c.nama_pelanggan.toLowerCase().includes(search.toLowerCase())
      );
      setHasilCari(hasil);
      setHalaman(1); // reset ke halaman 1 saat filter berubah
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, listCucian, filter, bulanDipilih, jenisFilter]);

  const getHarga = (jenis) => {
    if (jenis === "Cuci Mobil") return 50000;
    if (jenis === "Cuci Motor") return 25000;
    return 35000;
  };

  const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

  const formatTanggal = (iso) => {
    if (!iso) return "-";
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  const formatWaktu = (iso) => {
    if (!iso) return "-";
    return new Date(iso).toLocaleTimeString("id-ID", {
      hour: "2-digit", minute: "2-digit",
    });
  };

  let selesaiFiltered = filterByWaktu(listCucian.filter((c) => c.status === "Selesai"));
  if (jenisFilter !== "semua") {
    selesaiFiltered = selesaiFiltered.filter((c) => c.jenis_layanan === jenisFilter);
  }

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

  const jenisLabel = jenisFilter === "semua" ? "" : ` • ${jenisFilter}`;

  // Pagination
  const totalHalaman = Math.ceil(hasilCari.length / perHalaman);
  const dataHalaman = hasilCari.slice((halaman - 1) * perHalaman, halaman * perHalaman);

  const getBorderColor = (jenis) => {
    if (jenis === "Cuci Mobil") return "border-blue-400";
    if (jenis === "Cuci Motor") return "border-purple-400";
    return "border-amber-400";
  };

  const getBadgeColor = (jenis) => {
    if (jenis === "Cuci Mobil") return "bg-blue-100 text-blue-700";
    if (jenis === "Cuci Motor") return "bg-purple-100 text-purple-700";
    return "bg-amber-100 text-amber-700";
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

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl shadow-sm border transition ${
              filter === "pilihbulan" ? "bg-orange-500 border-orange-500" : "bg-white border-gray-100"
            }`}>
              <span className="text-sm">📂</span>
              <input
                type="month"
                value={bulanDipilih}
                onChange={(e) => { setBulanDipilih(e.target.value); setFilter("pilihbulan"); }}
                className={`text-sm focus:outline-none bg-transparent ${
                  filter === "pilihbulan" ? "text-white" : "text-gray-600"
                }`}
              />
            </div>
          </div>

          {/* Filter Jenis Layanan */}
          <div className="mt-3 flex flex-wrap gap-2">
            {["semua", "Cuci Mobil", "Cuci Motor", "Karpet"].map((j) => (
              <button
                key={j}
                onClick={() => setJenisFilter(j)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  jenisFilter === j
                    ? "bg-gray-800 text-white shadow-md"
                    : "bg-white text-gray-500 hover:bg-gray-100 shadow-sm"
                }`}
              >
                {j === "semua" ? "🔖 Semua Layanan" :
                 j === "Cuci Mobil" ? "🚗 Cuci Mobil" :
                 j === "Cuci Motor" ? "🏍️ Cuci Motor" : "🪣 Karpet"}
              </button>
            ))}
          </div>

          {/* Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border-t-4 border-orange-400">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <FaRegMoneyBillAlt className="text-orange-400" />
                <span>Total Pendapatan</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatRupiah(totalPendapatan)}</p>
              <p className="text-xs text-gray-400 mt-1">{filterLabel[filter]}{jenisLabel} • {selesaiFiltered.length} transaksi</p>
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

          {/* Header Riwayat + Search */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-700">
                Riwayat Transaksi Selesai
                <span className="ml-2 text-xs text-orange-500 font-normal">
                  ({filterLabel[filter]}{jenisLabel})
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {hasilCari.length} transaksi • Total {formatRupiah(hasilCari.reduce((t, c) => t + getHarga(c.jenis_layanan), 0))}
              </p>
            </div>
            <input
              type="text"
              placeholder="🔍 Cari nama pelanggan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 bg-white px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 w-64"
            />
          </div>

          {/* Card Grid */}
          {hasilCari.length === 0 ? (
            <div className="text-center text-gray-400 py-16 bg-white rounded-2xl mt-4">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium">
                {search ? `Tidak ada hasil untuk "${search}"` : `Belum ada transaksi ${filterLabel[filter].toLowerCase()}${jenisLabel}.`}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {dataHalaman.map((cucian, i) => (
                  <div
                    key={cucian.id}
                    className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition border-l-4 ${getBorderColor(cucian.jenis_layanan)}`}
                  >
                    <div className="p-4 flex gap-4">
                      {/* Foto */}
                      {cucian.foto ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${cucian.foto}`}
                          alt="Foto"
                          className="w-20 h-20 object-cover rounded-xl border border-gray-100 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-3xl flex-shrink-0">
                          {cucian.jenis_layanan === "Cuci Mobil" ? "🚗" :
                           cucian.jenis_layanan === "Cuci Motor" ? "🏍️" : "🪣"}
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-gray-800 truncate">{cucian.nama_pelanggan}</p>
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0">
                            ✅ Selesai
                          </span>
                        </div>

                        <p className="text-sm text-gray-500 mt-0.5">{cucian.no_kendaraan}</p>

                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-lg text-xs font-medium ${getBadgeColor(cucian.jenis_layanan)}`}>
                          {cucian.jenis_layanan === "Cuci Mobil" ? "🚗" :
                           cucian.jenis_layanan === "Cuci Motor" ? "🏍️" : "🪣"} {cucian.jenis_layanan}
                        </span>

                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-xs text-gray-400">
                            {formatTanggal(cucian.created_at)} • {formatWaktu(cucian.created_at)}
                          </p>
                          <p className="font-bold text-green-600 text-sm">
                            {formatRupiah(getHarga(cucian.jenis_layanan))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalHalaman > 1 && (
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setHalaman((h) => Math.max(h - 1, 1))}
                    disabled={halaman === 1}
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-white shadow-sm disabled:opacity-40 hover:bg-gray-50 transition"
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: totalHalaman }, (_, i) => i + 1).map((h) => (
                    <button
                      key={h}
                      onClick={() => setHalaman(h)}
                      className={`w-9 h-9 rounded-xl text-sm font-medium transition ${
                        halaman === h
                          ? "bg-orange-500 text-white shadow-md"
                          : "bg-white text-gray-500 hover:bg-gray-50 shadow-sm"
                      }`}
                    >
                      {h}
                    </button>
                  ))}

                  <button
                    onClick={() => setHalaman((h) => Math.min(h + 1, totalHalaman))}
                    disabled={halaman === totalHalaman}
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-white shadow-sm disabled:opacity-40 hover:bg-gray-50 transition"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}