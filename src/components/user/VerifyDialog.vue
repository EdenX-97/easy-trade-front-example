<!--
 * @Description: 弹出的验证对话框
 * @Author: Mo Xu
 * @Date: 14/5/2022
-->
<template>
  <el-dialog v-model="visible" :title="title" width="38%" center>
    <!-- 实名认证输入表单 -->
    <el-form
        class="form"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        v-if="props.type === 'userVerify'"
        label-position="top"
        status-icon>
      <!-- 姓输入 -->
      <el-form-item class="item" :label="$t('lastname')" prop="lastname">
        <el-input
            v-model="ruleForm.lastname"
            minlength="2"
            maxlength="15"
            :placeholder="$t('pleaseEnterLastname')"
            class="input">
        </el-input>
      </el-form-item>

      <!-- 名输入 -->
      <el-form-item class="item" :label="$t('firstname')" prop="firstname">
        <el-input
            v-model="ruleForm.firstname"
            minlength="2"
            maxlength="15"
            :placeholder="$t('pleaseEnterFirstname')"
            class="input">
        </el-input>
      </el-form-item>

      <!-- 身份证号码输入 -->
      <el-form-item class="item" :label="$t('identification')" prop="identification">
        <el-input
            v-model="ruleForm.identification"
            minlength="18"
            maxlength="18"
            :placeholder="$t('pleaseEnterIdentification')"
            class="input">
        </el-input>
      </el-form-item>

      <!-- 确认按钮 -->
      <el-form-item class="item">
        <el-button round size="large" type="primary" @click="userVerify(ruleFormRef)" class="confirmButton">
          {{ $t('confirm') }}
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 商家认证输入表单 -->
    <el-form
        class="form"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        v-if="props.type === 'dealerVerify'"
        label-position="top"
        status-icon>
      <!-- 社会信用码输入 -->
      <el-form-item class="item" :label="$t('creditCode')" prop="creditCode">
        <el-input
            v-model="ruleForm.creditCode"
            minlength="18"
            maxlength="18"
            :placeholder="$t('pleaseCreditCode')"
            class="input">
        </el-input>
      </el-form-item>

      <!-- 公司名输入 -->
      <el-form-item class="item" :label="$t('companyName')" prop="companyName">
        <el-input
            v-model="ruleForm.companyName"
            :placeholder="$t('pleaseCompanyName')"
            class="input">
        </el-input>
      </el-form-item>

      <p class="dealerVerifyNotice"> {{ $t('dealerVerifyNotice') }} </p>

      <!-- 确认按钮 -->
      <el-form-item class="item">
        <el-button round size="large" type="primary" @click="dealerVerify(ruleFormRef)" class="confirmButton">
          {{ $t('confirm') }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {defineProps} from 'vue'
import {useStore} from 'vuex'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'
import axios from '../../request'
import {ElLoading, ElMessage} from 'element-plus'

// 调用语言包，路由，store
const {t} = useI18n()
const router = useRouter()
const store = useStore()

const props = defineProps({
  visible: Boolean,
  title: String,
  type: String
})
const visible = ref(props.visible)

// 获取用户token
const token = store.getters.getAuth

// 以下为实名认证相关
// 校验的表单规则
const userVerifyRuleFormRef = ref()

// 响应式的表单规则
const userVerifyRuleForm = reactive({
  lastname: '',
  firstname: '',
  identification: '',
})

// 校验姓名
function validateName(rule, value, callback) {
  const nameRegex = /^[\u4e00-\u9fa5]{1,15}$/
  if (value === '') {
    callback(new Error(t('pleaseEnterName')))
  } else if (!nameRegex.test(value)) {
    callback(new Error(t('pleaseEnterCorrectName')))
  } else {
    // sessionStorage.name = value
    callback()
  }
}

// 校验身份证
function validateIdentification(rule, value, callback) {
  const identificationRegex = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
  if (value === '') {
    callback(new Error(t('pleaseEnterIdentification')))
  } else if (!identificationRegex.test(value)) {
    callback(new Error(t('pleaseEnterCorrectIdentification')))
  } else {
    // sessionStorage.identification = value
    callback()
  }
}

// 实名认证校验规则
const userVerifyRules = reactive({
  // 在改变时，使用自定义规则校验数据
  lastname: [{validator: validateName, trigger: 'change'}],
  firstname: [{validator: validateName, trigger: 'change'}],
  identification: [{validator: validateIdentification, trigger: 'change'}],
})

// 以下为商户认证相关
// 校验的表单规则
const dealerVerifyRuleFormRef = ref()

// 响应式的表单规则
const dealerVerifyRuleForm = reactive({
  creditCode: '',
  companyName: ''
})

// 校验商户信用代码
function validateCreditCode(rule, value, callback) {
  const creditCodeRegex = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
  if (value === '') {
    callback(new Error(t('pleaseCreditCode')))
  } else if (!creditCodeRegex.test(value)) {
    callback(new Error(t('pleaseEnterCorrectCreditCode')))
  } else {
    // sessionStorage.creditCode = value
    callback()
  }
}

// 车商认证校验规则
const dealerVerifyRules = reactive({
  // 在改变时，使用自定义规则校验数据
  creditCode: [{validator: validateCreditCode, trigger: 'change'}]
})


// 根据传入的type确定需要使用的参数
let ruleFormRef
let ruleForm
let rules
if (props.type === 'userVerify') {
  ruleFormRef = userVerifyRuleFormRef
  ruleForm = userVerifyRuleForm
  rules = userVerifyRules
} else if (props.type === 'dealerVerify') {
  ruleFormRef = dealerVerifyRuleFormRef
  ruleForm = dealerVerifyRuleForm
  rules = dealerVerifyRules
}

// 实名认证方法
const userVerify = function(ruleFormRef) {
  // 检查非空传入
  if (ruleFormRef === '' || ruleFormRef === undefined) return

  // 异步校验
  ruleFormRef.validate(function(valid) {
    if (valid) {
      // 开启全屏加载
      const loading = ElLoading.service({ lock: true, text: t('loading'), fullscreen: true })
      // 校验成功，向后端发起请求
      axios.post('/auth/realNameAuth', {}, {
        params: {
          lastname: ruleForm.lastname,
          firstname: ruleForm.firstname,
          idcard: ruleForm.identification
        },
        headers: {
          Authorization: token
        }
      })
          .then((res) => {
            loading.close()
            const result = res.data
            switch (result.code) {
              case 1000:
                // 修改成功，弹出提示信息
                ElMessage.success({
                  showClose: true,
                  message: t('userVerifySuccess'),
                  customClass: 'message'
                })

                // 刷新页面
                router.go(0);
                break;
              default:
                // 未知报错，弹出提示信息
                ElMessage.error({
                  showClose: true,
                  message: t('unknownError'),
                  customClass: 'message'
                })
            }
          })
    } else {
      // 校验失败，无法登陆，弹出提示信息
      ElMessage.error({
        showClose: true,
        message: t('inputWrong'),
        customClass: 'message'
      })
      return false
    }
  })
}

// 商户认证方法
const dealerVerify = function(ruleFormRef) {
  // 检查非空传入
  if (ruleFormRef === '' || ruleFormRef === undefined) return

  // 异步校验
  ruleFormRef.validate(function(valid) {
    if (valid) {
      // 校验成功，向后端发起请求
      axios.post('/auth/dealerAuth', {}, {
        params: {
          creditCode: ruleForm.creditCode,
          companyName: ruleForm.companyName
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
                  message: t('dealerVerifySuccess'),
                  customClass: 'message'
                })

                // 刷新页面
                router.go(0);
                break;
              default:
                // 未知报错，弹出提示信息
                ElMessage.error({
                  showClose: true,
                  message: t('unknownError'),
                  customClass: 'message'
                })
            }
          })
    } else {
      // 校验失败，无法登陆，弹出提示信息
      ElMessage.error({
        showClose: true,
        message: t('inputWrong'),
        customClass: 'message'
      })
      return false
    }
  })
}

</script>

<style scoped>
:deep(.el-form-item__label) {
  font-weight: bold;
  font-size: 15px;
}

.item {
  margin-left: 7vw;
  margin-right: 7vw;
  margin-bottom: 2vh;
}

.confirmButton {
  width: 28vw;
  margin-top: 2vh;
}

.dealerVerifyNotice {
  font-size: 14px;
  color: #E6A23C;
  width: 21vw;
  margin-left: 7vw;
  margin-right: 7vw;
  word-wrap: normal;
}
</style>