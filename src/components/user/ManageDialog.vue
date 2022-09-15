<!--
 * @Description: 用户管理载具界面弹出的对话框
 * @Author: Mo Xu
 * @Date: 26/5/2022
-->
<template>
  <el-dialog v-model="visible" :title="title" center>
    <div v-if="type === 'payment'">
      <el-row class="showMoneyRow">
        <el-col :span="24">{{ $t('needToPay') + adPrice + " 元" }}</el-col>
      </el-row>
      <el-row justify="space-evenly" :gutter="30">
        <el-col :span="8" class="alipay" @click="aliPay()">
          <el-image :src="alipayLogo"/>
          <p class="p">{{ $t('useAlipay') }}</p>
        </el-col>

        <el-col :span="8" class="wechatpay" @click="wechatPay">
          <el-image :src="wechatLogo"/>
          <p class="p">{{ $t('useWechatPay') }}</p>

          <!--二维码显示弹窗-->
          <el-dialog
              v-model="wechatPayVisible"
              title="微信扫码支付"
              center
              style="--el-dialog-width: 40vw !important; margin-top: 28vh !important;"
          >
            <p style="margin-bottom: 3vh;text-align: center">{{$t('wechatPayMoney')}}{{adPrice}}</p>
            <div class="wechatCode">
              <qrcode-vue :value="wechatCodeUrl" size="180" level="H" />
            </div>
            <p style="margin-top: 5vh;text-align: center; color: red">{{$t('wechatPayTip')}}</p>
            <template #footer>
              <span class="dialog-footer">
              <el-button @click="wechatPayVisible = false" style="width: 5vw;font-size: 0.8vw">取消</el-button>
                <el-button type="primary" @click="wechatPayfinsh" style="width: 5vw;font-size: 0.8vw">已完成支付</el-button>
              </span>
            </template>
          </el-dialog>
        </el-col>

        <el-col :span="8" class="promoPay" @click="promoPay()">
          <el-image :src="promo"/>
          <p class="p">{{ $t('usePromoPay') }}</p>
        </el-col>
      </el-row>
    </div>

    <div v-if="type === 'upload'">
      <div>
        <h3>{{ $t('uploadImages') }}</h3>
        <p class="p1">{{ $t('uploadImagesDescription') }}</p>
        <el-upload
            list-type="picture-card"
            :file-list="imageList"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-change="cropperHandle"
            limit="6">
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogImageVisible">
          <el-image :src="dialogImageUrl"/>
        </el-dialog>
      </div>

      <div v-if="props.level !== 'STANDARD'">
        <h3>{{ $t('uploadVideos') }}</h3>
        <p class="p1">{{ $t('uploadVideosDescription') }}</p>
        <el-upload
            :file-list="videoList"
            :auto-upload="false"
            :on-change="uploadVideoHandle"
            limit="2">
          <el-button class="button" type="primary">{{ $t('clickToUpload') }}</el-button>
        </el-upload>
      </div>

      <el-divider/>

      <div class="buttonDiv">
        <el-button class="button" type="success" @click="confirmUpload">{{ $t('confirmUpload') }}</el-button>
      </div>

      <el-dialog :title="t('pleaseCrop')" v-model="cropperVisible" center>
        <h3>{{ $t('cropDescription') }}</h3>
        <div class="cropper">
          <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :fixedBox="option.fixedBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :centerBox="option.centerBox"
              :high="option.high"
              :infoTrue="option.infoTrue"/>
        </div>
        <div class="buttonDiv">
          <el-button class="cropButton" type="primary" @click="confirmCrop">{{ $t('confirmCrop') }}</el-button>
        </div>
      </el-dialog>
    </div>

    <div v-if="type === 'complete'">
      <h3>{{ $t('pleaseEnterRealPrice') }}</h3>
      <el-input type="number" v-model="realPrice" :placeholder="t('realPrice')" />
      <div class="buttonDiv">
        <el-button class="completeButton" type="primary" @click="confirmComplete">{{ $t('confirmComplete') }}</el-button>
      </div>
    </div>

    <div v-if="type === 'cancel'">
      <h3 class="cancel">{{ $t('pleaseConfirmCancel') }}</h3>
      <div class="buttonDiv">
        <el-button class="completeButton" type="primary" @click="confirmCancel">{{ $t('confirmCancel') }}</el-button>
      </div>
    </div>

    <div v-if="type === 'changePrice'">
      <h3 class="changePrice">{{ $t('pleaseConfirmChange') }}</h3>
      <el-input type="number" v-model="newPrice" />
      <div class="buttonDiv">
        <el-button class="completeButton" type="primary" @click="confirmChangePrice">{{ $t('confirmChange') }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import {ref, defineProps} from 'vue'
import axios from '../../request'
import {useStore} from 'vuex'
import {ElLoading, ElMessage} from 'element-plus'
import {useI18n} from 'vue-i18n'
import {
  Plus
} from '@element-plus/icons-vue'
import 'vue-cropper/dist/index.css'
import { VueCropper }  from "vue-cropper"
import {useRouter} from "vue-router";
import QrcodeVue from 'qrcode.vue'

// 调用语言包，store
const store = useStore()
const {t} = useI18n()
const router = useRouter()

const props = defineProps({
  visible: Boolean,
  title: String,
  type: String,
  adPrice: String,
  level: String,
  adType: String,
  id: String
})
const visible = ref(props.visible)

// 处理图片
const imageList = ref([])
const dialogImageUrl = ref('')
const dialogImageVisible = ref(false)
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogImageVisible.value = true
}

