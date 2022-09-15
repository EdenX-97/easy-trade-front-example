<!--
 * @Description: 验证交易
 * @Author: Mo Xu
 * @Date: 26/5/2022
-->
<template>
  <p></p>
</template>

<script setup>
import axios from '../../request'
import {ref} from "vue"
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import {useI18n} from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const store = useStore()
const {t} = useI18n()

// 从router中取得当前汽车广告的id
const tradeNo = ref(route.query.out_trade_no)
const token = store.getters.getAuth
axios.post('/alipay/validateTrade', {}, {
  params: {
    tradeNo: tradeNo.value
  },
  headers: {
    Authorization: token
  }
}).then((res) => {
  if (res.data.code === 1000) {
    // 校验成功，弹出提示信息
    ElMessage.success({
      showClose: true,
      message: t('validateSuccess'),
      customClass: 'message'
    })
  } else {
    // 校验失败，弹出提示信息
    ElMessage.error({
      showClose: true,
      message: t('validateFail'),
      customClass: 'message'
    })
  }
  router.push('/user/manage')
})


</script>

<style scoped>

</style>