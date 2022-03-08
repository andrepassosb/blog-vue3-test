import { requestApi } from '.'

export default () => ({
  getAllPosts: () => {
    const url = '/posts'
    const response = requestApi(url, 'get')

    return response
  },
  createPost: (data) => {
    const url = '/posts'
    const response = requestApi(url, 'post', data)

    return response
  },
  getPost: (postId) => {
    const url = `/posts/${postId}`
    const response = requestApi(url, 'get')

    return response
  },
  updatePost: (postId, data) => {
    const url = `/posts/${postId}`
    const response = requestApi(url, 'put', data)

    return response
  },
  deletePost: (userId) => {
    const url = `/posts/${userId}`
    const response = requestApi(url, 'delete')

    return response
  }
})
