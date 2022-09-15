<!--
 * @Description: 摩托买卖页面
 * @Author: Hongzhang Liu
 * @Date: 29/6/2022
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
      <!--车辆详情模块-->
      <el-main class="carDetailFrame">
        <!--返回及收藏按钮-->
        <div class="returnAndStarButtons">
          <el-button type="text" class="backToBtn" @click="backToBuyMotorPage">&#60; {{t("backBtn")}}</el-button>
<!--          <el-button v-if="isStar===false" type="text" circle class="starBtn" @click="starCar">-->
<!--            <el-icon><star /></el-icon>{{t("starBtn")}}-->
<!--          </el-button>-->
<!--          <el-button v-else type="text" circle class="starBtn" @click="cancelStarCar">-->
<!--            <el-icon><star-filled /></el-icon>{{t("cancelStarBtn")}}-->
<!--          </el-button>-->
        </div>
        <!--模型名称及新旧位置信息-->
        <div class="modelNameDisplay">
          {{car.val.model}}
          <div v-if="car.val.ifAccident === true" class="accidentDetailTip">
            {{$t("accidentTip")}}
          </div>
          <div v-if="car.val.ifShippingDamage === true" class="shipDamageDetailTip">
            {{$t("shipDamageTip")}}
          </div>
          <p class="desUnderModelName">
            {{car.val.oldNew}} - {{car.val.province}} - {{car.val.city}} - {{car.val.county}} - {{car.val.town}}
          </p>
        </div>

        <!--车辆图片信息（走马灯）-->
        <div class="carouseMainFrame" v-loading="loading" :element-loading-text="$t('loadingImages')">
          <el-carousel trigger="click" height="30vw" class="carouselFrame">
            <el-carousel-item v-for="image in car.val.images" :key="image">
              <!--:src=image-->
              <el-image :src=image class="carouselImageFrame"/>
            </el-carousel-item>
            <div :ref="finishLoading"></div>
          </el-carousel>
        </div>

        <!--重要参数简单描述-->
        <el-descriptions class="desUnderCarouse" column="4" direction="vertical">
          <el-descriptions-item :label="$t('type')" align="center">{{car.val.type}}</el-descriptions-item>
          <el-descriptions-item :label="$t('fuelCapacity')" align="center">{{car.val.fuelCapacity}}</el-descriptions-item>
          <el-descriptions-item :label="$t('energy')" align="center">{{car.val.energy}}</el-descriptions-item>
          <el-descriptions-item :label="$t('displacement')" align="center">{{car.val.displacement}}</el-descriptions-item>
        </el-descriptions>

        <el-divider class="divider"/>

        <p class="sellerDesTitle">{{$t("sellerDes")}}</p>
        <p class="sellerDesContent">{{car.val.description}}</p>

        <el-divider class="divider"/>

        <!--所有参数详情-->
        <p class="carInfoTitle">{{t("carInfoTitle")}}</p>
        <el-tabs type="border-card">
          <!--基本信息栏-->
          <el-tab-pane :label="$t('basicLabel')" class="mainInfoFrame">
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("brand")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.brand}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("series")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.series}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("model")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.model}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("price")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.price}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("type")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.type}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("isImport")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.isImport}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("produceLocation")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.produceLocation}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("manufacturer")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.manufacturer}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("engine")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.engine}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("maximumHorsepower")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.maximumHorsepower}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("maximumPowerRotationSpeed")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.maximumPowerRotationSpeed}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("maximumTorqueRotationSpeed")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.maximumTorqueRotationSpeed}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("gearbox")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.gearbox}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("abs")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.abs}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("cbs")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.cbs}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("lwh")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.lwh}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("seatHeight")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.seatHeight}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("curbWeight")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.curbWeight}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("fuelCapacity")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.fuelCapacity}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("maximumSpeed")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.maximumSpeed}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("averageFuelConsume")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.averageFuelConsume}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("lifeMile")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.lifeMile}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("warranty")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.warranty}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("maximumPayload")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.maximumPayload}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("minimumTurningRadius")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.minimumTurningRadius}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("timeToMarket")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.timeToMarket}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("produceStatus")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.produceStatus}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("configOptions")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.configOptions}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("officialAverageFuelConsume")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.officialAverageFuelConsume}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("officialAccelerate")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.officialAccelerate}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("dryWeight")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.dryWeight}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("leaningAngle")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.leaningAngle}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
          </el-tab-pane>
          <!--详细信息栏-->
          <el-tab-pane :label="$t('imLabel')">
            <div class="demo-collapse">
              <el-collapse v-model="activeNames1">
                <el-collapse-item :title="$t('imStructure')" name="1" font-size="0.5vw">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("color")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.color}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("length")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.length}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("width")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.width}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("height")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.height}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("wheelbase")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.wheelbase}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("minimumDistanceFromGround")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.minimumDistanceFromGround}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("frameType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frameType}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("rearRockerArm")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rearRockerArm}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("frontSuspensionSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontSuspensionSystem}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("rearSuspensionSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rearSuspensionSystem}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("majorFuelBoxCapacity")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.majorFuelBoxCapacity}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("viceFuelBoxCapacity")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.viceFuelBoxCapacity}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("dragDistance")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.dragDistance}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('imEngine')" name="2">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("engineModel")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.engineModel}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("displacement")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.displacement}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("accurateDisplacement")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.accurateDisplacement}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("intakeForm")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.intakeForm}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("engineStructure")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.engineStructure}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("cylindersNum")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.cylindersNum}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("distributionStructure")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.distributionStructure}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("diameterStroke")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.diameterStroke}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("engineStroke")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.engineStroke}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("compressionRatio")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.compressionRatio}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("coldMethod")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.coldMethod}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("energy")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.energy}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("fuelLabel")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.fuelLabel}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("offerFuelMethod")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.offerFuelMethod}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("environmentalStandard")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.environmentalStandard}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('imMotor')" name="3">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("electricMaximumHorsepower")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.electricMaximumHorsepower}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("electricMaximumPowerRotationSpeed")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.electricMaximumPowerRotationSpeed}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("electricMaximumTorqueRotationSpeed")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.electricMaximumTorqueRotationSpeed}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("batterySpecification")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.batterySpecification}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("chargeTime")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.chargeTime}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("quickChargeTime")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.quickChargeTime}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("officialElectricConsume")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.officialElectricConsume}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("testElectricConsume")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.testElectricConsume}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("electricEngineModel")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.electricEngineModel}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("controller")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.controller}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("electricEnergyType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.electricEnergyType}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("batteryType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.batteryType}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("batteryHeartType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.batteryHeartType}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("voltage")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.voltage}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("batteryCapacity")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.batteryCapacity}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("batteryWeight")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.batteryWeight}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("standardChargingCurrent")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.standardChargingCurrent}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("loopChargeTime")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.loopChargeTime}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("dischargeTemperatureRange")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.dischargeTemperatureRange}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('powerTransmission')" name="4">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("clutch")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.clutch}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("transmissionWay")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.transmissionWay}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('tires')" name="5">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("slidingClutch")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.slidingClutch}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("frontWheelSpecification")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontWheelSpecification}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("rearWheelSpecification")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rearWheelSpecification}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("tireForm")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.tireForm}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("rim")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rim}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('brakingSystem')" name="6">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("frontBrakingSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontBrakingSystem}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("rearBrakingSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rearBrakingSystem}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('safeConfig')" name="7">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("absCloseSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.absCloseSystem}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("bendAbsSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.bendAbsSystem}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("tirePressureDetection")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.tirePressureDetection}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("tractionControlSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.tractionControlSystem}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("steeringDamper")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.steeringDamper}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
          <!--附加信息栏-->
          <el-tab-pane :label="$t('additionalInfo')">
            <div class="demo-collapse">
              <el-collapse v-model="activeNames2">
                <el-collapse-item :title="$t('auxiliaryFunction')" name="8">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("driveModelSelection")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.driveModelSelection}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("throttleConfig")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.throttleConfig}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("quickShiftSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.quickShiftSystem}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("electronicSuspension")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.electronicSuspension}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("cruiseControl")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.cruiseControl}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("hydraulicClutch")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.hydraulicClutch}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("engineStartStop")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.engineStartStop}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("pulseIgnitionSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.pulseIgnitionSystem}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addDisplay')" name="9">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("dashboard")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.dashboard}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("mobileConnection")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.mobileConnection}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("navigationScreenCasting")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.navigationScreenCasting}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("gearDisplay")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.gearDisplay}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('advancedConfig')" name="10">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("usb")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.usb}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("noKeyStart")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.noKeyStart}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("electricHeatingHandle")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.electricHeatingHandle}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("electricHeatingSeat")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.electricHeatingSeat}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("windshield")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.windshield}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addLight')" name="11">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("frontLight")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontLight}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("rearLight")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rearLight}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("rotationLight")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rotationLight}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("supportLight")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.supportLight}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("dangerLight")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.dangerLight}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("autoLight")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.autoLight}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('optionalPackage')" name="12">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("optionalPackage")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.optionalPackage}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <!--侧边模块-->
      <el-aside class="siderSearchFrame">
        <div class="rightFunctions">
          <div class="analyseAndHistoryFrame">
            <p class="desAnalyseAndHistory">{{$t("finalPrice")}}{{car.val.price}}{{$t("yuan")}}</p>
