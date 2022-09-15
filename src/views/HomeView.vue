<!--
 * @Description: 主页面
 * @Author: Mo Xu
 * @Date: 16/4/2022
-->
<template>
  <div class="background">
    <div class="topTitle">
      <el-image :src="logo" class="logo" fit="contain"/>
    </div>
    <div class="homeCards">
      <!-- 横屏4x2-->
      <el-row v-if="!isMobile" class="row">
        <el-col v-for="(value, key) in firstLine" :key="key" :span="6">
          <homeCard :canPush="value[1]" :imgPath="value[0]" :title="key"/>
        </el-col>
      </el-row>
      <el-row v-if="!isMobile" class="row">
        <el-col v-for="(value, key) in secondLine" :key="key" :span="6">
          <homeCard :canPush="value[1]" :imgPath="value[0]" :title="key"/>
        </el-col>
      </el-row>

      <!-- 竖屏2x4 -->
      <div class="mobile" style="margin-left: 15vw">
      <el-row v-if="isMobile" class="row">
        <el-col v-for="(value, key) in firstLine" :key="key" :span="12">
          <homeCard :canPush="value[1]" :imgPath="value[0]" :title="key"/>
        </el-col>
      </el-row>
      <el-row v-if="isMobile" class="row">
        <el-col v-for="(value, key) in secondLine" :key="key" :span="12">
          <homeCard :canPush="value[1]" :imgPath="value[0]" :title="key"/>
        </el-col>
      </el-row>
      <el-row v-if="isMobile" class="row">
        <el-col v-for="(value, key) in thirdLine" :key="key" :span="12">
          <homeCard :canPush="value[1]" :imgPath="value[0]" :title="key"/>
        </el-col>
      </el-row>
      <el-row v-if="isMobile" class="row">
        <el-col v-for="(value, key) in forthLine" :key="key" :span="12">
          <homeCard :canPush="value[1]" :imgPath="value[0]" :title="key"/>
        </el-col>
      </el-row>
      </div>
<!--      <el-row class="row">-->
<!--        <el-col v-for="(value, key) in firstLine" :key="key" :span="12">-->
<!--          <homeCard :canPush="value[1]" :imgPath="value[0]" :title="key"/>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </div>
    <footer-bar/>
  </div>
</template>

<script setup>
import {useStore} from "vuex"
import {ref} from "vue";

const store = useStore()
const logo = require('../assets/imgs/logo-full.png')

const isMobile = store.getters.getIsMobile
// const isMobile = true;

const firstLine = ref()
const secondLine = ref()
const thirdLine = ref()
const forthLine = ref()

if (isMobile) {
  // 第一行的图标和标题
  firstLine.value = {
    'carBuySell': [require('../assets/imgs/car.jpg'), true],
    'racingBuySell': [require('../assets/imgs/racing.jpg'), false],
  }

  secondLine.value = {
    'truckBuySell': [require('../assets/imgs/truck.jpg'), false],
    'motorhomeBuySell': [require('../assets/imgs/motorhome.jpg'), false]
  }

  thirdLine.value = {
    'motorBuySell': [require('../assets/imgs/motor.jpg'), true],
    'bikeBuySell': [require('../assets/imgs/bike.jpg'), false],
  }

  forthLine.value = {
    'shipBuySell': [require('../assets/imgs/ship.jpg'), false],
    'planeBuySell': [require('../assets/imgs/plane.jpg'), false]
  }
} else {
  // 第一行的图标和标题
  firstLine.value = {
    'carBuySell': [require('../assets/imgs/car.jpg'), true],
    'racingBuySell': [require('../assets/imgs/racing.jpg'), false],
    'truckBuySell': [require('../assets/imgs/truck.jpg'), false],
    'motorhomeBuySell': [require('../assets/imgs/motorhome.jpg'), false]
  }

  // 第二行的图标和标题
  secondLine.value = {
    'motorBuySell': [require('../assets/imgs/motor.jpg'), true],
    'bikeBuySell': [require('../assets/imgs/bike.jpg'), false],
    'shipBuySell': [require('../assets/imgs/ship.jpg'), false],
    'planeBuySell': [require('../assets/imgs/plane.jpg'), false]
  }
}

// // 临时图标
// const firstLine = {
//   'carBuySell': [require('../assets/imgs/car.jpg'), true],
//   'motorBuySell': [require('../assets/imgs/motor.jpg'), true]
// }

</script>

<style scoped>
.background {
  background-color: #e8f3ff;
}

.topTitle {
  background-color: #bedaff;
  height: 12vh;
}

.logo {
  height: 12vh;
}

/*.homeCards {*/
/*  height: 75vh*/
/*}*/

/*.row {*/
/*  margin-top: 3vh;*/
/*}*/

.homeCards {
  height: 74vh
}

.row {
  margin-top: 4vh;
}
</style>
