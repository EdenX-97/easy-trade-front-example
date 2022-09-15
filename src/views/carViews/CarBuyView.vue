<!--
 * @Description: 汽车购买页面
 * @Author: Mo Xu
 * @Date: 16/4/2022
-->
<template>
  <!--总体布局-->
  <el-container class="container">
    <!--顶部广告模块-->
    <el-header class="header">
      <top-adv/>
      <el-divider class="divider"/>
    </el-header>

    <!--中间布局-->
    <el-container>
    <!--侧边筛选栏栏模块-->
      <el-aside class="sideFilter">
        <!--排序方式-->
        <el-select v-model="sortMethod" @change="sortCars" class="sortSelectFrame">
          <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <!-- 内部的筛选栏 -->
        <div class="filter">
          <!-- 筛选标题，包含重置按钮和图标 -->
          <div class="filterTitle">
            <el-icon class="filterIcon"><Filter /></el-icon>
            {{$t("filter")}}
            <el-button class="resetFilter" type="text" @click="resetCars">{{$t("reset")}}</el-button>
          </div>

          <!-- 筛选栏主体 -->
          <div>
            <el-collapse v-model="tier1Collapse">
              <!--基本信息-->
              <el-collapse-item :title="$t('basicInfo')" name="basic">
                <el-collapse v-model="basicCollapse">
                  <el-collapse-item :title="$t('price')" name="basicPrice">
                    <el-row :gutter="1">
                      <el-col :span="23"><el-link type="primary" :underline="false" @click="priceDialogVisible = true" class="buttonFrame">{{priceBtnName}}</el-link></el-col>
                      <el-col :span="1"><el-button type="text" @click="cancelPrice"><el-icon style="width: 1vw"><Close/></el-icon></el-button></el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item :title="$t('location')" name="basicLocation">
                    <el-row :gutter="1">
                      <el-col :span="23"><el-link type="primary" :underline="false" @click="locationDialogVisible = true" class="buttonFrame">{{locationBtnName}}</el-link></el-col>
                      <el-col :span="1"><el-button type="text" @click="cancelLocation"><el-icon style="width: 1vw"><Close/></el-icon></el-button></el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item :title="$t('brand')" name="basicBrand">
                    <el-row :gutter="1">
                      <el-col :span="23"><el-link type="primary" :underline="false" @click="brandDialogVisible = true" class="buttonFrame">{{brandBtnName}}</el-link></el-col>
                      <el-col :span="1"><el-button type="text" @click="cancelBrand"><el-icon style="width: 1vw"><Close/></el-icon></el-button></el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item :title="$t('miles')" name="basicMiles">
                    <el-row :gutter="1">
                      <el-col :span="23"><el-link type="primary" :underline="false" @click="milesDialogVisible = true" class="buttonFrame">{{milesBtnName}}</el-link></el-col>
                      <el-col :span="1"><el-button type="text" @click="cancelMiles"><el-icon style="width: 1vw"><Close/></el-icon></el-button></el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item :title="$t('year')" name="basicDate">
                    <el-row :gutter="1">
                      <el-col :span="23"><el-link type="primary" :underline="false" @click="yearDialogVisible = true" class="buttonFrame">{{yearBtnName}}</el-link></el-col>
                      <el-col :span="1"><el-button type="text" @click="cancelYears"><el-icon style="width: 1vw"><Close/></el-icon></el-button></el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item :title="$t('energy')" name="basicEnergy">
                    <el-row :gutter="1">
                      <el-col :span="23"><el-link type="primary" :underline="false" @click="energyDialogVisible = true" class="buttonFrame">{{energyBtnName}}</el-link></el-col>
                      <el-col :span="1"><el-button type="text" @click="cancelEnergy"><el-icon style="width: 1vw"><Close/></el-icon></el-button></el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item :title="$t('oldNew')" name="basicOldNew">
                    <el-row :gutter="1">
                      <el-col :span="23"><el-link type="primary" :underline="false" @click="oldNewDialogVisible = true" class="buttonFrame">{{oldNewBtnName}}</el-link></el-col>
                      <el-col :span="1"><el-button type="text" @click="cancelOldnew"><el-icon style="width: 1vw"><Close/></el-icon></el-button></el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
                <el-collapse-item :title="$t('accident')" name="basicAccident">
                  <el-row :gutter="1">
                    <el-col :span="23"><el-link type="primary" :underline="false" @click="accidentDialogVisible = true" class="buttonFrame">{{accidentBtnName}}</el-link></el-col>
                    <el-col :span="1"><el-button type="text" @click="cancelAccident"><el-icon style="width: 1vw"><Close/></el-icon></el-button></el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('shipDamage')" name="basicShipDamage">
                  <el-row :gutter="1">
                    <el-col :span="23"><el-link type="primary" :underline="false" @click="shipDamageDialogVisible = true" class="buttonFrame">{{shipDamageBtnName}}</el-link></el-col>
                    <el-col :span="1"><el-button type="text" @click="cancelShipDamage"><el-icon style="width: 1vw"><Close/></el-icon></el-button></el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('stack')" name="basicStackDamage">
                  <el-row :gutter="1">
                    <el-col :span="23"><el-link type="primary" :underline="false" @click="stackDialogVisible = true" class="buttonFrame">{{stackBtnName}}</el-link></el-col>
                    <el-col :span="1"><el-button type="text" @click="cancelStack"><el-icon style="width: 1vw"><Close/></el-icon></el-button></el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse-item>
              <!--&lt;!&ndash;引擎信息&ndash;&gt;-->
              <!--<el-collapse-item :title="$t('engineInfo')" name="engine"></el-collapse-item>-->
              <!--&lt;!&ndash;外形信息&ndash;&gt;-->
              <!--<el-collapse-item :title="$t('appearanceInfo')" name="appearance"></el-collapse-item>-->
            </el-collapse>
          </div>
        </div>
      </el-aside>

      <!--车辆卡片模块-->
      <el-main class="carCards" v-loading="loading" :element-loading-text="$t('loadingCars')">
        <!-- 模型车行搜索框 -->
        <el-radio-group v-model="radio" class="searchSwitch">
          <el-radio :label="1">{{$t("modelSearch")}}</el-radio>
          <el-radio :label="2">{{$t("dealerSearch")}}</el-radio>
        </el-radio-group>
        <el-input v-model="searchValue" :placeholder="$t('buySearchPlaceholder')" class="searchInput"/>
        <el-button type="primary" class="searchBtn" @click="search">{{$t("searchBtn")}}</el-button>
        <el-button type="primary" class="resetBtn" @click="resetCars">{{$t("reset")}}</el-button>
        <!-- 显示搜索到车辆的数量 -->
        <p class="carNumberCount">{{$t("totalNumCarsDes")}} {{pageTotalCars}}</p>

        <!--具体汽车广告卡片-->
        <div v-if="cars.val.toString() !== ''">
          <el-row justify="space-between" :gutter="20">
            <el-col
                v-for="(car, index) in cars.val"
                :key="car"
                :span="12">
              <!-- 广告卡片 -->
              <buy-car-card :car="car" :index="index"/>
            </el-col>
          </el-row>

          <!-- 显示页数 -->
          <div class="paginationFrame">
            <el-pagination
                v-model:currentPage="curPageNumber"
                v-model:page-size="curPageSize"
                :background="true"
                layout="prev, pager, next, jumper"
                :total="pageTotalCars"
                @current-change="loadCurPageCars">
            </el-pagination>
          </div>
        </div>
        <div class="emptyCarsTipFrame" v-else>{{$t('emptyCarsTip')}}</div>
      </el-main>

      <!--侧边广告模块-->
      <el-aside class="sideAdv">
        <side-adv/>
      </el-aside>
    </el-container>
  </el-container>

  <!--弹窗选项-->
  <!--价格区间选择框-->
  <el-dialog v-model="priceDialogVisible" :title="$t('priceDialog')" :append-to-body="true" draggable center >
    <el-form>
      <el-form-item>
        <p class="priceDialog1Label">{{$t("startPriceLabel")}}</p>
        <el-input v-model="priceBet1" autocomplete="off" class="priceDialog1Frame" :placeholder="$t('dialogPlaceHolder')"></el-input>
        <p class="priceDialog2Label">{{$t("endPriceLabel")}}</p>
        <el-input v-model="priceBet2" autocomplete="off" class="priceDialog2Frame" :placeholder="$t('dialogPlaceHolder')"></el-input>
      </el-form-item>
    </el-form>
    <div v-if="priceBet1 === '' && priceBet2 === ''"></div>
    <div v-else-if="priceBet1 !== priceBet1.replace(/[^\d.]/g,'')
    || priceBet2 !== priceBet2.replace(/[^\d.]/g,'')" class="errorTip">{{$t("onlyNumbers")}}</div>
    <div v-else-if="priceBet1 === '' && priceBet2 !== ''" class="errorTip">{{$t("needFullInfo")}}</div>
    <div v-else-if="priceBet1 !== '' && priceBet2 === ''" class="errorTip">{{$t("needFullInfo")}}</div>
    <div v-else-if="priceBet1 > priceBet2" class="errorTip">{{$t("data1SmallerData2")}}</div>
    <div v-else-if="priceBet1 < 0 || priceBet2 < 0" class="errorTip">{{$t("onlyNumbers")}}</div>
    <div v-else></div>
    <template #footer>
      <span class="dialog-footer">
          <el-button @click="priceDialogVisible = false">{{$t("dialogCancel")}}</el-button>
          <el-button type="primary" @click="priceBetCars">{{$t("dialogConfirm")}}</el-button>
        </span>
    </template>
  </el-dialog>
  <!--位置选择框-->
  <el-dialog v-model="locationDialogVisible" :title="$t('locationDialog')" :append-to-body="true" draggable center>
    <el-form>
      <el-form-item>
        <p class="locationDialogLabel">{{$t("locationLabel")}}</p>
        <el-select v-model="location" filterable :placeholder="$t('dialogPlaceHolder')" class="locationDialogFrame" transfer="true" :teleported="false">
          <el-option
              v-for="item in locationList.val"
              :key="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
          <el-button @click="locationDialogVisible = false">{{$t("dialogCancel")}}</el-button>
          <el-button type="primary" @click="locationCars">{{$t("dialogConfirm")}}</el-button>
        </span>
    </template>
  </el-dialog>
  <!--品牌车系选择框-->
  <el-dialog v-model="brandDialogVisible" :title="$t('brandDialog')" :append-to-body="true" draggable center>
    <el-form>
      <el-form-item>
        <p class="locationDialogLabel">{{$t("brandLabel")}}</p>
        <div class="brandDialogFrame">
          <el-cascader
              transfer="true"
              :teleported="false"
              :placeholder="$t('dialogPlaceHolder')"
              :props="brandOptions"
              filterable
              v-model="selectedModel"
          />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
          <el-button @click="brandDialogVisible = false">{{$t("dialogCancel")}}</el-button>
          <el-button type="primary" @click="brandCars">{{$t("dialogConfirm")}}</el-button>
        </span>
    </template>
  </el-dialog>
  <!--公里数选择框-->
  <el-dialog v-model="milesDialogVisible" :title="$t('milesDialog')" :append-to-body="true" draggable center>
    <el-form>
      <el-form-item>
        <p class="priceDialog1Label">{{$t("startMilesLabel")}}</p>
        <el-input v-model="milesBet1" autocomplete="off" class="priceDialog1Frame" :placeholder="$t('dialogPlaceHolder')"></el-input>
        <p class="priceDialog2Label">{{$t("endMilesLabel")}}</p>
        <el-input v-model="milesBet2" autocomplete="off" class="priceDialog2Frame" :placeholder="$t('dialogPlaceHolder')"></el-input>
      </el-form-item>
    </el-form>
    <div v-if="milesBet1 === '' && milesBet2 === ''"></div>
    <div v-else-if="milesBet1 !== milesBet1.replace(/[^\d.]/g,'')
    || milesBet2 !== milesBet2.replace(/[^\d.]/g,'')" class="errorTip">{{$t("onlyNumbers")}}</div>
    <div v-else-if="milesBet1 === '' && milesBet2 !== ''" class="errorTip">{{$t("needFullInfo")}}</div>
    <div v-else-if="milesBet1 !== '' && milesBet2 === ''" class="errorTip">{{$t("needFullInfo")}}</div>
    <div v-else-if="milesBet1 > milesBet2" class="errorTip">{{$t("data1SmallerData2")}}</div>
    <div v-else-if="milesBet1 < 0 || milesBet2< 0" class="errorTip">{{$t("onlyNumbers")}}</div>
    <div v-else></div>
    <template #footer>
      <span class="dialog-footer">
          <el-button @click="milesDialogVisible = false">{{$t("dialogCancel")}}</el-button>
          <el-button type="primary" @click="milesBetCars">{{$t("dialogConfirm")}}</el-button>
        </span>
    </template>
  </el-dialog>
  <!--年份选择框-->
  <el-dialog v-model="yearDialogVisible" :title="$t('yearDialog')" :append-to-body="true" draggable center>
    <el-form>
      <div class="yearFrame">
          {{$t("startYear")}}
          <el-date-picker
              v-model="yearBet1"
              type="year"
              :placeholder="$t('dialogPlaceHolder')"
              prefix-icon="yearPrefixIcon"
              transfer="true"
              :teleported="false"
          />
          {{$t("endYear")}}
            <el-date-picker
                v-model="yearBet2"
                type="year"
                :placeholder="$t('dialogPlaceHolder')"
                prefix-icon="yearPrefixIcon"
                transfer="true"
                :teleported="false"
            />
        </div>
    </el-form>
    <div v-if="yearBet1 === '' && yearBet2 === ''"></div>
    <div v-else-if="yearBet1 !== yearBet1.replace(/[^\d.]/g,'')
    || yearBet2 !== yearBet2.replace(/[^\d.]/g,'')" class="errorTip">{{$t("onlyNumbers")}}</div>
    <div v-else-if="yearBet1 === '' && yearBet2 !== ''" class="errorTip">{{$t("needFullInfo")}}</div>
    <div v-else-if="yearBet1 !== '' && yearBet2 === ''" class="errorTip">{{$t("needFullInfo")}}</div>
    <div v-else-if="yearBet1 > yearBet2" class="errorTip">{{$t("data1SmallerData2")}}</div>
    <div v-else-if="yearBet1 < 0 || yearBet2< 0" class="errorTip">{{$t("onlyNumbers")}}</div>
    <div v-else></div>
    <template #footer>
      <span class="dialog-footer">
          <el-button @click="yearDialogVisible = false">{{$t("dialogCancel")}}</el-button>
          <el-button type="primary" @click="yearBetCars">{{$t("dialogConfirm")}}</el-button>
        </span>
    </template>
  </el-dialog>
  <!--能源选择框-->
  <el-dialog v-model="energyDialogVisible" :title="$t('energyDialog')" :append-to-body="true" draggable center>
    <el-form>
      <el-form-item>
        <p class="locationDialogLabel">{{$t("energyLabel")}}</p>
        <el-select v-model="energy" filterable :placeholder="$t('dialogPlaceHolder')" class="energyDialogFrame" transfer="true" :teleported="false">
          <el-option
              v-for="item in energyList.val"
              :key="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
          <el-button @click="energyDialogVisible = false">{{$t("dialogCancel")}}</el-button>
          <el-button type="primary" @click="energyCars">{{$t("dialogConfirm")}}</el-button>
        </span>
    </template>
  </el-dialog>
  <!--新旧选择框-->
  <el-dialog v-model="oldNewDialogVisible" :title="$t('oldNewDialog')" :append-to-body="true" draggable center>
    <el-form>
      <el-form-item>
        <p class="locationDialogLabel">{{$t("oldNewLabel")}}</p>
        <el-select v-model="oldNew" filterable :placeholder="$t('dialogPlaceHolder')" class="oldNewDialogFrame" transfer="true" :teleported="false">
          <el-option
              v-for="item in oldNewList.val"
              :key="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
          <el-button @click="oldNewDialogVisible = false">{{$t("dialogCancel")}}</el-button>
          <el-button type="primary" @click="oldNewCars">{{$t("dialogConfirm")}}</el-button>
        </span>
    </template>
  </el-dialog>
  <!--事故车选择框-->
  <el-dialog v-model="accidentDialogVisible" :title="$t('accidentDialog')" :append-to-body="true" draggable center>
    <el-form>
      <el-form-item>
        <p class="locationDialogLabel">{{$t("accidentLabel")}}</p>
        <el-select v-model="accident" filterable :placeholder="$t('dialogPlaceHolder')" class="accidentDialogFrame" transfer="true" :teleported="false">
          <el-option
              v-for="item in accidentList.val"
              :key="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
          <el-button @click="accidentDialogVisible = false">{{$t("dialogCancel")}}</el-button>
          <el-button type="primary" @click="accidentCars">{{$t("dialogConfirm")}}</el-button>
        </span>
    </template>
  </el-dialog>
  <!--运损车选择框-->
  <el-dialog v-model="shipDamageDialogVisible" :title="$t('shipDamageDialog')" :append-to-body="true" draggable center>
    <el-form>
      <el-form-item>
        <p class="locationDialogLabel">{{$t("shipDamageLabel")}}</p>
        <el-select v-model="shipDamage" filterable :placeholder="$t('dialogPlaceHolder')" class="shipDamageDialogFrame" transfer="true" :teleported="false">
          <el-option
              v-for="item in shipDamageList.val"
              :key="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
          <el-button @click="shipDamageDialogVisible = false">{{$t("dialogCancel")}}</el-button>
          <el-button type="primary" @click="shipDamageCars">{{$t("dialogConfirm")}}</el-button>
        </span>
    </template>
  </el-dialog>
  <!--库存车选择框-->
  <el-dialog v-model="stackDialogVisible" :title="$t('stackDialog')" :append-to-body="true" draggable center>
    <el-form>
      <el-form-item>
        <p class="locationDialogLabel">{{$t("stackLabel")}}</p>
        <el-select v-model="stack" filterable :placeholder="$t('dialogPlaceHolder')" class="stackDialogFrame" transfer="true" :teleported="false">
          <el-option
              v-for="item in stackList.val"
              :key="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
          <el-button @click="stackDialogVisible = false">{{$t("dialogCancel")}}</el-button>
          <el-button type="primary" @click="stackCars">{{$t("dialogConfirm")}}</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import {onBeforeMount, reactive, ref} from "vue"
  import axios from "axios"
  import "../../assets/font/fonts.css"
  // import router from "@/router"
  import {useI18n} from "vue-i18n"
  import {Filter} from '@element-plus/icons-vue'
  import BuyCarCard from '@/components/car/BuyCarCard'

  // 使用I18国际化组件
  const {t} = useI18n();
  // 控制加载动画变量
  const loading = ref(true)
  // 一级折叠面板
  const tier1Collapse = ref("basic");
  // 二级折叠面板
  const basicCollapse = ref("");
  // 新车+二手车集合
  const cars = reactive({val: []})
  // 原始车辆数组
  const originalCars = reactive({val: []})
  // 当前页码
  const curPageNumber = ref(1);
  // 当前页码
  const curPageSize = ref(10);
  // 车辆总数
  const pageTotalCars = ref("");
  // 排序弹窗可见标志，默认不可见
  let sortDialogVisible = ref(false);
  // 排序方法默认选择
  const sortMethod = ref("priceLH");
  // 排序按钮显示名称
  const sortBtnName = ref(t("priceLHOptions"));
  // 价格弹窗可见标志，默认不可见
  let priceDialogVisible = ref(false)
  // 起始价格数据
  const priceBet1 = ref("");
  // 终止价格数据
  const priceBet2 = ref("");
  // 起始价格按钮显示名称
  const priceBtnName = ref(t("dialogPlaceHolder"));
  // 位置弹窗可见标志，默认不可见
  let locationDialogVisible = ref(false)
  // 位置数据
  const location = ref("");
  // 位置选项集合
  const locationList = reactive({val: []});
  // 位置按钮显示名称
  const locationBtnName = ref(t("dialogPlaceHolder"));
  // 品牌弹窗可见标志，默认不可见
  let brandDialogVisible = ref(false);
  // 品牌数据
  const brand = ref("");
  // 品牌选项集合
  const brandList = reactive({val: []})
  // 品牌按钮显示名称
  const brandBtnName = ref(t("dialogPlaceHolder"));
  // 公里数弹窗可见标志，默认不可见
  let milesDialogVisible = ref(false)
  // 起始公里数据
  const milesBet1 = ref("");
  // 终止公里数据
  const milesBet2 = ref("");
  // 起始公里按钮显示名称
  const milesBtnName = ref(t("dialogPlaceHolder"));
  // 年份弹窗可见标志，默认不可见
  let yearDialogVisible = ref(false)
  // 起始年份数据
  const yearBet1 = ref("");
  // 终止年份数据
  const yearBet2 = ref("");
  // 起始年份按钮显示名称
  const yearBtnName = ref(t("dialogPlaceHolder"))
  // 能源弹窗可见标志，默认不可见
  let energyDialogVisible = ref(false);
  // 能源按钮显示名称
  const energyBtnName = ref(t("dialogPlaceHolder"));
  // 能源数据
  const energy = ref("");
  // 能源选项集合
  const energyList = reactive({val: []})
  // 新旧弹窗可见标志，默认不可见
  let oldNewDialogVisible = ref(false);
  // 新旧数据
  const oldNew = ref("");
  // 新旧选项集合
  const oldNewList = reactive({val: []})
  // 新旧按钮显示名称
  const oldNewBtnName = ref(t("dialogPlaceHolder"))
  // 事故车弹窗可见标志，默认不可见
  let accidentDialogVisible = ref(false);
  // 事故车数据
  const accident = ref("");
  // 事故选项集合
  const accidentList = reactive({val: []});
  // 事故按钮显示名称
  const accidentBtnName = ref(t("dialogPlaceHolder"))
  // 运损车弹窗可见标志，默认不可见
  let shipDamageDialogVisible = ref(false);
  // 运损车数据
  const shipDamage = ref("");
  // 运损车选项集合
  const shipDamageList = reactive({val: []});
  // 运损车按钮显示名称
  const shipDamageBtnName = ref(t("dialogPlaceHolder"))
  // 库存车弹窗可见标志，默认不可见
  let stackDialogVisible = ref(false);
  // 库存车数据
  const stack = ref("");
  // 库存车选项集合
  const stackList = reactive({val: []});
  // 库存车按钮显示名称
  const stackBtnName = ref(t("dialogPlaceHolder"))
  // 品牌选项
  const brandOptions = {
    lazy: true,
    lazyLoad(node, resolve) {
      getData(node, resolve);
    }
  }
  // 选择的模型
  const selectedModel = ref(
      ["", ""]
  );
  // 模型/车行搜索切换
  const radio = ref(1)
  // 模型/车行模糊搜索输入值
  const searchValue = ref("")
  // 排序选项
  const sortOptions = [
    {
      value: 'priceLH',
      label: t("priceLHOptions"),
    },
    {
      value: 'kilometersLH',
      label: t("kilometersLHOptions"),
    },
    {
      value: 'maximumHorsepowerLH',
      label: t("maximumHorsepowerLHOptions"),
    },
    {
      value: 'maximumTorqueLH',
      label: t("maximumTorqueLHOptions"),
    },
    {
      value: 'yearLH',
      label: t("yearLHOptions"),
    },
    {
      value: 'priceHL',
      label: t("priceHLOptions"),
    },
    {
      value: 'kilometersHL',
      label: t("kilometersHLOptions"),
    },
    {
      value: 'maximumHorsepowerHL',
      label: t("maximumHorsepowerHLOptions"),
    },
    {
      value: 'maximumTorqueHL',
      label: t("maximumTorqueHLOptions"),
    },
    {
      value: 'yearHL',
      label: t("yearHLOptions"),
    },
  ]

  // 数据挂载
  onBeforeMount(async () => {
    await getFilterResult();
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage();
    // 加载库存车信息
    await loadAllStack();
  })

  // 级联面板动态获取数据
  async function getData(node, resolve) {
    let level = node.level
    const nodes = Array.from(brandList.val).map((brand) => ({
      value: brand,
      label: brand,
      children: Array.from(getSeriesByBrand(brand)).map((series) => ({
        value: series,
        label: series,
        leaf: level >= 0
      })),
    }))
    resolve(nodes)
  }

  // 通过品牌获取到车系
  function getSeriesByBrand(curBrand){
    let rs = [];
    for(let i = 0; i < cars.val.length; i++){
      if(cars.val[i].brand === curBrand){
        rs.push(cars.val[i].series)
      }
    }
    return rs;
  }

  // 通过车辆排序选项获取所有汽车详情信息
  async function sortCars() {
    await getFilterResult();
    curPageNumber.value = 1;
    document.documentElement.scrollTop = 0;
    // 关闭排序窗口
    sortDialogVisible.value = false;
  }

  // 通过价格区间选项获得车辆
  async function priceBetCars() {
    if(priceBet1.value > priceBet2.value){
      return;
    }
    if(priceBet1.value < 0 || priceBet2.value < 0){
      return;
    }
    if(priceBet1.value === "" && priceBet2.value !== ""){
      return;
    }
    if(priceBet1.value !== "" && priceBet2.value === ""){
      return;
    }
    if(priceBet1.value !== priceBet1.value.replace(/[^\d.]/g,'')
        || priceBet2.value !== priceBet2.value.replace(/[^\d.]/g,'')){
      return;
    }
    await getFilterResult();
    curPageNumber.value = 1;
    document.documentElement.scrollTop = 0;
    priceDialogVisible.value = false;
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage()
    // 加载库存车信息
    await loadAllStack();
  }

  // 获得所有位置信息
  function getAllLocation(){
    let rs = [];
    for(let i = 0; i < cars.val.length; i++){
      let cur = cars.val[i]["province"] + cars.val[i]["city"]
        + cars.val[i]["county"] + cars.val[i]["town"]
      if(!rs.includes(cur)){
        rs.push(cur);
      }
    }
    return rs;
  }

  // 加载位置信息赋值给locationList，作为可选项
  async function loadAllLocation(){
    locationList.val = getAllLocation();
  }

  // 通过位置选项获得所有车辆信息
  async function locationCars() {
    await getFilterResult();
    curPageNumber.value = 1;
    document.documentElement.scrollTop = 0;
    locationDialogVisible.value = false;
    // // 加载位置信息
    // await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage()
    // 加载库存车信息
    await loadAllStack();
  }

  // 获得所有品牌
  function getAllBrand(){
    let rs = [];
    for(let i = 0; i < cars.val.length; i++){
      let cur = cars.val[i]["brand"];
      if(!rs.includes(cur)){
        rs.push(cur);
      }
    }
    return rs;
  }

  // 加载所有品牌，赋值给brandList，作为可选下拉框选项
  async function loadAllBrand(){
    brandList.val = getAllBrand();
  }

  // 通过品牌信息选项框获得所有汽车详情信息
  async function brandCars() {
    await getFilterResult();
    curPageNumber.value = 1;
    document.documentElement.scrollTop = 0;
    brandDialogVisible.value = false;
    // 加载位置信息
    await loadAllLocation();
    // // 加载品牌信息
    // await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage()
    // 加载库存车信息
    await loadAllStack();
  }

  // 通过公里数选项获得所有汽车详情
  async function milesBetCars() {
    if(milesBet1.value > milesBet2.value){
      return;
    }
    if(milesBet1.value < 0 || milesBet2.value < 0){
      return;
    }
    if(milesBet1.value === "" && milesBet2.value !== ""){
      return;
    }
    if(milesBet1.value !== "" && milesBet2.value === ""){
      return;
    }
    if(milesBet1.value !== milesBet1.value.replace(/[^\d.]/g,'')
        || milesBet2.value !== milesBet2.value.replace(/[^\d.]/g,'')){
      return;
    }
    await getFilterResult();
    curPageNumber.value = 1;
    document.documentElement.scrollTop = 0;
    milesDialogVisible.value = false;
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage()
    // 加载库存车信息
    await loadAllStack();
  }

  // 通过年份选项获得汽车详情
  async function yearBetCars() {
    if(yearBet1.value > yearBet2.value){
      return;
    }
    if(yearBet1.value < 0 || yearBet2.value < 0){
      return;
    }
    if(yearBet1.value === "" && yearBet2.value !== ""){
      return;
    }
    if(yearBet1.value !== "" && yearBet2.value === ""){
      return;
    }
    if(yearBet1.value !== yearBet1.value.replace(/[^\d.]/g,'')
        || yearBet2.value !== yearBet2.value.replace(/[^\d.]/g,'')){
      return;
    }
    await getFilterResult();
    curPageNumber.value = 1;
    document.documentElement.scrollTop = 0;
    yearDialogVisible.value = false;
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage();
    // 加载库存车信息
    await loadAllStack();
  }

  // 得到所有车辆能源类型
  function getAllEnergy(){
    let rs = [];
    for(let i = 0; i < cars.val.length; i++){
      let cur = cars.val[i]["energy"];
      if(!rs.includes(cur)){
        rs.push(cur);
      }
    }
    return rs;
  }

  // 加载能源类型赋值给energyList作为选项
  function loadAllEnergy(){
    energyList.val = getAllEnergy();
  }

  // 通过能源选项获得所有车辆详情
  async function energyCars() {
    await getFilterResult();
    curPageNumber.value = 1;
    document.documentElement.scrollTop = 0;
    energyDialogVisible.value = false;
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // // 加载能源信息
    // await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage()
    // 加载库存车信息
    await loadAllStack();
  }

  // 得到所有车辆新旧信息
  function getAllOldNew(){
    let rs = [];
    for(let i = 0; i < cars.val.length; i++){
      let cur = cars.val[i]["vehicleAdType"];
      let nameCN = "";
      if(cur === "NEWCARAD"){
        nameCN = "新车";
      }else if(cur === "SECONDHANDCARAD"){
        nameCN = "二手车";
      }else{
        nameCN = "样本车";
      }
      if(!rs.includes(nameCN)){
        rs.push(nameCN);
      }
    }
    return rs;
  }

  // 加载所有新旧信息赋值给oldNewList作为下拉选项
  function loadAllOldNew(){
    oldNewList.val = getAllOldNew();
  }

  // 通过新旧选项获得所有车辆详情
  async function oldNewCars() {
    await getFilterResult();
    curPageNumber.value = 1;
    document.documentElement.scrollTop = 0;
    oldNewDialogVisible.value = false;
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // // 加载新旧信息
    // await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage()
    // 加载库存车信息
    await loadAllStack();
  }

  // 得到所有车辆新旧信息
  function getAllAccident(){
    let rs = [];
    for(let i = 0; i < cars.val.length; i++){
      let cur = cars.val[i]["ifAccident"];
      let accidentName = "";
      if(cur === false){
        accidentName = "非事故车";
      }else {
        accidentName = "事故车";
      }
      if(!rs.includes(accidentName)){
        rs.push(accidentName);
      }
    }
    return rs;
  }

  // 加载所有新旧信息赋值给oldNewList作为下拉选项
  function loadAllAccident(){
    accidentList.val = getAllAccident();
  }

  // 通过新旧选项获得所有车辆详情
  async function accidentCars() {
    await getFilterResult();
    curPageNumber.value = 1;
    document.documentElement.scrollTop = 0;
    accidentDialogVisible.value = false;
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // // 加载事故车信息
    // await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage()
    // 加载库存车信息
    await loadAllStack();
  }

  // 得到所有车辆新旧信息
  function getAllShipDamage(){
    let rs = [];
    for(let i = 0; i < cars.val.length; i++){
      let cur = cars.val[i]["ifShippingDamage"];
      let shipDamageName = "";
      if(cur === false){
        shipDamageName = "非运损车";
      }else {
        shipDamageName = "运损车";
      }
      if(!rs.includes(shipDamageName)){
        rs.push(shipDamageName);
      }
    }
    return rs;
  }

  // 加载所有新旧信息赋值给oldNewList作为下拉选项
  function loadAllShipDamage(){
    shipDamageList.val = getAllShipDamage();
  }

  // 通过新旧选项获得所有车辆详情
  async function shipDamageCars() {
    await getFilterResult();
    curPageNumber.value = 1;
    document.documentElement.scrollTop = 0;
    shipDamageDialogVisible.value = false;
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // // 加载运损车信息
    // await loadAllShipDamage()
    // 加载库存车信息
    await loadAllStack();
  }

  // 得到所有车辆库存信息
  function getAllStack(){
    let rs = [];
    for(let i = 0; i < cars.val.length; i++){
      let cur = cars.val[i]["ifStock"];
      let stackName = "";
      if(cur === false){
        stackName = "非库存车";
      }else {
        stackName = "库存车";
      }
      if(!rs.includes(stackName)){
        rs.push(stackName);
      }
    }
    return rs;
  }

  // 加载所有新旧信息赋值给oldNewList作为下拉选项
  function loadAllStack(){
    stackList.val = getAllStack();
  }

  // 通过新旧选项获得所有车辆详情
  async function stackCars() {
    await getFilterResult();
    curPageNumber.value = 1;
    document.documentElement.scrollTop = 0;
    shipDamageDialogVisible.value = false;
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage()
    // // 加载库存车信息
    // await loadAllStack();
  }

  async function resetCars() {
    cars.val = originalCars.val;
    milesBet1.value = "";
    milesBet2.value = "";
    milesBtnName.value = t("dialogPlaceHolder");
    priceBet1.value = "";
    priceBet2.value = "";
    priceBtnName.value = t("dialogPlaceHolder");
    location.value = "";
    locationBtnName.value = t("dialogPlaceHolder");
    brandBtnName.value = t("dialogPlaceHolder");
    brand.value = "";
    selectedModel.value = ["", ""]
    yearBet1.value = "";
    yearBet2.value = "";
    yearBtnName.value = t("dialogPlaceHolder");
    energy.value = "";
    energyBtnName.value = t("dialogPlaceHolder");
    oldNew.value = "";
    oldNewBtnName.value = t("dialogPlaceHolder");
    accident.value = "";
    accidentBtnName.value = t("dialogPlaceHolder");
    shipDamage.value = "";
    shipDamageBtnName.value = t("dialogPlaceHolder");
    stack.value = "";
    stackBtnName.value = t("dialogPlaceHolder");
    // 默认价格排序
    await getFilterResult();
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage()
    // 加载库存车信息
    await loadAllStack();
  }

  // 得到筛选结果的方法
  async function getFilterResult(){
    loading.value = true;
    // 如果价格选项不为空
    if(sortMethod.value !== ""){
      if (sortMethod.value === "priceLH") {
        sortBtnName.value = t("priceLHOptions");
      }
      if (sortMethod.value === "viewsLH") {
        sortBtnName.value = t("viewsLHOptions");
      }
      if (sortMethod.value === "clicksLH") {
        sortBtnName.value = t("clicksLHOptions");
      }
      if (sortMethod.value === "kilometersLH") {
        sortBtnName.value = t("kilometersLHOptions");
      }
      if (sortMethod.value === "maximumHorsepowerLH") {
        sortBtnName.value = t("maximumHorsepowerLHOptions");
      }
      if (sortMethod.value === "maximumTorqueLH") {
        sortBtnName.value = t("maximumTorqueLHOptions");
      }
      if (sortMethod.value === "yearLH") {
        sortBtnName.value = t("yearLHOptions");
      }
      if (sortMethod.value === "priceHL") {
        sortBtnName.value = t("priceHLOptions");
      }
      if (sortMethod.value === "viewsHL") {
        sortBtnName.value = t("viewsHLOptions");
      }
      if (sortMethod.value === "clicksHL") {
        sortBtnName.value = t("clicksHLOptions");
      }
      if (sortMethod.value === "maximumHorsepowerHL") {
        sortBtnName.value = t("maximumHorsepowerHLOptions");
      }
      if (sortMethod.value === "maximumTorqueHL") {
        sortBtnName.value = t("maximumTorqueHLOptions");
      }
      if (sortMethod.value === "yearHL") {
        sortBtnName.value = t("yearHLOptions");
      }
      if (sortMethod.value === "kilometersHL") {
        sortBtnName.value = t("kilometersHLOptions");
      }
    }
    // 如果价格不为空
    if(priceBet1.value !== "" && priceBet2.value !== ""){
      priceBtnName.value = priceBet1.value + "~" + priceBet2.value;
    }
    // 如果位置不为空
    if(location.value !== ""){
      locationBtnName.value = location.value;
    }
    // 如果品牌不为空
    if(selectedModel.value[1] !== ""){
      brandBtnName.value = selectedModel.value[1];
    }
    // 如果公里数不为空
    if(milesBet1.value !== "" && milesBet2.value !== ""){
      milesBtnName.value = milesBet1.value + "~" + milesBet2.value;
    }
    // 如果年份不为空
    if(yearBet1.value !== "" && yearBet2.value !== ""){
      yearBtnName.value = yearBet1.value.toString().substring(11, 15) + "~" + yearBet2.value.toString().substring(11, 15);
    }
    // 如果能源不为空
    if(energy.value !== ""){
      energyBtnName.value = energy.value;
    }
    // 如果新旧不为空
    if(oldNew.value !== ""){
      oldNewBtnName.value = oldNew.value;
    }
    // 如果事故车不为空
    if(accident.value !== ""){
      accidentBtnName.value = accident.value;
    }
    // 如果运损车不为空
    if(shipDamage.value !== ""){
      shipDamageBtnName.value = shipDamage.value;
    }
    // 如果库存车不为空
    if(stack.value !== ""){
      stackBtnName.value = stack.value;
    }

    [cars.val, pageTotalCars.value, curPageSize.value] = await axios.post("/vehicle/getFilterCars",
        [sortMethod.value, priceBet1.value, priceBet2.value, location.value, selectedModel.value[1],
          milesBet1.value, milesBet2.value, yearBet1.value, yearBet2.value, energy.value,
          oldNew.value, accident.value, shipDamage.value, stack.value],
        {
          params:{
            pageNumber: curPageNumber.value
          }}
    ).then(function (res){
      console.log(res)
      return [res.data.data[0], res.data.data[1], res.data.data[2]]
    })
    setTimeout(() => {loading.value = false}, 500);
  }

  // 取消价格选项按钮
  async function cancelPrice(){
    priceBet1.value = "";
    priceBet2.value = "";
    priceBtnName.value = t("dialogPlaceHolder");
    // 获取结果集
    await getFilterResult();
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage()
    // 加载库存车信息
    await loadAllStack();
  }

  // 取消位置选项按钮
  async function cancelLocation(){
    location.value = "";
    locationBtnName.value = t("dialogPlaceHolder");
    // 获取结果集
    await getFilterResult();
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage()
    // 加载库存车信息
    await loadAllStack();
  }

  // 取消品牌选项按钮
  async function cancelBrand(){
    selectedModel.value = ["", ""]
    brandBtnName.value = t("dialogPlaceHolder");
    // 获取结果集
    await getFilterResult();
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage();
    // 加载库存车信息
    await loadAllStack();
  }

  // 取消公里数选项按钮
  async function cancelMiles(){
    milesBet1.value = "";
    milesBet2.value = "";
    milesBtnName.value = t("dialogPlaceHolder");
    // 获取结果集
    await getFilterResult();
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage();
    // 加载库存车信息
    await loadAllStack();
  }

  // 取消年份选项按钮
  async function cancelYears(){
    yearBet1.value = "";
    yearBet2.value = "";
    yearBtnName.value = t("dialogPlaceHolder");
    // 获取结果集
    await getFilterResult();
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage();
    // 加载库存车信息
    await loadAllStack();
  }

  // 取消能源选项按钮
  async function cancelEnergy(){
    energy.value = "";
    energyBtnName.value = t("dialogPlaceHolder");
    // 获取结果集
    await getFilterResult();
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage();
    // 加载库存车信息
    await loadAllStack();
  }

  // 取消新旧选项按钮
  async function cancelOldnew(){
    oldNew.value = "";
    oldNewBtnName.value = t("dialogPlaceHolder");
    // 获取结果集
    await getFilterResult();
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage();
    // 加载库存车信息
    await loadAllStack();
  }

  // 取消事故车选项按钮
  async function cancelAccident(){
    accident.value = "";
    accidentBtnName.value = t("dialogPlaceHolder");
    // 获取结果集
    await getFilterResult();
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage();
    // 加载库存车信息
    await loadAllStack();
  }

  // 取消事运损车选项按钮
  async function cancelShipDamage(){
    shipDamage.value = "";
    shipDamageBtnName.value = t("dialogPlaceHolder");
    // 获取结果集
    await getFilterResult();
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage();
    // 加载库存车信息
    await loadAllStack();
  }

  // 取消事库存车车选项按钮
  async function cancelStack(){
    stack.value = "";
    stackBtnName.value = t("dialogPlaceHolder");
    // 获取结果集
    await getFilterResult();
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage();
    // 加载库存车信息
    await loadAllStack();
  }

  // 加载当前页面车辆信息
  async function loadCurPageCars(){
    loading.value = true;
    [cars.val, pageTotalCars.value, curPageSize.value] = await axios.post("/vehicle/getFilterCars",
        [sortMethod.value, priceBet1.value, priceBet2.value, location.value, selectedModel.value[1],
          milesBet1.value, milesBet2.value, yearBet1.value, yearBet2.value, energy.value,
          oldNew.value, accident.value, shipDamage.value, stack.value],
        {
          params:{
            pageNumber: curPageNumber.value
          }}
    ).then(function (res){
      // console.log(res.data.data)
      return [res.data.data[0], res.data.data[1], res.data.data[2]]
    })
    setTimeout(() => {loading.value = false}, 500);
  }

  // 模型/车行搜索按钮
  async function search() {
    loading.value = true;
    // 重置筛选值
    milesBet1.value = "";
    milesBet2.value = "";
    milesBtnName.value = t("dialogPlaceHolder");
    priceBet1.value = "";
    priceBet2.value = "";
    priceBtnName.value = t("dialogPlaceHolder");
    location.value = "";
    locationBtnName.value = t("dialogPlaceHolder");
    brandBtnName.value = t("dialogPlaceHolder");
    brand.value = "";
    selectedModel.value = ["", ""]
    yearBet1.value = "";
    yearBet2.value = "";
    yearBtnName.value = t("dialogPlaceHolder");
    energy.value = "";
    energyBtnName.value = t("dialogPlaceHolder");
    oldNew.value = "";
    oldNewBtnName.value = t("dialogPlaceHolder");
    accident.value = "";
    accidentBtnName.value = t("dialogPlaceHolder");
    shipDamage.value = "";
    shipDamageBtnName.value = t("dialogPlaceHolder");
    stack.value = "";
    stackBtnName.value = t("dialogPlaceHolder");

    // 重置筛选框
    // 加载位置信息
    await loadAllLocation();
    // 加载品牌信息
    await loadAllBrand();
    // 加载能源信息
    await loadAllEnergy();
    // 加载新旧信息
    await loadAllOldNew();
    // 加载事故车信息
    await loadAllAccident();
    // 加载运损车信息
    await loadAllShipDamage()
    // 加载库存车信息
    await loadAllStack();

    if (radio.value === 1) {
      [cars.val, pageTotalCars.value, curPageSize.value] = await axios.get("/vehicle/getSearchCarModel", {
        params: {
          model: searchValue.value,
          pageNumber: curPageNumber.value
        }
      }).then(function (res) {
        // console.log(res)
        return [res.data.data[0], res.data.data[1], res.data.data[2]]
      })
    }
    if (radio.value === 2) {
      [cars.val, pageTotalCars.value, curPageSize.value] = await axios.get("/vehicle/getSearchCarCompanyName", {
        params: {
          companyName: searchValue.value,
          pageNumber: curPageNumber.value
        }
      }).then(function (res) {
        // console.log(res)
        return [res.data.data[0], res.data.data[1], res.data.data[2]]
      })
    }

    loading.value = false;
  }