<!--            <el-button type="primary" class="siderBtn">价格分析/车辆历史</el-button>-->
<!--            <el-button type="primary" class="siderBtn" disabled>尽请期待</el-button>-->
          </div>
          <div class="analyseAndHistoryFrame">
            <p class="desAnalyseAndHistory">{{$t("contactSeller")}}</p>
            <div v-if="token !== 'undefined'">
              <!--<el-button type="primary" class="siderBtn" @click="routerPush(curUser.val.id, car.val.userId, carId)">{{$t("onlineChat")}}</el-button>-->
              <el-button type="primary" class="siderBtn" @click="contact(curUser.val.id, car.val.userId)">{{$t("onlineChat")}}</el-button>
            </div>
            <div v-else>
              <el-button type="primary" class="siderBtn" @click="routerPushLogin">{{$t("onlineChat")}}</el-button>
            </div>
          </div>
          <div class="analyseAndHistoryFrame">
            <p class="desAnalyseAndHistory">{{$t("callSeller")}}</p>
            <el-button v-if="car.val.showContactNum === true" type="success" class="siderBtn" disabled>{{car.val.contactNum}}</el-button>
            <el-button v-else type="success" class="siderBtn" disabled>{{$t('dealerDoNotShowContact')}}</el-button>
          </div>
          <div class="analyseAndHistoryFrame">
            <p class="desAnalyseAndHistory">{{$t("checkCarService")}}</p>
