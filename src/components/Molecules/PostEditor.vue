<template>
  <div class="PostEditor d-flex border-botton-gray mt-1 pb-3">
    <Avatar
    :userID="userID"/>
    <div
      class="flex-grow-1 flex-basis-0"
      v-if="checkActive === 'active'">
      <div class="py-3 border-botton-gray">
          <div class="border-botton-gray mb-3" v-if="type === 'Post'">
            <textarea
              placeholder="Escreva um título"
              name="edit-title"
              id="edit-tite"
              rows="1"
              v-model="state.title"
            ></textarea>
          </div>
          <textarea
            :placeholder="type === 'Post' ? 'O que está acontecendo?' : 'Deixe um comentário'"
            name="edit-post"
            id="edit-post"
            rows="1"
            v-model="state.post"
          ></textarea>
        </div>
      <div class="text-end my-2">
      <button
        :disabled="state.loading"
        class="btn btn-primary rounded-pill"
        @click="handlePublish">
          <div class="spinner-border text-light"
            v-if="state.loading"
            role="status">
          </div>
          {{ type === 'Post' ? 'Publicar' : 'Comentar' }}
      </button>
      </div>
    </div>
    <div v-else-if="checkActive === 'inactive'" class="my-auto">
      <h5 class="m-0 ps-2 fw-bold">Usúario Inativo</h5>
      <p class="m-0">Ative para publicar</p>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Atoms/Avatar.vue'
import { computed, onMounted, reactive } from '@vue/runtime-core'
import services from '@/services'
import { setPosts } from '@/store/posts'
import { setComments } from '@/store/comments'
import useStore from '@/hooks/useStore'
export default {
  name: 'PostEditor',
  components: {
    Avatar
  },
  props: {
    type: {
      type: String
    },
    userID: {
      type: Number
    },
    postID: {
      type: Number
    }
  },
  setup (props) {
    const store = useStore()

    const state = reactive({
      title: '',
      post: '',
      loading: false
    })

    onMounted(() => {
      const tx = document.getElementsByTagName('textarea')
      for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;')
        tx[i].addEventListener('input', OnInput, false)
      }

      function OnInput () {
        this.style.height = 'auto'
        this.style.height = (this.scrollHeight) + 'px'
      }
    })
    async function handlePublish () {
      state.loading = true
      if (props.type === 'Post') {
        if (state.title && state.post) {
          const data = {
            title: state.title,
            body: state.post,
            user_id: props.userID
          }
          const newPost = await services.posts.createPost(data)
          if (newPost.data) {
            state.title = ''
            state.post = ''
            setPosts([newPost.data])
          }
        }
      } else if (props.type === 'Comments') {
        if (state.post) {
          const data = {
            body: state.post,
            post_id: props.postID,
            user_id: props.userID,
            name: store.Users.users[props.userID].name,
            email: store.Users.users[props.userID].email
          }
          const newComment = await services.comments.createComment(data)
          if (newComment.data) {
            state.title = ''
            state.post = ''
            setComments([newComment.data])
          }
        }
      }
      state.loading = false
    }
    const checkActive = computed(() => {
      if (store.Users.users[props.userID]) {
        return store.Users.users[props.userID].status
      }
    })

    return {
      handlePublish,
      checkActive,
      state
    }
  }
}
</script>

<style scoped>
.PostEditor{
  padding-left: 16px;
  padding-right: 16px;
}
textarea{
  font-weight: 400;
  font-size: 1.25rem;
  width: 100%;
  margin: 0;
  padding: 0;
  border-width: 0;
  outline: none;
  resize: none
}
textarea:focus{
  border-width: 0;
}

.btn{
    font-size: 15px;
    font-weight: 700;
}
.spinner-border{
  width: 1rem;
  height: 1rem;
}
</style>
