import { useMutation } from '@tanstack/react-query'
import { login } from '../../api/users.api'
import { tokenService } from '../../api/tokenService'

// Hook: useLogin
// Calls POST /users/public/login
// Expects AuthResponse: { message?: string, accessToken: string, refreshToken: string }
// On success, persist access/refresh tokens. No userId is expected from this endpoint.
export default function useLogin(options = {}) {
  return useMutation({
    mutationKey: ['users', 'login'],
    mutationFn: async (payload) => {
      const data = await login(payload)
      // Persist tokens from AuthResponse
      if (data?.accessToken || data?.refreshToken) {
        tokenService.setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken })
      }
      // Note: userId is not returned by AuthResponse; do not attempt to set it here.
      return data
    },
    ...options,
  })
}
