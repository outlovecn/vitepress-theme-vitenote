<template>
  <div v-if="navbar" class="navbar">
    <a v-for="(nav, i) in navbar" :key="i" :href="nav.link" class="navbar-item">{{ nav.name }}</a>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
const { theme } = useData()
const navbar = theme.value.navbar || null
</script>