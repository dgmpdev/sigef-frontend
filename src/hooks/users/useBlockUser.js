import { useMutation } from '@tanstack/react-query'
import { blockUser } from '../../api/users.api'

export default function useBlockUser(options = {}) {
  return useMutation({
    mutationKey: ['users', 'block'],
    mutationFn: (userId) => blockUser(userId),
    ...options,
  })
}
