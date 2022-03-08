import useStore from '../hooks/useStore'
import {
  setUser,
  setStatus
} from './users'

describe('UserStore', () => {
  it('should set current user', () => {
    const store = useStore()
    setUser(123, { name: 'andre', status: 'active' })
    expect(store.Users.users[123].name).toBe('andre')
    expect(store.Users.users[123].status).toBe('active')
  })

  it('should set status on current user', () => {
    const store = useStore()
    setStatus(123, 'inactive')
    expect(store.Users.users[123].status).toBe('inactive')
  })
})
