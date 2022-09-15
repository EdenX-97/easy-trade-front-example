<!--
 * @Description: 汽车出售页面
 * @Author: Mo Xu
 * @Date: 16/4/2022
-->
<template>
  <div class="sell">
    <!-- 当前标题 -->
    <h2 v-if="active !== 5">{{ title }}</h2>

    <!-- 选择器和按钮 -->
    <el-space class="selectSpace" v-if="active !== 5" direction="vertical" fill>
      <!-- 品牌选择器 -->
      <div v-if="active === 0">
        <el-select
            class="select"
            v-model="brand"
            filterable
            :placeholder="$t('pleaseSelect')">
          <el-option
              v-for="item in allBrands"
              :key="item"
              :label="item"
              :value="item"/>
        </el-select>
      </div>

      <!-- 车系选择器 -->
      <div v-if="active === 1">
        <el-select
            class="select"
            v-model="series"
            filterable
            :placeholder="$t('pleaseSelect')">
          <el-option
              v-for="item in allSeries"
              :key="item"
              :label="item"
              :value="item"/>
        </el-select>
      </div>

      <!-- 车型选择器 -->
      <div v-if="active === 2">
        <el-select
            class="select"
            v-model="model"
            filterable
            :placeholder="$t('pleaseSelect')">
          <el-option
              v-for="item in allModels"
              :key="item"
              :label="item"
              :value="item"/>
        </el-select>
      </div>

      <!-- 地址选择器 -->
      <el-space v-if="active === 3" direction="vertical" fill>
        <div>
          <el-select
              class="select"
              v-model="province"
              filterable
              :placeholder="$t('pleaseSelectProvince')"
              @change="getCities()">
            <el-option
                v-for="item in allProvinces"
                :key="item"
                :label="item"
                :value="item"/>
          </el-select>
        </div>

        <div>
          <el-select
              class="select"
              v-model="city"
              filterable
              :placeholder="$t('pleaseSelectCity')"
              @change="getCounties()">
            <el-option
                v-for="item in allCities"
                :key="item"
                :label="item"
                :value="item"/>
          </el-select>
        </div>

        <div>
          <el-select
              class="select"
              v-model="county"
              filterable
              :placeholder="$t('pleaseSelectCounty')"
              @change="getTowns()">
            <el-option
                v-for="item in allCounties"
                :key="item"
                :label="item"
                :value="item"/>
          </el-select>
        </div>

        <div>
          <el-select
              class="select"
              v-model="town"
              filterable
              :placeholder="$t('pleaseSelectTown')">
            <el-option
                v-for="item in allTowns"
                :key="item"
                :label="item"
                :value="item"/>
          </el-select>
        </div>
      </el-space>

      <!-- 其他信息确认 -->
      <el-space v-if="active === 4" direction="vertical" fill>
        <!-- 描述输入 -->
        <div>
          <el-input
              v-model="description"
              :autosize="{ minRows: 2}"
              type="textarea"
              :placeholder="$t('pleaseInputDescription')"
              show-word-limit
              maxlength="250"
          />
        </div>

        <!-- 是否是新车 -->
        <div>
          <el-select
              class="select"
              v-model="carType"
              filterable
              :placeholder="$t('pleaseSelectCarType')">
            <el-option
                v-for="item in carTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
          </el-select>
        </div>

        <!-- 选择购买日期 -->
        <div>
          <el-date-picker v-model="purchaseDate" type="date" :placeholder="$t('PleaseSelectPurchaseDate')"/>
        </div>

        <!-- 输入大架号 -->
        <div>
          <el-input class="input" v-model="bigFrame" :placeholder="$t('pleaseInputBigFrame')"/>
        </div>

        <!-- 输入公里数 -->
        <div>
          <el-input class="input" v-model="kilometers" :placeholder="$t('pleaseInputKilometers')"/>
        </div>

        <!-- 输入联系方式 -->
        <div>
          <el-input class="input" v-model="contact" :placeholder="$t('pleaseInputContact')"></el-input>
        </div>

        <!-- 选择是否显示联系方式 -->
        <div>
          <el-switch v-model="ifShowContact" :active-text="$t('ifShowContact')"></el-switch>
        </div>

        <!-- 选择是否有发生过事故 -->
        <div>
          <el-switch v-model="ifAccident" :active-text="$t('ifAccident')"></el-switch>
        </div>

        <!-- 选择是否为库存货 -->
        <div>
          <el-switch v-model="ifStock" :active-text="$t('ifStock')"></el-switch>
        </div>

        <!-- 选择是否为运损 -->
        <div>
          <el-switch v-model="ifShippingDamage" :active-text="$t('ifShippingDamage')"></el-switch>
        </div>

        <!-- 输入出售价格 -->
        <div>
          <el-input class="input" v-model="price" :placeholder="$t('pleaseInputPrice')" />
        </div>
        <p class="priceNotice">{{ $t('priceNotice') }}</p>
      </el-space>

      <!-- 上一步和下一步按钮 -->
      <div class="buttons">
        <el-button class="button" type="primary" size="large" plain @click="previousStep">{{ $t('back') }}</el-button>
        <el-button class="rightButton" type="primary" size="large" @click="nextStep">{{ $t('continue') }}</el-button>
      </div>
    </el-space>

    <!-- 选择广告等级 -->
    <el-space class="levelSpace" v-if="active === 5" direction="vertical" fill>
      <!-- 显示车型和修改链接 -->
      <h3 class="changeModel">
        {{ name }}
        <el-link class="changeModelLink" type="primary" @click="changeModel()">{{ $t('changeModel') }}</el-link>
      </h3>
      <!-- 显示地址和修改链接 -->
      <h4 class="changeAddress">
        {{ address }}
        <el-link class="changeAddressLink" type="primary" @click="changeAddress()">{{ $t('changeAddress') }}</el-link>
      </h4>

      <!-- 显示选择广告标题 -->
      <h2>{{ $t('pleaseSelectYourAdLevel') }}</h2>

      <!--<el-row class="adRow" :gutter="40">-->
        <!--<el-col :span="8" v-for="iteLevel in ['standard', 'advanced', 'elite']" :key="iteLevel">-->
      <el-row class="adRow" justify="center" :gutter="40">
        <el-col :span="8" v-for="iteLevel in ['standard']" :key="iteLevel">
          <select-car-card
              :level="iteLevel"
              :sellPrice="price"
              :type="carType"
              :model="model"
              :purchaseDate="purchaseDate"
              :bigFrame="bigFrame"
              :kilometers="kilometers"
              :province="province"
              :city="city"
              :county="county"
              :town="town"
              :description="description"
              :showContactNum="ifShowContact"
              :ifAccident="ifAccident"
              :contactNum="contact"
              :ifShippingDamage="ifShippingDamage"
              :ifStock="ifStock"/>
        </el-col>
      </el-row>
    </el-space>

    <!-- 分割线 -->
    <el-divider v-if="active !== 5"/>

    <!-- 进度条 -->
    <el-steps v-if="active !== 5" class="steps" :active="active">
      <el-step :title="$t('selectBrand')" />
      <el-step :title="$t('selectSeries')" />
      <el-step :title="$t('selectModel')" />
      <el-step :title="$t('selectAddress')" />
      <el-step :title="$t('otherInfo')" />
      <el-step :title="$t('selectLevel')" />
    </el-steps>
  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n"
