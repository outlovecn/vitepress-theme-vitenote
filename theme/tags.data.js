const fs = require('fs')
const rd = require('rd')
const path = require('path')
const matter = require('gray-matter')

const postPath = 'posts'
let rootPath = path.resolve(process.cwd(), postPath)
module.exports = {
  watch: rootPath,
  load() {
    var files = rd.readFileSync(rootPath, /\.md$/)
    files.map(file => getPost(file))
    return {
      tags: [...tagsCache],
      categories: [...categoriesCache],
    }
  },
}

const cache = new Map()
const tagsCache = new Set()
const categoriesCache = new Set()

function getPost(fullPath) {
  const timestamp = fs.statSync(fullPath).mtimeMs

  const cached = cache.get(fullPath)
  if (cached && timestamp === cached.timestamp) {
    return
  }

  const src = fs.readFileSync(fullPath, 'utf-8')
  const { data } = matter(src, { excerpt: true })
  const { tags = [] } = data
  const { categories = [] } = getTypePath(fullPath)

  const addToCache = (arr, map) => arr.map(i => map.add(i))

  addToCache(tags, tagsCache)
  addToCache(categories, categoriesCache)

  cache.set(fullPath, {
    timestamp,
  })
}

function getTypePath(fullPath) {
  const lastpath = fullPath.split(path.join(postPath, path.sep))[1]
  // 转换路径分隔符为网址所需的‘/’
  const transpath = path.dirname(lastpath).replace(path.sep, '/')
  return {
    categories: transpath === '.' ? [] : transpath.split('/'),
  }
}
