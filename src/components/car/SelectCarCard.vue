<!--
 * @Description: 选择广告等级卡片
 * @Author: Mo Xu
 * @Date: 28/5/2022
-->
<template>
  <el-card class="card">
    <h3 class="title">{{ $t(level) }}</h3>
    <p class="price">{{ adPrice }} {{$t('yuan')}}</p>
    <p class="functions">{{ $t('includeFunctions') }}</p>

    <div class="info" v-for="functionDes in functions" :key="functionDes">
      <el-icon><Check /></el-icon>
      <p class="function">{{ functionDes }}</p>
    </div>

    <el-button class="button" type="primary" @click="confirmVisible = true" round>{{ $t('confirmLevel') }}</el-button>
    <el-dialog :title="$t('confirmCreateAd')" width="30%" v-model="confirmVisible">
      <p class="confirmNotice">{{ $t('confirmCreateNotice1') }}</p>
      <p class="confirmNotice">{{ $t('confirmCreateNotice2') }}</p>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="confirmVisible = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="confirmAd()">{{ $t('confirm') }}</el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog :title="$t('goToPay')" width="30%" v-model="goToPay">
      <span class="confirmNotice">{{ $t('ifGoToPay') }}</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="notPay()">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="payment()">{{ $t('confirm') }}</el-button>
        <!-- 选择支付方式窗口 -->
        <manage-dialog
            v-model="paymentVisible"
            :title="paymentTitle"
            type="payment"
            :adPrice="adPrice"
            :id="createdId"/>
      </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import {
  Check
} from '@element-plus/icons-vue'
import {defineProps, ref} from 'vue'
import axios from '../../request'
import {ElLoading, ElMessage} from "element-plus"
import {useI18n} from 'vue-i18n'
import {useStore} from "vuex"
import router from "@/router"

// 调用语言包
const {t} = useI18n()
const store = useStore()

// token用于身份验证
const token = store.getters.getAuth

const props = defineProps({
  level: String,
  sellPrice: Number,
  type: String,
  model: String,
  purchaseDate: Date,
  productionDate: Date,
  bigFrame: String,
  kilometers: Number,
  province: String,
  city: String,
  county: String,
  town: String,
  description: String,
  showContactNum: Boolean,
  ifAccident: Boolean,
  ifShippingDamage: Boolean,
  contactNum: String
})

// 开始获取信息
// 开启全屏加载
const loading = ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })

// 获取广告价格，价格等级和模版车id
const adPrice = ref(0)
const exampleCarId = ref('')
const priceLevel = ref('')
axios.get('/vehicle/getAdPrice', {
  params: {
    adLevel: props.level.toUpperCase(),
    price: props.sellPrice,
    type: props.type
  }
}).then((res) => {
  adPrice.value = res.data.data
  return res
}).then((res) => {
  if (res.data.code === 1000) {
    axios.get('/example/car/getCarByModel', {
      params: {
        model: props.model
      }
    }).then((res) => {
      exampleCarId.value = res.data.data.id
    })
  }
  return res
}).then((res) => {
  if (res.data.code === 1000) {
    axios.get('/vehicle/getCarPriceLevel', {
      params: {
        price: props.sellPrice
      }
    }).then((res) => {
      priceLevel.value = res.data.data
      loading.close()
    })
  }
})

// 确认广告，弹窗提示是否进行支付
const confirmVisible = ref(false)
const createdId = ref('')
const confirmAd = function () {
  // 调用全屏加载服务
  const loading = ElLoading.service({lock: true, text: t('loading'), fullscreen: true})
  confirmVisible.value = false
  // 敏感内容监测
  let temp = axios.post("/detect/detectSensitiveContent", "", {
    params: {
      str: props.description
    }
  }).then(function (res) {
    temp = res.data.data;
  }).then(function () {
    // 首先构造发送的body，json格式
    const createCarJson = {
      "exampleVehicleId": exampleCarId.value,
      "purchaseDate": props.purchaseDate,
      "productionDate": props.productionDate,
      "bigFrame": props.bigFrame,
      "province": props.province,
      "city": props.city,
      "county": props.county,
      "town": props.town,
      "priceLevel": priceLevel.value,
      "adLevel": props.level.toUpperCase(),
      "price": props.sellPrice,
      "kilometers": props.kilometers,
      "description": temp,
      "showContactNum": props.showContactNum,
      "ifAccident": props.ifAccident,
      "contactNum": props.contactNum,
      "ifShippingDamage": props.ifShippingDamage

    }
    // 判断二手车或新车接口
    let url = ''
    if (props.type === 'SECONDHANDCARAD') {
      url = '/car/secondHandCar/createSecondHandCarAd'
    } else if (props.type === 'NEWCARAD') {
      url = '/car/newCar/createNewCarAd'
    } else if (props.type === "NEWMOTORAD") {
      url = '/motor/newMotor/createNewMotorAd'
    } else if (props.type === "SECONDHANDMOTORAD") {
      url = '/motor/secondHandMotor/createSecondHandMotorAd'
    }

    axios.post(url, createCarJson, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      if (res.data.code === 1000) {
        // 保存返回的id
        createdId.value = res.data.data

        // 弹出提示信息
        ElMessage.success({
          showClose: true,
          message: t('createAdSuccess'),
          customClass: 'message'
        })

        // 打开支付窗口
        goToPay.value = true
      } else {
        // 弹出提示信息
        ElMessage.error({
          showClose: true,
          message: t('createAdFail'),
          customClass: 'message'
        })
      }
      loading.close()
    })
  })
}

// 设置功能显示
const functions = []
switch (props.level) {
  case 'standard':
    functions.push(t('adFunctionOne'))
    functions.push(t('adFunctionTwo'))
    functions.push(t('adFunctionThree'))
    break
  case 'advanced':
    functions.push(t('adFunctionOne'))
    functions.push(t('adFunctionTwo'))
    functions.push(t('adFunctionFour'))
    break
  case 'elite':
    functions.push(t('adFunctionOne'))
    functions.push(t('adFunctionFive'))
    functions.push(t('adFunctionSeven'))
    break
}

// 弹出支付方式选择
const paymentVisible = ref(false)
const payment = function() {
  paymentVisible.value = true
}
const paymentTitle = t('choosePayment')

const goToPay = ref(false)

const notPay = function() {
  goToPay.value = false
  router.push('/user/manage')
}
</script>

<style scoped>
.title {
  font-weight: bolder;
  font-size: 1vw;
}

.price {
  font-weight: bolder;
  font-size: 1vw;
}

.functions {
  font-size: 1vw;
  font-weight: lighter;
  margin-bottom: 3vh;
}

.info {
  text-align: left;
  color: #909399;
  margin-left: 3vw;
  margin-right: 3vw;
  display:flex;
  font-size: 1vw;
}

.function {
  margin-top: 0;
}

.button {
  width: 10vw;
  font-size: 1vw;
  margin-top: 1.5vh;
  margin-bottom: 2vh;
}

.confirmNotice {
  color: #F56C6C;
}

.card{
  width: 21vw;
}
</style>