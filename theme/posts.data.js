const fs = require('fs')
const rd = require('rd')
const path = require('path')
const matter = require('gray-matter')
const { format } = require('timeago.js')
const { createMarkdownRenderer } = require('vitepress')
const md = createMarkdownRenderer()
const lang = 'zh-CN'
const postPath = 'posts'
let rootPath = path.resolve(process.cwd(), postPath)
// console.log(rootPath)
module.exports = {
  watch: rootPath,
  load() {
    // console.log(process.cwd())
    var files = rd.readFileSync(rootPath, /\.md$/)
    return files
      .map(file => getPost(file))
      .sort((a, b) => b.date.time - a.date.time)
  },
}

const cache = new Map()

function getPost(fullPath) {
  const timestamp = fs.statSync(fullPath).mtimeMs

  const cached = cache.get(fullPath)
  if (cached && timestamp === cached.timestamp) {
    return cached.post
  }

  const src = fs.readFileSync(fullPath, 'utf-8')
  const { data, excerpt: excerptRaw } = matter(src, { excerpt: firstFourLines })
  const dateraw = checkDateisOK(data.date) ? data.date : new Date()
  const pubdate = formatDate(dateraw)
  const { categoryPath, categories } = getTypePath(fullPath)
  const filename = path.basename(fullPath, '.md')

  // console.log(categories)

  const { title, tags } = data
  const href = `/posts${categoryPath}/${filename}`
  const date = {
    time: +pubdate,
    pubdate: pubdate.toLocaleString(),
    timeago: formatTime(pubdate, lang),
  }
  const excerpt = md.render(excerptRaw).html
  const post = {
    title,
    href,
    date,
    excerpt,
    tags,
    categories,
  }

  cache.set(fullPath, {
    timestamp,
    post,
  })
  return post
}

function formatDate(strDate) {
  var timeoffset = new Date().getTimezoneOffset() * 60 * 1000
  return new Date(+new Date(strDate) + timeoffset)
}
function formatTime(str, lang) {
  const locale = lang === 'zh-CN' ? 'zh_CN' : 'en_US'
  return format(new Date(str), locale)
}
function checkDateisOK(strDate) {
  return !isNaN(+new Date(strDate))
}
function firstFourLines(file, options) {
  file.excerpt = file.content.split('\n').slice(0, 4).join('\n')
}
function getTypePath(fullPath) {
  const lastpath = fullPath.split(path.join(postPath, path.sep))[1]
  // 转换路径分隔符为网址所需的‘/’
  const transpath = path.dirname(lastpath).replace(path.sep, '/')
  return {
    categories: transpath === '.' ? [] : transpath.split('/'),
    categoryPath: transpath === '.' ? '' : `/${transpath}`,
  }
}
