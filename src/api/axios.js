import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:8000/api/1.0' })

export default instance
