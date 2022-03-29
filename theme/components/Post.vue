<template>
  <div class="post-view">
    <div class="post-head" v-if="isRealPage">
      <h1 class="post-title">{{ title }}</h1>
      <span class="post-tags" v-for="(tag, i) in tags" :key="i">{{ tag }}</span>
      <span class="post-passed" v-if="passed"> {{ passed }} </span>
    </div>
    <div class="post-main markdown-body">
      <Content />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress';
import { formatTime } from '../utils/index.js'

const { page, lang } = useData()
const route = useRoute()

const updateTime = page.value.frontmatter.updated || page.value.frontmatter.date
const passed = formatTime(updateTime, lang.value)
console.log(useData(), updateTime)

const isRealPage = computed(() => { return route.data && route.data.relativePath })
const title = computed(() => { return page.value.frontmatter.title || page.value.relativePath.split(/\/|.md/).slice(-2)[0] })
const tags = computed(() => { return page.value.frontmatter.tags || page.value.relativePath.split(/\/|.md/).slice(1, -2)})
</script>
