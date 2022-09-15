<!--
 * @Description: 顶部栏组件
 * @Author: Mo Xu
 * @Date: 15/4/2022
-->
<template>
  <!-- 横向菜单 -->
  <el-menu :default-active="activeIndex" class="topBar" mode="horizontal">
    <!-- 左侧Logo -->
    <el-image :src="logo" class="logo" fit="contain" @click="routerPush('/')"/>
    <!-- 主页选项 -->
    <el-menu-item class="firstMenuItem" index="/" @click="routerPush('/')">{{ $t("home") }}</el-menu-item>
    <!-- 购买选项 -->
    <el-menu-item class="secondMenuItem" index="buy" @click="routerPush('buy')">{{ $t("buy") }}</el-menu-item>
    <!-- 出售选项 -->
    <el-menu-item class="thirdMenuItem" index="sell" @click="routerPush('sell')">{{ $t("sell") }}</el-menu-item>

    <!--&lt;!&ndash; 更改语言选项，暂不启用 &ndash;&gt;-->
    <!--<el-sub-menu index="language" class="1">-->
    <!--  <template #title>{{ $t("language") }}</template>-->
    <!--  <el-menu-item class="language" @click="changeLanguage('zh-CN')">{{ $t("chinese") }}</el-menu-item>-->
    <!--  <el-menu-item class="language" @click="changeLanguage('en-US')">{{ $t("english") }}</el-menu-item>-->
    <!--</el-sub-menu>-->

    <!--&lt;!&ndash; 维权按钮 &ndash;&gt;-->
    <!--<el-button class="rightButton" @click="rightDialogVisible = true" plain type="danger">{{ $t("right") }}</el-button>-->
    <!--<el-dialog v-model="rightDialogVisible" :title="t('pleaseContactCustomerService')" width="38%">-->
    <!--  <p>{{ $t('rightContent') }}</p>-->
    <!--  <p>{{ $t('contactMethodsAre') }}</p>-->
    <!--  &lt;!&ndash;<p>{{ $t('wechatAccountIs') }}</p>&ndash;&gt;-->
    <!--  <p>{{ $t('phoneNumberIs') }}</p>-->
    <!--  <p>{{ $t('emailIs') }}</p>-->
    <!--</el-dialog>-->

    <!-- 维权按钮 -->
    <el-button class="rightButton" @click="rightDialogVisible = true" plain>{{ $t("contactUs") }}</el-button>
    <el-dialog v-model="rightDialogVisible" :title="t('pleaseContactCustomerService')" width="60vw">
      <p>{{ $t('contactContent') }}</p>
      <p>{{ $t('contactMethodsAre') }}</p>
      <!--<p>{{ $t('wechatAccountIs') }}</p>-->
      <p>{{ $t('phoneNumberIs') }}</p>
      <p>邮箱：qinhengyu1997@jiandanmaimai.com</p>
    </el-dialog>

    <!-- 用户子选项栏 -->
    <el-sub-menu index="userMenu" class="userMenu">
      <!-- 头像，登陆后显示用户姓名 -->
      <template #title><el-avatar class="avatar" :icon="Avatar"/></template>

      <!-- 登陆选项 -->
      <el-menu-item class="subMenu" index="login" v-if="!checkIfLogin()" @click="routerPush('/login')">
        {{ $t("login") }}
      </el-menu-item>

      <!-- 注册选项 -->
      <el-menu-item class="subMenu" index="register" v-if="!checkIfLogin()" @click="routerPush('/register')">
        {{$t("register")}}
      </el-menu-item>

      <!-- 用户信息选项 -->
      <el-menu-item class="subMenu" index="profile" v-if="checkIfLogin()" @click="routerPush('/user/profile')">
        {{ $t("profile") }}
      </el-menu-item>

      <!-- 广告管理选项 -->
      <el-menu-item class="subMenu" index="manage" v-if="checkIfLogin()" @click="routerPush('/user/manage')">
        {{ $t("manage") }}
      </el-menu-item>

      <!-- 免费广告管理选项 -->
      <el-menu-item class="subMenu" index="manage" v-if="checkIfLogin()" @click="routerPush('/user/free')">
        {{ $t("freeAd") }}
      </el-menu-item>

      <!-- 聊天界面选项 -->
      <el-menu-item class="subMenu" index="chat" v-if="checkIfLogin()" @click="routerPush('/chat') ">
        {{ $t('chat') }}
      </el-menu-item>

      <!-- 登出选项 -->
      <el-menu-item class="subMenu" index="logout" v-if="checkIfLogin()" @click="logout()">
        {{ $t("logout") }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
// import i18n from '../locale/index'
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {Avatar} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus"
import {useI18n} from "vue-i18n"
import {useStore} from 'vuex'

const route = useRoute()
const activeIndex = route.path.split('/')[2]
// // 使用vuex保存当前默认激活的顶部栏选项，如果为''即默认，则根据当前路径设置

// let activeIndex = store.getters.getTopBarActiveIndex
// if (activeIndex === '') {
//   activeIndex = useRoute().path.split('/')[2]
//   store.commit('setTopBarActiveIndex', activeIndex)
// }

// 调用路由，logo，语言包，store
const router = useRouter()
const logo = require('../assets/imgs/logo-cut.png')
const {t} = useI18n()
const store = useStore()

// 根据是否存在jwt来判断用户是否已经登陆
function checkIfLogin() {
  // 从store中读取登陆JWT，如未登陆则为''
  const token = store.getters.getAuth

  // 检查jwt格式和存在
  return token !== '' && token.startsWith('Bearer ');
}

// 登出方法，由于使用jwt，此方法不跳转路由
function logout() {
  // 只有登陆的用户才能登出操作
  if (checkIfLogin()) {
    // 直接将localStorage中的jwt删除并更新store
    localStorage.auth = undefined
    store.commit('setAuth', '')

    // 刷新页面
    router.go(0)
  } else {
    // 弹出提示信息
    ElMessage.error({
      showClose: true,
      message: t('youNotLogin')
    })
  }
}

// 页面跳转方法
function routerPush(path) {
  // 判断已登陆用户并阻止跳转
  if (path === '/login') {
    // 如果已登陆，则提示并返回上一个页面
    if (checkIfLogin()) {
      // 弹出提示信息
      ElMessage.error({
        showClose: true,
        message: t('alreadyLogin')
      })

      // 直接返回不进行跳转
      return
    }
  }

  // 如果用户在详情界面，点击购买和出售都会跳转至主页
  if (activeIndex === 'profile') {
    router.push('/')
    return
  }

  if (activeIndex === 'manage') {
    if (path === 'buy' || path === 'sell') {
      router.push('/')
      return
    }
  }

  // 如果用户在车辆详情界面，则对应跳转
  if (route.path.split('/')[2] === 'detail') {
    if (path === 'buy' || path === 'sell') {
      console.log('/' + route.path.split('/')[1] + '/' + path)
      router.push('/' + route.path.split('/')[1] + '/' + path)
      return
    }
  }

  // 路由跳转
  router.push(path)
}

// 弹出的维权对话框
let rightDialogVisible = ref(false)

// // 语言切换方法，暂不启用
// function changeLanguage(lang) {
//   i18n.global.locale = lang
// }
</script>

<style scoped>
.topBar {
  position: sticky;
  box-sizing: border-box;
  width: 100vw;
  height: 8vh;
  border-top-style: solid;
  border-top-width: 5px;
  border-top-color: #4080ff;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #c9cdd4;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
}

.logo {
  margin-left: 8vw;
  margin-top: 1vh;
  margin-bottom: 1.5vh;
  cursor: pointer;
  height: 5vh;
  width: 10vw;
  margin-right: auto;
}

.firstMenuItem {
  width: 3vw;
  /*transform: translateX(60vw);*/
  font-size: 1vw;
}

.secondMenuItem{
  width: 3vw;
  /*transform: translateX(60vw);*/
  font-size: 1vw;
}

.thirdMenuItem{
  width: 3vw;
  /*transform: translateX(60vw);*/
  font-size: 1vw;
}

.userMenu {
  /*border-style: solid;*/
  text-align: center;
  margin-right: 8vw;
  /*transform: translateX(60vw);*/
}

/* 取消el-sub-menu组件自带的箭头显示 */
.userMenu >>> .el-sub-menu__icon-arrow {
  display: none;
}

.rightButton {
  /*transform: translateX(60vw);*/
  margin-left: 1vw;
  width: 5vw;
  font-size: 0.8vw;
}

.avatar {
  font-size: 1vw;
  /*width: 2.8vw;*/
  /*height: 3vh;*/
  /*transform: translateX(51vw);*/
}

.avatar >>> .el-icon {
  margin: 0;
}

.subMenu {
  font-family: DreamHan, sans-serif;
  justify-content: center;
}

:deep(.el-sub-menu__title) {
  border-bottom-color: white !important;
}
</style>