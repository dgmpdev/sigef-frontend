import { useMutation } from '@tanstack/react-query'
import { changePassword } from '../../api/users.api'

export default function useChangePassword(options = {}) {
  return useMutation({
    mutationKey: ['users', 'changePassword'],
    mutationFn: (payload) => changePassword(payload),
    ...options,
  })
}
