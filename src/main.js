import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyLoad from 'vue-lazyload';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './assets/icon/iconfont.css';
import './assets/css/common.less';
// import './assets/css/font.css';
import './assets/css/animate.css'
import xm from './lib/util';
Vue.use(ViewUI);
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: require('@/assets/images/errorImage.jpg'),
  loading: require('@/assets/images/errorImage.jpg')
})

Vue.config.productionTip = false
Vue.prototype.$xm=xm;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
