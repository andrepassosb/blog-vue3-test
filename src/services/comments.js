import { requestApi } from '.'

export default () => ({
  getAllComments: () => {
    const url = '/comments'
    const response = requestApi(url, 'get')

    return response
  },
  createComment: (data) => {
    const url = '/comments'
    const response = requestApi(url, 'post', data)

    return response
  },
  getComment: (commentId) => {
    const url = `/comments/${commentId}`
    const response = requestApi(url, 'get')

    return response
  },
  updateComment: (commentId, data) => {
    const url = `/comments/${commentId}`
    const response = requestApi(url, 'put', data)

    return response
  },
  deleteComment: (commentId) => {
    const url = `/comments/${commentId}`
    const response = requestApi(url, 'delete')

    return response
  }
})
