<!--
 * @Description: 车辆购买页面的广告卡片组件
 * @Author: Mo Xu
 * @Date: 12/6/2022
-->
<template>
  <el-card class="carCard">
    <!-- 展示图片 -->
    <el-image
      v-loading="loading"
      :src=car.coverImage
      class="carCardImage"
      fill="fill"
      @click="goCarDetail(car.id)"/>

    <!-- 广告卡片的内容 -->
    <div class="carCardContent">
      <!-- 标题 -->
      <h5 class="carCardModelName">
        {{car.model.toString().substring(0, car.model.toString().indexOf("-"))}}
      </h5>

      <!-- 公司名 -->
      <div v-if="car.companyName !== null" class="companyName">
        {{car.companyName}}
      </div>
      <div v-else class="companyName">
        {{$t("individualSeller")}}
      </div>

      <!--事故车提示-->
      <div v-if="car.ifAccident === true">
        <h5 class="accidentTip">
          {{$t("accidentTip")}}
        </h5>
      </div>

      <!--运损车提示-->
      <div v-if="car.ifShippingDamage === true">
        <h5 class="shipDamageTip">
          {{$t("shipDamageTip")}}
        </h5>
      </div>

      <el-divider v-if="car.ifAccident === true" class="divider1"/>
      <el-divider v-else-if="car.ifShippingDamage === true" class="divider1"/>
      <el-divider v-else class="divider2"/>

      <!-- 所有内容 -->
      <div class="contents">
        <!-- 左侧内容 -->
        <div class="leftContent">
          <el-row :gutter="5">
            <el-col :span="10">
              <p class="content">• {{car.kilometers}} {{$t('kilometer')}}</p>
              <p class="content">• {{car.level}}</p>
            </el-col>
            <el-col :span="14">
              <p class="content">• {{car.gearbox}}</p>
              <p class="content">• {{car.engine}}</p>
            </el-col>
          </el-row>
        </div>

        <!-- 右侧内容，显示价格 -->
        <div class="rightContent">¥ {{car.price}}*</div>
      </div>

      <!-- 显示点击浏览收藏数 -->
      <div class="infos">
        <el-row :gutter="1">
          <el-col :span="8">{{$t('cardViews')}} {{viewsNum}}</el-col>
          <el-col :span="8">{{$t('cardClicks')}} {{clicksNum}}</el-col>
          <el-col :span="8">{{$t('cardStars')}} {{starsNum}}</el-col>
        </el-row>
      </div>

      <el-divider class="divider"/>

      <div>
        <!-- 各种按钮 -->
        <el-row :gutter="5">
          <el-col :span="10"><el-button type="primary" class="carCardButton" @click="goCarDetail(car.id)">{{$t('cardBtnDetail')}}</el-button></el-col>
          <!--<el-col :span="8"><el-button type="primary" class="carCardButton" @click="goChat(curUser.val.id, seller.val.id, props.car.id)">{{$t('cardBtnContact')}}</el-button></el-col>-->
<!--          <el-col v-if="isStar === false" :span="12"><el-button type="primary" class="carCardButton" @click="starCar">{{$t('cardBtnStar')}}</el-button></el-col>-->
<!--          <el-col v-else :span="12"><el-button type="primary" class="carCardButton" @click="cancelStarCar">{{$t('cancelStarBtn')}}</el-button></el-col>-->
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {defineProps, ref} from 'vue'
import axios from "axios"
import router from "@/router"
import {useStore} from "vuex";
import {onBeforeMount, reactive} from "vue";

const props = defineProps({
  car: Object,
  index: Number
})

const clicksNum = ref(0)
const viewsNum = ref(0)
const starsNum = ref(0)
const loading = ref(true)

// 使用Store组件来从全局信息中获取数据
const store = useStore()

// 从Store中使用getAuth方法获取token
const token = store.getters.getAuth;

// 当前用户，通过token获得（调用后端接口）
const curUser = reactive({
  val: []
});

// 当前汽车广告的卖家信息详情
const seller = reactive({
  val: []
});

// 收藏标志位，默认为未收藏状态
const isStar = ref(false);

// 数据挂载
onBeforeMount(async()=>{
  curUser.val = await getUserByToken()
  seller.val = await getUserDetailById();
  isStar.value = await checkIsStar();
})

// 通过token来获取用户对象
function getUserByToken(){
  return axios.get("/user/getUserByToken", {
    params: {
      token: token
    }
  }).then(function (res){
    return res.data.data
  })
}

