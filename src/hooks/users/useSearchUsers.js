import { useQuery } from '@tanstack/react-query'
import { searchUsers } from '../../api/users.api'

// usage: const { data, ... } = useSearchUsers(params, options)
export default function useSearchUsers(params = {}, options = {}) {
  return useQuery({
    queryKey: ['users', 'search', params],
    queryFn: () => searchUsers(params),
    ...options,
  })
}
