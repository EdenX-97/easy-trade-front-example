<!--
 * @Description: 
 * @Author: Mo Xu
 * @Date: 20/6/2022
-->
<template>
  <!--&lt;!&ndash; 侧边广告图片显示 &ndash;&gt;-->
  <!--<el-image-->
  <!--    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.soogif.com%2Fj0L9B5pRAgiJPTNLCWdopO5WPfguskbU.gif&refer=http%3A%2F%2Fimg.soogif.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653637678&t=a84674c05b14ae307c34a14d3f708f4c"-->
  <!--    class="sideAdvImage"-->
  <!--    fit="fill"/>-->

  <div class="sideAdvImage">
    如需投放广告，请联系我们
  </div>
</template>

<script setup>
// const props = defineProps({
//   foo: String
// })
</script>

<style scoped>
.sideAdvImage {
  margin-top: 5vh;
  width: 15vw;
  height: 45vw;
  /* 以下为展示用边框设置 */
  border-style: solid;
  border-width: 0.1vw;
  border-color: #CDD0D6;
  text-align: center;
  line-height: 10vh;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.2vw;
}
</style>