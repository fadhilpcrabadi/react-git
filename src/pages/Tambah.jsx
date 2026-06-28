import { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { cucianAPI } from "../service/cucianAPI";
import PageHeader5 from "../components/PageHeader5";

export default function Tambah() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);
=======
import { cucianAPI } from "../service/cucianAPI"; // Sila pastikan nama file ini betul di dalam folder service anda

export default function Tambah() {
  // 1. State untuk status UX (Loading, Error, Success)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 2. State untuk menampung data form cucian
>>>>>>> d4b08300e57afdac46ca17890ca9ae177815f562
  const [dataForm, setDataForm] = useState({
    nama_pelanggan: "",
    plat_nomor: "",
    jenis_layanan: "",
<<<<<<< HEAD
    foto: null,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleFoto = (evt) => {
    const file = evt.target.files[0];
    if (file) {
      setDataForm({ ...dataForm, foto: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!dataForm.nama_pelanggan || !dataForm.plat_nomor || !dataForm.jenis_layanan) {
      setError("Semua field wajib diisi!");
=======
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
>>>>>>> d4b08300e57afdac46ca17890ca9ae177815f562
      return;
    }

    try {
      setLoading(true);
      setError("");
<<<<<<< HEAD
      await cucianAPI.createCucian(dataForm);
      setSuccess("Data berhasil disimpan!");
      setDataForm({ nama_pelanggan: "", plat_nomor: "", jenis_layanan: "", foto: null });
      setPreview(null);
      setTimeout(() => navigate("/antrian"), 1000);
    } catch (err) {
      setError("Gagal menyimpan data. Coba lagi.");
      console.error(err);
=======
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
>>>>>>> d4b08300e57afdac46ca17890ca9ae177815f562
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <PageHeader5 />

      <div className="mt-6 flex justify-center">
        <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-md">

          {error && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
              {success}
            </div>
          )}

          <div className="space-y-4">
=======
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
>>>>>>> d4b08300e57afdac46ca17890ca9ae177815f562
            <div>
              <label className="text-sm font-medium text-gray-700">Nama Pelanggan</label>
              <input
                type="text"
                name="nama_pelanggan"
                value={dataForm.nama_pelanggan}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso"
<<<<<<< HEAD
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
=======
                required
                disabled={loading} // Memasukkan fungsi disabled semasa loading
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
>>>>>>> d4b08300e57afdac46ca17890ca9ae177815f562
              />
            </div>

            {/* Input Plat Nomor Kendaraan */}
            <div>
<<<<<<< HEAD
              <label className="text-sm font-medium text-gray-700">
                Plat Nomor Kendaraan / Nomor Karpet
              </label>
=======
              <label className="text-sm font-medium text-gray-700">Plat Nomor Kendaraan</label>
>>>>>>> d4b08300e57afdac46ca17890ca9ae177815f562
              <input
                type="text"
                name="plat_nomor"
                value={dataForm.plat_nomor}
                onChange={handleChange}
<<<<<<< HEAD
                placeholder="B 1234 CD / 001"
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
=======
                placeholder="B 1234 CD"
                required
                disabled={loading} // Memasukkan fungsi disabled semasa loading
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
>>>>>>> d4b08300e57afdac46ca17890ca9ae177815f562
              />
            </div>

            {/* Dropdown Pilihan Jenis Layanan */}
            <div>
              <label className="text-sm font-medium text-gray-700">Pilih Jenis Layanan</label>
<<<<<<< HEAD
              <select
                name="jenis_layanan"
                value={dataForm.jenis_layanan}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">-- Pilih Layanan --</option>
                <option value="Cuci Mobil">🚗 Cuci Mobil — Rp 50.000</option>
                <option value="Cuci Motor">🏍️ Cuci Motor — Rp 25.000</option>
                <option value="Karpet">🪣 Karpet — Rp 35.000</option>
              </select>
            </div>

            {/* Input Foto */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Foto Kendaraan / Karpet
              </label>
              <label className="mt-1 flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-teal-300 rounded-xl cursor-pointer bg-teal-50 hover:bg-teal-100 transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center text-teal-400">
                    <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 16l4-4m0 0l4 4m-4-4v9M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
                    </svg>
                    <p className="text-sm font-medium">Klik untuk upload foto</p>
                    <p className="text-xs text-teal-300 mt-1">PNG, JPG, JPEG</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleFoto} className="hidden" />
              </label>
              {preview && (
                <button
                  onClick={() => { setPreview(null); setDataForm({ ...dataForm, foto: null }); }}
                  className="mt-2 text-xs text-red-500 hover:underline"
                >
                  Hapus foto
                </button>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white py-3 rounded-xl font-medium transition"
              >
                {loading ? "Menyimpan..." : "💾 Simpan Data"}
              </button>
              <button
                onClick={() => navigate("/antrian")}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-xl font-medium transition"
=======
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
>>>>>>> d4b08300e57afdac46ca17890ca9ae177815f562
              >
                Batal
              </button>
            </div>
<<<<<<< HEAD
          </div>
=======

          </form>
>>>>>>> d4b08300e57afdac46ca17890ca9ae177815f562
        </div>
      </div>
    </div>
  );
}