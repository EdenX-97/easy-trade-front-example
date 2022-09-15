<!--
 * @Description: 详情界面
 * @Author: Mo Xu
 * @Date: 9/5/2022
-->
<template>
  <div class="background">
    <!-- 空间布局 -->
    <el-space class="space" direction="vertical" size="small" fill wrap>
      <el-row class="row">
        <!-- 第一列，显示用户姓名、认证情况 -->
        <el-col class="nameCol" :span="24">
          <h2>{{ $t('respected') }} {{ name }} </h2>
        </el-col>
      </el-row>

      <el-row class="row">
        <!-- 个人信息标题 -->
        <el-col :span="24">
          <h3> {{ $t('personalDetails') }} </h3>
        </el-col>
      </el-row>

      <el-row class="row">
        <!-- 认证情况信息 -->
        <el-col :span="12">
          <h4> {{ $t('verifyLevel') }} </h4>

          <el-button v-if="role==='ROLE_VERIFIED'" class="verifyInfo" type="danger" size="small" round plain>
            <el-icon><circle-close /></el-icon>
            &nbsp; {{ $t('noVerify') }}
          </el-button>

          <el-button v-if="role==='ROLE_USER'" class="verifyInfo" type="success" size="small" round plain>
            <el-icon><circle-check /></el-icon>
            &nbsp; {{ $t('userVerify') }}
          </el-button>

          <el-button v-if="role==='ROLE_DEALER'" class="verifyInfo" type="success" size="small" round plain>
            <el-icon><circle-check /></el-icon>
            &nbsp; {{ $t('dealerVerify') }}
          </el-button>
        </el-col>
        <!-- 认证按钮 -->
        <el-col class="linkCol" :span="12">
          <!-- 手机认证 -->
          <div v-if="role==='ROLE_VERIFIED'">
            <el-button class="verifyButton" type="info" size="small" @click="userVerify()" round plain>
              <el-icon><circle-close /></el-icon>
              &nbsp; {{ $t('userVerify') }}
            </el-button>
            <p class="phoneVerifyContent"> {{ $t('pleaseUserVerify') }} </p>
            <verify-dialog v-model="userVerifyVisible" :title="userVerifyTitle" type="userVerify"/>
          </div>

          <!-- 个人认证 -->
          <div v-if="role==='ROLE_USER'">
            <el-button class="verifyButton" type="info" size="small" @click="dealerVerify()" round plain>
              <el-icon><circle-close /></el-icon>
              &nbsp; {{ $t('dealerVerify') }}
            </el-button>
            <p class="userVerifyContent"> {{ $t('youCanVerifyDealer') }} </p>
            <verify-dialog v-model="dealerVerifyVisible" :title="dealerVerifyTitle" type="dealerVerify"/>
          </div>

          <!--&lt;!&ndash; 商家认证 &ndash;&gt;-->
          <!--<div v-if="role==='ROLE_DEALER'">-->
          <!--  <el-button class="verifyButton" type="primary" size="small" round plain>-->
          <!--    <el-icon><circle-check /></el-icon>-->
          <!--    &nbsp; {{ $t('dealerVerify') }}-->
          <!--  </el-button>-->
          <!--</div>-->

        </el-col>
        <el-divider v-if="role!=='ROLE_DEALER'" class="divider" />
      </el-row>

      <el-row class="row">
        <!-- 手机号信息 -->
        <el-col :span="12">
          <h4> {{ $t('phone') }} </h4>
          <p>+86 {{ phone }}</p>
        </el-col>
        <!--&lt;!&ndash; 修改链接 &ndash;&gt;-->
        <!--<el-col class="linkCol" :span="2">-->
        <!--  <el-link class="link" type="primary" :underline="false">{{ $t('change') }}</el-link>-->
        <!--</el-col>-->
        <el-divider class="divider" />
      </el-row>

      <el-row class="row">
        <!-- 邮箱信息 -->
        <el-col :span="22">
          <h4> {{ $t('email') }} </h4>
          <p> {{ email }} </p>
        </el-col>
        <!-- 设置链接 -->
        <el-col class="linkCol" :span="2">
          <el-link class="link" type="primary" :underline="false" @click="setEmail()">{{ $t('set') }}</el-link>
        </el-col>
        <el-divider class="divider" />
        <set-dialog v-model="setEmailVisible" :title="setEmailTitle" type="setEmail"/>
      </el-row>

      <el-row class="row">
        <!-- 安全信息标题 -->
        <el-col :span="24">
          <h3> {{ $t('securityInformation') }} </h3>
        </el-col>
      </el-row>

      <el-row class="row">
        <!-- 密码信息 -->
        <el-col :span="12">
          <h4> {{ $t('password') }} </h4>
          <p>**********</p>
        </el-col>
        <!-- 修改链接 -->
        <el-col class="linkCol" :span="12">
          <el-link class="link" type="primary" :underline="false" @click="setPassword()">{{ $t('set') }}</el-link>
        </el-col>
        <set-dialog v-model="setPasswordVisible" :title="setPasswordTitle" type="setPassword"/>
        <el-divider class="divider" />
      </el-row>

      <el-row class="row">
        <!-- 安全问题 -->
        <el-col :span="12">
          <h4> {{ $t('securityQuestion') }} </h4>
          <p> {{ securityQuestion }} </p>
        </el-col>
        <!-- 修改链接 -->
        <el-col class="linkCol" :span="12">
          <el-link class="link" type="primary" :underline="false" @click="setSecurity()">{{ $t('set') }}</el-link>
        </el-col>
        <set-dialog v-model="setSecurityVisible" :title="setSecurityTitle" type="setSecurity"/>
        <el-divider class="divider" />
      </el-row>

      <el-row class="row">
        <!-- 安全答案 -->
        <el-col :span="12">
          <h4> {{ $t('securityAnswer') }} </h4>
          <p> {{ securityAnswer }} </p>
        </el-col>
        <el-divider class="lastDivider" />
      </el-row>
    </el-space>
  </div>