import {ref} from "vue";
import {ElLoading, ElMessage} from "element-plus"
import axios from '../../request'
import SelectCarCard from "@/components/car/SelectCarCard"
import {useStore} from "vuex";
import router from "@/router";

// 调用语言包
const store = useStore()

// 调用语言包，路由，store
const {t} = useI18n()

// token用于身份验证
const token = store.getters.getAuth

// onBeforeMount(() => {
//   console.log(token)
//   // 如果未登陆则跳转到注册页面
//   if(token === "" || token === null || token === 'undefined'){
//     router.push({name: 'login'});
//   }
// })

if(token === "" || token === null || token === 'undefined'){
  router.push({name: 'login'});
}

// 更换的标题
const title = ref('')
const setTitle = function() {
  switch (active.value) {
    case 0:
      title.value = t('pleaseSelectYourCarBrand')
      break
    case 1:
      title.value = t('pleaseSelectYourCarSeries')
      break
    case 2:
      title.value = t('pleaseSelectYourCarModel')
      break
    case 3:
      title.value = t('pleaseSelectYourAddress')
      break
    case 4:
      title.value = t('pleaseConfirmOtherInfo')
  }
}

// 当前激活的步骤
const active = ref(0)
setTitle()

// 定义的汽车类型
const carTypes = [
  {
    value: 'NEWCARAD',
    label: t('newCar')
  }, {
    value: 'SECONDHANDCARAD',
    label: t('secondHandCar')
  }
]

