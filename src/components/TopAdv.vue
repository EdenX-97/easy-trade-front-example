<!--
 * @Description: 顶部广告组件
 * @Author: Mo Xu
 * @Date: 17/6/2022
-->
<template>
  <div class="topAdv">
    <!-- 顶部广告图片显示 -->
    <!--<el-image-->
    <!--    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.bitautoimg.com%2Fappimage%2Fmedia%2F20170212%2Fw500_h211_6a6d07a107c244149608b8df4d353656.gif&refer=http%3A%2F%2Fimage.bitautoimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653637055&t=6be6d3e9379e67f8c8e28cc82212b1cb"-->
    <!--    class="topAdvImage"-->
    <!--    fit="fill"-->
    <!--/>-->
    <div class="topAdvImage">
      如需投放广告，请联系我们
    </div>
  </div>
</template>

<script setup>
// const props = defineProps({
//   foo: String
// })
</script>

<style scoped>
.topAdv{
  width: 97.5vw;
  height: 11vh;
}

.topAdvImage {
  margin-top: 0.7vw;
  width: 40vw;
  height: 5vw;
   /*以下为展示用边框设置*/
  border-style: solid;
  border-width: 0.1vw;
  border-color: #CDD0D6;
  /*text-align: center;*/
  /*line-height: 10vh;*/
  margin-left: 28.5vw;
  /*margin-right: auto;*/
  font-size: 1.2vw;
}
</style>