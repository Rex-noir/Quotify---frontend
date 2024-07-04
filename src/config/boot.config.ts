import axios from 'axios'

function boot() {
  csrfToken()
}
export default boot

async function csrfToken() {
  try {
    await axios.get(import.meta.env.VITE_CSRF_SANCTUM)
  } catch (error) {
    throw error
  }
}