<!--            <el-button type="primary" class="siderBtn">{{$t("applyCheckService")}}</el-button>-->
            <el-button type="primary" class="siderBtn" disabled>尽请期待</el-button>
          </div>
        </div>

        <side-adv class="sideAdv"/>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup>
import router from "@/router";
import {onBeforeMount, reactive, ref} from "vue";
import axios from "axios";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";

// 使用I18n组件进行页面国际化配置
// eslint-disable-next-line no-unused-vars
const {t} = useI18n();

// 使用Store组件来从全局信息中获取数据
const store = useStore()

// 控制加载动画变量
const loading = ref(true)

// 激活的重要信息栏中的折叠选项
const activeNames1 = ref([])

// 激活的附加信息栏中的折叠选项
const activeNames2 = ref([])

// 从router中取得当前汽车广告的id
const carId = ref(router.currentRoute.value.params.carId)

// 当前汽车广告的卖家信息详情
const seller = reactive({
  val: []
});

// 当前汽车详细数据
const car = reactive({
  val: []
});

// 当前汽车样本车辆数据
const exampleCarInfo = reactive({
  val: []
});

// 从Store中使用getAuth方法获取token
const token = store.getters.getAuth;

// 收藏标志位，默认为未收藏状态
const isStar = ref(false);

// 当前用户，通过token获得（调用后端接口）
const curUser = reactive({
  val: []
})

// 发起聊天并添加联系人
function contact(buyerId, sellerId) {
  // 如果未登录，直接跳转至登录界面
  if (token === null || token === '') {
    router.push('/login')
  }

  // 添加联系人
  if (buyerId !== sellerId) {
    axios.post('/chat/addContact', {}, {
      headers: {
        Authorization: token
      },
      params: {
        contactId: sellerId
      }
    }).then((res) => {
      if (res.data.code !== 1000) {
        console.log('Cannot add contact')
        console.log(res.data)
      } else {
        router.push('/chat')
      }
    })
  } else {
    console.log('Cannot add contact')
  }
}

// 路由跳转到登陆界面
function routerPushLogin(){
  router.push({name: "login"});
}

