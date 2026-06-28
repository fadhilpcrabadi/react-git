import axios from 'axios'

<<<<<<< HEAD
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Accept': 'application/json',
  }
})

// Otomatis sisipkan token ke setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const cucianAPI = {
  async fetchCucian() {
    const response = await api.get('/cucian')
    return response.data.data
  },

  async createCucian(dataForm) {
    const formData = new FormData()
    formData.append('nama_pelanggan', dataForm.nama_pelanggan)
    formData.append('no_kendaraan', dataForm.plat_nomor)
    formData.append('jenis_layanan', dataForm.jenis_layanan)
    if (dataForm.foto) {
      formData.append('foto', dataForm.foto)
    }

    const token = localStorage.getItem('token')
    const response = await fetch('http://127.0.0.1:8000/api/cucian', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: formData,
    })
    return response.json()
  },

  async updateStatus(id, statusBaru) {
    const response = await api.patch(`/cucian/${id}`, {
      status: statusBaru,
    })
    return response.data
  },

  async deleteCucian(id) {
    const response = await api.delete(`/cucian/${id}`)
    return response.data
  }
=======
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
>>>>>>> d4b08300e57afdac46ca17890ca9ae177815f562
}