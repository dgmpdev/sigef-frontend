import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '../../api/users.api'

export default function useResetPassword(options = {}) {
  return useMutation({
    mutationKey: ['users', 'resetPassword'],
    mutationFn: (payload) => resetPassword(payload),
    ...options,
  })
}
