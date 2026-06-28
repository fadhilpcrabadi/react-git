export default function PageHeader3() {
  const now = new Date();
  const tanggal = now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-6 rounded-2xl shadow-lg text-white">
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-white opacity-10 rounded-full"></div>
      <div className="absolute -bottom-8 -left-4 w-40 h-40 bg-white opacity-5 rounded-full"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-blue-100 text-xs uppercase tracking-widest mb-2">{tanggal}</p>
          <h1 className="text-2xl font-bold mb-1">Ubah Status Cucian</h1>
          <p className="text-blue-100 text-sm">Perbarui status antrian kendaraan & karpet secara real-time</p>
          <div className="mt-4 border-t border-white border-opacity-20"></div>
          <div className="mt-3 flex gap-6 text-sm text-blue-100">
            <span>🟡 Menunggu — belum diproses</span>
            <span>🔵 Proses — sedang dikerjakan</span>
            <span>🟢 Selesai — sudah selesai</span>
          </div>
        </div>
        <div className="text-6xl opacity-80">🔄</div>
      </div>
    </div>
  );
}