// 选择的品牌/车系/车型/省/市/县/镇/价格/名称/地址/类型/描述/购买日期/出厂日期/大架号/公里数
const brand = ref('')
const series = ref('')
const model = ref('')
const province = ref('')
const city = ref('')
const county = ref('')
const town = ref('')
const price = ref('')
const name = ref('')
const address = ref('')
const carType = ref('')
const description = ref('')
const purchaseDate = ref('')
const bigFrame = ref('')
const kilometers = ref('')
const contact = ref('')
const ifShowContact = ref(true)
const ifAccident = ref(false)
const ifShippingDamage = ref(false)
const ifStock = ref(false)

// 检查输入数据的格式
const checkData = function() {
  const bigFrameRegex = /^[A-HJ-NPR-Z0-9]{8}[X0-9][A-HJ-NPR-Z0-9]{3}[0-9]{5}$/
  if (!bigFrameRegex.test(bigFrame.value)) {
    ElMessage.error({
      showClose: true,
      message: t('bigFrameFormatWrong'),
      customClass: 'message'
    })
    return true
  }

  const kilometersRegex = /[1-9]\d*/
  if (!kilometersRegex.test(kilometers.value)) {
    ElMessage.error({
      showClose: true,
      message: t('kilometersFormatWrong'),
      customClass: 'message'
    })
    return true
  }

  const priceRegex = /[1-9]\d*/
  if (!priceRegex.test(price.value)) {
    ElMessage.error({
      showClose: true,
      message: t('priceFormatWrong'),
      customClass: 'message'
    })
    return true
  }

  const phoneRegex = /^1[0-9]{10}$/
  if (!phoneRegex.test(contact.value)) {
    ElMessage.error({
      showClose: true,
      message: t('contactFormatWrong'),
      customClass: 'message'
    })
    return true
  }

  if ((ifAccident.value && ifShippingDamage.value) ||
      (ifAccident.value && ifStock.value) ||
      (ifShippingDamage.value && ifStock.value)) {
    ElMessage.error({
      showClose: true,
      message: t('cannotBothAccidentAndShippingDamage'),
      customClass: 'message'
    })
    return true
  }
}

// 提示信息函数
const alertMessage = function (selectVal) {
  if (selectVal.value === '') {
    // 弹出提示信息
    ElMessage.error({
      showClose: true,
      message: t('pleaseSelectInfo'),
      customClass: 'message'
    })
    return true
  } else if (selectVal.value === 0) {
    // 弹出提示信息
    ElMessage.error({
      showClose: true,
      message: t('cannotUseZeroNum'),
      customClass: 'message'
    })
    return true
  }
}

// 下一步按钮操作
const nextStep = function() {
  // 开启全屏加载
  const loading = ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })

  // 对应每一步进行检查信息是否输入
  switch (active.value) {
    case 0:
      if (alertMessage(brand)) {
        loading.close()
        return
      }
      getSeries(loading)
      break
    case 1:
      if (alertMessage(series)) {
        loading.close()
        return
      }
      getModels(loading)
      break
    case 2:
      if (alertMessage(model)) {
        loading.close()
        return
      }
      break
    case 3:
      if (alertMessage(province) ||
          alertMessage(city) ||
          alertMessage(county) ||
          alertMessage(town)) {
        loading.close()
        return
      }
      break
    case 4:
      if (alertMessage(price) ||
          alertMessage(carType) ||
          alertMessage(description) ||
          alertMessage(purchaseDate) ||
          alertMessage(bigFrame) ||
          alertMessage(kilometers) ||
          checkData()) {
        // 检查大架号
        loading.close()
        return
      }
      setCarName()
      setAddress()
      break
  }
  active.value += 1
  setTitle()
  loading.close()
}

// 设置车名
const setCarName = function() {
  name.value = model.value.substring(0, model.value.lastIndexOf('-') - 1)
}

// 设置地址
const setAddress = function() {
  if (province.value === city.value) {
    address.value = province.value + ' ' + county.value + ' ' + town.value
  } else {
    address.value = province.value + ' ' + city.value + ' ' + county.value + ' ' + town.value
  }
}

