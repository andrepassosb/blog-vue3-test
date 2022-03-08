<template>
    <div class="PostView border-botton-gray d-flex flex-column" v-if="post">
        <div class="d-flex align-items-center">
            <Avatar
                :userID="post.user_id"/>
            <UserLink
                :userID="post.user_id"/>
        </div>
        <div class="flex-grow-1 flex-basis-0">
            <ContentPost
                :title="post.title"
                :body="post.body"/>
            <CommentsCount
                :count="comments.length"/>
        </div>
    </div>
    <div class="mb-5">
        <PostEditor
            v-if="userID"
            :userID="+userID"
            :postID="+postId"
            type="Comments"/>
        <Comments
            v-for="comment in comments" :key="comment.id"
            :comment="comment"/>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import Avatar from '@/components/Atoms/Avatar.vue'
import UserLink from '@/components/Atoms/UserLink.vue'
import ContentPost from '@/components/Atoms/ContentPost.vue'
import CommentsCount from '@/components/Atoms/CommentsCount.vue'
import Comments from '@/components/Molecules/Comments.vue'
import PostEditor from '@/components/Molecules/PostEditor.vue'
import useStore from '@/hooks/useStore'
import { useRoute } from 'vue-router'

export default {
  name: 'PostView',
  components: {
    Avatar,
    ContentPost,
    Comments,
    CommentsCount,
    PostEditor,
    UserLink
  },
  setup () {
    const route = useRoute()
    const store = useStore()

    const userID = localStorage.getItem('UserId')

    const postId = route.params.postId

    const post = computed(() => {
      const findPost = store.Posts.allposts.find(e => e.id === +postId)
      if (findPost) return findPost
      else return false
    })
    const comments = computed(() => {
      const filterComments = store.Comments.allComments.filter(e => e.post_id === +postId)
      if (filterComments) return filterComments
      else return false
    })
    return {
      store,
      post,
      postId,
      userID,
      comments
    }
  }

}
</script>
<style>
.PostView{
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 12px;
}
svg{
    height: 24px;
}
svg path{
    fill: rgb(83, 100, 113);
}
.icons-container{
    height: 46px;
}
.icon-comments{
    padding: 8px;
    border-radius: 50rem;
    cursor: pointer;
    font-size: 0.75rem;
}
.icon-comments:hover{
    background-color: rgba(29, 155, 240, 0.1);
    color: rgb(29, 155, 240);
}
.icon-comments:hover path{
    fill: rgb(29, 155, 240);
}
.user-link{
    text-align: left;
}
.user-link a{
    text-decoration: none;
}
.user-link_name{
    font-weight: 700;
    text-decoration: none;
    color: #000;
    margin-right: 5px;
}
.user-link_nickname{
    font-weight: 400;
    text-decoration: none;
    color: rgb(83, 100, 113);
}

</style>
