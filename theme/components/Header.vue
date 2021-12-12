<template>
  <header class="header">
    <a href="/" :title="description" class="site-title">{{ title }}</a>
    <div style="clear: both" />
    <NavBar />
  </header>
</template>

<script setup>
import NavBar from './NavBar.vue';
import { useData } from 'vitepress'
const { site } = useData()
const { title, description } = site.value
</script>