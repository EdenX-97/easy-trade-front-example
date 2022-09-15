<!--
 * @Description: 用户相关界面
 * @Author: Mo Xu
 * @Date: 9/5/2022
-->
<template>
  <topBar/>
  <router-view/>
</template>

<script setup>
// // 此页面为父组件，如果访问该路由，则直接跳转至个人信息界面
// import {useRouter} from 'vue-router'
//
// const router = useRouter()
// router.push('/user/profile')
</script>

<style scoped>

</style>