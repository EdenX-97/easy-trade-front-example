<!--
 * @Description: 聊天界面
 * @Author: Hongzhang Liu
 * @Date: 15/5/2022
-->
<template>
  <top-bar/>
  <div class="common-layout">
    <el-container>
      <!--侧边栏-->
      <el-aside width="13vw" class="sideBarFrame">
        <div class="demo-collapse">
          <el-collapse v-model="selectedCollapse">
            <!--系统信息-->
            <el-collapse-item :title="$t('systemNotify')" name="1" class="systemNotifyFrame">
              <el-button type="text" class="systemMessageTagBtn" @click="getSystemMessage">{{$t("systemMessageTag")}}</el-button>
            </el-collapse-item>
            <!--聊天消息-->
            <el-collapse-item :title="$t('chatMessageTag')" name="2" class="chatMessageFrame">
              <el-main
                  class="chatTagFrame"
                  v-for="(user, index) in relatedUserList.val"
                  :key="user">
                <el-button type="text" class="chatTagBtn" @click="changeCurChatContent(index)">{{user.lastname}}{{$t("sirMadam")}}</el-button>
              </el-main>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-aside>
      <!--聊天主体容器-->
      <el-container class="mainFrame">
        <!--消息显示区域-->
        <el-header class="messageDisplayFrame" :key="keyNum" id="msgDisplay" v-loading="loading" :element-loading-text="$t('loadingChats')">
          <!--用户之间交流-->
          <div v-if="chatType === 'general'">
            <div>&ensp;</div>
            <div v-for="chat in curChatContent.val" :key="chat">
              <!--如果是自己发言-->
              <div v-if="chat.from === curUserId">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <!--日期行-->
                    <el-row class="buyerChatDate">{{chat.date}}</el-row>
                    <!--聊天消息行-->
                    <el-row>
                      <div class="buyerContent">
                        <div class="buyerText">
                          {{chat.content}}
                        </div>
                      </div>
                    </el-row>
                  </el-col>
                  <!--头像列-->
                  <el-col :span="6">
                    <el-avatar class="buyerAvatar">{{ curUser.val.lastname }}</el-avatar>
                  </el-col>
                </el-row>
                <el-row>&nbsp;</el-row>
              </div>
              <!--如果是卖家发言-->
              <div v-else>
                <el-row :gutter="20" class="test">
                  <!--头像列-->
                  <el-col :span="6">
                    <el-avatar class="sellerAvatar">{{curSeller.val.lastname}}</el-avatar>
                  </el-col>
                  <el-col :span="6">
                    <!--日期行-->
                    <el-row class="sellerChatDate">{{chat.date}}</el-row>
                    <!--聊天消息行-->
                    <el-row>
                      <div class="sellerContent">
                        <div class="sellerText">
                          {{chat.content}}
                        </div>
                      </div>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row>&nbsp;</el-row>
              </div>
            </div>
          </div>
          <!--系统消息-->
          <div v-else>
            <div>&ensp;</div>
            <!--为空显示空界面-->
            <div v-if="curChatContent.val[0] === ''"></div>
            <div v-else v-for="chat in curChatContent.val" :key="chat">
              <el-row :gutter="20">
                <el-col :span="6">
                  <!--日期行-->
                  <el-row class="systemMessageDate">{{chat.date}}</el-row>
                  <!--聊天消息行-->
                  <el-row>
                    <div class="systemMessageContent">
                      <div class="systemMessageText">
                        {{chat.content}}
                      </div>
                    </div>
                  </el-row>
                </el-col>
                <!--头像列-->
                <el-col :span="6">
                  <el-avatar class="systemAvatar">{{$t("systemMessageName")}}</el-avatar>
                </el-col>
              </el-row>
              <el-row>&nbsp;</el-row>
            </div>
          </div>
        </el-header>
        <!--消息输入区域-->
        <!--如果当前消息展示为普通聊天消息-->
        <div v-if="chatType === 'general' && curUserId.value !== curSeller.val.id">
          <el-input
              v-model="textarea"
              maxlength="100"
              :placeholder="$t('chatHint')"
              type="textarea"
              class="messageInputFrame"
              rows="4"
              resize="none"
              @keydown.enter="sendMessage"
          />
        </div>
        <!--如果当前消息展示为系统消息-->
        <div v-else>
          <el-input
              v-model="textarea"
              maxlength="100"
              :placeholder="$t('chatHint')"
              show-word-limit
              type="textarea"
              class="messageInputFrame"
              rows="4"
              disabled
              resize="none"
          />
        </div>

        <!--发送消息按钮-->
        <el-footer class="sendFrame">
          <!--如果显示的是普通聊天消息-->
          <div v-if="chatType === 'general'">
            <el-button type="success" class="sendBtn" @click="sendMessage">{{t("sendMessage")}}</el-button>
          </div>
          <!--如果显示的是系统通知-->
          <div v-else>
            <el-button type="success" class="sendBtn" @click="sendMessage" disabled>{{t("sendMessage")}}</el-button>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
  import router from "@/router";
  import {onBeforeMount, reactive, ref} from "vue";
  import TopBar from "@/components/TopBar";
  import {useI18n} from "vue-i18n";
  import axios from "axios";
  import {useStore} from "vuex";
  import Stomp from 'stompjs';
  // 使用I18n组件进行页面国际化配置
  // eslint-disable-next-line no-unused-vars
  const {t} = useI18n();

  // 使用Store组件来从全局信息中获取数据
  const store = useStore();

  // 从Store中使用getAuth方法获取token
  const curToken = store.getters.getAuth;

  // 当前登陆用户id
  // const curUserId = ref(router.currentRoute.value.params.buyerId);
  const curUserId = ref('');

  // // 从详情界面传入的卖家id
  // const sellerId = ref(router.currentRoute.value.params.sellerId);

  // 侧边标签，默认打开聊天信息
  const selectedCollapse = ref("2")

  // 输入框文本
  const textarea = ref("")

  // 用户间聊天记录
  const generalChatRecords = reactive({val: []});

  // 系统聊天记录
  const systemChatRecords = reactive({val: [""]});

  // 相关用户列表
  const relatedUserList = reactive({val: []})

  // 当前聊天内容
  const curChatContent = reactive({val: [""]})

  // 对比的普通聊天内容
  const compareGeneralChatContent = reactive({val: []})

  // 对比的系统聊天内容
  const compareSystemChatContent = reactive({val: []})

  // 当前登陆用户详细信息
  const curUser = reactive({val: []});

  // 当前卖家（对方）详细信息
  const curSeller = reactive({val: []})

  // key-changing刷新聊天显示框组件，做局部刷新
  const keyNum = ref(0);

  // 聊天类型，默认为普通，涉及修改输入和按钮组件属性
  const chatType = ref("system");

  // 控制加载动画变量
  const loading = ref(true);

  // 敏感内容检测，过滤后的聊天消息

  let timer = setTimeout(() => {timer = refreshChatContent()}, 1000);
  // let timer = setTimeout(() => {timer = refreshChatContent()}, 1000);

  onBeforeMount(async() => {
    // 如果获取不到token，返回到登陆页面
    if(curToken==="undefined"){
      await router.push({name: "login"});
    }
    // 加载所有普通聊天记录
    generalChatRecords.val = await loadChatRecords();
    // 加载所有系统通知
    systemChatRecords.val = await loadSystemChatRecords();
    // 如果系统消息不为空，则显示
    if(systemChatRecords.val.length !== 0){
      systemChatRecords.val = systemChatRecords.val.chats;
    }
    // 加载当前用户详细信息
    curUser.val = await getUserDetailByToken()

    // 加载相关用户列表
    const contacts = await getRelatedRecordList()

    for (let index in contacts) {
      let contactDetail = await getUserDetailById(contacts[index])
      relatedUserList.val.push(contactDetail)
    }

    curChatContent.val = [""];
    loading.value = false;
  })

  // 获得普通聊天信息方法
  async function loadChatRecords() {
    return axios.get("/chat/getAllRecordsByToken", {
      headers: {
        Authorization: curToken
      }
    }).then(function (res){
      return res.data.data;
    });
  }

  // 获得系统通知方法
  async function loadSystemChatRecords() {
    return axios.get("/chat/getAllSystemChatRecordsByToken", {
      headers: {
        Authorization: curToken
      }
    }).then(function (res){
      return res.data.data;
    });
  }

  // 根据用户token获得用户对象方法（不包括密码）
  async function getUserDetailByToken(){
    return axios.get("/user/getUserByToken", {
      params: {
        token: curToken
      }
    }).then(function (res){
      curUserId.value = res.data.data.id
      return res.data.data;
    });
  }

  // 根据用户id获得用户对象方法（不包括密码）
  async function getUserDetailById(id){
    return axios.get("/user/getOneById", {
      params: {
        id: id
      }
    }).then(function (res){
      return res.data.data;
    });
  }

  // 得到相关用户集合
  async function getRelatedRecordList() {
    return axios.get('/chat/getContacts', {
      headers: {
        Authorization: curToken
      }
    }).then(function (res){
      const data = res.data.data
      // 第一个为系统id，删除
      data.shift()
      return res.data.data
    })
  }

  // 改变curChatContent的值
  async function changeCurChatContent(index) {
    curChatContent.val = "";
    for(let i = 0; i <= timer; i++){
      clearInterval(i);
    }
    // 设置聊天类型为普通
    chatType.value = "general";
    loading.value = true;
    // 当前卖家变动，通过索引获取
    // curSeller.val = relatedUserList.val[index];
    curSeller.val = await getUserDetailById(relatedUserList.val[index].id);
    if(curSeller.val.lastname === null){
      curSeller.val.lastname = "*";
    }
    // 调用方法获得聊天内容
    curChatContent.val = await getChatRecordByTwoUserId(curSeller.val.id, curToken);
    setTimeout(()=> {document.getElementById("msgDisplay").scrollTo(0, document.getElementById("msgDisplay").scrollHeight)}, 1)
    loading.value = false;
    timer = refreshChatContent();
  }

  // 通过两个用户id和token获得聊天记录的方法
  async function getChatRecordByTwoUserId(userId, curToken){
    return axios.get("/chat/getChatRecordByTwoUsers", {
      headers: {
        Authorization: curToken
      },
      params: {
        contactUserId: userId
      }
    }).then(function (res){
      return res.data.data.chats;
    })
  }

  // 获得系统通知方法
  async function getSystemMessage(){
    curChatContent.val = "";
    for(let i = 0; i <= timer; i++){
      clearInterval(i);
    }
    // 系统通知窗体
    chatType.value = "system";
    loading.value = true;
    // 将系统通知赋值给curChatContent变量
    curChatContent.val = await systemChatRecords.val;
    setTimeout(()=> {document.getElementById("msgDisplay").scrollTo(0, document.getElementById("msgDisplay").scrollHeight)}, 1)
    loading.value = false;
    timer = refreshChatContent();
  }

  // 发送消息方法
  async function sendMessage(){
    let date = new Date();
    // 时间字符串拼接，精确到分钟
    let curTime = date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate() +
        " " + date.getHours() + ":" + date.getMinutes();
    // // 敏感内容监测
    // let temp = await axios.post("/detect/detectSensitiveContent", "", {
    //   params:{
    //     str: textarea.value.toString()
    //   }
    // }).then(function (res){
    //   return res.data.data;
    // })
    // JSON格式消息体
    let chat = {
      "from": curUserId.value.toString(),
      "to": curSeller.val.id.toString(),
      "content": textarea.value.toString(),
      "date": curTime.toString()
    }
    // 使用stomp进行客户端链接
    //  let stompClient = Stomp.client("ws://120.24.87.75:8888/api/websocket/" + curUserId.value);
    let stompClient = Stomp.client("wss://jiandanmaimai.com/wss/" + curUserId.value);
    stompClient.connect({}, function (frame) {
      // 发送chat
      stompClient.send("/chat/sendChat", {}, JSON.stringify(chat))
      console.log('Connected: ' + frame);
    });
    // 获得新的聊天内容，需要设置延迟，因为信息上传到redis上需要一定时间
    setTimeout(async () => {
      curChatContent.val = await getChatRecordByTwoUserId(curSeller.val.id, curToken)
    }, 300)
    // 局部刷新组件
    keyNum.value++;
    // 发送消息后滚动条滚到最底端
    setTimeout(()=> {document.getElementById("msgDisplay").scrollTo(0, document.getElementById("msgDisplay").scrollHeight)}, 1)
    textarea.value = "";
  }

  let tempSeller = curSeller.val;

  function refreshChatContent(){
    return setInterval(async () => {
        // console.log(curChatContent.val)
        if (curSeller.val.length === 0 && chatType.value === "general") {
          return
        }
        // 如果是普通用户间聊天
        if(chatType.value === "general"){
          // 如果是同一个用户
          if(tempSeller === curSeller.val){
            compareGeneralChatContent.val = await getChatRecordByTwoUserId(curSeller.val.id, curToken);
            if(curChatContent.val.length !== compareGeneralChatContent.val.length){
              curChatContent.val = compareGeneralChatContent.val;
              setTimeout(()=> {document.getElementById("msgDisplay").scrollTo(0, document.getElementById("msgDisplay").scrollHeight)}, 1)
            }
          }
          // 如果是不同用户
          else {
            curChatContent.val = await getChatRecordByTwoUserId(curSeller.val.id, curToken);
          }
          // 如果是系统消息
        }else {
          compareSystemChatContent.val = await loadSystemChatRecords();
          if(compareSystemChatContent.val.length !== 0){
            compareSystemChatContent.val = compareSystemChatContent.val.chats;
          }
          if(curChatContent.val.length !== compareSystemChatContent.val.length){
            curChatContent.val = compareSystemChatContent.val;
            setTimeout(()=> {document.getElementById("msgDisplay").scrollTo(0, document.getElementById("msgDisplay").scrollHeight)}, 1)
          }
        }
        tempSeller = curSeller.val;
      }, 1000)
  }

