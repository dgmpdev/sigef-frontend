import { useMutation } from '@tanstack/react-query'
import { sendResetPasswordEmailPublic } from '../../api/users.api'

export default function useSendResetPasswordEmailPublic(options = {}) {
  return useMutation({
    mutationKey: ['users', 'sendResetPasswordEmailPublic'],
    mutationFn: (payload) => sendResetPasswordEmailPublic(payload),
    ...options,
  })
}
