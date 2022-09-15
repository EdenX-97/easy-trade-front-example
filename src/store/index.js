/**
 * @Description: Vuex状态管理配置
 * @Author: Mo Xu
 * @Date: 15/4/2022
 */
import {createStore} from 'vuex'

const vuex = createStore({
  state: {
    auth: '',
    topBarActiveIndex: '',
    newCars: [],
    secondCars: [],
    user: '',
    userOwnAds: new Map(),
    isMobile: false,
  },
  getters: {
    getAuth(state) {
      if (localStorage.auth !== undefined) {
        state.auth = localStorage.auth
      }
      return state.auth
    },
    getTopBarActiveIndex(state) {
      return state.topBarActiveIndex
    },
    getNewCars(state){
      return state.newCars;
    },
    getSecondCars(state){
      return state.secondCars;
    },
    getUser(state) {
      return state.user;
    },
    getUserOwnAds(state) {
      return state.userOwnAds
    },
    getIsMobile(state) {
      return state.isMobile
    }
  },
  mutations: {
    setAuth(state, auth) {
      state.auth = auth
    },
    setTopBarActiveIndex(state, index) {
      state.topBarActiveIndex = index
    },
    setNewCars(state, newCars){
      state.newCars = newCars;
    },
    setSecondCars(state, SecondCars){
      state.SecondCars = SecondCars;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUserOwnAds(state, ads) {
      state.userOwnAds = ads;
    },
    setIsMobile(state, isMobile) {
      state.isMobile = isMobile;
    }
  },
  actions: {},
  modules: {}
})

export default vuex
