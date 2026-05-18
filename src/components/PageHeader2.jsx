export default function PageHeader2() {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
      
      <div>
        <h1 className="text-xl font-semibold">Daftar Antrian</h1>
        <p className="text-sm text-gray-500">
          Kelola antrian cucian kendaraan
        </p>
      </div>

      <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
        + Tambah Cucian
      </button>

    </div>
  );
}