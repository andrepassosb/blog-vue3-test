import { reactive } from 'vue'

const state = reactive({
  allComments: []
})

export default state

export function setComments (comments) {
  state.allComments = [...comments, ...state.allComments]
}
