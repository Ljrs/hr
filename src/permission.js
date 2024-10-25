import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
// 前置守卫
const whileList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 存在token
    if (to.path === '/login') {
      // 跳转到主页
      next('/')// 中转到主页
      // next(地址)并没有执行后置守卫
      nprogress.done() // 手动关闭进度条
    } else {
      next() // 放过
    }
  } else {
    // 没有token
    if (whileList.indexOf(to.path) > -1) {
      next() // 放过
    } else {
      next('/login') // 跳转到登录页面
      nprogress.done() // 手动关闭进度条
    }
  }
})
// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
