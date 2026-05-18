import PageHeader from "../components/PageHeader";
export default function Tambah() {
  return (
    <div className="flex-1 flex justify-center items-center">
      

      {/* Content kanan */}
      <div className="flex-1 flex justify-center items-center">

        <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">

          <h2 className="text-xl font-semibold mb-1">
            Tambah Cucian Baru
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Masukkan data pelanggan
          </p>

          <div className="space-y-4">

            <div>
              <label className="text-sm font-medium">Nama Pelanggan</label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso"
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Plat Nomor Kendaraan</label>
              <input
                type="text"
                placeholder="B 1234 CD"
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Pilih Jenis Layanan</label>
              <select className="w-full mt-1 p-2 border rounded-lg">
                <option>-- Pilih Layanan --</option>
                <option>Cuci Mobil</option>
                <option>Cuci Motor</option>
                <option>Karpet</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg">
                Simpan Data
              </button>
              <button className="flex-1 bg-gray-500 text-white py-2 rounded-lg">
                Batal
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}