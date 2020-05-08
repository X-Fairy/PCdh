import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import iView from 'view-design';
import store from '@/store'
import Cookies from "js-cookie";
Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const router = new VueRouter({
  // mode: 'history',
  routes
})


const LOGIN_PAGE_NAME = 'login'
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
// console.log(to)
  //  console.log(Cookies.get('cookie'))
  // 未登录且要跳转的页面不是登录页
  if (!store.state.user.userInfo.hdid && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else {
    next()
  }
})
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1261788349'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/stat.php%3Fid%3D1261788349' type='text/javascript'%3E%3C/script%3E"));

router.afterEach(to => {
  // 页面标题
  // iView.LoadingBar.finish()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  window.scrollTo(0, 0)
})

export default router

