<!--
 * @Description: 用户页面的设置弹出对话框
 * @Author: Mo Xu
 * @Date: 18/5/2022
-->
<template>
  <el-dialog v-model="visible" :title="title" width="38%" :before-close="handleClose" center>
    <!-- 邮箱设置表单 -->
    <el-form
        class="form"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        v-if="props.type === 'setEmail'"
        label-position="top"
        status-icon>
      <!-- 邮箱地址输入 -->
      <el-form-item class="item" :label="$t('email')" prop="email">
        <el-input
            v-model="ruleForm.email"
            maxlength="50"
            :placeholder="$t('pleaseEnterEmail')"
            class="input">
        </el-input>
      </el-form-item>

      <p class="setEmailNotice"> {{ $t('setEmailNotice') }} </p>

      <!-- 确认按钮 -->
      <el-form-item class="item">
        <el-button round size="large" type="primary" @click="setEmail(ruleFormRef)" class="confirmButton">
          {{ $t('confirm') }}
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 安全问题答案设置表单 -->
    <el-form
        class="form"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        v-if="props.type === 'setSecurity'"
        label-position="top"
        status-icon>
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

      <!-- 确认按钮 -->
      <el-form-item class="item">
        <el-button round size="large" type="primary" @click="setSecurity(ruleFormRef)" class="confirmButton">
          {{ $t('confirm') }}
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 密码设置表单 -->
    <el-form
        class="form"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        v-if="props.type === 'setPassword'"
        label-position="top"
        status-icon>
      <!-- 旧密码输入 -->
      <el-form-item class="item" :label="$t('oldPassword')" prop="oldPassword">
        <el-input
            v-model="ruleForm.oldPassword"
            minlength="6"
            maxlength="20"
            :placeholder="$t('pleaseEnterOldPassword')"
            class="input"
            type="input"/>
      </el-form-item>

      <!-- 新密码输入 -->
      <el-form-item class="item" :label="$t('newPassword')" prop="newPassword">
        <el-input
            v-model="ruleForm.newPassword"
            minlength="6"
            maxlength="20"
            :placeholder="$t('pleaseEnterNewPassword')"
            class="input"
            type="input"/>
      </el-form-item>

      <!-- 确认按钮 -->
      <el-form-item class="item">
        <el-button round size="large" type="primary" @click="setPassword(ruleFormRef)" class="confirmButton">
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
import {ElMessage} from 'element-plus'

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

// 以下为设置邮箱相关
// 校验的表单规则
const setEmailRuleFormRef = ref()

// 响应式的表单规则
const setEmailRuleForm = reactive({
  email: ''
})

// 校验邮箱
function validateEmail(rule, value, callback) {
  const emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
  if (value === '') {
    callback(new Error(t('pleaseEnterEmail')))
  } else if (!emailRegex.test(value)) {
    callback(new Error(t('pleaseEnterCorrectEmail')))
  } else {
    // sessionStorage.name = value
    callback()
  }
}

// 设置邮箱校验规则
const setEmailRules = reactive({
  // 在改变时，使用自定义规则校验数据
  email: [{validator: validateEmail, trigger: 'change'}]
})

// 以下为安全问答相关
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

// 校验的表单规则
const setSecurityFormRef = ref()

// 响应式的表单规则
const setSecurityRuleForm = reactive({
  securityQuestion: '',
  securityAnswer: ''
})

// 校验安全答案
function validateSecurityAnswer(rule, value, callback) {
  // const emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
  if (value === '') {
    callback(new Error(t('pleaseEnterSecurityAnswer')))
  } else {
    // sessionStorage.name = value
    callback()
  }
}

// 设置安全问答校验规则
const setSecurityRules = reactive({
  // 在改变时，使用自定义规则校验数据
  securityAnswer: [{validator: validateSecurityAnswer, trigger: 'change'}]
})

// 以下为设置密码相关
// 校验的表单规则
const setPasswordFormRef = ref()

// 响应式的表单规则
const setPasswordRuleForm = reactive({
  oldPassword: '',
  newPassword: ''
})

// 校验密码
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

// 设置邮箱校验规则
const setPasswordRules = reactive({
  // 在改变时，使用自定义规则校验数据
  oldPassword: [{validator: validatePassword, trigger: 'change'}],
  newPassword: [{validator: validatePassword, trigger: 'change'}]
})

// 根据传入的type确定需要使用的参数
let ruleFormRef
let ruleForm
let rules
if (props.type === 'setEmail') {
  ruleFormRef = setEmailRuleFormRef
  ruleForm = setEmailRuleForm
  rules = setEmailRules
} else if (props.type === 'setSecurity') {
  ruleFormRef = setSecurityFormRef
  ruleForm = setSecurityRuleForm
  rules = setSecurityRules
} else if (props.type === 'setPassword') {
  ruleFormRef = setPasswordFormRef
  ruleForm = setPasswordRuleForm
  rules = setPasswordRules
}

// 设置邮箱方法
const setEmail = function(ruleFormRef) {
  // 检查非空传入
  if (ruleFormRef === '' || ruleFormRef === undefined) return

  // 异步校验
  ruleFormRef.validate(function(valid) {
    if (valid) {
      // 校验成功，向后端发起请求
      axios.post('/user/setEmail', {}, {
        params: {
          email: ruleForm.email
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
                  message: t('setEmailSuccess'),
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

// 设置安全问答方法
const setSecurity = function(ruleFormRef) {
  // 检查非空传入
  if (ruleFormRef === '' || ruleFormRef === undefined) return

  // 异步校验
  ruleFormRef.validate(function(valid) {
    if (valid) {
      // 校验成功，向后端发起请求
      axios.post('/user/setSecurityQuestionAndAnswer', {}, {
        params: {
          securityQuestion: ruleForm.securityQuestion,
          securityAnswer: ruleForm.securityAnswer
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
                  message: t('setSecuritySuccess'),
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

// 设置密码方法
const setPassword = function(ruleFormRef) {
  // 检查非空传入
  if (ruleFormRef === '' || ruleFormRef === undefined) return

  // 异步校验
  ruleFormRef.validate(function(valid) {
    if (valid) {
      // 校验成功，向后端发起请求
      axios.post('/user/setPasswordByOld', {}, {
        params: {
          oldPassword: ruleForm.oldPassword,
          newPassword: ruleForm.newPassword
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
                  message: t('setPasswordSuccess'),
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

// 关闭对话框时刷新页面清空数据
const handleClose = function(done) {
  done()
  router.go(0)
}
</script>

<style scoped>
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

.setEmailNotice {
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