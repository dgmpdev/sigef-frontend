import axiosClient from './axiosClient.js'

const authApi = {
  login: (payload) => axiosClient.post('/auth/login', payload),
  register: (payload) => axiosClient.post('/auth/register', payload),
  forgotPassword: (payload) => axiosClient.post('/auth/forgot-password', payload),
}

export default authApi

