<template>
  <time :datetime="date.pubdate" :title="date.pubdate" pubdate="pubdate">{{ date.timeago }}</time>
</template>

<script setup>
const props = defineProps({
  date: {
    type: Object,
    default: () => { }
  },
})

// const { pubdate = '', timeago = '' } = props.date

// import { format } from 'timeago.js';
// import { useData } from 'vitepress';
// const props = defineProps({
//   lastUpdated: {
//     type: [String, Date, Number],
//     default: ''
//   },
// })
// function formatDate(date) {
//   return new Date(date).toLocaleString()
// }
// function formatTime(str, lang) {
//   if (!str) return format()
//   const locale = (lang === 'zh-CN') ? 'zh_CN' : 'en_US'
//   return format(new Date(str), locale)
// }
// const pubdate = formatDate(props.lastUpdated)
// const { lang } = useData()
// // console.log(lang.value);
// const timeago = formatTime(props.lastUpdated, lang.value)

</script>
