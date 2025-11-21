import axiosInstance from './axiosInstance'
import { tokenService } from './tokenService'

// All functions return response.data and strictly match backend endpoints

export const login = async (data) => {
  // Let Axios throw on non-2xx so React Query receives the error object
  const res = await axiosInstance.post('/users/public/login', data)
  return res.data
}

export const refreshToken = async (userId) => {
  // For refresh we must use the refresh token in Authorization header
  const rt = tokenService.getRefreshToken()
  const res = await axiosInstance.get(`/users/refresh-token/${userId}`, {
    headers: { Authorization: `Bearer ${rt}` },
  })
  return res.data
}

export const createUser = async (data) => {
  const res = await axiosInstance.post('/users/create', data)
  return res.data
}

export const createUserWithProfile = async (data) => {
  const res = await axiosInstance.post('/users/create-with-profile', data)
  return res.data
}

export const updateUser = async (data) => {
  const res = await axiosInstance.put('/users/update', data)
  return res.data
}

export const changePassword = async (data) => {
  const res = await axiosInstance.put('/users/change-password', data)
  return res.data
}

export const resetPassword = async (data) => {
  const res = await axiosInstance.put('/users/public/reset-password', data)
  return res.data
}

export const sendActivationEmail = async (userId) => {
  const res = await axiosInstance.get(`/users/send-activation-email/${userId}`)
  return res.data
}

export const blockUser = async (userId) => {
  const res = await axiosInstance.put(`/users/block/${userId}`)
  return res.data
}

export const unblockUser = async (userId) => {
  const res = await axiosInstance.put(`/users/unblock/${userId}`)
  return res.data
}

export const activateAccount = async (data) => {
  const res = await axiosInstance.put('/users/activate', data)
  return res.data
}

export const sendResetPasswordEmailById = async (userId) => {
  const res = await axiosInstance.get(`/users/send-reset-password-email/${userId}`)
  return res.data
}

export const sendResetPasswordEmailPublic = async (data) => {
  const res = await axiosInstance.post('/users/public/send-reset-password-email', data)
  return res.data
}

export const searchUsers = async (params) => {
  const res = await axiosInstance.get('/users/search', { params })
  return res.data
}

export const getVisibleUsers = async () => {
  const res = await axiosInstance.get('/users/list/visible')
  return res.data
}
  
  
  
  
  
  
  
  