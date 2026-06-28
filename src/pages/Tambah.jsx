import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cucianAPI } from "../service/cucianAPI";
import PageHeader5 from "../components/PageHeader5";

export default function Tambah() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);
  const [dataForm, setDataForm] = useState({
    nama_pelanggan: "",
    plat_nomor: "",
    jenis_layanan: "",
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
      return;
    }

    try {
      setLoading(true);
      setError("");
      await cucianAPI.createCucian(dataForm);
      setSuccess("Data berhasil disimpan!");
      setDataForm({ nama_pelanggan: "", plat_nomor: "", jenis_layanan: "", foto: null });
      setPreview(null);
      setTimeout(() => navigate("/antrian"), 1000);
    } catch (err) {
      setError("Gagal menyimpan data. Coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
            <div>
              <label className="text-sm font-medium text-gray-700">Nama Pelanggan</label>
              <input
                type="text"
                name="nama_pelanggan"
                value={dataForm.nama_pelanggan}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso"
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Plat Nomor Kendaraan / Nomor Karpet
              </label>
              <input
                type="text"
                name="plat_nomor"
                value={dataForm.plat_nomor}
                onChange={handleChange}
                placeholder="B 1234 CD / 001"
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Pilih Jenis Layanan</label>
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
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}