import axios from 'axios'

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
}