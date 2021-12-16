<template>
  <div class="post-view">
    <div class="post-head" v-if="isRealPage">
      <h1 class="post-title">{{ page.title }}</h1>
      <span class="post-tags" v-for="(tag, i) in page.frontmatter.tags" :key="i">{{ tag }}</span>
      <span class="post-passed">文档最后更新在 {{ passed }} 天前</span>
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

const updateTime = page.value.frontmatter.updated || page.value.frontmatter.date
const passed = parseInt((new Date() - new Date(updateTime)) / 1000 / 60 / 60 / 24);
// console.log(page, passed)

// 处理404页page数据旧数据的bug
// vitepress 计划在 1.0 的版本修复这个bug
const isRealPage = computed(() => {
  return route.data && route.data.relativePath.slice(0, -3) === decodeURI(route.path).slice(1, -5)
})

</script>
