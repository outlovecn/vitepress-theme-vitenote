<template>
  <div class="list-view">
    <div v-if="titles.length === 0" class="list-empty">唉! 这里空无一物...</div>
    <div v-else class="list-title">
      <span v-for="(item, i) of titles" :key="i" @click="gotoTags(item)">{{ item }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter, useData } from 'vitepress'
const router = useRouter()
import { data } from '../tags.data'
import { computed } from 'vue'

const route = useRoute()
const key = computed(() => route.path.split('/')[1])

// const { tags, categories } = data
const titles = computed(() => data[key.value])
const { go } = router
const gotoTags = tag => go(`/${key.value}/${tag}/`)

</script>