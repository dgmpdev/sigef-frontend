import { useMutation } from '@tanstack/react-query'
import { activateAccount } from '../../api/users.api'

export default function useActivateAccount(options = {}) {
  return useMutation({
    mutationKey: ['users', 'activate'],
    mutationFn: (payload) => activateAccount(payload),
    ...options,
  })
}
