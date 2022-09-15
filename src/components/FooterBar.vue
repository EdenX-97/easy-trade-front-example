<!--
 * @Description: 页脚
 * @Author: Mo Xu
 * @Date: 28/5/2022
-->
<template>
  <el-space class="footer" size="0" direction="vertical" fill>
    <el-row justify="center">
      <!-- 联系我们/关于我们跳转链接 -->
      <el-col :span="6">
        <!-- 关于我们 -->
        <el-link @click="routerPush('/about')">{{ $t('aboutUs') }}</el-link>

        <el-divider direction="vertical" />

        <!-- 联系我们 -->
        <el-link @click="routerPush('/contact')">{{ $t('contactUs') }}</el-link>

        <el-divider direction="vertical" />

        <!-- 用户协议 -->
        <el-link @click="routerPush('/userAgreement')">{{ $t('userAgreement') }}</el-link>

        <el-divider direction="vertical" />

        <!-- 隐私协议 -->
        <el-link @click="routerPush('/privacyAgreement')">{{ $t('privacyAgreement') }}</el-link>
      </el-col>


    </el-row>

    <el-row justify="center">
      <!-- 其他信息 -->
      <!--<el-col :span="6">{{ $t('companyEmail') }}</el-col>-->
      <el-col :span="6">邮箱：qinhengyu1997@jiandanmaimai.com</el-col>
      <el-col :span="2">{{ $t('postCode') }}</el-col>
      <el-col :span="8">{{ $t('companyAddress') }}</el-col>
      <el-col :span="5">{{ $t('companyPhone') }}</el-col>
    </el-row>

    <el-row justify="center" style="padding-bottom: 0vh">
      <!-- 版权信息 -->
      <el-col :span="8">{{ $t('copyRight') }}</el-col>

      <!-- 备案信息 -->
      <el-col :span="4"><el-link href="http://beian.miit.gov.cn/">{{ $t('beian') }}</el-link></el-col>

      <!-- 公安备案 -->
      <el-col :span="4">
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030402005658" style="display:inline-block;text-decoration:none;height:2vh;line-height:2vh;width:20vw;">
            <el-image :src="gonganbeian" style="float:left;width: 1vw;transform: translateX(1.5vw);"></el-image>
            <p style="float:left;color:#939393;font-size: 0.8vw;width: 15vw;transform: translateY(-1.7vh);">{{ $t('gonganbeian') }}</p>
          </a>
      </el-col>
    </el-row>
  </el-space>




  <!--&lt;!&ndash;我们的官方facebook链接&ndash;&gt;-->
  <!--<el-col :span="1">-->
  <!--  <a href="https://www.facebook.com/">-->
  <!--    <el-image class="link" :src="facebookIcon"></el-image>-->
  <!--  </a>-->
  <!--</el-col>-->

  <!--&lt;!&ndash;我们的官方twitter链接&ndash;&gt;-->
  <!--<el-col :span="1">-->
  <!--  <a href="https://twitter.com/">-->
  <!--    <el-image class="link" :src="twitterIcon"></el-image>-->
  <!--  </a>-->
  <!--</el-col>-->

  <!--&lt;!&ndash;我们的官方sina链接&ndash;&gt;-->
  <!--<el-col :span="1">-->
  <!--  <a href="https://www.sina.com.cn/">-->
  <!--    <el-image class="link" :src="sinaIcon"></el-image>-->
  <!--  </a>-->
  <!--</el-col>-->
</template>

<script setup>
import router from "@/router"

const gonganbeian = require('../assets/imgs/gonganbeian.png')

const routerPush = (path) => {
  router.push(path)
}
// const logo = require('../assets/imgs/logo-full.png')
// // facebook图标
// const facebookIcon = require('../assets/imgs/facebook-icon.png');
//
// // twitter图标
// const twitterIcon = require('../assets/imgs/twitter-icon.png');
//
// // sina图标
// const sinaIcon = require('../assets/imgs/sina-icon.png');


</script>

<style scoped>
.footer {
  height: 10vh;
  background-color: #a0cfff;
  align-content: center;
  font-size: 0.8vw;
  width: 100vw;
  text-align: center;
}

:deep(.el-link__inner) {
  font-size: 0.8vw;
}

:deep(.el-space__item){
  padding-bottom: 0 !important;
  /*padding-bottom: 1px;*/
}

</style>