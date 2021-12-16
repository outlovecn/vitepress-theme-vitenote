<template>
  <div class="list-view">
    <div v-if="filterPosts.length === 0" class="list-empty">唉! 这里空无一物...</div>
    <ol v-else class="list">
      <li v-for="post of filterPosts" :key="post.title" class="list-item" @click="go(post.href)">
        <span class="item-title">{{ post.title }}</span>
        <br />
        <div>
          <time
            class="item-date"
            :datetime="post.date.pubdate"
            :title="post.date.pubdate"
            pubdate="pubdate"
          >{{ post.date.timeago }}</time>
          <span class="item-category" v-for="(c, i) in post.categories" :key="i">{{ c }} ></span>
          <span class="item-tags" v-for="(t, ti) in post.tags" :key="ti">{{ t }}</span>
        </div>
        <div class="item-excerpt markdown-body" v-html="post.excerpt"></div>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { useRouter, useData, useRoute } from 'vitepress'
const router = useRouter()
import { data as posts } from '../posts.data'
import { computed } from 'vue'

const { theme } = useData()
const route = useRoute()
const routepath = computed(() => decodeURI(route.path.replace(/.html$/, '').replace(/index$/, '')))
const key = computed(() => routepath.value.split('/')[1])
const tag = computed(() => routepath.value.split('/')[2])
console.log(routepath.value);
const filterPosts = computed(() => {
  if (tag.value) return posts.filter(post => post[key.value].includes(tag.value))
  else return posts
})

const { go } = router
</script>