</template>

<script setup>
import 'element-plus/dist/index.css'
import axios from '../../request'
import {useStore} from 'vuex'
import {ref} from 'vue'
import {ElLoading} from 'element-plus'
import {ElMessage} from 'element-plus'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'
import {
  CircleClose,
  CircleCheck,
  // ArrowDown
} from '@element-plus/icons-vue'
import VerifyDialog from "@/components/user/VerifyDialog";

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

// 用户的各项信息
const user = ref('')
const phone = ref('')
const email = ref('')
const name = ref('')
const securityQuestion = ref('')
const securityAnswer = ref('')
const role = ref('')
const nowVerify = ref('')
const nowVerifyType = ref('')

// 设置用户信息
const setUser = function() {
  user.value = store.getters.getUser
  name.value = user.value.lastname + user.value.firstname
  phone.value = user.value.phone
  email.value = user.value.email
  securityQuestion.value = user.value.securityQuestion
  role.value = user.value.role

  // 根据role确定用户认证情况
  if (role.value === 'ROLE_VERIFIED') {
    nowVerify.value = '未认证'
    nowVerifyType.value = 'danger'
  }

  // 如果获得空值，则设为未设置或默认值，如果有值则进行判断赋值
  if (name.value === null) {
    name.value = t('user')
  }
  if (email.value === null) {
    email.value = t('notSet')
  }
  if (securityQuestion.value === null) {
    securityQuestion.value = t('notSet')
    securityAnswer.value = t('notSet')
  } else {
    switch (securityQuestion.value) {
      case 'SECURITYQUESTIONONE':
        securityQuestion.value = t('securityQuestion1')
        break
      case 'SECURITYQUESTIONTWO':
        securityQuestion.value = t('securityQuestion2')
        break
      case 'SECURITYQUESTIONTHREE':
        securityQuestion.value = t('securityQuestion3')
        break
      case 'SECURITYQUESTIONFOUR':
        securityQuestion.value = t('securityQuestion4')
        break
      case 'SECURITYQUESTIONFIVE':
        securityQuestion.value = t('securityQuestion5')
        break
    }
    securityAnswer.value = '**********'
  }
}

// 异步获取用户
axios.get('/user/getUserByToken', {
  params: {
    token: token
  }
}).then((res) => {
  store.commit('setUser', res.data.data)
  setUser()
  // 用户信息设置结束，关闭全屏加载
  loading.close()
})

// 手机认证按钮对话框显示，内部是实名认证功能
const userVerifyVisible = ref(false)
const userVerify = function() {
  userVerifyVisible.value = true
}
const userVerifyTitle = t('userVerify')

// 实名认证按钮对话框显示，内部是商户认证功能
const dealerVerifyVisible = ref(false)
const dealerVerify = function() {
  dealerVerifyVisible.value = true
}
const dealerVerifyTitle = t('dealerVerify')

// 设置邮箱对话框显示
const setEmailVisible = ref(false)
const setEmail = function() {
  setEmailVisible.value = true
}
const setEmailTitle = t('setEmail')

// 设置安全问答对话框显示
const setSecurityVisible = ref(false)
const setSecurity = function() {
  setSecurityVisible.value = true
}
const setSecurityTitle = t('setSecurity')

// 设置密码对话框显示
const setPasswordVisible = ref(false)
const setPassword = function() {
  setPasswordVisible.value = true
}
const setPasswordTitle = t('setPassword')
</script>

<style scoped>
.background {
  background-color: #E6E8EB;
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
  color: #909399;
}

.userVerifyContent {
  font-size: 0.7vw;
  color: #909399;
}

.verifyButton{
  width: 8vw;
  font-size: 1vw;
}

.verifyInfo {
  width: 8vw;
  font-size: 1vw;
  margin-top: 1vh;
  pointer-events: none;
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
</style>