</script>


<style scoped>
.container {
  margin-bottom: 2vw;
}
.header {
  height: 14vh;
}

.sideFilter {
  width: 20vw;
  /*height: 113.5vw;*/
}

.divider {
  margin-top: 0.7vh;
  margin-bottom: 0.5vh;
}

.filter {
  float: right;
  width: 10vw;
  margin-top: 1.5vh;
  margin-right: 1vw;
}

.filterTitle{
  text-align: left;
  width: 10vw;
  font-size: 1vw;
}

:deep(.el-collapse-item__content) {
  padding-left: 0.5vw;
  padding-right: 1vw;
}

.carCards {
  background-color: #E6E8EB;
  border-radius: 1vw;
}

.carNumberCount{
  margin-left: 1vw;
  font-size: 1vw;
  text-align: left;
}

.sideAdv {
  width: 20vw;
}

.emptyCarsTipFrame {
  margin-top: 10vh;
  margin-bottom: 10vh;
}

.paginationFrame {
  display: flex;
  justify-content: center;
  font-size: 1vw;
}

.resetFilter {
  width: 3vw;
  margin-bottom: 0.1vh;
  font-size: 1vw;
}

.buttonFrame {
  font-size: 0.7vw;
  word-wrap:break-word;
}

.priceDialog1Frame{
  width: 12vw;
  transform: translateX(7vw) translateY(1.1vh);
}
.priceDialog2Frame{
  width: 12vw;
  transform: translateX(10.5vw) translateY(1.1vh);
}
.priceDialog1Label{
  font-size: 1vw;
  transform: translateX(6.5vw) translateY(1.1vh);
  font-family: DreamHan, sans-serif;
}
.priceDialog2Label{
  font-size: 1vw;
  transform: translateX(10vw) translateY(1.1vh);
  font-family: DreamHan, sans-serif;
}
.locationDialogLabel{
  font-size: 1vw;
  transform: translateX(10vw) translateY(1.1vh);
}
.locationDialogFrame{
  width: 17vw;
  transform: translateX(10vw) translateY(1.1vh);
}
.sortSelectFrame{
  width: 10vw;
  height: 1vh;
  transform: translateX(4vw);
}

