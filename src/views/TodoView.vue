<template>
  <div class="TodoView">
    <div class="page-title d-flex">
      <h2 class="my-auto">To-dos (coisas a fazer)</h2>
    </div>
    <button
      @click="addItem"
      :disabled="state.loading"
      class="btn btn-primary rounded-pill"
      >
        <div class="spinner-border text-light"
          v-if="state.loading"
          role="status">
        </div>
        Adicionar Item
      </button>
        <ItemTodo
          v-for="(item, index) in store.Todos.allTodos" :key="item.fake_id"
          :item="item"
          :index="index"
        />
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, onBeforeMount } from 'vue'
import ItemTodo from '@/components/Molecules/ItemTodo.vue'
import useStore from '@/hooks/useStore'
import services from '@/services'
import { setTodo, cleanTodos } from '@/store/todos'

export default {
  name: 'TodoView',
  components: {
    ItemTodo
  },
  setup () {
    const store = useStore()
    const state = reactive({
      userID: localStorage.getItem('UserId'),
      itemsTodo: []
    })

    onBeforeMount(async () => {
      cleanTodos()
      const { data } = await services.todos.getUserTodo(state.userID)
      if (data) {
        const todos = data.map((e) => {
          e.fake_id = Math.floor(Math.random() * Date.now())
          return e
        })
        setTodo(todos)
      }
    })

    async function addItem () {
      const item = {
        fake_id: Math.floor(Math.random() * Date.now()),
        id: '',
        user_id: state.userID,
        title: '',
        due_on: null,
        status: 'pending',
        edit: true
      }
      // const { data } = await services.todos.createTodos(item)
      setTodo([item])
    }

    // function removeItem (e) {
    //   // state.itemsTodo.forEach((element, index) => {
    //   //   console.log(index, element)
    //   //   if (element.id === e) state.itemsTodo.splice(index, 1)
    //   // })
    //   console.log(state.itemsTodo)
    //   console.log('removeItem', e)
    //   state.itemsTodo.splice(e, 1)
    //   console.log(state.itemsTodo)
    // }

    return {
      store,
      state,
      addItem
    }
  }
}
</script>

<style>
.TodoView{
  margin-bottom: 55px;
  min-height: 100vh;
}
.page-title{
  padding-left: 16px;
  padding-right: 16px;
  height: 53px;
}
.page-title h2{
  font-weight: 700;
  font-size: 1.25rem;
  text-align: left;
}
</style>
