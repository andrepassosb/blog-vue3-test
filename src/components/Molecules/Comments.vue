<template>
    <div class="Comments border-botton-gray d-flex py-3">
        <Avatar  :userID="+commentUserID"/>
        <div class="flex-grow-1 flex-basis-0">
            <div class="user-link mb-1">
                <div class="me-1" >
                    <span class="user-link_name">{{comment.name}}</span>
                    <span class="user-link_nickname"> @{{comment.email.split('@')[0]}}</span>
                </div>
            </div>
            <div class="commnents-text">
                <p class="mb-1">{{ comment.body }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Atoms/Avatar.vue'
import store from '@/store'
import { computed, reactive } from '@vue/runtime-core'

export default {
  name: 'CommentsPost',
  components: {
    Avatar
  },
  props: {
    comment: {
      type: Object
    }
  },
  setup (props) {
    const state = reactive({
      userID: ''
    })
    const commentUserID = computed(() => {
      Object.keys(store.Users.users).forEach((e) => {
        if (store.Users.users[e].email === props.comment.email) {
          state.userID = store.Users.users[e].id
        }
      })
      return state.userID || false
    })

    return {
      commentUserID
    }
  }
}
</script>

<style >
.commnents-text{
    color: rgb(15, 20, 25);
    font-size: 1rem;
    text-align: left;
    line-height: 20px;
}
.Comments{

}
</style>
