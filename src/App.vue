<!--
 * @Description: App界面，包含一些全局样式设置
 * @Author: Mo Xu
 * @Date: 15/4/2022
-->
<template>
  <el-config-provider :locale="locale" >
    <router-view/>
  </el-config-provider>
</template>

<script setup>
import {ElMessage} from 'element-plus'
import {useStore} from 'vuex'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'
import axios from './request'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const {t} = useI18n()
const store = useStore()
const router = useRouter()
const locale = zhCn

// 判断用户登录状态
const token = store.getters.getAuth
if (token !== null && token !== '') {
  // 检查用户token是否过期
  axios.get('/user/getUserByToken', {
    params: {
      token: token
    }
  }).then((res) => {
    if (res.data.data === 'Token is expired') {
      localStorage.auth = undefined
      store.commit('setAuth', '')

      // 弹出提示信息
      ElMessage.error({
        showClose: true,
        message: t('pleaseLoginAgain')
      })

      // 返回主页
      router.push('/')
    }
  })
}

// 判断用户是否移动端登录
const isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
store.commit('setIsMobile', isMobile)
</script>

<style>
#app,
input,
.button,
.halfButton,
.message,
.sendButton,
.dialog,
.registerButton,
.rightButton,
.verifyButton,
.confirmButton,
.cropButton,
.changePasswordButton,
.content,
.carCardButton,
.backToBtn,
.starBtn,
.verifyInfo,
.oneButton {
  font-family: DreamHan, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  /*overflow-y: hidden;*/
}

/* 取消用户信息下拉菜单的最小宽度限制，自适应宽度，此样式只能在全局样式中修改 */
.el-menu--popup {
  min-width: 5vw !important;
}

</style>
