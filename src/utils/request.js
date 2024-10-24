import Axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
// 创建axios实例
const service = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 注入token
    // store.getters.token => 请求头
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    // 失败执行Promise
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据
    // axios默认包了一层data
    const { data, message, success } = response.data
    if (success) {
      return data
    } else {
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 对响应错误
    Message({
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)
export default service
