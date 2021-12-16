<template>
  <div id="layout" class="layout">
    <Header />
    <div class="view">
      <Tags v-if="isTags" />
      <PostList v-else-if="isPostList" />
      <Post v-else />
    </div>
    <FooterBar />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import Header from "../components/Header.vue";
import PostList from "../components/PostList.vue";
import Tags from "../components/Tags.vue";
import Post from "../components/Post.vue";
import FooterBar from '../components/FooterBar.vue';

const route = useRoute()
const routepath = computed(() => route.path.replace(/.html$/, '').replace(/index$/, ''))
console.log(routepath);
const isTags = computed(() => ['/tags/', '/categories/'].includes(routepath.value))
const isPostList = computed(() => {
  switch (routepath.value.split('/')[1]) {
    case '':
    case 'tags':
    case 'categories':
      return true
    default:
      return false
  }
})

</script>