</script>

<style scoped>
  .systemNotifyFrame{
    width: 13vw;
    transform: translateX(0.5vw);
    font-family: DreamHan, sans-serif;
  }

  .chatMessageFrame{
    width: 13vw;
    transform: translateX(0.5vw);
    font-family: DreamHan, sans-serif;
  }

  .sideBarFrame{
    height: 85vh;
    box-shadow: lightgray 0.2vw 0.2vw 1vw;
  }

  .mainFrame{
    height: 90vh;
  }

  :deep(i.el-icon.el-collapse-item__arrow){
    transform: translateX(-1vw);
  }

  .messageDisplayFrame{
    margin-top: 1vw;
    width: 83.5vw;
    height: 65vh;
    margin-left: 1.2vw;
    border-style: solid;
    border-radius: 1vw;
    border-color: lightgray;
    overflow-x: hidden;
  }

  .messageInputFrame{
    height: 17.5vh;
    margin-top: 0.5vw;
    margin-left: 1.2vw;
  }

  :deep(.messageInputFrame .el-textarea__inner) {
    height: 16.5vh;
  }

  .sendFrame{
    width: 85vw;
  }

  .sendBtn{
    /*margin-top: 1vh;*/
    float: right;
    /*transform: translateX(40vw);*/
  }

  .chatTagFrame{
    width: 12vw;
    height: 1vh;
  }

  .chatTagBtn{
    width: 10vw;
    font-size: 0.7vw;
    transform: translateX(-0.5vw) translateY(-0.7vw);
    color: black;
    font-family: DreamHan, sans-serif;
  }

  .systemMessageTagBtn{
    width: 10vw;
    transform: translateX(-0.5vw);
    color: black;
    font-family: DreamHan, sans-serif;
  }

  .buyerContent{
    /*border-style: solid;*/
    /*border-width: 2px;*/
    /*border-color: olivedrab;*/
    width: 20vw;
    background-color: #a0cfff;
    border-radius: 5px;
    transform: translateX(55vw);
    padding-top: 1vh;
    padding-bottom: 1vh;
  }

  .sellerContent{
    /*border-style: solid;*/
    /*border-width: 2px;*/
    /*border-color: blueviolet;*/
    width: 20vw;
    background-color: #73767a;
    border-radius: 5px;
    transform: translateX(-14.5vw);
    padding-top: 1vh;
    padding-bottom: 1vh;
  }

  .systemMessageContent{
    /*border-width: 2px;*/
    /*border-style: solid;*/
    /*border-color: blueviolet;*/
    width: 20vw;
    background-color: #73767a;
    border-radius: 5px;
    transform: translateX(6vw);
    padding-top: 1vh;
    padding-bottom: 1vh;
  }

  .buyerText{
    transform: translateX(1.5vw);
    width: 17vw;
    text-align: left;
    font-family: DreamHan, sans-serif;
    font-size: 0.8vw;
  }

  .sellerText{
    transform: translateX(1vw);
    width: 17vw;
    text-align: left;
    font-family: DreamHan, sans-serif;
    font-size: 0.8vw;
    color: #E8F3FF;
  }

  .systemMessageText{
    transform: translateX(1vw);
    width: 17vw;
    text-align: left;
    font-family: DreamHan, sans-serif;
    font-size: 0.8vw;
    color: #E8F3FF;
  }

  .buyerAvatar{
    transform: translateX(47vw);
  }

  .sellerAvatar{
    transform: translateX(-7vw);
  }

  .systemAvatar{
    transform: translateX(-27vw);
  }

  .buyerChatDate{
    width: 8vw;
    height: 2.6vh;
    font-size: 0.8vw;
    color: gray;
    transform: translateX(68vw);
  }

  .sellerChatDate{
    width: 8vw;
    height: 2.6vh;
    font-size: 0.8vw;
    color: gray;
    transform: translateX(-13.5vw);
  }

  .systemMessageDate{
    width: 8vw;
    height: 2.6vh;
    font-size: 0.8vw;
    color: gray;
    transform: translateX(6.5vw);
  }

  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;height: 0;
  }

  :deep(.el-textarea__inner){
    width: 83.5vw;
    height: 12vh;
  }

  :deep(.el-collapse-item__header){
    font-size: 0.8vw;
  }
</style>