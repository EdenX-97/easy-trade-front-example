<!--
 * @Description: 登陆界面
 * @Author: Mo Xu
 * @Date: 16/4/2022
-->
<template>
  <el-row class="background" justify="center">
    <!-- 左侧欢迎文字区域 -->
    <el-col :span="14">
      <el-space class="leftSpace" direction="vertical" fill wrap>
        <p class="welcomeTitle">{{ $t('welcomeBack') }}</p>
        <p class="welcomeContent">{{ $t('welcomeBackContent') }}</p>
      </el-space>
    </el-col>

    <!-- 右侧信息输入区域 -->
    <el-col :span="10" class="rightSide">
      <p class="loginTitle">{{ $t('userLogin') }}</p>

      <!-- 登陆表单 -->
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-position="top" class="form">
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

        <!-- 密码输入 -->
        <el-form-item class="item" :label="$t('password')" prop="password" v-if="!ifVerifyCodeLogin">
          <el-input
              v-model="ruleForm.password"
              minlength="6"
              maxlength="20"
              :placeholder="$t('pleaseEnterPassword')"
              class="input"
              show-password
              type="password"/>
        </el-form-item>

        <!-- 验证码输入 -->
        <el-form-item class="item" :label="$t('verifyCode')" prop="verifyCode" v-if="ifVerifyCodeLogin">
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

        <!-- 切换验证码登录方式 -->
        <el-link :underline="false" class="verifyCodeLoginLink" type="primary" @click="switchVerifyCodeLogin">
          {{ loginMethodContent }}
        </el-link>

        <!-- 忘记密码链接 -->
        <el-link :underline="false" class="forgetLink" type="primary" @click="forgetVisible = true">
          {{ $t('forgetPassword') }}
        </el-link>
        <!-- 修改密码窗口 -->
        <el-dialog custom-class="dialog" v-model="forgetVisible" :title="$t('changePassword')" width="38%">
          <!-- 切换两种修改密码方式的标签页 -->
          <el-tabs>
            <!-- 通过手机验证码修改密码 -->
            <el-tab-pane :label="t('changePasswordByPhone')">
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

                <!-- 新密码输入 -->
                <el-form-item class="item" :label="$t('newPassword')" prop="password">
                  <el-input
                      v-model="ruleForm.password"
                      minlength="6"
                      maxlength="20"
                      :placeholder="$t('pleaseEnterNewPassword')"
                      class="input"
                      show-password
                      type="password"/>
                </el-form-item>

                <!-- 确认按钮 -->
                <el-form-item class="item">
                  <el-button round size="large" type="primary" @click="changePassword(ruleFormRef)" class="changePasswordButton">
                    {{ $t('confirm') }}
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- 通过安全问题修改密码 -->
            <el-tab-pane :label="t('changePasswordBySecurity')">
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

                <!-- 安全问题选择 -->
                <el-form-item class="item" :label="$t('securityQuestion')" prop="securityQuestion">
                  <el-select
                      v-model="ruleForm.securityQuestion"
                      :placeholder="t('pleaseSelectSecurityQuestion')">
                    <el-option
                        v-for="question in securityQuestions"
                        :key="question.value"
                        :label="question.label"
                        :value="question.value"/>
                  </el-select>
                </el-form-item>

                <!-- 安全答案输入 -->
                <el-form-item class="item" :label="$t('securityAnswer')" prop="securityAnswer">
                  <el-input
                      v-model="ruleForm.securityAnswer"
                      maxlength="25"
                      :placeholder="$t('pleaseEnterSecurityAnswer')"
                      class="input">
                  </el-input>
                </el-form-item>

                <!-- 新密码输入 -->
                <el-form-item class="item" :label="$t('newPassword')" prop="password">
                  <el-input
                      v-model="ruleForm.password"
                      minlength="6"
                      maxlength="20"
                      :placeholder="$t('pleaseEnterNewPassword')"
                      class="input"
                      type="input"/>
                </el-form-item>

                <!-- 确认按钮 -->
                <el-form-item class="item">
                  <el-button round size="large" type="primary" @click="changePasswordBySecurity(ruleFormRef)" class="changePasswordButton">
                    {{ $t('confirm') }}
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-dialog>

        <!-- 登陆按钮 -->
        <el-form-item class="item">
          <el-button round size="large" type="primary" @click="login(ruleFormRef)" class="button">
            {{ $t('login') }}
          </el-button>
        </el-form-item>

        <!-- 注册链接 -->
        <span class="registerSpan">{{ $t('noAccount') }}
          <el-link :underline="false" class="registerLink" type="primary" @click="routerPush('/register')">
            {{ $t('registerNow') }}
          </el-link>
        </span>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import {reactive, ref} from 'vue'
