import { reactive } from 'vue'

const state = reactive({
  allTodos: []
})

export default state

export function setTodo (todos) {
  state.allTodos = [...todos, ...state.allTodos]
}

export function deleteTodo (id) {
  state.allTodos = state.allTodos.filter(t => t.fake_id !== id)
}

export function cleanTodos () {
  state.allTodos = []
}
