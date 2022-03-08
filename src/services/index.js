import axios from 'axios'
import UsersService from './users'
import PostService from './posts'
import CommentService from './comments'
import TodosService from './todos'

const baseURL = 'https://gorest.co.in/public/v2'

export async function requestApi (url, type, data = '') {
  const token = '14a5d9fea25fdf56328a2da0b64bda5533c6cab12449530d18a7fa65c10c0670'
  const response = await new Promise(resolve => {
    axios({
      method: type,
      url: baseURL + url,
      data: data,
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      resolve(error)
    })
  })
  return responseData(response)
}

function responseData (response) {
  let menssage = null
  if (!response.data) {
    menssage = {
      status: response.request.status,
      statusText: response.request.statusText
    }
  }
  return {
    data: response.data,
    menssage
  }
}

export default {
  users: UsersService(),
  posts: PostService(),
  comments: CommentService(),
  todos: TodosService()
}
