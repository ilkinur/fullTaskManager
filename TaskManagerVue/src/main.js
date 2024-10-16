import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import { router } from './router'
import VueToast from 'vue-toast-notification';
import VeeValidate from 'vee-validate'
import 'vue-toast-notification/dist/theme-sugar.css';
import './assets/css/ihealth.style.min.css';
import './assets/css/custom.css';
import 'vue-js-modal/dist/styles.css'
import store from './store';
import vmodal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.config.devtools = false;

Vue.use(VeeValidate)
Vue.use(vmodal)
Vue.use(VueToast,{
  position:'top-left'
});

// Bootstrap
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
