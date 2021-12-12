import Layout from './layouts/Layout.vue'
import NotFound from './layouts/404.vue'

import './styles/index.styl'
import 'github-markdown-css'
import 'prismjs/themes/prism.css'
export default {
  Layout,
  NotFound, // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    // console.log(app, router, siteData);
    // app.component('TimeAgo', TimeAgo)
  },
}