import axios from '../request'
import {useStore} from 'vuex'
import 'element-plus/dist/index.css'
import {ElMessage} from 'element-plus'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'

// 调用语言包，路由，store
const {t} = useI18n()
const router = useRouter()
const store = useStore()

// 如果已登陆，则提示并返回上一个页面
const token = store.getters.getAuth
if (token !== '' && token.startsWith('Bearer ')) {
  // 弹出提示信息
  ElMessage.error({
    showClose: true,
    message: t('alreadyLogin'),
    customClass: 'message'
  })

  // 返回主页
  router.push('/')
}

// 校验的表单规则
const ruleFormRef = ref()

// 响应式的表单规则
const ruleForm = reactive({
  phone: '',
  password: '',
  verifyCode: '',
  securityQuestion: '',
  securityAnswer: ''
})

// 校验手机号方法
const validatePhone = function (rule, value, callback) {
  const phoneRegex = /^1\d{10}$/
  // 非空校验
  if (value === '') {
    return callback(new Error(t('pleaseEnterPhone')))
  } else if(!phoneRegex.test(value)) {
    // 正则校验
    return callback(new Error(t('pleaseEnterCorrectPhone')))
  } else {
    // 校验通过
    callback()
  }
}

// 校验密码方法
const validatePassword = function (rule, value, callback) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,20}$/
  // 非空校验
  if (value === '') {
    return callback(new Error(t('pleaseEnterPassword')))
  } else if (!passwordRegex.test(value)) {
    // 正则校验
    return callback(new Error(t('pleaseEnterCorrectPassword')))
  } else {
    // 校验通过
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

// 校验规则
const rules = reactive({
  // 在焦点离开时，使用自定义规则校验数据
  phone: [{validator: validatePhone, trigger: 'change'}],
  password: [{validator: validatePassword, trigger: 'change'}],
  verifyCode: [{ validator: validateVerifyCode, trigger: 'change' }]
})

// 切换使用验证码登录与密码登录
const ifVerifyCodeLogin = ref(false)
const loginMethodContent = ref(t('verifyCodeLogin'))
const switchVerifyCodeLogin = function () {
  if (ifVerifyCodeLogin.value) {
    ifVerifyCodeLogin.value = false
    loginMethodContent.value = t('verifyCodeLogin')
  } else {
    ifVerifyCodeLogin.value = true
    loginMethodContent.value = t('passwordLogin')
  }
}

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
            // 未知报错，弹出提示信息
            ElMessage.error({
              showClose: true,
              message: t('unknownError'),
              customClass: 'message'
            })
        }
      })
}

