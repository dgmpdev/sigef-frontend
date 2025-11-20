import { useQuery } from '@tanstack/react-query'
import { getVisibleUsers } from '../../api/users.api'

export default function useVisibleUsers(options = {}) {
  return useQuery({
    queryKey: ['users', 'visible'],
    queryFn: getVisibleUsers,
    ...options,
  })
}
