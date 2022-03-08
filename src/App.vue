<template>
  <router-view :loadingHome="state.loadingHome"/>
  <NavBar v-if="state.hasUserId"/>
  <LoginBar v-else/>
</template>
<script>
import { onBeforeMount, reactive, watch } from 'vue'
import NavBar from './components/Molecules/NavBar'
import LoginBar from './components/Molecules/LoginBar'
import { useRoute } from 'vue-router'
import { setPosts } from '@/store/posts'
import { setUser } from '@/store/users'
import { setComments } from '@/store/comments'
import services from '@/services'
import useStore from '@/hooks/useStore'

export default {
  components: {
    NavBar,
    LoginBar
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      hasUserId: !!localStorage.getItem('UserId'),
      loadingHome: false
    })
    watch(() => route.path, async () => {
      state.hasUserId = !!localStorage.getItem('UserId')
    })

    onBeforeMount(async () => {
      state.loadingHome = true
      if (store.Posts.allposts.length === 0) {
        const { data: allPosts } = await services.posts.getAllPosts()
        setPosts(allPosts)
      }
      if (!store.Users.users || Object.keys(store.Users.users).length === 0) {
        const { data } = await services.users.getAllUsers()
        data.forEach(user => {
          setUser(user.id, user)
        })
      }
      if (store.Comments.allComments.length === 0) {
        const { data: allComments } = await services.comments.getAllComments()
        setComments(allComments)
      }
      state.loadingHome = false
    })
    return {
      state
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 600px;
  margin: auto;
  border: 1px solid rgb(239, 243, 244);
}

.border-botton-gray{
    border-bottom: 1px solid rgb(239, 243, 244);
}
.flex-basis-0{
  flex-basis: 0px;
}
.btn.btn-primary{
  background-color: rgb(29, 155, 240);
  border-color: rgba(255, 255, 255, 0.5);
}
.btn.btn-primary:hover{
  background-color: rgb(68, 169, 236);
  border-color: rgba(255, 255, 255, 0.5);
}
.btn.btn-secondary{
  background-color: rgb(239, 243, 244);
  color:black;
  border-color: rgba(255, 255, 255, 0.5);
}
.btn.btn-secondary:hover{
  border-color: rgba(255, 255, 255, 0.3);
  background-color: rgb(215, 219, 220);
  color:#000
}
</style>
