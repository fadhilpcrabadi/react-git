export default function PageHeader() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-5 shadow-sm flex justify-between items-center">
      
      {/* Text */}
      <div>
        <h1 className="text-xl font-semibold text-blue-900">
          Selamat Datang, Admin
        </h1>
        <p className="text-sm text-blue-600 mt-1">
          Sabtu, 25 April 2026
        </p>
      </div>

      {/* Optional kanan (biar balance, bisa dihapus kalau gak mau) */}
      <div className="text-3xl">👋</div>

    </div>
  );
}