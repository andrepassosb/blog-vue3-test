import { reactive } from 'vue'

const state = reactive({
  allposts: []
})

export default state

export function setPosts (posts) {
  state.allposts = [...posts, ...state.allposts]
}
