Scaffolding Your Vitepress Project

> [build a basic VitePress documentation site from ground up](https://vitepress.vuejs.org/)


Using the Custom Theme

With NPM:
```
npm i vitepress-theme-vitenote
```
With Yarn:
```
yarn add vitepress-theme-vitenote
```

import and re-export it from the custom theme entry:

```
// .vitepress/theme/index.js
import Theme from 'vitepress-theme-vitenote'
export default Theme
```

customize your site

```
// .vitepress/config.js
import { defineConfig } from 'vitepress'
export default defineConfig({
  base: '/',
  lang: 'zh-CN',
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