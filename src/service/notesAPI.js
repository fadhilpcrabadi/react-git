import axios from 'axios'

const API_URL = "https://dhkujlgzaguybarkrygw.supabase.co/rest/v1/cucian"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoa3VqbGd6YWd1eWJhcmtyeWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNDAyMTMsImV4cCI6MjA5NzYxNjIxM30.667mBqZjQwDFg6ehHG34R7QQzbrdN-0RO_UIJ3NdiVo"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    }
}