.brandDialogFrame{
  width: 15vw;
  transform: translateX(12vw) translateY(1.1vh);
}
.energyDialogFrame{
  width: 15vw;
  transform: translateX(12vw) translateY(1.1vh);
}
.yearFrame{
  transform: translateX(0vw);
  font-size: 1vw;
}
:deep(.el-loading-spinner){
  transform: translateY(-12vh);
}

.brandDialogFrame >>> .el-input__inner{
  width: 13vw;
  transform: translateX(-1vh);
}

.brandDialogFrame >>> .el-icon.el-input__icon.icon-arrow-down{
  transform: translateX(-1vh);
}

.locationDialogFrame >>> .el-input__inner{
  transform: translateX(1.5vh);
}

.locationDialogFrame >>> .el-input__suffix-inner{
  transform: translateX(1.5vh);
}

.year1 >>> .el-input__inner{
  width: 13vw;
  transform: translateX(-1.5vw);
}

.year2 >>> .el-input__inner{
  width: 13vw;
  transform: translateX(18.5vw);
}

.year2 >>> .el-picker__popper{
  transform: translateX(19.5vw) translateY(-3.8vw);
}

.brandDialogFrame >>> .el-input__suffix-inner{
  transform: translateX(0vw);
}

:deep(.el-collapse-item__header){
  font-size: 0.7vw;
}

