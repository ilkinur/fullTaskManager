import Vue from "vue"
import Vuex from "vuex"
import store from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {

      user : '',
      item: {},
    },
    mutations : {
      initUser(state, user){
        state.user = user
      },
      updateItem(state, item) {
        state.item = item
      }

    },
    actions : {
      updateUser(context,user){
        context.commit('initUser', user)
      },
      updateLogin(context,obj){
        // context.commit('initToken',obj.token)
        context.commit('initUser',obj.user)
        var d = new Date();
        d.setTime(d.getTime() + (obj.expires*24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = 'user' + "=" + JSON.stringify(obj.user) + ";" + expires + ";path=/";
        // document.cookie = 'token' + "=" + obj.value2 + ";" + expires + ";path=/";
      },
      prepareUpdateItem(context, item) {
        context.commit('updateItem', item)
      },
    },
    getters : {
      getUser(state){
        return state.user
      },
      getToken(state){
        return state.user
      },
      getItem(state) {
        return state.item
      },
      getUserCookie() {
          var cname='user'
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              return JSON.parse(c.substring(name.length, c.length));
            }
          }
          return "";
      },
      is_login(){
        if(store.getters.getUser != ''){
          return true
        }
        if(store.getters.getUserCookie != ''){
          store.dispatch('updateUser',store.getters.getUserCookie)
            return true
        }

          return false
      },
    }
})
