<template>
  <div class="home">
    <div class="page-title d-flex">
      <h2 class="my-auto">Página Inicial</h2>
    </div>
    <PostEditor
      v-if="state.userID"
      :userID="+state.userID"
      type="Post"/>
    <div class="spinner-border text-light mt-3"
      v-if="loadingHome"
      role="status">
    </div>
    <template v-else>
    <Post
      v-for="(post) in store.Posts.allposts" :key="post.id"
      :title="post.title"
      :body="post.body"
      :postId="post.id"
      :userID="post.user_id"
    />
    </template>
  </div>
</template>

<script>
import { reactive } from 'vue'
import PostEditor from '@/components/Molecules/PostEditor.vue'
import Post from '@/components/Molecules/Post.vue'
import useStore from '@/hooks/useStore'

export default {
  name: 'HomeView',
  components: {
    PostEditor,
    Post
  },
  props: {
    loadingHome: {
      type: Boolean
    }
  },
  setup (props) {
    const store = useStore()
    const state = reactive({
      userID: localStorage.getItem('UserId')
    })

    return {
      store,
      state
    }
  }
}
</script>

<style>
.home{
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
.home .spinner-border{
  color: rgb(29, 155, 240) !important;
}
</style>
