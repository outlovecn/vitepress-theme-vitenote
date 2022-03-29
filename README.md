![npm](https://img.shields.io/npm/v/vitepress-theme-vitenote/latest)
![GitHub package.json version](https://img.shields.io/github/package-json/v/outlovecn/vitepress-theme-vitenote)
![GitHub](https://img.shields.io/github/license/outlovecn/vitepress-theme-vitenote)

Scaffolding Your Vitepress Project | 搭建 Vitepress 项目的脚手架

> [build a basic VitePress documentation site from ground up](https://vitepress.vuejs.org/)

Using the Custom Theme | 使用此主题

With NPM:

```
npm i vitepress-theme-vitenote
```

With Yarn:

```
yarn add vitepress-theme-vitenote
```

import and re-export it from the custom theme entry: | 导入自定义主题，并重新导出它

```
// .vitepress/theme/index.js
import Theme from 'vitepress-theme-vitenote'
export default Theme
```

customize your site | 配置自定义主题

```
// .vitepress/config.js
import { defineConfig } from 'vitepress'
export default defineConfig({
  base: '/',
  <!-- lang: 'zh-CN', -->
  title: 'Is My Note',
  description: 'Just playing around.',
  themeConfig: {
    author: 'Chaos',
    navbar: [
      {
        name: '首页',
        link: '/',
      },
      {
        name: '标签',
        link: '/tags/',
      },
      {
        name: '分类',
        link: '/categories/',
      },
    ],
  },
  vite: {
    build: {
      minify: 'terser',
    },
  },
})
```
