import { useState } from "react";
import { cucianAPI } from "../service/cucianAPI"; // Sila pastikan nama file ini betul di dalam folder service anda

export default function Tambah() {
  // 1. State untuk status UX (Loading, Error, Success)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 2. State untuk menampung data form cucian
  const [dataForm, setDataForm] = useState({
    nama_pelanggan: "",
    plat_nomor: "",
    jenis_layanan: "",
  });

  // 3. Fungsi untuk mengesan perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 4. Fungsi semasa form dihantar (Submit)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mengelakkan halaman daripada reload

    // Validasi ringkas jika jenis layanan belum dipilih
    if (!dataForm.jenis_layanan || dataForm.jenis_layanan === "") {
      setError("Silakan pilih jenis layanan terlebih dahulu!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Menghantar data form ke database menggunakan axios service yang dibina sebelum ini
      await cucianAPI.createCucian(dataForm);

      setSuccess("Data cucian berhasil ditambahkan!");

      // Mengosongkan form semula selepas berjaya dimasukkan
      setDataForm({
        nama_pelanggan: "",
        plat_nomor: "",
        jenis_layanan: "",
      });

      // Memadam mesej sukses secara automatik selepas 3 saat
      setTimeout(() => setSuccess(""), 3000);

    } catch (err) {
      // Menangkap mesej ralat jika proses menyimpan gagal
      setError(`Terjadi kesalahan: ${err.message || "Gagal menyimpan data."}`);
    } finally {
      setLoading(false);
    }
  };

  // 5. Fungsi untuk butang batal (Reset Form)
  const handleBatal = () => {
    setDataForm({
      nama_pelanggan: "",
      plat_nomor: "",
      jenis_layanan: "",
    });
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-4">
      
      {/* Bahagian Kandungan Form */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md">
        
        {/* Paparan Mesej Ralat / Sukses */}
        {error && (
          <div className="w-full mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="w-full mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm font-medium">
            {success}
          </div>
        )}

        <div className="bg-white w-full p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-1">
            Tambah Cucian Baru
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Masukkan data pelanggan
          </p>

          {/* Form Utama */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Nama Pelanggan */}
            <div>
              <label className="text-sm font-medium text-gray-700">Nama Pelanggan</label>
              <input
                type="text"
                name="nama_pelanggan"
                value={dataForm.nama_pelanggan}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso"
                required
                disabled={loading} // Memasukkan fungsi disabled semasa loading
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Input Plat Nomor Kendaraan */}
            <div>
              <label className="text-sm font-medium text-gray-700">Plat Nomor Kendaraan</label>
              <input
                type="text"
                name="plat_nomor"
                value={dataForm.plat_nomor}
                onChange={handleChange}
                placeholder="B 1234 CD"
                required
                disabled={loading} // Memasukkan fungsi disabled semasa loading
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Dropdown Pilihan Jenis Layanan */}
            <div>
              <label className="text-sm font-medium text-gray-700">Pilih Jenis Layanan</label>
              <select 
                name="jenis_layanan"
                value={dataForm.jenis_layanan}
                onChange={handleChange}
                required
                disabled={loading} // Memasukkan fungsi disabled semasa loading
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">-- Pilih Layanan --</option>
                <option value="Cuci Mobil">Cuci Mobil</option>
                <option value="Cuci Motor">Cuci Motor</option>
                <option value="Karpet">Karpet</option>
              </select>
            </div>

            {/* Butang Aksi Form */}
            <div className="flex gap-3 pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 rounded-lg transition-colors font-medium text-center flex justify-center items-center"
              >
                {/* Teks dinamik mengikut status loading kamu */}
                {loading ? "Mohon Tunggu..." : "Tambah Data"}
              </button>
              
              <button 
                type="button" 
                onClick={handleBatal}
                disabled={loading}
                className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white py-2 rounded-lg transition-colors font-medium"
              >
                Batal
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}