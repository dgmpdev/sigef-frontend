import { useMutation } from '@tanstack/react-query'
import { sendResetPasswordEmailById } from '../../api/users.api'

export default function useSendResetPasswordEmailById(options = {}) {
  return useMutation({
    mutationKey: ['users', 'sendResetPasswordEmailById'],
    mutationFn: (userId) => sendResetPasswordEmailById(userId),
    ...options,
  })
}
