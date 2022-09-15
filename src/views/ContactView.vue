<!--
 * @Description: 联系界面
 * @Author: Mo Xu
 * @Date: 3/7/2022
-->
<template>
  <div class="background">
    <top-bar />
    <el-descriptions column="2" class="descriptions" direction="vertical">
      <el-descriptions-item :label="$t('companyName')"><p>深圳信盾电子商务有限责任公司</p></el-descriptions-item>
      <el-descriptions-item :label="$t('email')"><p>qinhengyu1997@jiandanmaimai.com</p></el-descriptions-item>
      <el-descriptions-item :label="$t('contactPhone')"><p>18608572070</p></el-descriptions-item>
      <el-descriptions-item :label="$t('address')"><p>深圳市福田区福田街道口岸社区福田南路38号广银大厦1118J3</p></el-descriptions-item>

    </el-descriptions>

  </div>
</template>

<script setup>
import TopBar from "@/components/TopBar"
</script>

<style scoped>
.background {
  background-color: #E8F3FF;
  height: 100vh;
  align-content: center;
}

.descriptions {
  width: 50vw;
  margin: 20vh auto 0;
}

:deep(.el-descriptions__table) {
  background-color: #E8F3FF !important;
}

:deep(.el-descriptions__cell) {
  font-size: 2vh !important;
}

p {
  margin-top: 2vh;

}
</style>