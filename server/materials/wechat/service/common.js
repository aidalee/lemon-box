import {
  request
} from "@/utils/request"

// 登录接口
export const httpLogin = (data) => request.post('/api/login', data)