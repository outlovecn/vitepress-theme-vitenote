const fs = require('fs')
const rd = require('rd')
const path = require('path')
const matter = require('gray-matter')

const { createMarkdownRenderer } = require('vitepress')
const md = createMarkdownRenderer()
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
  const { data, excerpt: excerptRaw } = matter(src, { excerpt: getExcerpt })
  const pubdate = formatDate(data.date)
  const { hrefPath, categories, filename } = getPath(fullPath)
  
  const { title = filename, tags = [] } = data
  const href = `/posts${hrefPath}`
  
  const excerpt = md.render(excerptRaw).html
  const post = {
    date: +pubdate,
    title,
    href,
    excerpt,
    tags,
    categories,
  }
  // console.log(post)

  cache.set(fullPath, {
    timestamp,
    post,
  })
  return post
}

function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  date.setUTCHours(12)
  return +date
}

function getExcerpt(file, options) {
  file.excerpt = file.content.split('\n').slice(0, 4).join('\n')
}
function getPath(fullPath) {
  // 获得相对路径作为链接地址
  const hrefPath = fullPath.split(postPath)[1].replace(/\.md$/, '.html')
  // 收集postPath下的路径文件夹作为分类，支持多级目录
  const categories = path.dirname(hrefPath).slice(1).split('/').reduce((t,c) => {
    return t.concat(c?c:[])
  },[])
  // 收集文件名
  const filename = path.basename(hrefPath, '.html')
  // console.log(fullPath,categories);
  return {
    categories,
    hrefPath,
    filename
  }
}
