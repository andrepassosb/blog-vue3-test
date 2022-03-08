import { requestApi } from '.'

export default () => ({
  getAllTodos: () => {
    const url = '/todos'
    const response = requestApi(url, 'get')

    return response
  },
  createTodos: (data) => {
    const url = '/todos'
    const response = requestApi(url, 'post', data)

    return response
  },
  getUserTodo: (UserID) => {
    const url = `/users/${UserID}/todos/`
    const response = requestApi(url, 'get')

    return response
  },
  updateTodo: (todoID, data) => {
    const url = `/todos/${todoID}/`
    const response = requestApi(url, 'put', data)

    return response
  },
  deleteTodo: (todoID) => {
    const url = `/todos/${todoID}/`
    const response = requestApi(url, 'delete')

    return response
  }
})
