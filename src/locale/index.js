/**
 * @Description: i18n语言国际化配置文件
 * @Author: Mo Xu
 * @Date: 15/4/2022
 */
import {createI18n} from 'vue-i18n'
import zhCN from './lang/zh'
import enUS from './lang/en'

const i18n = createI18n({
  locale: 'zh-CN',
  globalInjection: true,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  },
})

export default i18n
