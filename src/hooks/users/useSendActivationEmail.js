import { useMutation } from '@tanstack/react-query'
import { sendActivationEmail } from '../../api/users.api'

export default function useSendActivationEmail(options = {}) {
  return useMutation({
    mutationKey: ['users', 'sendActivationEmail'],
    mutationFn: (userId) => sendActivationEmail(userId),
    ...options,
  })
}
