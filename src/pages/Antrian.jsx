import PageHeader from "../components/PageHeader2";

export default function Antrian() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* Header */}
      <PageHeader />

      {/* List Antrian */}
      <div className="mt-6 space-y-4">

        {/* A001 */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
          
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold">
            A001
          </div>

          <div className="flex-1 ml-4 pl-4 border-l border-gray-200">
            <p className="font-semibold">Budi Santoso</p>
            <p className="text-sm text-gray-500">B 1234 CD</p>
            <p className="text-sm text-gray-400">08:30 • Mobil</p>
          </div>

          <div className="text-right pl-4 border-l border-gray-200">
            <span className="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm">
              Menunggu
            </span>
            <p className="text-sm text-gray-500 mt-2">Harga</p>
            <p className="font-semibold">Rp 50.000</p>
          </div>

        </div>

        {/* A002 */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
          
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold">
            A002
          </div>

          <div className="flex-1 ml-4 pl-4 border-l border-gray-200">
            <p className="font-semibold">Siti Nurhaliza</p>
            <p className="text-sm text-gray-500">B 5678 EF</p>
            <p className="text-sm text-gray-400">08:45 • Motor</p>
          </div>

          <div className="text-right pl-4 border-l border-gray-200">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
              Proses
            </span>
            <p className="text-sm text-gray-500 mt-2">Harga</p>
            <p className="font-semibold">Rp 25.000</p>
          </div>

        </div>

        {/* A003 */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
          
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold">
            A003
          </div>

          <div className="flex-1 ml-4 pl-4 border-l border-gray-200">
            <p className="font-semibold">Ahmad Rizki</p>
            <p className="text-sm text-gray-500">B 9012 GH</p>
            <p className="text-sm text-gray-400">09:00 • Mobil</p>
          </div>

          <div className="text-right pl-4 border-l border-gray-200">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
              Proses
            </span>
            <p className="text-sm text-gray-500 mt-2">Harga</p>
            <p className="font-semibold">Rp 50.000</p>
          </div>

        </div>

        {/* A004 */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
          
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold">
            A004
          </div>

          <div className="flex-1 ml-4 pl-4 border-l border-gray-200">
            <p className="font-semibold">Dewi Lestari</p>
            <p className="text-sm text-gray-500">B 3456 IJ</p>
            <p className="text-sm text-gray-400">09:15 • Karpet</p>
          </div>

          <div className="text-right pl-4 border-l border-gray-200">
            <span className="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm">
              Menunggu
            </span>
            <p className="text-sm text-gray-500 mt-2">Harga</p>
            <p className="font-semibold">Rp 35.000</p>
          </div>

        </div>

        {/* A005 */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
          
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold">
            A005
          </div>

          <div className="flex-1 ml-4 pl-4 border-l border-gray-200">
            <p className="font-semibold">Eko Prasetyo</p>
            <p className="text-sm text-gray-500">B 7890 KL</p>
            <p className="text-sm text-gray-400">09:30 • Motor</p>
          </div>

          <div className="text-right pl-4 border-l border-gray-200">
            <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">
              Selesai
            </span>
            <p className="text-sm text-gray-500 mt-2">Harga</p>
            <p className="font-semibold">Rp 25.000</p>
          </div>

        </div>

      </div>
    </div>
  );
}