// 提交表单，进行登陆
const login = function(ruleFormRef) {
  // 检查非空传入
  if (ruleFormRef === '' || ruleFormRef === undefined) return

  // 设置登录发送参数为密码或验证码
  const sendPass = ref('')
  if (ifVerifyCodeLogin.value) {
    sendPass.value = ruleForm.verifyCode
  } else {
    sendPass.value = ruleForm.password
  }

  // 异步校验
  ruleFormRef.validate(function(valid) {
    if (valid) {
      // 校验成功，向后端发起登陆请求
      axios.post('/login', {}, {
          params: {
            account: ruleForm.phone,
            password: sendPass.value
          }
        })
        .then((res) => {
          const result = res.data
          switch (result.code) {
            case 1000:
              // 登录成功，开始处理JWT
              // eslint-disable-next-line no-case-declarations
              const auth = res.headers['authorization']

              // 将JWT保存到store和localStorage
              store.commit('setAuth', auth)
              localStorage.auth = auth

              // 弹出提示信息
              ElMessage.success({
                showClose: true,
                message: t('loginSuccess'),
                customClass: 'message'
              })

              // 返回主页
              router.push('/')
              break;
            case 2000:
              // 处理登录失败情况
              if (result.data === "Password incorrect") {
                // 密码错误，弹出提示信息
                ElMessage.error({
                  showClose: true,
                  message: t('passwordIncorrect'),
                  customClass: 'message'
                })
              }
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

// 提交表单，进行密码修改
const changePassword = function(ruleFormRef) {
  // 检查非空传入
  if (ruleFormRef === '' || ruleFormRef === undefined) return

  // 异步校验
  ruleFormRef.validate(function(valid) {
    if (valid) {
      // 校验成功，向后端发起修改密码请求
      axios.post('/user/changePasswordByPhone', {}, {
        params: {
          account: ruleForm.phone,
          verifyCode: ruleForm.verifyCode,
          newPassword: ruleForm.password
        }
      })
          .then((res) => {
            const result = res.data
            switch (result.code) {
              case 1000:
                // 修改成功，弹出提示信息
                ElMessage.success({
                  showClose: true,
                  message: t('changePasswordSuccess'),
                  customClass: 'message'
                })

                // 跳转至登陆界面
                routerPush('/login')
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

// 安全问题选项
const securityQuestions = [
  {
    value: 'SECURITYQUESTIONONE',
    label: t('securityQuestionOne')
  }, {
    value: 'SECURITYQUESTIONTWO',
    label: t('securityQuestionTwo')
  }, {
    value: 'SECURITYQUESTIONTHREE',
    label: t('securityQuestionThree')
  }, {
    value: 'SECURITYQUESTIONFOUR',
    label: t('securityQuestionFour')
  }, {
    value: 'SECURITYQUESTIONFIVE',
    label: t('securityQuestionFive')
  }
]

// 提交表单，通过安全问答进行密码修改
const changePasswordBySecurity = function(ruleFormRef) {
  // 检查非空传入
  if (ruleFormRef === '' || ruleFormRef === undefined) return

  // 异步校验
  ruleFormRef.validate(function(valid) {
    if (valid) {
      // 校验成功，向后端发起修改密码请求
      axios.post('/user/changePasswordBySecurity', {}, {
        params: {
          phone: ruleForm.phone,
          securityQuestion: ruleForm.securityQuestion,
          securityAnswer: ruleForm.securityAnswer,
          newPassword: ruleForm.password
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
                  message: t('changePasswordSuccess'),
                  customClass: 'message'
                })

                // 跳转至登陆界面
                routerPush('/login')
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

// 页面跳转方法
const routerPush = function(path) {
  // 路由跳转
  router.push(path)
}

// 处理弹出修改密码窗口
const forgetVisible = ref(false)
</script>

<style scoped>
.item {
  margin-left: 7vw;
  margin-right: 7vw;
  margin-bottom: 2vh;
}

:deep(.el-form-item__label) {
  font-weight: bold;
  font-size: 1.2vw;
  margin-top: 1vh;
}

:deep(.el-select) {
  width: 22vw;
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

.background {
  background-color: #6AA1FF;
  height: 100vh;
}

.leftSpace {
  float: left;
}

.loginTitle {
  font-weight: bold;
  margin-top: 25vh;
  margin-bottom: 5vh;
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

.forgetLink {
  width: 40vw;
  font-size: 1.2vw;
  margin-left: 12vw;
  margin-bottom: 2vh;
}

.verifyCodeLoginLink {
  font-size: 1.2vw;
  margin-right: 19vw;
  margin-bottom: 2vh;
}

.registerLink {
  font-size: 1.2vw;
}

.registerSpan {
  font-size: 1.2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.button {
  width: 28vw;
}

.changePasswordButton {
  width: 28vw;
  margin-top: 2vh;
}

:deep(.el-form-item__error){
  font-size: 1vw;
}

:deep(.el-input__inner){
  font-size: 1vw;
}
</style>