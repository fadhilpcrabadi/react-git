export default function PageHeader3() {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
      
      {/* Text */}
      <div>
        <h1 className="text-xl font-semibold">
          Ubah Status Cucian
        </h1>
        <p className="text-sm text-gray-500">
          Klik tombol untuk mengubah status
        </p>
      </div>

      {/* Button kanan (opsional, bisa diganti / dihapus) */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Status Aktif
      </button>

    </div>
  );
}