// 数据挂载
onBeforeMount(async()=>{
  await loadCurCar();
  if(car.val.adStatus !== "POSTED"){
    await router.push({name: "home"});
  }
  await loadExampleCarInfo();
  await jointInfo();
  curUser.val = await getUserByToken()
  isStar.value = await checkIsStar();
  seller.val = await getUserDetailById();
})

// 得到当前车辆详情信息
function getCurCar(){
  return axios.get("/vehicle/getVehicleById", {
    params: {
      id: carId.value
    }
  }).then(function (res){
    return res.data.data;
  })
}

// 加载当前车辆信息，并赋值给car变量
async function loadCurCar(){
  car.val = await getCurCar();
  car.val.images = await getAllImagesUrlsByCarId(carId.value);
  if (car.val.vehicleAdType === 'NEWCARAD') {
    car.val.oldNew = t('newCar')
  } else if (car.val.vehicleAdType === 'SECONDHANDCARAD') {
    car.val.oldNew = t('secondHandCar')
  }
}

// 得到与当前车辆相关样本车辆信息
function getExampleCarInfo(){
  return axios.get("/example/motor/getExampleMotorById", {
    params: {
      id: car.val.exampleVehicleId
    }
  }).then(function (res){
    return res.data.data;
  })
}

// 加载样本车辆信息并赋值给exampleCarInfo变量
async function loadExampleCarInfo(){
  exampleCarInfo.val = await getExampleCarInfo();
}

// 根据用户id获得用户对象方法（不包括密码）
async function getUserDetailById(){
  return axios.get("/user/getOneById", {
    params: {
      id: car.val.userId
    }
  }).then(function (res){
    return res.data.data;
  });
}

// 返回上一个界面按钮功能
function backToBuyMotorPage(){
  router.push({name: "motorBuy"});
}

