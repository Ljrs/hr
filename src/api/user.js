import request from '@/utils/request'

export const userLogin = (data) => {
  return request.post('/sys/login', data)
}
