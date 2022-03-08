
<template>
    <div class="box-avatar">
      <div class="position-relative">
        <img class="w-100 rounded-circle" :src="avatarImage" alt="">
        <div class="status-container">
          <div :class="`status ${statusUser ? statusUser : 'inactive'}`"></div>
        </div>
      </div>
    </div>
</template>

<script>
import useStore from '@/hooks/useStore'
import { computed } from '@vue/runtime-core'

export default {
  name: 'AvatarIcon',
  props: {
    userID: {
      type: Number
    }
  },
  setup (props) {
    const store = useStore()
    const avatarImage = `https://avatars.dicebear.com/api/bottts/:${props.userID ? props.userID : Math.floor(Math.random() * 100)}.png`

    const statusUser = computed(() => {
      if (store.Users.users[props.userID]) {
        return store.Users.users[props.userID].status
      }
      return ''
    })

    return {
      store,
      statusUser,
      avatarImage
    }
  }
}
</script>

<style>
.box-avatar{
    width: 50px;
    margin-right: 10px;
}
.status-container{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 3px;
    border-radius: 50%;
    background-color: #fff;
}
.status{
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
.status.active{
      background-color:  #50bb50;
}
.status.inactive{
      background-color:  #8b8b8b;
}
</style>