// 处理裁剪
const cropperVisible = ref(false)
const cropper = ref(null)
const cropperHandle = (file) => {
  // console.log(file)
  // 只支持jpeg/jpg/png格式的图片
  if (file.raw.type !== 'image/jpg'
      && file.raw.type !== 'image/png'
      && file.raw.type !== 'image/jpeg') {
    ElMessage.error(t('imageFormatLimit'))
    imageList.value.pop()
    return false
  }

  // 只支持大小在5M以内的图片
  if (file.size >= 5000000) {
    ElMessage.error(t('imageFormatLimit'))
    imageList.value.pop()
    return false
  }

  // 设置裁剪的图片
  option.value.img = file.url
  cropperVisible.value = true
}

// 裁剪配置
const option = ref({
  img: '',
  outputSize: 1, // 裁剪生成图片的质量
  outputType: 'png', // 裁剪生成图片的格式
  canScale: true, // 图片是否允许滚轮缩放
  autoCrop: true, // 是否默认生成截图框
  canMoveBox: false, // 截图框能否拖动
  canMove: true, // 图片是否能拖动
  autoCropWidth: 900, // 默认生成截图框宽度
  autoCropHeight: 600, // 默认生成截图框高度
  fixedBox: true, // 固定截图框大小 不允许改变
  fixed: true, // 是否开启截图框宽高固定比例
  fixedNumber: [3, 2], // 截图框的宽高比例
  full: false, // 是否输出原图比例的截图
  original: false, // 上传图片按照原始比例渲染
  centerBox: false, // 截图框是否被限制在图片里面
  infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  max: 10000
})

// 确认裁剪
const confirmCrop = function() {
  cropper.value.getCropBlob((blob) => {
    imageList.value[imageList.value.length - 1].url = URL.createObjectURL(blob)
  })
  cropperVisible.value = false
}

// 处理视频
const videoList = ref([])
const uploadVideoHandle = (file) => {
  // 只支持jpeg/jpg/png格式的图片
  if (file.raw.type !== 'video/mp4' && file.raw.type !== 'video/mkv' && file.raw.type !== 'video/avi') {
    ElMessage.error(t('videoFormatLimit'))
    videoList.value.pop()
  }
}

// 获取用户token
const token = store.getters.getAuth

