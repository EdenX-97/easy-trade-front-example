<!--
 * @Description: 管理界面的载具广告卡片
 * @Author: Mo Xu
 * @Date: 20/5/2022
-->
<template>
  <el-card v-loading="loading" class="card">
    <el-image
        class="image"
        :src=src
        fit="cover"
        @click="routerPush()">
      <template #error>
        <div class="image-slot">
          <el-icon><icon-picture /></el-icon>
        </div>
      </template>
    </el-image>
    <div class="content">
      <el-descriptions class="descriptions" :title="title" column="1">
        <el-descriptions-item label="广告类型"> {{ $t(adLevel.toLowerCase()) }} </el-descriptions-item>
        <el-descriptions-item label="广告状态"> {{ $t(adStatus) }} </el-descriptions-item>
        <el-descriptions-item label="创建日期"> {{ createdDate }} </el-descriptions-item>
        <el-descriptions-item label="出售价格"> {{ price + $t('yuan') }} </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="buttons">
      <el-row class="buttonRow">
        <el-col :span="24">
          <el-button class="oneButton" type="warning" :disabled="adStatus !== 'posted'" @click="changePrice" round>
            {{ $t('changePrice') }}
          </el-button>
          <manage-dialog
              v-model="changePriceVisible"
              :title="changePriceTitle"
              type="changePrice"
              :id="props.id"
              :adType="adType"/>
        </el-col>
      </el-row>

      <el-row class="buttonRow" :gutter="15">
        <el-col :span="12">
          <el-button class="button" type="primary" :disabled="adStatus !== 'created'" @click="payment" round>
            {{ $t('toPay') }}
          </el-button>
          <manage-dialog
              v-model="paymentVisible"
              :title="paymentTitle"
              type="payment"
              :adPrice="adPrice"
              :id="props.id"/>
        </el-col>
        <el-col :span="12">
          <el-button class="button" type="info" :disabled="adStatus !== 'paid'" @click="upload" round>
            {{ $t('uploadInfo') }}
          </el-button>
          <manage-dialog
              v-model="uploadVisible"
              :title="uploadTitle"
              type="upload"
              :id="props.id"
              :level="adLevel"/>
        </el-col>
      </el-row>
      <el-row class="buttonRow" :gutter="15">
        <el-col :span="12">
          <el-button class="button" type="success" :disabled="adStatus !== 'posted'" @click="complete" round>
            {{ $t('completeAd') }}
          </el-button>
          <manage-dialog
              v-model="completeVisible"
              :title="completeTitle"
              type="complete"
              :id="props.id"
              :adType="adType"/>
        </el-col>
        <el-col :span="12">
          <el-button class="button" type="danger" :disabled="adStatus === 'completed'" @click="cancel" round>
            {{ $t('cancelAd') }}
          </el-button>
          <manage-dialog
              v-model="cancelVisible"
              :title="cancelTitle"
              type="cancel"
              :id="props.id"
              :adType="adType"/>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script setup>
import {defineProps} from 'vue'
import axios from '../../request'
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'
import { Picture as IconPicture } from '@element-plus/icons-vue'

// 调用路由，语言包
const {t} = useI18n()
const router = useRouter()

// 加载功能
const loading = ref(true)

// 接收参数
const props = defineProps({
  id: String
})

// 获取封面图片（如有）
const src = ref()
axios.get("/vehicle/getImagesFromOSSById", {
  params: {
    id: props.id
  }
}).then((res) => {
  src.value = res.data.data[0]
})