// 拼接car和exampleInfo中的信息，作为最终的结果信息
function jointInfo(){
  let tempCar = car.val;

  // 基本信息
  tempCar.timeToMarket = exampleCarInfo.val.timeToMarket;
  tempCar.produceStatus = exampleCarInfo.val.produceStatus;
  tempCar.configOptions = exampleCarInfo.val.configOptions;
  tempCar.officialAverageFuelConsume = exampleCarInfo.val.officialAverageFuelConsume;
  tempCar.officialAccelerate = exampleCarInfo.val.officialAccelerate;
  tempCar.dryWeight = exampleCarInfo.val.dryWeight;
  tempCar.leaningAngle = exampleCarInfo.val.leaningAngle;
  tempCar.brand = exampleCarInfo.val.brand;
  tempCar.series = exampleCarInfo.val.series;
  tempCar.model = exampleCarInfo.val.model.split(' - ')[0];
  tempCar.price = exampleCarInfo.val.price;
  tempCar.type = exampleCarInfo.val.type;
  tempCar.isImport = exampleCarInfo.val.isImport;
  tempCar.produceLocation = exampleCarInfo.val.produceLocation;
  tempCar.manufacturer = exampleCarInfo.val.manufacturer;
  tempCar.engine = exampleCarInfo.val.engine;
  tempCar.maximumHorsepower = exampleCarInfo.val.maximumHorsepower;
  tempCar.maximumPowerRotationSpeed = exampleCarInfo.val.maximumPowerRotationSpeed;
  tempCar.maximumTorqueRotationSpeed = exampleCarInfo.val.maximumTorqueRotationSpeed;
  tempCar.gearbox = exampleCarInfo.val.gearbox;
  tempCar.abs = exampleCarInfo.val.abs;
  tempCar.cbs = exampleCarInfo.val.cbs;
  tempCar.lwh = exampleCarInfo.val.lwh;
  tempCar.seatHeight = exampleCarInfo.val.seatHeight;
  tempCar.curbWeight = exampleCarInfo.val.curbWeight;
  tempCar.fuelCapacity = exampleCarInfo.val.fuelCapacity;
  tempCar.maximumSpeed = exampleCarInfo.val.maximumSpeed;
  tempCar.averageFuelConsume = exampleCarInfo.val.averageFuelConsume;
  tempCar.lifeMile = exampleCarInfo.val.lifeMile;
  tempCar.warranty = exampleCarInfo.val.warranty;
  tempCar.maximumPayload = exampleCarInfo.val.maximumPayload;
  tempCar.minimumTurningRadius = exampleCarInfo.val.minimumTurningRadius;

  // 详细信息
  // 车体结构
  tempCar.color = exampleCarInfo.val.color;
  tempCar.length = exampleCarInfo.val.length;
  tempCar.width = exampleCarInfo.val.width;
  tempCar.height = exampleCarInfo.val.height;
  tempCar.wheelbase = exampleCarInfo.val.wheelbase;
  tempCar.minimumDistanceFromGround = exampleCarInfo.val.minimumDistanceFromGround;
  tempCar.frameType = exampleCarInfo.val.frameType;
  tempCar.rearRockerArm = exampleCarInfo.val.rearRockerArm;
  tempCar.frontSuspensionSystem = exampleCarInfo.val.frontSuspensionSystem;
  tempCar.rearSuspensionSystem = exampleCarInfo.val.rearSuspensionSystem;
  tempCar.majorFuelBoxCapacity = exampleCarInfo.val.majorFuelBoxCapacity;
  tempCar.viceFuelBoxCapacity = exampleCarInfo.val.viceFuelBoxCapacity;
  tempCar.dragDistance = exampleCarInfo.val.dragDistance;

  // 发动机
  tempCar.engineModel = exampleCarInfo.val.engineModel;
  tempCar.displacement = exampleCarInfo.val.displacement;
  tempCar.accurateDisplacement = exampleCarInfo.val.accurateDisplacement;
  tempCar.intakeForm = exampleCarInfo.val.intakeForm;
  tempCar.engineStructure = exampleCarInfo.val.engineStructure;
  tempCar.cylindersNum = exampleCarInfo.val.cylindersNum;
  tempCar.distributionStructure = exampleCarInfo.val.distributionStructure;
  tempCar.diameterStroke = exampleCarInfo.val.diameterStroke;
  tempCar.engineStroke = exampleCarInfo.val.engineStroke;
  tempCar.compressionRatio = exampleCarInfo.val.compressionRatio;
  tempCar.coldMethod = exampleCarInfo.val.coldMethod;
  tempCar.energy = exampleCarInfo.val.energy;
  tempCar.fuelLabel = exampleCarInfo.val.fuelLabel;
  tempCar.offerFuelMethod = exampleCarInfo.val.offerFuelMethod;
  tempCar.environmentalStandard = exampleCarInfo.val.environmentalStandard;

  // 电动机
  tempCar.electricMaximumHorsepower = exampleCarInfo.val.electricMaximumHorsepower;
  tempCar.electricMaximumPowerRotationSpeed = exampleCarInfo.val.electricMaximumPowerRotationSpeed;
  tempCar.electricMaximumTorqueRotationSpeed = exampleCarInfo.val.electricMaximumTorqueRotationSpeed;
  tempCar.batterySpecification = exampleCarInfo.val.batterySpecification;
  tempCar.chargeTime = exampleCarInfo.val.chargeTime;
  tempCar.quickChargeTime = exampleCarInfo.val.quickChargeTime;
  tempCar.officialElectricConsume = exampleCarInfo.val.officialElectricConsume;
  tempCar.testElectricConsume = exampleCarInfo.val.testElectricConsume;
  tempCar.electricEngineModel = exampleCarInfo.val.electricEngineModel;
  tempCar.controller = exampleCarInfo.val.controller;
  tempCar.electricEnergyType = exampleCarInfo.val.electricEnergyType;
  tempCar.batteryType = exampleCarInfo.val.batteryType;
  tempCar.batteryHeartType = exampleCarInfo.val.batteryHeartType;
  tempCar.voltage = exampleCarInfo.val.voltage;
  tempCar.batteryCapacity = exampleCarInfo.val.batteryCapacity;
  tempCar.batteryWeight = exampleCarInfo.val.batteryWeight;
  tempCar.standardChargingCurrent = exampleCarInfo.val.standardChargingCurrent;
  tempCar.loopChargeTime = exampleCarInfo.val.loopChargeTime;
  tempCar.dischargeTemperatureRange = exampleCarInfo.val.dischargeTemperatureRange;

  // 动力传输
  tempCar.clutch = exampleCarInfo.val.clutch;
  tempCar.transmissionWay = exampleCarInfo.val.transmissionWay;
  tempCar.slidingClutch = exampleCarInfo.val.slidingClutch;

  // 轮胎
  tempCar.frontWheelSpecification = exampleCarInfo.val.frontWheelSpecification;
  tempCar.rearWheelSpecification = exampleCarInfo.val.rearWheelSpecification;
  tempCar.tireForm = exampleCarInfo.val.tireForm;
  tempCar.rim = exampleCarInfo.val.rim;

  // 制动系统
  tempCar.frontBrakingSystem = exampleCarInfo.val.frontBrakingSystem;
  tempCar.rearBrakingSystem = exampleCarInfo.val.rearBrakingSystem;

  // 安全配置
  tempCar.absCloseSystem = exampleCarInfo.val.absCloseSystem;
  tempCar.bendAbsSystem = exampleCarInfo.val.bendAbsSystem;
  tempCar.tirePressureDetection = exampleCarInfo.val.tirePressureDetection;
  tempCar.tractionControlSystem = exampleCarInfo.val.tractionControlSystem;
  tempCar.steeringDamper = exampleCarInfo.val.steeringDamper;

  // 附加信息
  // 辅助功能
  tempCar.driveModelSelection = exampleCarInfo.val.driveModelSelection;
  tempCar.throttleConfig = exampleCarInfo.val.throttleConfig;
  tempCar.quickShiftSystem = exampleCarInfo.val.quickShiftSystem;
  tempCar.electronicSuspension = exampleCarInfo.val.electronicSuspension;
  tempCar.cruiseControl = exampleCarInfo.val.cruiseControl;
  tempCar.hydraulicClutch = exampleCarInfo.val.hydraulicClutch;
  tempCar.engineStartStop = exampleCarInfo.val.engineStartStop;
  tempCar.pulseIgnitionSystem = exampleCarInfo.val.pulseIgnitionSystem;

  // 显示
  tempCar.dashboard = exampleCarInfo.val.dashboard;
  tempCar.mobileConnection = exampleCarInfo.val.mobileConnection;
  tempCar.navigationScreenCasting = exampleCarInfo.val.navigationScreenCasting;
  tempCar.gearDisplay = exampleCarInfo.val.gearDisplay;

  // 高级配置
  tempCar.usb = exampleCarInfo.val.usb;
  tempCar.noKeyStart = exampleCarInfo.val.noKeyStart;
  tempCar.electricHeatingHandle = exampleCarInfo.val.electricHeatingHandle;
  tempCar.electricHeatingSeat = exampleCarInfo.val.electricHeatingSeat;
  tempCar.windshield = exampleCarInfo.val.windshield;

  // 灯光
  tempCar.frontLight = exampleCarInfo.val.frontLight;
  tempCar.rearLight = exampleCarInfo.val.rearLight;
  tempCar.rotationLight = exampleCarInfo.val.rotationLight;
  tempCar.supportLight = exampleCarInfo.val.supportLight;
  tempCar.dangerLight = exampleCarInfo.val.dangerLight;
  tempCar.autoLight = exampleCarInfo.val.autoLight;

  // 选装包
  tempCar.optionalPackage = exampleCarInfo.val.optionalPackage;

  car.val = tempCar;
}