// 确认上传
const confirmUpload = function() {
  if (imageList.value.length > 6) {
    // 校验失败，弹出提示信息
    ElMessage.error({
      showClose: true,
      message: t('imageNotEnough'),
      customClass: 'message'
    })
    return
  }

  if (videoList.value.length > 0 && videoList.value.length < 2) {
    // 校验失败，弹出提示信息
    ElMessage.error({
      showClose: true,
      message: t('videoNotEnough'),
      customClass: 'message'
    })
    return
  }

  let uploadForm = new FormData()

  imageList.value.forEach((value) => {
    uploadForm.append('file', value.raw)
  })

  // 开启全屏加载
  const loading = ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })

  // 上传图片
  axios.post('/vehicle/uploadFiles', uploadForm, {
    params: {
      id: props.id,
      fileType: 'IMAGE'
    },
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    if (res.data.code !== 1000) {
      // 校验失败，弹出提示信息
      ElMessage.error({
        showClose: true,
        message: t('uploadFail'),
        customClass: 'message'
      })
    } else {
      // 校验成功，弹出提示信息
      ElMessage.success({
        showClose: true,
        message: t('uploadSuccess'),
        customClass: 'message'
      })
    }

    loading.close()
    router.go(0)
    // return res
  })

    //   .then((res) => {
    // // 如果成功上传图片并且有视频，则开始上传视频
    // if (res.data.code === 1000 && videoList.value.length > 0) {
    //   uploadForm = new FormData()
    //
    //   videoList.value.forEach((value) => {
    //     uploadForm.append('file', value.raw)
    //   })
    //
    //   axios.post('/vehicle/uploadFiles', uploadForm, {
    //     params: {
    //       id: props.id,
    //       fileType: 'VIDEO'
    //     },
    //     headers: {
    //       Authorization: token,
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }).then((res) => {
    //     if (res.data.code !== 1000) {
    //       // 校验失败，弹出提示信息
    //       ElMessage.error({
    //         showClose: true,
    //         message: t('uploadFail'),
    //         customClass: 'message'
    //       })
    //     } else {
    //       // 成功
    //       ElMessage.error({
    //         showClose: true,
    //         message: t('uploadSuccess'),
    //         customClass: 'message'
    //       })
    //     }
    //     // 关闭加载
    //     // loading.close()
    //     // ElMessage.success({
    //     //   showClose: true,
    //     //   message: t('uploadSuccess'),
    //     //   customClass: 'message'
    //     // })
    //     router.go(0)
    //   })
    // } else {
    //   // 成功
    //   ElMessage.error({
    //     showClose: true,
    //     message: t('uploadSuccess'),
    //     customClass: 'message'
    //   })
    //   router.go(0)
    // }
  // })
}

// 设置宽度
const width = ref('1vw')
if (props.type === 'payment') {
  width.value = '30vw'
} else if (props.type === 'upload') {
  width.value = '50vw'
} else if (props.type === 'complete') {
  width.value = '30vw'
} else if (props.type === 'cancel') {
  width.value = '30vw'
} else if (props.type === 'changePrice') {
  width.value = '30vw'
}

// 获取支付logo图片
const alipayLogo = require('../../assets/imgs/alipay_logo.png')
const wechatLogo = require('../../assets/imgs/wechat_logo.png')
const promo = require('../../assets/imgs/promo.png')

// 支付宝支付
const aliPay = function () {
  // 调用全屏加载服务
  ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })
  axios.post("/alipay/pay", {}, {
    params: {
      adId: props.id
    },
    headers: {
      Authorization: token
    }
  }).then((res) => {
    const div = document.createElement('div')
    div.innerHTML = res.data.data
    document.body.appendChild(div)
    document.forms[0].submit()
  })
}

const wechatPayVisible = ref(false);
const wechatCodeUrl = ref("");

// 微信支付
const wechatPay = function (){
  wechatPayVisible.value = true;
  axios.post("/wechat/pay", {}, {
    params: {
      id: props.id
    },
    headers: {
      Authorization: token
    }
  }).then((res) => {
    // console.log(res)
    wechatCodeUrl.value = res.data.data;
  })
}

