<template>
  <footer class="footer">
    <span>© {{ thisYear }}</span>
    <span v-if="author">·</span>
    <span>{{ author }}</span>
    <br />
    <!-- <span>生成器：</span> -->
    <a href="https://vitepress.vuejs.org/" rel="noopener" target="_blank">VitPress</a>
    <span>❤️</span>
    <!-- <span>主题：</span> -->
    <a
      href="https://github.com/outlovecn/vitepress-theme-vitenote"
      rel="noopener"
      target="_blank"
    >Vitenote</a>
  </footer>
</template>

<script setup>
import { useData } from 'vitepress';
const thisYear = new Date().getFullYear();
const author = useData().theme.value.author || ''
</script>
