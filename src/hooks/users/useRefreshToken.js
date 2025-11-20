import { useMutation } from '@tanstack/react-query'
import { refreshToken } from '../../api/users.api'

// Hook: useRefreshToken
// Triggers GET /users/refresh-token/{userId} using the stored refresh token in header
export default function useRefreshToken(options = {}) {
  return useMutation({
    mutationKey: ['users', 'refreshToken'],
    mutationFn: async (userId) => {
      return await refreshToken(userId)
    },
    ...options,
  })
}
