import { useMutation } from '@tanstack/react-query'
import { createUserWithProfile } from '../../api/users.api'

export default function useCreateUserWithProfile(options = {}) {
  return useMutation({
    mutationKey: ['users', 'createWithProfile'],
    mutationFn: (payload) => createUserWithProfile(payload),
    ...options,
  })
}
