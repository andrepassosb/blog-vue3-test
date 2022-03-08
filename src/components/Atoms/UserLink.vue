<template>
    <div class="user-link mb-1" v-if="name">
        <a class="me-1" :href="`/user/${userID}`">
            <span class="user-link_name">{{ name }}</span>
            <span class="user-link_nickname">@{{ nickName }}</span>
        </a>
    </div>
    <div class="user-link mb-1" v-else>
      <span class="user-link_nickname">usúario indefinido</span>
    </div>
</template>
<script>
import { computed } from 'vue'
import useStore from '@/hooks/useStore'

export default {
  name: 'UserLink',
  props: {
    userID: {
      default: 0,
      type: Number
    }
  },
  setup (props) {
    const store = useStore()

    const name = computed(() => {
      if (store.Users.users[props.userID]) {
        return store.Users.users[props.userID].name
      } else {
        return false
      }
    })
    const nickName = computed(() => {
      if (store.Users.users[props.userID]) {
        return store.Users.users[props.userID].email.split('@')[0]
      } else {
        return false
      }
    })

    return {
      store,
      name,
      nickName
    }
  }
}
</script>

<style>
.user-link{
    text-align: left;
}
.user-link a{
    text-decoration: none;
}
.user-link_name{
    display: inline-block;
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
.PostView .user-link a{
    display: flex;
    flex-direction: column;
}
</style>
