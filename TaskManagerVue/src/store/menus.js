import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus: [
      {
        name : 'Home',
        icon : 'icofont-ui-home',
        to : '/',
      },
      {
        name : 'Tasks',
        icon : 'icofont-calendar',
        to : '/tasks',
      },

    ],
  },

  getters: {
    getMenus(state){
      return state.menus
    },
  }
});