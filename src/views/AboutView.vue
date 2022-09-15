<!--
 * @Description: 关于我们
 * @Author: Mo Xu
 * @Date: 3/7/2022
-->
<template>
  <div class="background">
    <top-bar />
    <h1>{{ $t('aboutUs') }}</h1>
    <p>{{ $t('companyDesc1')}} </p>
    <p>{{ $t('companyDesc2')}} </p>
    <p>{{ $t('companyDesc3')}} </p>
  </div>
</template>

<script setup>
import TopBar from "@/components/TopBar";
</script>

<style scoped>
.background {
  background-color: #E8F3FF;
  height: 100vh;
}

h1 {
  margin-top: 20vh;
  font-size: 4vh;
}

p {
  margin-top: 5vh;
  font-size: 2vh;
}
</style>