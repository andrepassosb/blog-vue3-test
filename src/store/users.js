import { reactive } from 'vue'

const state = reactive({
  users: {}
})

export default state

export function setUser (userId, usersInfo) {
  state.users[userId] = usersInfo
}

export function setStatus (userId, status) {
  state.users[userId].status = status
}
