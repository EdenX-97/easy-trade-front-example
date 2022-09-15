<!--
 * @Description: 汽车买卖页面
 * @Author: Mo Xu
 * @Date: 16/4/2022
-->
<template>
  <topBar/>
<!--  <scale-box :width="width" :height="height">-->
    <router-view/>
<!--  </scale-box>-->
</template>

<script setup>
// 此页面为父组件，如果访问该路由，则直接跳转至购买页面
// import {useRouter} from 'vue-router'
//
// const router = useRouter()
// router.push('/car/buy')
// import FooterBar from "@/components/FooterBar"
// import ScaleBox from 'scale-box'
// import 'scale-box/dist/style.css'
//
// var t = window.devicePixelRatio   // 获取缩放比例 125% -> 1.25    150% -> 1.5
// let width = window.innerWidth;
// let height = window.innerHeight;
//
// console.log("旧宽： " + width)
// console.log("旧高： " + height)
//
// if(navigator.userAgent.toLowerCase().indexOf("windows") >= 0){
//   width = width * t;
//   height = height * t;
// }
//
// console.log("当前缩放倍数" + t)
// console.log("新宽： " + width)
// console.log("新高： " + height)
</script>

<style scoped>
</style>