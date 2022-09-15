/**
 * @Description: 全局组件注册
 * @Author: Mo Xu
 * @Date: 15/4/2022
 */
import topBar from './TopBar'
import homeCard from './HomeCard'
import verifyDialog from './user/VerifyDialog'
import setDialog from './user/SetDialog'
import result from './Result'
import manageAdCard from './user/ManageAdCard'
import manageDialog from './user/ManageDialog'
import selectAdCard from './car/SelectCarCard'
import buyCarCard from './car/BuyCarCard'
import footerBar from './FooterBar'
import topAdv from './TopAdv'
import sideAdv from './SideAdv'

// 将所有需要注册的组件添加到列表
const componentList = [
  topBar,
  homeCard,
  verifyDialog,
  setDialog,
  result,
  manageAdCard,
  manageDialog,
  selectAdCard,
  footerBar,
  buyCarCard,
  topAdv,
  sideAdv
]

const components = {
  install: function (Vue) {
    // 通过遍历列表来注册每一个组件
    for (const component of componentList) {
      Vue.component(component.getName(), component)
    }
  }
}

export default components