import { requestApi } from '.'

export default () => ({
  getAllUsers: () => {
    const url = '/users'
    const response = requestApi(url, 'get')

    return response
  },
  createUser: (data) => {
    const url = '/users'
    const response = requestApi(url, 'post', data)

    return response
  },
  getUser: (userId) => {
    const url = `/users/${userId}`
    const response = requestApi(url, 'get')

    return response
  },
  updateUser: (userId, data) => {
    const url = `/users/${userId}`
    const response = requestApi(url, 'put', data)

    return response
  },
  deleteUser: (userId) => {
    const url = `/users/${userId}`
    const response = requestApi(url, 'delete')

    return response
  }
})
