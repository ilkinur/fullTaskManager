import Vue from "vue"
import Vuex from "vuex"
import config from "./config" 

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
      mini: false
    },
    mutations : {
        initMini(state, mini){
          state.mini = mini
        }
    },
    actions : {
      updateMini(context, mini) {
        context.commit('initMini', mini)
        localStorage.setItem('mini', mini);
      }
    },
    getters : {
      getMini(state) {
        if (localStorage.getItem('mini') === null) {
          localStorage.setItem('mini', false)
        }
        else {
          config.dispatch('updateMini', localStorage.getItem('mini') === 'true')
        }
          
        return state.mini
      }
    }
})
