export default function PageHeader() {
  const now = new Date();
  const tanggal = now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const getSalam = () => {
    const h = now.getHours();
    if (h < 11) return "Selamat Pagi";
    if (h < 15) return "Selamat Siang";
    if (h < 18) return "Selamat Sore";
    return "Selamat Malam";
  };
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 p-6 rounded-2xl shadow-lg text-white">
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-white opacity-10 rounded-full"></div>
      <div className="absolute -bottom-8 -left-4 w-40 h-40 bg-white opacity-5 rounded-full"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-indigo-100 text-xs uppercase tracking-widest mb-2">{tanggal}</p>
          <h1 className="text-2xl font-bold mb-1">{getSalam()}, Admin! 👋</h1>
          <p className="text-indigo-100 text-sm">Selamat bekerja — pantau antrian cucian hari ini</p>
          <div className="mt-4 border-t border-white border-opacity-20"></div>
          <div className="mt-3 flex gap-6 text-sm text-indigo-100">
            <span>🚗 Kendaraan & Karpet</span>
            <span>📋 Manajemen Antrian</span>
            <span>💰 Laporan Harian</span>
          </div>
        </div>
        <div className="text-6xl opacity-80">🚿</div>
      </div>
    </div>
  );
}