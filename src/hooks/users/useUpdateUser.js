import { useMutation } from '@tanstack/react-query'
import { updateUser } from '../../api/users.api'

export default function useUpdateUser(options = {}) {
  return useMutation({
    mutationKey: ['users', 'update'],
    mutationFn: (payload) => updateUser(payload),
    ...options,
  })
}