// 根据用户id获得用户对象方法（不包括密码）
async function getUserDetailById(){
  return axios.get("/user/getOneById", {
    params: {
      id: props.car.userId
    }
  }).then(function (res){
    return res.data.data;
  });
}

// 获取点击数
axios.get("/vehicle/getClicks", {
  params: {
    id: props.car.id
  }
}).then(function (res) {
  clicksNum.value = res.data
}).then(function () {
  // 获取浏览数
  axios.get("/vehicle/getViews", {
    params: {
      id: props.car.id
    }
  }).then(function (res) {
    viewsNum.value = res.data
  }).then(function () {
    // 获取收藏数
    axios.get("/vehicle/getFavoritesNum", {
      params: {
        id: props.car.id
      }
    }).then(function (res) {
      starsNum.value = res.data
      loading.value = false
    })
  })
})

// 跳转到详情界面
const goCarDetail = function(carId) {
  // 增加点击数
  axios.post("/vehicle/click", {}, {
    params: {
      id: carId
    }
  })
  // 路由跳转到汽车详情界面，携带传输数据为对应汽车卡片的汽车id
  router.push({ name: 'motorDetail', params: {carId: carId}})
  document.documentElement.scrollTop = 0;
}

// // 跳转到聊天界面
// const goChat = function(buyerId, sellerId, carId) {
//   // 调用方法创建聊天记录
//   if(buyerId !== sellerId){
//     createRecord(buyerId, sellerId);
//   }
//   // 路由跳转到汽车详情界面，携带传输数据为对应汽车卡片的汽车id，延迟为0.5s，让下一个页面有充分时间读取chat records信息
//   setTimeout(() => {router.push({ name: 'chat', params: {buyerId: buyerId, sellerId: sellerId, carId: carId}})}, 500);
//   document.documentElement.scrollTop = 0;
// }

// // 点击在线聊天按钮后创建聊天记录
// function createRecord(userOneId, sellerId){
//   axios.post("/chat/createRecord", {}, {
//     params: {
//       userOneId: userOneId,
//       userTwoId: sellerId
//     }
//   })
// }

// 检查用户是否已经收藏当前车辆
async function checkIsStar(){
  return axios.get("/vehicle/getFavouriteState", {
    params: {
      id: props.car.id,
      phone: curUser.val.phone
    }
  }).then(function (res){
    return res.data.data;
  });
}

// 按钮功能，收藏汽车广告
// async function starCar(){
//   axios.post("/vehicle/favorite",{}, {
//     params: {
//       id: props.car.id,
//       account: curUser.val.phone
//     }
//   }).then(async function (res) {
//     console.log(res)
//   });
//   router.go(0)
// }
//
// // 按钮功能，取消收藏汽车广告
// function cancelStarCar(){
//   axios.post("/vehicle/cancelFavorite",{}, {
//     params: {
//       id: props.car.id,
//       account: curUser.val.phone
//     }
//   }).then(function (res){
//     console.log(res)
//   });
//   router.go(0)
// }


</script>

<style scoped>
.divider1 {
  margin-top: -1vh;
  margin-bottom: 1.5vh;
}
.divider2 {
  margin-top: 4.2vh;
  margin-bottom: 1.5vh;
}
.carCard {
  border-radius: 10px;
  width: 27vw;
  margin-bottom: 2vh;
}
:deep(.el-card__body) {
  padding: 0;
}
.carCardImage {
  width: 28vw;
  height: 18.67vw;
}
.carCardContent {
  padding: 1vw;
}
.carCardModelName {
  text-align: left;
  margin: 0;
  font-size: 0.9vw;
}
.contents {
  display: flex;
  align-items: center;
}
.leftContent {
  text-align: left;
  width: 55vw;
}
.rightContent {
  width: 30vw;
  padding-bottom: 1vh;
  font-size: 1.3vw;
}
.content {
  font-size: 0.6vw;
  margin-top: 0;
}
.infos {
  font-size: 0.7vw;
  opacity: 60%;
}
.carCardButton {
  padding: 0;
  width: 11vw;
  height: 3.3vh;
  font-size: 1vw;
  margin-left:7vw;
}
.accidentTip{
  margin-top: 0.7vh;
  font-size: 0.6vw;
  font-family: DreamHan, sans-serif;
  color: red;
}
.shipDamageTip{
  margin-top: 0.7vh;
  font-size: 0.6vw;
  font-family: DreamHan, sans-serif;
  color: red;
}
.companyName{
  margin-top: 1vh;
  font-size: 0.6vw;
  width: 25vw;
  text-align: right;
  margin-bottom: 0.5vh;
}
</style>