<!--
 * @Description: 免费广告的管理界面
 * @Author: Mo Xu
 * @Date: 24/7/2022
-->
<template>
  <div class="background">
    <!-- 空间布局 -->
    <el-space class="space" direction="vertical" size="small" fill wrap>
      <el-row class="row">
        <!-- 第一列，显示用户姓名、认证情况 -->
        <el-col class="nameCol" :span="24">
          <h2>{{ $t('freeAdManage') }} </h2>
        </el-col>
      </el-row>

      <el-row class="row">
        <!-- 个人信息标题 -->
        <el-col :span="24">
          <h3> {{ $t('freeAd') }} </h3>
        </el-col>
      </el-row>

      <el-row class="row">
        <!-- 免费广告次数 -->
        <el-col :span="20">
          <h4> {{ $t('freeAdNum') }} </h4>
          <p> {{ freeAdNum }} </p>
        </el-col>

        <!-- 使用优惠码链接 -->
        <el-col class="linkCol" :span="4">
          <el-link class="link" type="primary" :underline="false" @click="showUsePromo()">{{ $t('usePromo') }}</el-link>
        </el-col>
        <el-divider class="divider" />
        <el-dialog v-model="usePromoVisible" :title="usePromoTitle" width="38%" center>
          <!-- 使用优惠码表单 -->
          <el-form
              class="form"
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="rules"
              label-position="top"
              status-icon>
            <!-- 优惠码输入 -->
            <el-form-item class="item" :label="$t('promoCode')" prop="promoCode">
              <el-input
                  v-model="ruleForm.promoCode"
                  maxlength="6"
                  :placeholder="$t('pleaseEnterPromoCode')"
                  class="input">
              </el-input>
            </el-form-item>

            <p class="usePromoNotice"> {{ $t('usePromoNotice') }} </p>

            <!-- 确认按钮 -->
            <el-form-item class="item">
              <el-button round size="large" type="primary" @click="usePromo(ruleFormRef)" class="confirmButton">
                {{ $t('confirm') }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-row>
    </el-space>
  </div>

</template>

<script setup>
import 'element-plus/dist/index.css'
import axios from '../../request'
import {useStore} from 'vuex'
import {reactive, ref} from 'vue'
import {ElLoading} from 'element-plus'
import {ElMessage} from 'element-plus'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'


// 调用语言包，路由，store
const {t} = useI18n()
const router = useRouter()
const store = useStore()

// 调用全屏加载服务
const loading = ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })

// 判断是否已登录，如果未登录，弹出提示，返回上一页面
const token = store.getters.getAuth
if (token === '' || !token.startsWith('Bearer ')) {
  // 弹出提示信息
  ElMessage.error({
    showClose: true,
    message: t('unLogin'),
    customClass: 'message'
  })

  // 返回主页
  router.push('/')
}

// 免费广告次数
const freeAdNum = ref('')

// 异步剩余免费广告次数
axios.get('/user/getUserFreeAdNums', {
  headers: {
    Authorization: token
  }
}).then((res) => {
  freeAdNum.value = res.data.data
  // 关闭全屏加载
  loading.close()
})

// 使用优惠码方法
const usePromoVisible = ref(false)
const showUsePromo = () => {
  usePromoVisible.value = true
}
const usePromoTitle = t('usePromo')

// 校验的表单规则
const ruleFormRef = ref()

// 响应式的表单规则
const ruleForm = reactive({
  promoCode: ''
})

// 校验验证码规则
const validatePromoCode = (rule, value, callback) => {
  const promoCodeRegex = /^[2-9A-HJ-KMNP-Z]{6}$/
  // 非空校验
  if (value === '') {
    return callback(new Error(t('pleaseEnterPromoCode')))
  } else if (!promoCodeRegex.test(value)) {
    // 正则校验
    return callback(new Error(t('pleaseEnterCorrectPromoCode')))
  } else {
    // 校验通过
    callback()
  }
}

const rules = reactive({
  // 在改变时，使用自定义规则校验数据
  promoCode: [{validator: validatePromoCode, trigger: 'change'}]
})

// 调用接口使用优惠码
const usePromo = function(ruleFormRef) {
  // 调用全屏加载服务
  const loading = ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })

  // 检查非空传入
  if (ruleFormRef === '' || ruleFormRef === undefined) return

  // 异步校验
  ruleFormRef.validate(function(valid) {
    if (valid) {
      // 校验成功，向后端发起请求
      axios.post('/promoCode/use', {}, {
        params: {
          code: ruleForm.promoCode
        },
        headers: {
          Authorization: token
        }
      })
        .then((res) => {
          const result = res.data
          switch (result.code) {
            case 1000:
              // 修改成功，弹出提示信息
              ElMessage.success({
                showClose: true,
                message: t('usePromoSuccess'),
                customClass: 'message'
              })

              // 刷新页面
              router.go(0);
              break;
            default:
              // 未知报错，弹出提示信息
              ElMessage.error({
                showClose: true,
                message: t('usePromoFail'),
                customClass: 'message'
              })
          }
          loading.close()
        })
    } else {
      // 校验失败，无法登陆，弹出提示信息
      ElMessage.error({
        showClose: true,
        message: t('inputWrong'),
        customClass: 'message'
      })
      loading.close()
      return false
    }
  })
}
</script>

<style scoped>
.background {
  background-color: #E6E8EB;
  height: 92vh;
}

.space {
  width: 40vw;
  background-color: #FFFFFF;
  margin-top: 2vh;
  margin-bottom: 5vh !important;
}

.button {
  margin-top: 1.5vh;
  margin-bottom: 2vh;
}

.nameCol {
  font-size: 1vw;
  margin-top: 3vh;
}

.linkCol {
  font-size: 1vw;
  text-align: right;
}

.link {
  font-size: 1vw;
  margin-top: 1.9vh;
}

h2, h3, h4 {
  margin-top: 0vh;
  margin-bottom: 0vh;
}

h4 {
  color: #909399;
}

.row {
  margin-top: 3vh;
  margin-right: 4vw;
  margin-left: 4vw;
  text-align: left;
  width: 20vw;
  font-size: 1vw;
}

.divider {
  margin-top: 0;
  margin-bottom: 0;
}

.lastDivider {
  margin-top: 0;
  margin-bottom: 4vh;
}

.phoneVerifyContent {
  font-size: 0.7vw;
  color: #E6A23C;
}

.userVerifyContent {
  font-size: 0.7vw;
  color: #909399;
}

.verifyButton{
  width: 8vw;
  font-size: 1vw;
}

:deep(.el-input__inner){
  font-size: 1vw;
}

:deep(.dealerVerifyNotice){
  font-size: 1vw;
}

:deep(.el-form-item__label) {
  font-weight: bold;
  font-size: 1.3vw;
}

:deep(.el-form-item__label) {
  font-weight: bold;
  font-size: 1.3vw;
}

:deep(.el-select) {
  width: 22vw;
}

.item {
  margin-left: 7vw;
  margin-right: 7vw;
  margin-bottom: 2vh;
}

.confirmButton {
  width: 28vw;
  font-size: 1vw;
  margin-top: 2vh;
}

.usePromoNotice {
  font-size: 1vw;
  color: #E6A23C;
  width: 21vw;
  margin-left: 7vw;
  margin-right: 7vw;
  word-wrap: normal;
}

:deep(.el-input__inner){
  font-size: 1vw;
}

</style>