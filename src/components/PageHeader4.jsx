export default function PageHeader4() {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
      
      <div>
        <h1 className="text-xl font-semibold">
          Laporan Ringkasan Bisnis
        </h1>
        <p className="text-sm text-gray-500">
          Pantau performa keuangan dan operasional WashTrack Anda
        </p>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Export
      </button>

    </div>
  );
}