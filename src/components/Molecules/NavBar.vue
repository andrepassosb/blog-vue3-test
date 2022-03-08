<template>
    <nav class="d-flex flex-row nav-bar_app">
    <router-link to="/">
      <div class="box-link">
        <div class="box-link_home" ></div>
      </div>
    </router-link>
    <router-link to="/todo">
      <div class="box-link">
        <div class="box-link_todo" ></div>
      </div>
    </router-link>
    <router-link to="/profile">
      <div class="box-link">
        <div class="box-link_profile" ></div>
      </div>
    </router-link>
    <div class="dropdown">
    <div class="box-link nav" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <div class="box-link_more" ></div>
    </div>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <!-- <select class="dropdown-item" name="status" id="status">
          <option value="">Ativo</option>
          <option value="">Inativo</option>
        </select> -->
        <li class="dropdown-item pe-3 d-flex align-items-center justify-content-between">
          <label for="status">Status:</label>
          <input type="checkbox" checked v-model="state.checkbox">
        </li>
      <li><div class="dropdown-item" @click="logout()">Sair</div></li>
    </ul>
  </div>
  </nav>
</template>
<script>
import useStore from '@/hooks/useStore'
import { reactive, watch } from '@vue/runtime-core'
import { setStatus } from '@/store/users'
import services from '@/services'

export default {
  setup () {
    const store = useStore()

    const state = reactive({
      userID: localStorage.getItem('UserId'),
      checkbox: false
    })

    watch(() => store.Users.users[state.userID], async () => {
      state.checkbox = store.Users.users[state.userID].status === 'active'
    })

    function logout () {
      localStorage.clear()
      location.reload()
    }

    watch(() => state.checkbox, async () => {
      if (state.checkbox) {
        setStatus(state.userID, 'active')
        services.users.updateUser(state.userID, { status: 'active' })
      } else {
        setStatus(state.userID, 'inactive')
        services.users.updateUser(state.userID, { status: 'inactive' })
      }
    })

    return {
      logout,
      state
    }
  }
}
</script>
<style>
nav {
  max-width: 600px;
  height: 3.5rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  border: 1px solid rgb(239, 243, 244);
  z-index: 5;
  transform: translateX(-1px);
}
.nav-bar_app{
  background-color: #fff;
}

nav a {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.dropdown{
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.dropdown-item{
  cursor: pointer;
}

nav :not(.router-link-exact-active) .box-link:hover{
  background-color: rgba(15, 20, 25, 0.1);
  border-radius: 50%;
}

nav .box-link{
  padding: 10px
}

.box-link_home{
  padding: 15px;
  background: black;
  -webkit-mask: url(@/assets/icons/home.svg) no-repeat center;
  mask: url(@/assets/icons/home.svg) no-repeat center;
}

nav .router-link-exact-active .box-link_home  {
  padding: 15px;
  background: black;
  -webkit-mask: url(@/assets/icons/home-focus.svg) no-repeat center;
  mask: url(@/assets/icons/home-focus.svg) no-repeat center;
}

.box-link_todo{
  padding: 15px;
  background: black;
  -webkit-mask: url(@/assets/icons/todo.svg) no-repeat center;
  mask: url(@/assets/icons/todo.svg) no-repeat center;
}

nav .router-link-exact-active .box-link_todo  {
  padding: 15px;
  background: black;
  -webkit-mask: url(@/assets/icons/todo-focus.svg) no-repeat center;
  mask: url(@/assets/icons/todo-focus.svg) no-repeat center;
}

.box-link_profile{
  padding: 15px;
  background: black;
  -webkit-mask: url(@/assets/icons/profile.svg) no-repeat center;
  mask: url(@/assets/icons/profile.svg) no-repeat center;
}

nav .router-link-exact-active .box-link_profile  {
  padding: 15px;
  background: black;
  -webkit-mask: url(@/assets/icons/profile-focus.svg) no-repeat center;
  mask: url(@/assets/icons/profile-focus.svg) no-repeat center;
}

.box-link_more{
  padding: 15px;
  background: black;
  -webkit-mask: url(@/assets/icons/more.svg) no-repeat center;
  mask: url(@/assets/icons/more.svg) no-repeat center;
}
</style>

<style scoped>
@import url(https://use.fontawesome.com/releases/v5.12.0/css/all.css);

input[type='checkbox'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-tap-highlight-color: transparent;
  height: 28px;
  width: 46px;
  border-radius: 1rem;
  outline: none;
  display: inline-block;
  position: relative;
  cursor: pointer;
  background: #ccc;
  transition: all 0.2s ease;
  box-shadow: 0 .1rem .3rem 0 #ccc;
}
input[type='checkbox']:after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 .1rem .3rem 0 #ccc;
  transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
}
input[type='checkbox']:checked { background: #43bf43; }
input[type='checkbox']:checked:after { transform: translatex(18px); }

</style>
