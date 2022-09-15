<!--
 * @Description: 隐私协议
 * @Author: Mo Xu
 * @Date: 8/7/2022
-->
<template>
  <div class="background">
    <iframe :src="url" width="100%" height="100%"></iframe>
  </div>
</template>

<script setup>
import file from '../assets/files/Privacy-7.7.pdf'

const url = 'pdfjs/web/viewer.html' + '?file=' + encodeURIComponent(file)
</script>

<style scoped>
.background {
  background-color: #E8F3FF;
  height: 100vh;
  overflow: hidden;
}
</style>