<template>
    <div class="post-text">
        <h3>{{ title }}</h3>
        <p class="mb-3">{{ body }}</p>
    </div>
</template>
<script>

export default {
  name: 'ContentPost',
  props: {
    title: {
      default: '',
      type: String
    },
    body: {
      default: '',
      type: String
    }
  }
}
</script>
<style>
.Post .post-text{
    color: rgb(15, 20, 25);
    font-size: 1rem;
    text-align: left;
    line-height: 20px;
}
.Post .post-text h3{
    font-weight: 700;
    font-size: 1.5rem;
    text-align: left;
    margin-top: 10px;
}
.PostView .post-text{
    color: rgb(15, 20, 25);
    font-size: 1.5rem;
    text-align: left;
    line-height: 28px;
}
.PostView .post-text h3{
    font-weight: 700;
    font-size: 2rem;
    text-align: left;
    margin-top: 10px;
}
</style>
