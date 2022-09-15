<!--
 * @Description: 
 * @Author: Mo Xu
 * @Date: 19/5/2022
-->
<template>
  <div class="background">
    <h2> {{$t('myAds')}} </h2>

    <!--&lt;!&ndash; 选择查看已完成/已取消按钮 &ndash;&gt;-->
    <!--<el-row class="buttonRow" justify="start">-->
    <!--  <el-col :span="2"><el-button type="success" @click="viewCompleted" plain round> {{ $t('onlyViewComplete') }} </el-button></el-col>-->
    <!--  &lt;!&ndash;<el-col :span="2"><el-button type="warning" plain round> {{ $t('onlyViewCanceled') }} </el-button></el-col>&ndash;&gt;-->
    <!--</el-row>-->

    <!-- 搜索框 -->
    <el-input
        v-model="researchInput"
        :placeholder="$t('pleaseEnterSearchTitle')"
        class="input"
        @input="searchTitle(researchInput)"
    >
      <template #prepend>
        <el-button :icon="Search" />
      </template>
    </el-input>

    <!-- 分页显示，一页9个卡片 -->
    <el-row v-for="(innerAdList, key) in adList[currentPage]" :key="key" class="cardRow">
      <el-col v-for="(id, key) in innerAdList" :key="key" :span="8">
        <manage-ad-card :key="id" :id="id"/>
      </el-col>
    </el-row>

    <!-- 分页功能 -->
    <div class="pagination">
      <el-pagination
          v-model:currentPage="currentPage"
          v-model:total="total"
          layout="prev, pager, next"
          :page-size="9"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {Search} from '@element-plus/icons-vue'
import ManageAdCard from "@/components/user/ManageAdCard"
import axios from '../../request'
import {useStore} from 'vuex'
import {useI18n} from 'vue-i18n'
import {ElLoading} from 'element-plus'

// 调用语言包，store
const store = useStore()
const {t} = useI18n()

// 获取用户token
const token = store.getters.getAuth

// 获取用户的载具列表
// 调用全屏加载服务
const loading = ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })
axios.get("/user/getUserAllVehicleAds", {
  headers: {
    Authorization: token
  }
}).then((res) => {
  setAds(res.data.data)
  loading.close()
  // 将列表传递到下一次调用
  return res.data.data
}).then((res) => {
  setUserOwnAdsMap(res)
})

// 设置广告列表
const adList = ref([[]])
let total = ref(0)
const setAds = function(secondHandCarAds) {
  adList.value = [[]]
  total.value = secondHandCarAds.length
  let i = 0
  let totalNum = 0
  let innerAdList = []
  let pageList = []
  for (let index in secondHandCarAds) {
    // 每3个存一个list
    if (i === 3) {
      // 一个innerAdList存满，就存到一页
      pageList.push(innerAdList)
      innerAdList = []
      innerAdList.push(secondHandCarAds[index])
      i = 0
    } else {
      innerAdList.push(secondHandCarAds[index])
    }
    i += 1
    totalNum += 1

    // 每1页存到adList中
    if (pageList.length === 3) {
      adList.value.push(pageList)
      pageList = []
    }

    // 如果剩余不满3个，则直接存
    if (totalNum === secondHandCarAds.length) {
      pageList.push(innerAdList)
      adList.value.push(pageList)
    }
  }
}

// // 查看已完成功能
// const viewCompleted = function() {
//   axios.get("/user/getUserCompletedCarAds", {
//     headers: {
//       Authorization: token
//     }
//   }).then((res) => {
//     console.log(res.data.data)
//     setAds(res.data.data)
//   })
// }

// 搜索功能
const researchInput = ref()
const searchTitle = function(researchInput) {
  const allAds = store.getters.getUserOwnAds
  const showAdList = []
  // 传入空则显示全部载具
  if (researchInput === '') {
    allAds.forEach((value, key) => {
      showAdList.push(key)
    })
    setAds(showAdList)
  } else {
    allAds.forEach((value, key) => {
      if (value.toLowerCase().includes(researchInput.toLowerCase())) {
        showAdList.push(key)
      }
    })
    setAds(showAdList)
  }
}

// 将用户拥有的所有载具id和标题存为map，搜索需要使用
const setUserOwnAdsMap = function(userOwnList) {
  for (let index in userOwnList) {
    const adId = userOwnList[index]
    axios.get("/vehicle/getVehicleTitleById", {
      params: {
        id: adId
      }
    }).then((res) => {
      const title = res.data.data
      let vehicleMap = store.getters.getUserOwnAds
      vehicleMap.set(adId, title)
      store.commit('setUserOwnAds', vehicleMap)
    })
  }
}

// 当前页数，默认为0
const currentPage = ref(1)
</script>

<style scoped>
.background {
  margin: 5vh 15vw;
  text-align: left;
}

.buttonRow {
  margin-bottom: 3vh;
}

.input {
  margin-bottom: 3vh;
  width: 20vw;
}

.cardRow {
  margin-bottom: 5vh;
}

.pagination {
  margin-left: auto;
  margin-right: auto;
  width: 32%;
  margin-bottom: 5vh;
}

:deep(.el-input__inner){
  font-size: 1vw;
}
</style>