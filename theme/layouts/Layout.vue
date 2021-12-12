<template>
  <div id="layout" class="layout">
    <Header />
    <div class="view">
      <Post v-if="isPost" />
      <List v-else />
    </div>
    <FooterBar />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import Header from "../components/Header.vue";
import List from "../components/List.vue";
import Post from "../components/Post.vue";
import FooterBar from '../components/FooterBar.vue';

const route = useRoute()
const isPost = computed(() => route.path.replace(/index.html$/, '') !== '/')
</script>
