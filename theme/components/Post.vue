<template>
  <div class="post-view">
    <div class="post-head" v-if="isRealPage">
      <h1 class="post-title">{{ page.title }}</h1>
    </div>
    <div class="post-main markdown-body">
      <Content />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress';
const { page } = useData()
const route = useRoute();

// 处理404页page数据旧数据的bug
// vitepress 计划在 1.0 的版本修复这个bug
const isRealPage = computed(() => {
  return route.data && route.data.relativePath.slice(0, -3) === decodeURI(route.path).slice(1, -5)
})

</script>
