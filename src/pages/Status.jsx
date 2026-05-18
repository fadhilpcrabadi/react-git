import PageHeader from "../components/PageHeader3";

export default function Status() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* Header */}
      <PageHeader />

      {/* List */}
      <div className="mt-6 space-y-4">

        {/* CARD */}
        {[
          { kode: "A001", nama: "Budi Santoso", plat: "B 1234 CD • Mobil" },
          { kode: "A002", nama: "Siti Nurhaliza", plat: "B 5678 EF • Motor" },
          { kode: "A003", nama: "Ahmad Rizki", plat: "B 9012 GH • Mobil" },
          { kode: "A004", nama: "Dewi Lestari", plat: "B 3456 IJ • Karpet" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 border rounded-xl p-5 shadow-sm"
          >
            
            {/* Top */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
                {item.kode}
              </div>

              <div>
                <p className="font-semibold">{item.nama}</p>
                <p className="text-sm text-gray-500">{item.plat}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t my-4"></div>

            {/* Status */}
            <p className="text-sm text-gray-600 mb-3">Pilih Status:</p>

            <div className="flex gap-3">
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-sm">
                Menunggu
              </button>

              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm">
                Proses
              </button>

              <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-sm">
                Selesai
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}