<!--
 * @Description: 邮箱验证界面
 * @Author: Mo Xu
 * @Date: 18/5/2022
-->
<template>
  <div>
    <result :icon="icon" :title="title" />
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {ref} from 'vue'
import axios from '../../request'
import {useI18n} from 'vue-i18n'
import {ElLoading} from 'element-plus'

// 调用路由，语言包
const router = useRouter()
const {t} = useI18n()

// 调用全屏加载服务
const loading = ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })

// 从路由传入的参数中获取token
const token = ref(router.currentRoute.value.params.token)

// 定义结果所需的参数
const icon = ref()
const title = ref()

// 向后端调用验证方法，根据返回的结果显示结果页面
axios.post('/email/verifyEmail', {}, {
  params: {
    token: token.value
  }
}).then((res) => {
  const result = res.data
  switch (result.code) {
    case 1000:
      // 显示成功结果
      icon.value = 'success'
      title.value = t('emailVerifySuccess')
      break;
    default:
      // 显示失败结果
      icon.value = 'error'
      title.value = t('emailVerifyFail')
  }

  // 关闭全屏加载
  loading.close()

  // 三秒定时，跳转到前一页面
  setTimeout(() => {
    goProfile()
  }, 5000)
})

// 前往详情页面方法
const goProfile = function() {
  router.push('/user/profile')
}
</script>

<style scoped>


</style>