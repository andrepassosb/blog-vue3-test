<template>
    <div
        class="Post border-botton-gray d-flex"
        @click="goPostPage()"
        >
        <Avatar
          :userID="userID"/>
        <div class="flex-grow-1 flex-basis-0">
            <UserLink
              :userID="userID"/>
            <ContentPost
              :title="title"
              :body="body"/>
            <CommentsCount
              :count="counterComments"/>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Atoms/Avatar.vue'
import UserLink from '@/components/Atoms/UserLink.vue'
import ContentPost from '@/components/Atoms/ContentPost.vue'
import CommentsCount from '@/components/Atoms/CommentsCount.vue'
import { useRouter } from 'vue-router'
import useStore from '@/hooks/useStore'
import { computed } from '@vue/runtime-core'

export default {
  name: 'PostVue',
  components: {
    Avatar,
    UserLink,
    ContentPost,
    CommentsCount
  },
  props: {
    title: {
      default: '',
      type: String
    },
    body: {
      default: '',
      type: String
    },
    postId: {
      default: 0,
      type: Number
    },
    userID: {
      type: Number
    }
  },
  setup (props) {
    const router = useRouter()
    const store = useStore()

    function goPostPage () {
      router.push({ name: 'post', params: { postId: props.postId } })
    }
    const counterComments = computed(() => {
      const filterComments = store.Comments.allComments.filter(e => e.post_id === +props.postId)
      if (filterComments) return filterComments.length
      else return false
    })
    return {
      goPostPage,
      counterComments
    }
  }
}
</script>
<style>
.Post{
    cursor: pointer;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 12px;
}
.Post:hover{
    background-color: rgba(0, 0, 0, 0.03);
}
</style>
