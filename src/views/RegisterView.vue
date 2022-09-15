<!--
 * @Description: 注册界面
 * @Author: Mo Xu
 * @Date: 17/4/2022
-->
<template>
  <el-row class="background" justify="center">
    <!-- 左侧欢迎文字区域 -->
    <el-col :span="14">
      <el-space class="leftSpace" direction="vertical" fill wrap>
        <p class="welcomeTitle">{{ $t('welcomeTo') }}</p>
        <p class="welcomeContent">{{ $t('welcomeToContent') }}</p>
      </el-space>
    </el-col>

    <!-- 右侧信息输入区域 -->
    <el-col :span="10" class="rightSide">
      <!-- 注册标题 -->
      <p class="registerTitle">{{ $t('userRegister') }}</p>

      <!-- 输入表单 -->
      <el-form
          class="form"
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-position="top"
          status-icon>
        <!-- 手机号输入 -->
        <el-form-item class="item" :label="$t('phone')" prop="phone">
          <el-input
              v-model="ruleForm.phone"
              minlength="11"
              maxlength="11"
              :placeholder="$t('pleaseEnterPhone')"
              class="input">
            <template #prepend>+86</template>
          </el-input>
        </el-form-item>

        <!-- 验证码输入 -->
        <el-form-item class="item" :label="$t('verifyCode')" prop="verifyCode">
          <el-input
              v-model="ruleForm.verifyCode"
              minlength="6"
              maxlength="6"
              :placeholder="$t('pleaseEnterVerifyCode')"
              class="input"
              :class="[{'disabled': disabled}]">
            <template #append>
              <el-button type="primary" class="sendButton" :disabled="disabled" @click="sendVerifyCode(ruleFormRef)">
                {{ sendContent }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码输入 -->
        <el-form-item class="item" :label="$t('password')" prop="password">
          <el-input
              v-model="ruleForm.password"
              minlength="6"
              maxlength="20"
              :placeholder="$t('pleaseEnterRegisterPassword')"
              class="input"
              show-password
              type="password"/>
        </el-form-item>

        <!-- 用户协议 -->
        <el-form-item class="item" prop="agree">
          <el-switch
              v-model="ruleForm.agree"
              inline-prompt
              :active-icon="Check"
              :inactive-icon="Close"/>

          <span class="agreeContent">{{ $t('agree') }}</span>
          <el-link type="primary" @click="routerPush('/userAgreement')"> {{ $t('userAgreement') }}</el-link>
          <span style="font-size: 1.2vw">{{ $t('and') }}</span>
          <el-link type="primary" @click="routerPush('/privacyAgreement')">{{ $t('privacyAgreement') }}</el-link>
        </el-form-item>

        <!-- 注册按钮 -->
        <el-form-item class="item">
          <el-button round size="large" type="primary" @click="register(ruleFormRef)" class="button">
            {{ $t('register') }}
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 登陆链接 -->
      <span class="loginSpan">
        {{ $t('haveAccount') }}
        <el-link :underline="false" class="registerLink" type="primary" @click="routerPush('/login')">
          {{ $t('loginNow') }}
        </el-link>
      </span>
    </el-col>
  </el-row>
</template>

<script setup>
import {ref, reactive} from 'vue'
import axios from '../request'
import {useStore} from 'vuex'
import 'element-plus/dist/index.css'
import {ElMessage} from 'element-plus'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'
import { Check, Close } from '@element-plus/icons-vue'

// 调用语言包和路由
const {t} = useI18n()
const router = useRouter()
const store = useStore()

// 如果已登陆，则提示并返回上一个页面
const token = store.getters.getAuth
if (token !== '' && token.startsWith('Bearer ')) {
  // 弹出提示信息
  ElMessage.error({
    showClose: true,
    message: t('alreadyLogin')
  })

  // 返回上一页面
  router.go(-1)
}

// 注册表单定义
const ruleFormRef = ref('')
const ruleForm = reactive({
  phone: '',
  verifyCode: '',
  password: '',
  agree: false
})
// 从sessionStorage中获取存储的信息，避免用户刷新页面后需要重新输入
if (sessionStorage.phone !== undefined) {
  ruleForm.phone = sessionStorage.phone
}
if (sessionStorage.verifyCode !== undefined) {
  ruleForm.verifyCode = sessionStorage.verifyCode
}
if (sessionStorage.password !== undefined) {
  ruleForm.password = sessionStorage.password
}
if (sessionStorage.agree !== undefined) {
  ruleForm.agree = sessionStorage.agree
}

// 校验手机号
function validatePhone(rule, value, callback) {
  const phoneRegex = /^1[0-9]{10}$/
  if (value === '') {
    callback(new Error(t('pleaseEnterPhone')))
  } else if (!phoneRegex.test(value)) {
    callback(new Error(t('pleaseEnterCorrectPhone')))
  } else {
    sessionStorage.phone = value
    callback()
  }
}

// 校验验证码
function validateVerifyCode(rule, value, callback) {
  const verifyCodeRegex = /^\d{6}$/
  if (value === '') {
    callback(new Error(t('pleaseEnterVerifyCode')))
  } else if (!verifyCodeRegex.test(value)) {
    callback(new Error(t('pleaseEnterCorrectVerifyCode')))
  } else {
    sessionStorage.verifyCode = value
    callback()
  }
}

// 验证密码方法
function validatePassword(rule, value, callback) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,20}$/
  if (value === '') {
    callback(new Error(t('pleaseEnterPassword')))
  } else if (!passwordRegex.test(value)) {
    callback(new Error(t('pleaseEnterCorrectPassword')))
  } else {
    sessionStorage.password = value
    callback()
  }
}

