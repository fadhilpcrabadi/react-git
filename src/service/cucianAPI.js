import axios from 'axios'

const API_URL = "https://dhkujlgzaguybarkrygw.supabase.co/rest/v1/Cucian"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoa3VqbGd6YWd1eWJhcmtyeWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNDAyMTMsImV4cCI6MjA5NzYxNjIxM30.667mBqZjQwDFg6ehHG34R7QQzbrdN-0RO_UIJ3NdiVo"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation" 
}

export const cucianAPI = {
    // 1. Fungsi mengambil semua data
    async fetchCucian() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    // 2. Fungsi membuat data baru (Sudah disesuaikan dengan no_kendaraan)
    async createCucian(dataForm) {
        const dataSupabase = {
            nama_pelanggan: dataForm.nama_pelanggan,
            no_kendaraan: dataForm.plat_nomor, 
            jenis_layanan: dataForm.jenis_layanan
        }
        const response = await axios.post(API_URL, dataSupabase, { headers })
        return response.data
    },

    // 3. FUNGSI BARU: Mengubah status berdasarkan ID cucian
    async updateStatus(id, statusBaru) {
        const response = await axios.patch(
            `${API_URL}?id=eq.${id}`, 
            { status: statusBaru }, 
            { headers }
        )
        return response.data
    }
}