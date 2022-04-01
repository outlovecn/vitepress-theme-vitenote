<template>
  <div class="viewmain">
    <div v-if="titles.length === 0" class="list-empty">唉! 这里空无一物...</div>
    <div v-else class="list-title">
      <span v-for="(item, i) of titles" :key="i" @click="gotoTags(item)">{{ item }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vitepress'
import { computed } from 'vue'
import { data as tagsAndCategories } from '../tags.data'

const { go, route } = useRouter()
// currentRoute.value will be 'tags' or 'categories'
const currentRoute = computed(() => route.path.split('/')[1])

// titles is a list of the current route
const titles = computed(() => tagsAndCategories[currentRoute.value])
const gotoTags = tag => go(`/${currentRoute.value}/${tag}/`)

</script>