// 通过id在OSS服务器中获取图片信息
function getAllImagesUrlsByCarId(carId){
  return axios.get("/vehicle/getImagesFromOSSById", {
    params: {
      id: carId
    }
  }).then(function (res){
    return res.data.data;
  })
}

// 通过token来获取用户对象
function getUserByToken(){
  return axios.get("/user/getUserByToken", {
    params: {
      token: token
    }
  }).then(function (res){
    return res.data.data
  })
}

// 检查用户是否已经收藏当前车辆
async function checkIsStar(){
  return axios.get("/vehicle/getFavouriteState", {
    params: {
      id: carId.value,
      phone: curUser.val.phone
    }
  }).then(function (res){
    return res.data.data;
  });
}

// // 按钮功能，收藏汽车广告
// async function starCar(){
//   axios.post("/vehicle/favorite",{}, {
//     params: {
//       id: carId.value,
//       account: curUser.val.phone
//     }
//   }).then(async function (res) {
//     console.log(res)
//   });
//   router.go(0)
// }
//
// // 按钮功能，取消收藏汽车广告
// function cancelStarCar(){
//   axios.post("/vehicle/cancelFavorite",{}, {
//     params: {
//       id: carId.value,
//       account: curUser.val.phone
//     }
//   }).then(function (res){
//     console.log(res)
//   });
//   router.go(0)
// }

