<!--
 * @Description: 结果页面
 * @Author: Mo Xu
 * @Date: 18/5/2022
-->
<template>
  <el-result
      :icon="icon"
      :title="title"
      :sub-title="subTitle"
      class="result"
  >
    <template #extra>
      <el-button type="primary" @click="goProfile()"> {{ $t('back') }} </el-button>
    </template>
  </el-result>
</template>

<script setup>
import {defineProps} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'

defineProps({
  icon: String,
  title: String
})

// 调用路由，语言包
const router = useRouter()
const {t} = useI18n()

const subTitle = t('resultTip')

// 前往详情页面方法
const goProfile = function() {
  router.push('/user/profile')
}
</script>

<style scoped>
.result {
  margin-top: 20vh;
}
</style>