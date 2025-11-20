import axiosClient from './axiosClient.js'

const userApi = {
  getProfile: () => axiosClient.get('/users/me'),
  updateProfile: (payload) => axiosClient.put('/users/me', payload),
  list: (params) => axiosClient.get('/users', { params }),
}

export default userApi