// 结束加载动画，时间较久
function finishLoading(){
  setTimeout(() => {loading.value = false}, 4000)
}
</script>

<style scoped>
.container {
  margin-bottom: 2.5vw;
}

.header {
  height: 14vh;
}

.divider {
  margin-top: 0.7vw;
  margin-bottom: 0.7vw;
}

.carDetailFrame {
  width: 45vw;
  margin-left: 25vw;
  overflow-x: hidden;
}

.siderSearchFrame {
  width: 30vw;
  margin-top: 18vh;
  background-color: white;
}

.returnAndStarButtons {
  text-align: left;
  margin-bottom: 1vw;
}

.backToBtn {
  font-size: 1vw;
  color: #475669;
}

.starBtn {
  font-size: 1vw;
  color: #409EFF;
}

.modelNameDisplay {
  font-size: 1vw;
  text-align: left;
  width: 43vw;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 10vw;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.carouselImageFrame{
  width: 100%;
  /*height: 60vh;*/
}

/*.carouseMainFrame{*/
/*  width: 45vw;*/
/*  height: 30vw;*/
/*}*/

.desUnderModelName{
  font-size: 0.8vw;
  color: #909399;
}

.desUnderCarouse {
  font-size: 0.8vw;
  color: #909399;
  margin-top: 0.5vw;
}

.sellerDesTitle {
  font-size: 1vw;
  text-align: left;
}

.sellerDesContent {
  font-size: 1vw;
  text-align: left;
  padding-left: 1vw;
  padding-right: 1vw;
}

.carInfoTitle {
  font-size: 1vw;
  text-align: left;
}

.mainInfoFrame{
  text-align: left;
}

.cuttingLineForCarInfo{
  padding: 0 1vw 0;
  height: 0.1vh;
  border-top: 0.1vw solid #ccc;
  margin-bottom: 0.4vw;
}

.analyseAndHistoryFrame{
  border: solid lightgray;
  width: 16.5vw;
  margin-left: auto;
  margin-right: auto;
}

.desAnalyseAndHistory{
  font-family: DreamHan, sans-serif;
  font-size: 1.2vw;
}

.gridContentForCollapse1 {
  border-radius: 0.2vw;
  min-height: 2vh;
  font-size: 0.7vw;
  font-family: DreamHan, sans-serif;
  text-align: left;
}

.gridContentForCollapse2 {
  border-radius: 0.2vw;
  min-height: 2vh;
  font-size: 0.7vw;
  font-family: DreamHan, sans-serif;
  color: dimgray;
  text-align: left;
}

.gridContentForBasicInfo1 {
  border-radius: 0.2vw;
  min-height: 2vh;
  font-size: 0.8vw;
  font-family: DreamHan, sans-serif;
  text-align: left;
}

.gridContentForBasicInfo2 {
  border-radius: 0.2vw;
  min-height: 2vh;
  font-size: 0.8vw;
  font-family: DreamHan, sans-serif;
  color: dimgray;
  text-align: left;
}

.siderSearchFrame >>> .el-main{
  width: 20vw;
  height: 76vh;
}

.siderBtn{
  margin-bottom: 1vw;
  width: 9vw;
  /*height: 2vw;*/
  font-size: 1vw;
}

:deep(.el-descriptions__cell.el-descriptions__label.is-vertical-label.is-center){
  font-size: 1vw;
}

:deep(.el-descriptions__cell.el-descriptions__content.is-vertical-content.is-center){
  font-size: 1vw;
}

:deep(.el-tabs__nav-wrap.is-scrollable.is-top){
  width: 38vw;
}

:deep(.el-tabs__item.is-top.is-active){
  font-size: 1vw;
}

:deep(.el-tabs__item.is-top){
  font-size: 1vw;
}

:deep(.el-collapse-item__header){
  font-size: 1vw;
}

:deep(.el-collapse-item){
  /*height: 4vh;*/
}
.accidentDetailTip{
  margin-top: 1.5vh;
  font-size: 0.8vw;
  font-family: DreamHan, sans-serif;
  color: red;
}
.shipDamageDetailTip{
  margin-top: 1.5vh;
  font-size: 0.8vw;
  font-family: DreamHan, sans-serif;
  color: red;
}
</style>