// 上一步按钮操作
const previousStep = function() {
  // 第一步无法退回
  if (active.value === 0) {
    // 弹出提示信息
    ElMessage.error({
      showClose: true,
      message: t('firstStepCannotGoPrevious'),
      customClass: 'message'
    })
    return
  }
  setTitle()
  active.value -= 1
}

// 获取所有品牌
const allBrands = ref([])
axios.get('/example/car/getBrands').then((res) => {
  allBrands.value = res.data.data
})

// 根据品牌获取车系
const allSeries = ref([])
const getSeries = function(loading) {
  axios.get('/example/car/getSeriesByBrand', {
    params: {
      brand: brand.value
    }
  }).then((res) => {
    allSeries.value = res.data.data
  })
  loading.close()
}

// 根据车系获取车型
const allModels = ref([])
const getModels = function(loading) {
  axios.get('/example/car/getModelsBySeries', {
    params: {
      series: series.value
    }
  }).then((res) => {
    allModels.value = res.data.data
  })
  loading.close()
}

// 获取所有省份
const allProvinces = ref([])
axios.get('/area/getProvinces').then((res) => {
  allProvinces.value = res.data.data
})

// 根据省份来获取对应的市
const allCities = ref([])
const getCities = function() {
  // 开启全屏加载
  const loading = ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })
  axios.get('/area/getCitiesByProvince', {
    params: {
      province: province.value
    }
  }).then((res) => {
    allCities.value = res.data.data
    loading.close()
  })
}

// 根据市来获取对应的县
const allCounties = ref([])
const getCounties = function() {
  // 开启全屏加载
  const loading = ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })
  axios.get('/area/getCountiesByCity', {
    params: {
      province: province.value,
      city: city.value
    }
  }).then((res) => {
    allCounties.value = res.data.data
    loading.close()
  })
}

// 根据县来获取对应的镇
const allTowns = ref([])
const getTowns = function() {
  // 开启全屏加载
  const loading = ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })
  axios.get('/area/getTownsByCounty', {
    params: {
      province: province.value,
      city: city.value,
      county: county.value
    }
  }).then((res) => {
    allTowns.value = res.data.data
    loading.close()
  })
}

// 更换车型
const changeModel = function() {
  brand.value = ''
  series.value = ''
  model.value = ''
  active.value = 0
}

// 更换地址
const changeAddress = function() {
  province.value = ''
  city.value = ''
  county.value = ''
  town.value = ''
  price.value = ''
  active.value = 3
}
</script>

<style scoped>
.sell {
  text-align: left;
  margin-left: 30vw;
  margin-right: 30vw;
  padding-top: 4vh;
  height: 84vh;
}

.selectSpace {
  margin-top: 1vh;
  width: 100%;
}

.select {
  width: 20vw;
  margin-bottom: 1vh;
}

.buttons {
  margin-top: 3vh;
}

.rightButton {
  float: right;
}

:deep(.el-divider) {
  margin-top: 5vh;
  margin-bottom: 5vh;
}

.levelSpace {
  margin-top: 4vh;
  text-align: center;
  margin-left: -10vw;
  width: 60vw;
}

.changeModel {
  margin: 0;
}

.changeAddress {
  margin: 0;
}

.input {
  width: 9vw;
}

.priceNotice {
  color: #E6A23C;
  font-size: 14px;
}

.changeModelLink {
  font-size: 0.9em;
  margin-bottom: 3px;
}

.changeAddressLink {
  font-size: 1em;
  margin-bottom: 4px;
}

:deep(.el-steps.el-steps--horizontal.steps){
  width: 40vw;
}

:deep(.el-step__title.is-process){
  font-size: 1vw;
}

:deep(.el-step__title.is-wait){
  font-size: 1vw;
}

:deep(.el-step__title.is-finish){
  font-size: 1vw;
}

:deep(.el-select.select){
  width: 18vw;
}

:deep(.el-input__inner){
  width: 18vw;
  font-size: 1vw;
}

:deep(.el-textarea__inner){
  font-size: 1vw;
}

:deep(.el-switch__label) {
  font-size: 1vw;
}

:deep(.el-switch) {
  width: 100%;
}
</style>