// 优惠码支付
const promoPay = function () {
  // 调用全屏加载服务
  const loading = ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })
  axios.post("/alipay/pay", {}, {
    params: {
      adId: props.id
    },
    headers: {
      Authorization: token
    }
  }).then((res) => {
    if (res.data.code === 1000) {
      router.push({path: '/pay/validateTrade', query: {'out_trade_no': res.data.data}})
    } else {
      ElMessage.error({
        showClose: true,
        message: t('promoPayFail'),
        customClass: 'message'
      })
      loading.close()
    }
  })
}

// 完成广告功能
const realPrice = ref(0)
const confirmComplete = function() {
  let url = ''
  if (props.adType === 'NEWCARAD') {
    url = '/car/newCar/completeNewCarAd'
  } else if (props.adType === 'SECONDHANDCARAD') {
    url = '/car/secondHandCar/completeSecondHandCarAd'
  } else if(props.adType === "NEWMOTORAD"){
    url = "/motor/newMotor/completeNewMotorAd"
  } else if(props.adType === "SECONDHANDMOTORAD"){
    url = "/motor/secondHandMotor/completeSecondHandMotorAd"
  }
  const realPriceFloat = parseFloat(realPrice.value)
  // 开启全屏加载
  ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })

  axios.post(url, {}, {
    params: {
      id: props.id,
      realPrice: realPriceFloat
    },
    headers: {
      Authorization: token
    }
  }).then((res) => {
    if (res.data.code === 1000) {
      router.go(0)
    } else {
      ElMessage.error({
        showClose: true,
        message: t('completeFail'),
        customClass: 'message'
      })
    }
  })
}

// 取消广告功能
const confirmCancel = function() {
  let url = ''
  if (props.adType === 'NEWCARAD') {
    url = '/car/newCar/cancelNewCarAd'
  } else if (props.adType === 'SECONDHANDCARAD') {
    url = '/car/secondHandCar/cancelSecondHandCarAd'
  } else if(props.adType === "NEWMOTORAD"){
    url = "/motor/newMotor/cancelNewMotorAd"
  } else if(props.adType === "SECONDHANDMOTORAD"){
    url = "/motor/secondHandMotor/cancelSecondHandMotorAd"
  }

  // 开启全屏加载
  ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })

  axios.post(url, {}, {
    params: {
      id: props.id
    },
    headers: {
      Authorization: token
    }
  }).then((res) => {
    if (res.data.code === 1000) {
      router.go(0)
    } else {
      ElMessage.error({
        showClose: true,
        message: t('cancelFail'),
        customClass: 'message'
      })
    }
  })
}

// 修改价格功能
const newPrice = ref(0)
const confirmChangePrice = () => {
  // 开启全屏加载
  ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })

  axios.post("/vehicle/changePrice", {}, {
    params: {
      id: props.id,
      type: props.adType,
      price: newPrice.value
    },
    headers: {
      Authorization: token
    }
  }).then((res) => {
    if (res.data.code === 1000) {
      ElMessage.success({
        showClose: true,
        message: t('changePriceSuccess'),
        customClass: 'message'
      })
    } else {
      ElMessage.error({
        showClose: true,
        message: t('changePriceFail'),
        customClass: 'message'
      })
    }
    router.go(0)
  })
}

// 完成支付刷新页面
function wechatPayfinsh(){
  wechatPayVisible.value = false
  router.go(0);
}

</script>

<style scoped>
.showMoneyRow {
  margin-bottom: 2vh;
  font-size: 1.5vw;
  text-align: center;
}

.alipay, .wechatpay, .promoPay {
  cursor: pointer;
}

.p {
  color: #909399;
  text-align: center;
  font-size: 1vw;
}

.p1 {
  color: #909399;
}

.cropper {
  width: 900px;
  height: 600px;
}

.buttonDiv {
  text-align: center;
}

.cropButton {
  margin-top: 2vh;
}

.completeButton {
  margin-top: 2vh;
}

.changePrice {
  color: #E6A23C;
}

.cancel {
  color: #F56C6C;
}

.wechatCode{
  width: 47vw;
  text-align: center;
}

:deep(.el-dialog__title){
  font-size: 1vw !important;
}

</style>