<template>
  <div id="layout" class="layout">
    <Header />
    <div class="view">
      <Tags v-if="isTags" />
      <PostList v-else-if="isPostList" />
      <Post v-else :key="route.path" />
    </div>
    <FooterBar />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import Header from "../components/Header.vue";
import FooterBar from '../components/FooterBar.vue';

import PostList from "../view/PostList.vue";
import Tags from "../view/Tags.vue";
import Post from "../view/Post.vue";

const { theme } = useData()
const navlink = computed(() => theme.value.navbar.map(nav => nav.link))
const route = useRoute()
const isTags = computed(() => ['/tags/', '/categories/'].includes(route.path))
const isPostList = computed(() => !route.path.endsWith('.html'))
// console.log(route.path, isTags.value, isPostList.value, navlink);

</script>