// 根据传入的id获取广告参数
const price = ref(0)
const createdDate = ref('')
const adLevel = ref('')
const priceLevel = ref('')
const adStatus = ref('')
const adType = ref('')
axios.get("/vehicle/getVehicleById", {
  params: {
    id: props.id
  }
}).then((res) => {
  const carInfo = res.data.data
  // 获取价格
  price.value = carInfo.price

  // 设置日期
  const date = new Date(carInfo.createdDate)
  createdDate.value =
      date.getFullYear() + t('dateYear') +
      (date.getMonth() + 1) + t('dateMonth') +
      date.getDate() + t('dateDay')

  // 设置广告等级
  adLevel.value = carInfo.adLevel

  // 设置价格等级
  priceLevel.value = carInfo.priceLevel

  // 设置广告状态
  adStatus.value = carInfo.adStatus.toLowerCase()

  // 设置广告类型
  adType.value = carInfo.vehicleAdType

  // 返回汽车参数给下一步调用
  return carInfo
}).then((res) => {
  setVehicleTitle(res.id)
})

// 获取载具模版以及相关参数的方法
const title = ref('')
const setVehicleTitle = function(id) {
  axios.get("/vehicle/getVehicleTitleById", {
    params: {
      id: id
    }
  }).then((res) => {
    title.value = res.data.data

    // 关闭加载
    loading.value = false
  })
}

// 页面跳转方法
const routerPush = function() {
  // 根据id获取载具类型
  axios.get("/vehicle/getVehicleTypeById", {
    params: {
      id: props.id
    }
  }).then((res) => {
    // 根据类型判断并跳转路由
    const type = res.data.data
    let pathPrefix = null
    switch (type) {
      case 'NEWCARAD':case 'SECONDHANDCARAD':
        pathPrefix = '/car/detail/'
            break
      case 'NEWMOTORAD':case 'SECONDHANDMOTORAD':
        pathPrefix = '/motor/detail/'
    }

    if (pathPrefix !== null) {
      // 路由跳转
      router.push(pathPrefix + props.id)
    }
  })
}

// 弹出支付方式选择
const paymentVisible = ref(false)
const adPrice = ref('')
const payment = function() {
  axios.get('/vehicle/getAdPrice', {
    params: {
      adLevel: adLevel.value,
      price: price.value,
      type: adType.value
    }
  }).then((res) => {
    if (res.data.code === 1000) {
      adPrice.value = res.data.data
      paymentVisible.value = true
    }
  })
}
const paymentTitle = t('choosePayment')

// 弹出修改价格
const changePriceVisible = ref(false)
const changePrice = () => {
  changePriceVisible.value = true
}
const changePriceTitle = t('changePrice')

// 弹出上传对话框
const uploadVisible = ref(false)
const upload = function() {
  uploadVisible.value = true
}
const uploadTitle = t('uploadFiles')

// 弹出完成对话框
const completeVisible = ref(false)
const complete = function() {
  completeVisible.value = true
}
const completeTitle = t('completeAd')

// 弹出取消对话框
const cancelVisible = ref(false)
const cancel = function() {
  cancelVisible.value = true
}
const cancelTitle = t('cancelAd')
</script>

<style scoped>
.card {
  width: 18vw;
  text-align: center;
}

:deep(.el-card__body) {
  padding: 0;
}

:deep(.el-descriptions__cell) {
  padding-bottom: 1px !important;
  font-size: 16px !important;
}

:deep(.el-descriptions__label) {
  margin-right: 2vw;
  font-size: 1vw
}

:deep(.el-descriptions__content){
  font-size: 1vw
}

:deep(.el-descriptions__title) {
  font-size: 1.3vw !important;
}

.image {
  width: 18vw;
  height: 15vh;
  cursor: pointer;
}

.content {
  padding: 2vh 2vw;
}

.oneButton {
  width: 13vw;
  font-size: 0.8vw;
}

.button {
  margin-top: 1.5vh;
  width: 6vw;
  font-size: 0.8vw;
}

.buttonRow {
  margin-left: 1.7vw !important;
  margin-right: 1.7vw !important;
}

.buttons {
  margin-bottom: 2vh;
}

.card .image-slot .el-icon {
  font-size: 4vh;
  margin-top: 6vh;
}

:deep(.el-descriptions__title){
  font-size: 0.1vw;
}

</style>