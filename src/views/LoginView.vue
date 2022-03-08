<template>
  <form action @submit.prevent="handleLogin" class="LoginView">
    <div class="page-title d-flex">
      <h2 class="my-auto">Login</h2>
    </div>
    <div class="input-container">
      <div class="form-control text-start mb-4">
        <label class="position-absolute" for="userId">Usuário ID</label>
        <input type="text" v-model="state.userId" required>
      </div>
      <div class="form-control text-start mb-4">
        <label class="position-absolute" for="email" >Email</label>
        <input type="email" v-model="state.email" required>
      </div>
      <button
        type="submit"
        :disabled="state.loading"
        class="btn btn-primary rounded-pill mb-3"
        >
          <div class="spinner-border text-light"
            v-if="state.loading"
            role="status">
          </div>
          Log in
      </button>
      <template v-for="(error, index) in state.errors" :key="index">
        <p class="error">{{ error }}</p>
      </template>
    </div>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import services from '@/services'
import useStore from '@/hooks/useStore'
import { setUser } from '@/store/users'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  setup () {
    const store = useStore()
    const router = useRouter()

    const state = reactive({
      email: '',
      userId: '',
      errors: [],
      allUser: [],
      loading: false
    })
    async function handleLogin () {
      state.loading = true
      state.errors = []
      if (!store.Users.users || Object.keys(store.Users.users).length === 0) {
        const { data } = await services.users.getAllUsers()
        data.forEach(user => {
          setUser(user.id, user)
        })
      }
      if (!store.Users.users[state.userId]) {
        state.errors.push('Usuário ID não encontrado.')
      } else if (store.Users.users[state.userId].email !== state.email) {
        state.error = state.errors.push('E-mail não encontrado.')
      } else {
        localStorage.setItem('UserId', state.userId)
        router.push({ name: 'home' })
      }
      setTimeout(() => {
        state.loading = false
      }, 200)
    }

    return {
      state,
      handleLogin
    }
  }
}
</script>

<style>
.home{
  margin-bottom: 55px;
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
.input-container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 365px;
    align-items: center;
    margin: auto;
}
.form-control{
    display: flex;
    flex-direction: column;
}
input{
  padding-top: 20px;
  border: none
}
input:focus{
  outline: none;
}
label{
  font-size: 12px;
}
.input-container button.btn {
  font-weight: 700;
  width: 70%;
}
.error{
  color: #ef6a6a;
}
.spinner-border{
  width: 1rem;
  height: 1rem;
}
</style>
