<template>
  <div class="list-view">
    <div v-if="posts.length === 0" class="list-empty">唉! 这里空无一物...</div>
    <ol v-else class="list">
      <li v-for="post of posts" :key="post.title" class="list-item">
        <span @click="go(post.href)" class="item-title">{{ post.title }}</span>
        <!-- <TimeAgo :date="post.date" class="item-date" /> -->
        <br />
        <time
          class="item-date"
          :datetime="post.date.pubdate"
          :title="post.date.pubdate"
          pubdate="pubdate"
        >{{ post.date.timeago }}</time>
        <div class="item-excerpt markdown-body" v-html="post.excerpt"></div>
      </li>
    </ol>
  </div>
</template>

<script setup>
// import Timeago from './TimeAgo.vue'
import posts from '../metadata.json'
import { useRouter } from 'vitepress'
const router = useRouter()
const { go } = router
</script>