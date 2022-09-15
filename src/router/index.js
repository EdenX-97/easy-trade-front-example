/**
 * @Description: VueRouter路由配置
 * @Author: Mo Xu
 * @Date: 15/4/2022
 */
import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView'
import AboutView from '../views/AboutView'
import ContactView from '../views/ContactView'
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import CarView from '../views/carViews/CarView'
import CarBuy from '../views/carViews/CarBuyView'
import CarSell from '../views/carViews/CarSellView'
import CarDetail from '../views/carViews/CarDetailView'
import UserView from '../views/userViews/UserView'
import Profile from '../views/userViews/ProfileView'
import VerifyEmail from '../views/userViews/VerifyEmailView'
import ChatView from '../views/ChatView'
import Manage from '../views/userViews/ManageView'
import ValidateTrade from '../views/payViews/ValidateTradeView'
import MotorView from "../views/motorViews/MotorView"
import MotorBuy from '../views/motorViews/MotorBuyView'
import MotorSell from '../views/motorViews/MotorSellView'
import MotorDetail from '../views/motorViews/MotorDetailView'
import UserAgreement from '../views/UserAgreement'
import PrivacyAgreement from '../views/PrivacyAgreement'
import FreeAdView from '../views/userViews/FreeAdView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/userAgreement',
    name: 'userAgreement',
    component: UserAgreement
  },
  {
    path: '/privacyAgreement',
    name: 'privacyAgreement',
    component: PrivacyAgreement
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView
  },
  {
    path: '/car',
    name: 'car',
    component: CarView,
    children: [
      {
        path: 'buy',
        name: 'carBuy',
        component: CarBuy
      },
      {
        path: 'sell',
        name: 'carSell',
        component: CarSell
      },
      {
        path: 'detail/:carId',
        name: 'carDetail',
        component: CarDetail
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: Profile
      },
      {
        path: 'verifyEmail/:token',
        name: 'verifyEmail',
        component: VerifyEmail
      },
      {
        path: 'manage',
        name: 'manage',
        component: Manage
      },
      {
        path: 'free',
        name: 'free',
        component: FreeAdView
      }
    ]
  },
  {
    path: '/pay/validateTrade',
    name: 'validateTrade',
    component: ValidateTrade
  },
  {
    path: '/motor',
    name: 'motor',
    component: MotorView,
    children: [
      {
        path: 'buy',
        name: 'motorBuy',
        component: MotorBuy
      },
      {
        path: 'sell',
        name: 'motorSell',
        component: MotorSell
      },
      {
        path: 'detail/:carId',
        name: 'motorDetail',
        component: MotorDetail
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
