import { useMutation } from '@tanstack/react-query'
import { unblockUser } from '../../api/users.api'

export default function useUnblockUser(options = {}) {
  return useMutation({
    mutationKey: ['users', 'unblock'],
    mutationFn: (userId) => unblockUser(userId),
    ...options,
  })
}