// 验证是否同意用户协议和隐私协议
function validateAgree(rule, value, callback) {
  if (value === false) {
    callback(new Error(t('pleaseAgree')))
  } else {
    sessionStorage.agree = value
    callback()
  }
}

// 注册校验方法规则
const rules = reactive({
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  verifyCode: [{ validator: validateVerifyCode, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  agree: [{ validator: validateAgree, trigger: 'change' }]
})

// 发送验证码方法，设置60秒的倒计时，验证码发送按钮的文字内容
const countTime = ref(60)
const sendContent = ref(t('sendVerifyCode'))
const disabled = ref(false)
function sendVerifyCode() {
  if (ruleForm.phone === '') {
    // 弹出提示信息
    ElMessage.error({
      showClose: true,
      message: t('pleaseEnterPhone'),
      customClass: 'message'
    })
    return
  }

  sendContent.value = countTime.value.toString() + t('resendVerifyCode')
  disabled.value = true
  let countDown = setInterval(function() {
        // 减少时间，刷新显示内容
        countTime.value -= 1
        sendContent.value = countTime.value.toString() + t('resendVerifyCode')
        // 当时间减为0，重置
        if (countTime.value === 0) {
          disabled.value = false
          sendContent.value = t('sendVerifyCode')
          countTime.value = 60
          clearInterval(countDown)
        }
      }, 1000
  )
  // 向后端发起请求
  axios.post(
      '/sms/sendVerifyMessage', {}, {
        params: {
          phone: ruleForm.phone
        }
      })
    .then((res) => {
      const result = res.data
      switch (result.code) {
        case 1000:
          // 成功发送，弹出提示信息
          ElMessage.success({
            showClose: true,
            message: t('verifyCodeSent'),
            customClass: 'message'
          })
          break
        case 2000:
          // 发送失败，弹出提示信息
          ElMessage.error({
            showClose: true,
            message: t('verifyCodeCannotSend'),
            customClass: 'message'
          })
          break
        default:
          console.log(ruleForm.phone)
          console.log(result)
          // 未知报错，弹出提示信息
          ElMessage.error({
            showClose: true,
            message: t('unknownError'),
            customClass: 'message'
          })
      }
    })
}

// 提交表单，进行注册
function register(ruleFormRef) {
  // 检查非空传入
  if (ruleFormRef === '' || ruleFormRef === undefined) return
  // 校验所有输入
  ruleFormRef.validate((valid) => {
    if (valid) {
      // 校验通过，向后端发起注册请求
      axios.post(
          '/user/register',
          {'phone': ruleForm.phone, 'password': ruleForm.password},
          {params: {verifyCode: ruleForm.verifyCode}})
        .then((res) => {
          const result = res.data
          switch (result.code) {
            case 1000:
              // 注册成功，弹出提示信息
              ElMessage.success({
                showClose: true,
                message: t('registerSuccess'),
                customClass: 'message'
              })
              // 跳转至登陆界面
              router.push('/login')
              break
            case 2000:
              // 注册失败，弹出提示信息
              ElMessage.error({
                showClose: true,
                message: t('registerFail'),
                customClass: 'message'
              })
              break
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
      // 校验失败，弹出提示信息
      ElMessage.error({
        showClose: true,
        message: t('registerInputWrong'),
        customClass: 'message'
      })
      return false
    }
  })
}

// 页面跳转方法
function routerPush(path) {
  // 路由跳转
  router.push(path)
}
</script>

<style scoped>
.item {
  margin-left: 7vw;
  margin-right: 7vw;
  margin-bottom: 2vh;
}

.input >>> .el-input-group__append {
  background-color: var(--el-color-primary);
  color: var(--el-color-white);
}

.disabled >>> .el-input-group__append {
  background-color: var(--el-fill-color-light);
  color: var(--el-color-info);
  cursor: default
}

.form :deep(.el-form-item__label) {
  font-weight: bold;
  font-size: 1.2vw;
  margin-bottom: 1vh;
}

.background {
  background-color: #6AA1FF;
  height: 100vh;
}

.leftSpace {
  float: left;
}

.registerTitle {
  font-weight: bold;
  margin-top: 17vh;
  margin-bottom: 6vh;
  font-size: 2.3vw;
}

.welcomeTitle {
  float: left;
  color: white;
  font-weight: bold;
  margin-top: 25vh;
  margin-left: 12vw;
  margin-bottom: 0;
  font-size: 3vw;
  text-align: left;
}

.welcomeContent {
  color: white;
  margin: 1vh 12vw 0;
  font-size: 1.5vw;
  text-align: left;
}

.rightSide {
  background-color: #E8F3FF;
}

.link >>> .el-link__inner {
  margin-left: auto;
  margin-right: 1vw;
  margin-bottom: 1vh;
}

.registerLink {
  font-size: 1.2vw;
}

.loginSpan {
  font-size: 1.2vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  width: 28vw;
  margin-top: 1vh;
}

.agreeContent {
  font-size: 1.2vw;
  margin-left: 0.2vw;
}

:deep(.el-input__inner){
  font-size: 1vw;
}

:deep(.el-link.el-link--primary.is-underline){
  font-size: 1.2vw;
}

:deep(.el-switch){
  width: 5vw;
}

:deep(.el-form-item__error){
  font-size: 1vw;
}
</style>