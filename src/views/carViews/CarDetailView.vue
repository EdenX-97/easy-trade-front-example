<!--
 * @Description: 汽车详情页面
 * @Author: Hongzhang Liu
 * @Date: 7/5/2022
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
          <el-button type="text" class="backToBtn" @click="backToBuyCarPage">&#60; {{t("backBtn")}}</el-button>
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
          <el-descriptions-item :label="$t('desUnderCarouseStructure')" align="center" >{{car.val.structure}}</el-descriptions-item>
          <el-descriptions-item :label="$t('desUnderCarouseDriveMethod')" align="center">{{car.val.driveMethod}}</el-descriptions-item>
          <el-descriptions-item :label="$t('desUnderCarouseVehicleWarranty')" align="center">{{car.val.vehicleWarranty}}</el-descriptions-item>
          <el-descriptions-item :label="$t('desUnderCarouseFuelLabel')" align="center">{{car.val.fuelLabel}}</el-descriptions-item>
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
                <div class="gridContentForBasicInfo1" >{{$t("basicBrand")}}</div>
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
                <div class="gridContentForBasicInfo1" >{{$t("basicPrice")}}</div>
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
                <div class="gridContentForBasicInfo1" >{{$t("basicSeries")}}</div>
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
                <div class="gridContentForBasicInfo1" >{{$t("basicModel")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.model}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicYear")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.year}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicTimeToMarket")}}</div>
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
                <div class="gridContentForBasicInfo1" >{{$t("basicLevel")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.level}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicEnergy")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.energy}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicMaximumPower")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.maximumPower}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicMaximumTorque")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.maximumTorque}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicEngine")}}</div>
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
                <div class="gridContentForBasicInfo1" >{{$t("basicElectricMotor")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.electricMotor}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicGearboxDetail")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.gearboxDetail}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicStructure")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.structure}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicMaximumSpeed")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.maximumSpeed}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicOfficialSpeedTest")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.officialSpeedTest}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicFuelConsumption")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.fuelConsumption}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicMileage")}}</div>
              </el-col>
              <el-col
                  :span="8" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.mileage}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>
            <el-row :gutter="20">
              <el-col
                  :span="8">
                <div class="gridContentForBasicInfo1" >{{$t("basicVehicleWarranty")}}</div>
              </el-col>
              <el-col
                  :span="14" :offset="2">
                <div class="gridContentForBasicInfo2" >{{car.val.vehicleWarranty}}</div>
              </el-col>
            </el-row>
            <div class="cuttingLineForCarInfo"></div>

          </el-tab-pane>
          <!--重要信息栏-->
          <el-tab-pane :label="$t('imLabel')">
            <div class="demo-collapse">
              <el-collapse v-model="activeNames1">
                <el-collapse-item :title="$t('imStructure')" name="1" font-size="0.5vw">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imLength")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.length}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imWidth")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.width}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imHigh")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.high}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imWheelbase")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.wheelbase}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFrontTrack")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontTrack}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imRearTrack")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rearTrack}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imMinimumGroundClearance")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.MinimumGroundClearance}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imDoors")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.doors}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imSeats")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.seats}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFuelTankCapacity")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.fuelTankCapacity}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imLuggageColume")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.luggageColume}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imCargoBoxSize")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.cargoBoxSize}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imMaximumLoadMass")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.maximumLoadMass}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imCurbQuality")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.curbQuality}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('imEngine')" name="2">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imEngineModel")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.engineModel}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imDisplacement")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.displacement}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imIntake")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.intake}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imCylinderArrangement")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.cylinderArrangement}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imCylinders")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.cylinders}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imCylinderValves")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.cylinderValves}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imCompressionRatio")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.compressionRatio}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imAirSupply")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.airSupply}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imBore")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.bore}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imStroke")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.stroke}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imMaximumHorsePower")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.maximumHorsepower}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imMaximumPowerSpeed")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.maximumPowerSpeed}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imMaximumTorqueSpeed")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.maximumTorqueSpeed}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imEngineSpecificTechnology")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.engineSpecificTechnology}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFuelLabel")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.fuelLabel}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFuelSupplyMethod")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.fuelSupplyMethod}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imCylinderHeadMaterial")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.cylinderHeadMaterial}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imCylinderBodyMaterial")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.cylinderBodyMaterial}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imEnvironmentalStandards")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.environmentalStandards}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('imMotor')" name="3">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imTotalMotorPower")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.totalMotorPower}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imTotalMotorTorque")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.totalMotorTorque}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFrontMotorMaximumPower")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontMotorMaximumPower}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFrontMotorMaximumTorque")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontMotorMaximumTorque}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imRearMotorMaximumPower")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rearMotorMaximumPower}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imRearMotorMaximumTorque")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rearMotorMaximumTorque}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imSystemIntegratedPower")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.systemIntegratedPower}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imSystemIntegratedTorque")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.systemIntegratedTorque}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imPureElectricMileage")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.pureElectricMileage}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imBatteryCapacity")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.batteryCapacity}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imPowerConsumption")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.powerConsumption}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFastChargeTime")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.fastChargeTime}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imSlowChargeTime")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.slowChargeTime}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFastChargePercentage")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.fastChargePercentage}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imChargeTime")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.chargeTime}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imMotorType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.motorType}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imDrivingMotors")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.drivingMotors}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imMotorLayout")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.motorLayout}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imBatteryType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.batteryType}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imBatteryWarranty")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.batteryWarranty}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imBatteryEnergy")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.batteryEnergy}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imBatteryPreheating")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.batteryPreheating}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('imGearbox')" name="4">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imGears")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.gears}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imGearboxType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.gearboxType}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('imDriveSystem')" name="5">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imDriveMethod")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.driveMethod}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imCentralDifferentialStructure")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.centralDifferentialStructure}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('imSuspension')" name="6">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFrontSuspensionType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontSuspensionType}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imRearSuspensionType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rearSuspensionType}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imBoostType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.boostType}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imBodyStructure")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.bodyStructure}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFrontBrakeType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontBrakeType}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imRearBrakeType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rearBrakeType}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imParkingBrakeType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.parkingBrakeType}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFourWheelDriveType")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.fourWheelDriveType}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('imWheel')" name="7">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFrontTireSpecification")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontTireSpecification}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imRaerTireSpecification")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.raerTireSpecification}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imSpareTireSpecification")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.spareTireSpecification}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('imAirbag')" name="8">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imMainPassengerSeatAirbag")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.mainPassengerSeatAirbag}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFrontRearSideAirbag")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontRearSideAirbag}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imFrontRearHeadAirbag")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontRearHeadAirbag}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imCoPilotSeatAirbag")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.coPilotSeatAirbag}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imRearSeatBeltAirbag")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.RearSeatBeltAirbag}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imRearSeatAntiSlidingAirbag")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.RearSeatAntiSlidingAirbag}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imKneeAirbag")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.kneeAirbag}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("imRearCentralAirbag")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.RearCentralAirbag}}</div>
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
                <el-collapse-item :title="$t('addAuxiliaryControl')" name="9">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("seatBeltNotFastenedReminder")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.seatBeltNotFastenedReminder}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("tirePressureMonitoring")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.tirePressureMonitoring}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("ISOFIXChildSeatInterface")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.ISOFIXChildSeatInterface}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("ABSAntiLock")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.ABSAntiLock}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("brakingForceDistribution")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.brakingForceDistribution}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("brakeAssist")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.brakeAssist}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("tractionControl")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.tractionControl}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("bodyStabilityControl")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.bodyStabilityControl}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("activeSafetySystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.activeSafetySystem}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("tiredDrivingTips")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.tiredDrivingTips}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("fronRearParkingRadar")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.fronRearParkingRadar}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("reversingCarSideEarlyWarningSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.reversingCarSideEarlyWarningSystem}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("drivingAssistanceImage")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.drivingAssistanceImage}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("cruiseSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.cruiseSystem}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("drivingModeSwitch")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.drivingModeSwitch}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("autoParking")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.autoParking}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("engineStartStopTechnology")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.engineStartStopTechnology}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("autoHold")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.autoHold}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("uphillAssist")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.uphillAssist}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("steepSlope")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.steepSlope}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("airSuspension")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.airSuspension}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("electromagneticInductionSuspension")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.electromagneticInductionSuspension}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("variableSteeringRatio")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.variableSteeringRatio}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("centralDifferentialLock")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.centralDifferentialLock}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("overallActiveSteeringSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.overallActiveSteeringSystem}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("differentialLock")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.differentialLock}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addAppearance')" name="10">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("sportAppearanceKit")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.sportAppearanceKit}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("wheelMaterial")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.wheelMaterial}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addNoKeyConfig')" name="11">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("keylessStart")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.keylessStart}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("keylessEntry")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.keylessEntry}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addSteeringWheel')" name="12">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("steeringWheelMaterial")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.steeringWheelMaterial}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("multifunctionSteeringWheel")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.multifunctionSteeringWheel}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("steeringWheelShift")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.steeringWheelShift}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addDisplay')" name="13">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("fullLCDDashboard")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.fullLCDDashboard}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("LCDDashboardSize")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.LCDDashboardSize}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("HUDHeadupDigitalDisplay")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.HUDHeadupDigitalDisplay}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addSeat')" name="14">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("seatMaterial")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.seatMaterial}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("sportStyleSeats")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.sportStyleSeats}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("frontSeatFunction")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.frontSeatFunction}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("rearSeatFunction")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rearSeatFunction}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addMedia')" name="15">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("mobilePhoneInterconnectionMapping")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.mobilePhoneInterconnectionMapping}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("speakerBrand")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.speakerBrand}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("speakersNumber")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.speakersNumber}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addLight')" name="16">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("lowBeamLightSource")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.lowBeamLightSource}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("highBeamLightSource")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.highBeamLightSource}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("lightingFeatures")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.lightingFeatures}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addRearviewMirror')" name="17">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("exteriorMirrorFunction")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.exteriorMirrorFunction}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("insideRearviewMirrorFunction")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.insideRearviewMirrorFunction}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addAirConditioner')" name="18">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("airConditioningTemperatureControlMethod")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.airConditioningTemperatureControlMethod}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("independentRearAirConditioner")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.independentRearAirConditioner}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("rearSeatAirOutlet")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.rearSeatAirOutlet}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("temperatureZoneControl")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.temperatureZoneControl}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("carAirPurifier")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.carAirPurifier}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("inCarPM25FilterDevice")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.inCarPM25FilterDevice}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addColor')" name="19">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("exteriorColor")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.exteriorColor}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("interiorColor")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.interiorColor}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addCenterControl')" name="20">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("centralControlScreen")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.centralControlScreen}}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("centralControlScreenSize")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.centralControlScreenSize}}</div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item :title="$t('addGps')" name="21">
                  <el-row :gutter="20">
                    <el-col
                        :span="8">
                      <div class="gridContentForCollapse1" >{{$t("satelliteNavigationSystem")}}</div>
                    </el-col>
                    <el-col
                        :span="8" :offset="4">
                      <div class="gridContentForCollapse2" >{{car.val.satelliteNavigationSystem}}</div>
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

  // // 路由跳转到聊天界面
  // function routerPush(buyerId, sellerId, carId){
  //   // 调用方法创建聊天记录
  //   if(buyerId !== sellerId){
  //     createRecord(buyerId, sellerId);
  //   }
  //   // 路由跳转到汽车详情界面，携带传输数据为对应汽车卡片的汽车id，延迟为0.5s，让下一个页面有充分时间读取chat records信息
  //   setTimeout(() => {router.push({ name: 'chat', params: {buyerId: buyerId, sellerId: sellerId, carId: carId}})}, 500);
  //   document.documentElement.scrollTop = 0;
  // }

  // // 点击在线聊天按钮后创建聊天记录
  // function createRecord(userOneId, sellerId){
  //   axios.post("/chat/createRecord", {}, {
  //     params: {
  //       userOneId: userOneId,
  //       userTwoId: sellerId
  //     }
  //   })
  // }

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
      console.log(res)
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
    return axios.get("/example/car/getExampleCarById", {
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
  function backToBuyCarPage(){
    router.push({name: "carBuy"});
  }

  // 拼接car和exampleInfo中的信息，作为最终的结果信息
  function jointInfo(){
    let tempCar = car.val;

    // 基本信息
    tempCar.brand = exampleCarInfo.val.brand;
    tempCar.series = exampleCarInfo.val.series;
    tempCar.model = exampleCarInfo.val.model.split(' - ')[0];
    tempCar.year = exampleCarInfo.val.year;
    tempCar.timeToMarket = exampleCarInfo.val.timeToMarket;
    tempCar.level = exampleCarInfo.val.level;
    tempCar.energy = exampleCarInfo.val.energy;
    tempCar.maximumPower = exampleCarInfo.val.maximumPower;
    tempCar.maximumTorque = exampleCarInfo.val.maximumTorque;
    tempCar.engine = exampleCarInfo.val.engine;
    tempCar.electricMotor = exampleCarInfo.val.electricMotor;
    tempCar.gearboxDetail = exampleCarInfo.val.gearbox;
    tempCar.structure = exampleCarInfo.val.structure;
    tempCar.maximumSpeed = exampleCarInfo.val.maximumSpeed;
    tempCar.officialSpeedTest = exampleCarInfo.val.officialSpeedTest;
    tempCar.fuelConsumption = exampleCarInfo.val.fuelConsumption;
    tempCar.mileage = exampleCarInfo.val.mileage;
    tempCar.vehicleWarranty = exampleCarInfo.val.vehicleWarranty;

    // 重要参数
    // 车体结构
    tempCar.length = exampleCarInfo.val.length;
    tempCar.width = exampleCarInfo.val.width;
    tempCar.high = exampleCarInfo.val.high;
    tempCar.wheelbase = exampleCarInfo.val.wheelbase;
    tempCar.frontTrack = exampleCarInfo.val.frontTrack;
    tempCar.rearTrack = exampleCarInfo.val.rearTrack;
    tempCar.MinimumGroundClearance = exampleCarInfo.val.MinimumGroundClearance;
    tempCar.doors = exampleCarInfo.val.doors;
    tempCar.seats = exampleCarInfo.val.seats;
    tempCar.fuelTankCapacity = exampleCarInfo.val.fuelTankCapacity;
    tempCar.luggageColume = exampleCarInfo.val.luggageColume;
    tempCar.cargoBoxSize = exampleCarInfo.val.cargoBoxSize;
    tempCar.maximumLoadMass = exampleCarInfo.val.maximumLoadMass;
    tempCar.curbQuality = exampleCarInfo.val.curbQuality;
    // 发动机
    tempCar.engineModel = exampleCarInfo.val.engineModel;
    tempCar.displacement = exampleCarInfo.val.displacement;
    tempCar.intake = exampleCarInfo.val.intake;
    tempCar.cylinderArrangement = exampleCarInfo.val.cylinderArrangement;
    tempCar.cylinders = exampleCarInfo.val.cylinders;
    tempCar.cylinderValves = exampleCarInfo.val.cylinderValves;
    tempCar.compressionRatio = exampleCarInfo.val.compressionRatio;
    tempCar.airSupply = exampleCarInfo.val.airSupply;
    tempCar.bore = exampleCarInfo.val.bore;
    tempCar.stroke = exampleCarInfo.val.stroke;
    tempCar.maximumHorsepower = exampleCarInfo.val.maximumHorsepower;
    tempCar.maximumPowerSpeed = exampleCarInfo.val.maximumPowerSpeed;
    tempCar.maximumTorqueSpeed = exampleCarInfo.val.maximumTorqueSpeed;
    tempCar.engineSpecificTechnology = exampleCarInfo.val.engineSpecificTechnology;
    tempCar.fuelLabel = exampleCarInfo.val.fuelLabel;
    tempCar.fuelSupplyMethod = exampleCarInfo.val.fuelSupplyMethod;
    tempCar.cylinderHeadMaterial = exampleCarInfo.val.cylinderHeadMaterial;
    tempCar.cylinderBodyMaterial = exampleCarInfo.val.cylinderBodyMaterial;
    tempCar.environmentalStandards = exampleCarInfo.val.environmentalStandards;
    // 电动机
    tempCar.totalMotorPower = exampleCarInfo.val.totalMotorPower;
    tempCar.totalMotorTorque = exampleCarInfo.val.totalMotorTorque;
    tempCar.frontMotorMaximumPower = exampleCarInfo.val.frontMotorMaximumPower;
    tempCar.frontMotorMaximumTorque = exampleCarInfo.val.frontMotorMaximumTorque;
    tempCar.rearMotorMaximumPower = exampleCarInfo.val.rearMotorMaximumPower;
    tempCar.rearMotorMaximumTorque = exampleCarInfo.val.rearMotorMaximumTorque;
    tempCar.systemIntegratedPower = exampleCarInfo.val.systemIntegratedPower;
    tempCar.systemIntegratedTorque = exampleCarInfo.val.systemIntegratedTorque;
    tempCar.pureElectricMileage = exampleCarInfo.val.pureElectricMileage;
    tempCar.batteryCapacity = exampleCarInfo.val.batteryCapacity;
    tempCar.powerConsumption = exampleCarInfo.val.powerConsumption;
    tempCar.fastChargeTime = exampleCarInfo.val.fastChargeTime;
    tempCar.slowChargeTime = exampleCarInfo.val.slowChargeTime;
    tempCar.fastChargePercentage = exampleCarInfo.val.fastChargePercentage;
    tempCar.chargeTime = exampleCarInfo.val.chargeTime;
    tempCar.motorType = exampleCarInfo.val.motorType;
    tempCar.drivingMotors = exampleCarInfo.val.drivingMotors;
    tempCar.motorLayout = exampleCarInfo.val.motorLayout;
    tempCar.batteryType = exampleCarInfo.val.batteryType;
    tempCar.batteryWarranty = exampleCarInfo.val.batteryWarranty;
    tempCar.batteryEnergy = exampleCarInfo.val.batteryEnergy;
    tempCar.batteryPreheating = exampleCarInfo.val.batteryPreheating;
    // 变速箱
    tempCar.gears = exampleCarInfo.val.gears;
    tempCar.gearboxType = exampleCarInfo.val.gearboxType;
    // 驱动系统
    tempCar.driveMethod = exampleCarInfo.val.driveMethod;
    tempCar.centralDifferentialStructure = exampleCarInfo.val.centralDifferentialStructure;
    // 悬挂地盘
    tempCar.frontSuspensionType = exampleCarInfo.val.frontSuspensionType;
    tempCar.rearSuspensionType = exampleCarInfo.val.rearSuspensionType;
    tempCar.boostType = exampleCarInfo.val.boostType;
    tempCar.bodyStructure = exampleCarInfo.val.bodyStructure;
    tempCar.frontBrakeType = exampleCarInfo.val.frontBrakeType;
    tempCar.rearBrakeType = exampleCarInfo.val.rearBrakeType;
    tempCar.parkingBrakeType = exampleCarInfo.val.parkingBrakeType;
    tempCar.fourWheelDriveType = exampleCarInfo.val.fourWheelDriveType;
    // 轮胎
    tempCar.frontTireSpecification = exampleCarInfo.val.frontTireSpecification;
    tempCar.raerTireSpecification = exampleCarInfo.val.raerTireSpecification;
    tempCar.spareTireSpecification = exampleCarInfo.val.spareTireSpecification;
    // 安全气囊
    tempCar.mainPassengerSeatAirbag = exampleCarInfo.val.mainPassengerSeatAirbag;
    tempCar.frontRearSideAirbag = exampleCarInfo.val.frontRearSideAirbag;
    tempCar.frontRearHeadAirbag = exampleCarInfo.val.frontRearHeadAirbag;
    tempCar.coPilotSeatAirbag = exampleCarInfo.val.coPilotSeatAirbag;
    tempCar.RearSeatBeltAirbag = exampleCarInfo.val.RearSeatBeltAirbag;
    tempCar.RearSeatAntiSlidingAirbag = exampleCarInfo.val.RearSeatAntiSlidingAirbag;
    tempCar.kneeAirbag = exampleCarInfo.val.kneeAirbag;
    tempCar.RearCentralAirbag = exampleCarInfo.val.RearCentralAirbag;

    // 附加信息
    // 辅助操控
    tempCar.seatBeltNotFastenedReminder = exampleCarInfo.val.seatBeltNotFastenedReminder;
    tempCar.tirePressureMonitoring = exampleCarInfo.val.tirePressureMonitoring;
    tempCar.ISOFIXChildSeatInterface = exampleCarInfo.val.ISOFIXChildSeatInterface;
    tempCar.ABSAntiLock = exampleCarInfo.val.ABSAntiLock;
    tempCar.brakingForceDistribution = exampleCarInfo.val.brakingForceDistribution;
    tempCar.brakeAssist = exampleCarInfo.val.brakeAssist;
    tempCar.tractionControl = exampleCarInfo.val.tractionControl;
    tempCar.bodyStabilityControl = exampleCarInfo.val.bodyStabilityControl;
    tempCar.activeSafetySystem = exampleCarInfo.val.activeSafetySystem;
    tempCar.tiredDrivingTips = exampleCarInfo.val.tiredDrivingTips;
    tempCar.fronRearParkingRadar = exampleCarInfo.val.fronRearParkingRadar;
    tempCar.reversingCarSideEarlyWarningSystem = exampleCarInfo.val.reversingCarSideEarlyWarningSystem;
    tempCar.drivingAssistanceImage = exampleCarInfo.val.drivingAssistanceImage;
    tempCar.cruiseSystem = exampleCarInfo.val.cruiseSystem;
    tempCar.drivingModeSwitch = exampleCarInfo.val.drivingModeSwitch;
    tempCar.autoParking = exampleCarInfo.val.autoParking;
    tempCar.engineStartStopTechnology = exampleCarInfo.val.engineStartStopTechnology;
    tempCar.autoHold = exampleCarInfo.val.autoHold;
    tempCar.uphillAssist = exampleCarInfo.val.uphillAssist;
    tempCar.steepSlope = exampleCarInfo.val.steepSlope;
    tempCar.airSuspension = exampleCarInfo.val.airSuspension;
    tempCar.electromagneticInductionSuspension = exampleCarInfo.val.electromagneticInductionSuspension;
    tempCar.variableSteeringRatio = exampleCarInfo.val.variableSteeringRatio;
    tempCar.centralDifferentialLock = exampleCarInfo.val.centralDifferentialLock;
    tempCar.overallActiveSteeringSystem = exampleCarInfo.val.overallActiveSteeringSystem;
    tempCar.differentialLock = exampleCarInfo.val.differentialLock;

    // 外观
    tempCar.sportAppearanceKit = exampleCarInfo.val.sportAppearanceKit;
    tempCar.wheelMaterial = exampleCarInfo.val.wheelMaterial;

    // 无钥匙配置
    tempCar.keylessStart = exampleCarInfo.val.keylessStart;
    tempCar.keylessEntry = exampleCarInfo.val.keylessEntry;

    // 方向盘
    tempCar.steeringWheelMaterial = exampleCarInfo.val.steeringWheelMaterial;
    tempCar.multifunctionSteeringWheel = exampleCarInfo.val.multifunctionSteeringWheel;
    tempCar.steeringWheelShift = exampleCarInfo.val.steeringWheelShift;

    // 显示
    tempCar.fullLCDDashboard = exampleCarInfo.val.fullLCDDashboard;
    tempCar.LCDDashboardSize = exampleCarInfo.val.LCDDashboardSize;
    tempCar.HUDHeadupDigitalDisplay = exampleCarInfo.val.HUDHeadupDigitalDisplay;

    // 座椅
    tempCar.seatMaterial = exampleCarInfo.val.seatMaterial;
    tempCar.sportStyleSeats = exampleCarInfo.val.sportStyleSeats;
    tempCar.frontSeatFunction = exampleCarInfo.val.frontSeatFunction;
    tempCar.rearSeatFunction = exampleCarInfo.val.rearSeatFunction;

    // 媒体娱乐
    tempCar.mobilePhoneInterconnectionMapping = exampleCarInfo.val.mobilePhoneInterconnectionMapping;
    tempCar.speakerBrand = exampleCarInfo.val.speakerBrand;
    tempCar.speakersNumber = exampleCarInfo.val.speakersNumber;

    // 灯光
    tempCar.lowBeamLightSource = exampleCarInfo.val.lowBeamLightSource;
    tempCar.highBeamLightSource = exampleCarInfo.val.highBeamLightSource;
    tempCar.lightingFeatures = exampleCarInfo.val.lightingFeatures;

    // 后视镜
    tempCar.exteriorMirrorFunction = exampleCarInfo.val.exteriorMirrorFunction;
    tempCar.insideRearviewMirrorFunction = exampleCarInfo.val.insideRearviewMirrorFunction;

    // 空调系统
    tempCar.airConditioningTemperatureControlMethod = exampleCarInfo.val.airConditioningTemperatureControlMethod;
    tempCar.independentRearAirConditioner = exampleCarInfo.val.independentRearAirConditioner;
    tempCar.rearSeatAirOutlet = exampleCarInfo.val.rearSeatAirOutlet;
    tempCar.temperatureZoneControl = exampleCarInfo.val.temperatureZoneControl;
    tempCar.carAirPurifier = exampleCarInfo.val.carAirPurifier;
    tempCar.inCarPM25FilterDevice = exampleCarInfo.val.inCarPM25FilterDevice;

    // 颜色
    tempCar.exteriorColor = exampleCarInfo.val.exteriorColor;
    tempCar.interiorColor = exampleCarInfo.val.interiorColor;

    // 中控
    tempCar.centralControlScreen = exampleCarInfo.val.centralControlScreen;
    tempCar.centralControlScreenSize = exampleCarInfo.val.centralControlScreenSize;

    // GPS
    tempCar.satelliteNavigationSystem = exampleCarInfo.val.satelliteNavigationSystem

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

:deep(.el-carousel__indicators.el-carousel__indicators--horizontal){
  width: 15vw;
}

:deep(.el-carousel__indicator.el-carousel__indicator--horizontal){
  width: 2vw;
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
