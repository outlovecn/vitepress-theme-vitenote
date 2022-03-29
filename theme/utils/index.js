import * as timeago from 'timeago.js'

const zh_CN = {
  updateTime: '文档更新: ',
  nodate: '日期不详',
  404: '空文档'
}
const en_US = {
  updateTime: 'Document update: ',
  nodate: 'No Date',
  404: 'Empty Document' 
}

export const Maps = { zh_CN, en_US }

export function getText(str, lang) {
  const locale = lang === 'zh-CN' ? 'zh_CN' : 'en_US'
  return Maps[locale][str]
}

export function formatTime(str, lang) {
  const locale = lang === 'zh-CN' ? 'zh_CN' : 'en_US'
  const { nodate, updateTime } = Maps[locale]
  return updateTime + (str ? timeago.format(new Date(str), locale) : nodate)
}
