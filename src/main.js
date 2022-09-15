/**
 * @Description: 前端程序的主入口
 * @Author: Mo Xu
 * @Date: 15/4/2022
 */
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locale'
import './assets/font/fonts.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// // 设置标签页标题
// router.beforeEach((to) => {
//     document.title = to.meta.title || '简单买卖'
// })

app.use(i18n).use(store).use(router).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
