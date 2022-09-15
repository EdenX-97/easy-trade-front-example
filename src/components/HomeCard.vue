<!--
 * @Description: 主页卡片组件
 * @Author: Mo Xu
 * @Date: 15/4/2022
-->
<template>
  <el-card v-if="props.canPush" class="card" @click="routerPush()">
    <el-image :src="props.imgPath" class="carCardImage"/>
    <div class="title">
      <span>{{ $t(props.title) }}</span>
    </div>
  </el-card>

  <el-card v-else class="unreleasedCard">
    <el-image :src="props.imgPath" class="carCardImage"/>
    <div class="title">
      <span>{{ $t(props.title) }}</span>
    </div>
  </el-card>
</template>

<script setup>
import {defineProps} from 'vue'
import {useRouter} from 'vue-router'

// 接收传入的参数
const props = defineProps({
  title: String,
  imgPath: String,
  canPush: Boolean
})

// 实例化router，用于跳转路径
const router = useRouter()

// 点击卡片后跳转方法
function routerPush() {
  // 构造需要前往的路径，默认跳转至购买界面
  const toPath = '/' + props.title.slice(0, -7) + '/buy'
  router.push(toPath)
}
</script>

<style scoped>
.card, .unreleasedCard {
  text-align: center;
  margin: 1vw;
  transition-property: all;
  cursor: pointer;
  width: 23vw;
}

.card >>> .el-card__body {
  padding: 0;
}

.unreleasedCard >>> .el-card__body {
  padding: 0;
}

.unreleasedCard {
  color: #CCC;
}

.carCardImage {
  width: 23vw;
  display: block;
}

span {
  font-size: 1vw;
}

.title {
  padding: 1vh;
}

:deep(.el-card__body){
  width: 23vw;
}

</style>