.oldNewDialogFrame{
  width: 10vw;
  transform: translateX(12vw) translateY(1.1vh);
}

.oldNewDialogFrame >>> .el-input__suffix{
  transform: translateX(0vw);
}

.accidentDialogFrame{
  width: 10vw;
  transform: translateX(12vw) translateY(1.1vh);
}

.shipDamageDialogFrame{
  width: 10vw;
  transform: translateX(12vw) translateY(1.1vh);
}

.errorTip{
  font-family: DreamHan, sans-serif;
  font-size: 0.7vw;
  color: red;
  text-align: center;
}

:deep(.el-input__inner){
  font-size: 0.7vw;
}

/*:deep(.el-dialog.is-draggable.el-dialog--center){*/
/*  width: 10vw;*/
/*}*/

:deep(.el-input__inner){
  font-size: 0.7vw;
  /*width: 13vw;*/
}

:deep(.el-input.el-input--prefix.el-input--suffix.el-date-editor.el-date-editor--year.el-tooltip__trigger.el-tooltip__trigger){
  width: 14vw;
}

:deep(.el-input__suffix){
  width: 1vw;
}

.searchSwitch{
  transform: translateX(-5vw);
}

.searchInput{
  transform: translateX(0vw);
  width: 25vw;
}

.searchBtn{
  transform: translateX(3vw);
  width: 5vw;
}

.resetBtn{
  transform: translateX(3vw);
  width: 5vw;
}

.stackDialogFrame{
  width: 10vw;
  transform: translateX(12vw) translateY(1.1vh);
}
</style>