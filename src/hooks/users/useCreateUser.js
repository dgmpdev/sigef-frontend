import { useMutation } from '@tanstack/react-query'
import { createUser } from '../../api/users.api'

export default function useCreateUser(options = {}) {
  return useMutation({
    mutationKey: ['users', 'create'],
    mutationFn: (payload) => createUser(payload),
    ...options,
  })
}
