import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/1.0',
})

instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem('access_token')
  config.headers['Authorization'] = 'Bearer ' + token
  return config
})

export default instance
