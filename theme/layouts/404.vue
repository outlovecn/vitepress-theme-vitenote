<template>
  <div id="404">
    <div class="layout-404">
      <h1>404</h1>
      <p>{{getText(404, lang)}}</p>
      <!-- <a href="/">返回首页</a> -->
    </div>
  </div>
</template>

<script setup>

import { useData } from 'vitepress';
import { getText } from '../utils/index.js'
const { lang } = useData()
</script>
