/*
 * @Author: please
 * @Date: 2023-10-12 14:41:35
 * @LastEditors: please
 * @LastEditTime: 2023-11-17 14:13:57
 * @Description: 请填写简介
 */
import axios from 'axios'

import { ElMessage } from 'element-plus'
const MODE = import.meta.env.MODE

class Request {
  baseConfig = {
   baseURL: 'http://localhost:8111',
    timeout: 200000
  }
  constructor(config={}) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error)=>{
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res?.data || true
      },
      (error)=>{
        let msg = ''
        switch (error.response.status) {
          case 401:
            msg = '未授权'
            break;
          case 403:
            msg = "拒绝访问(403)";
            break;
          case 404:
            msg = "请求出错(404)";
            break;
          case 500:
            msg = "服务器错误(500)";
            break;
          default:
            msg = `请求出错(${error.response.status})!`
        }

        ElMessage.error(msg)
        return Promise.reject(error.response)

      }
    )
  }


  request(config) {
    return this.instance.request(config)
  }

  get(
    url,
    data,
    config
  ) {
    return this.instance.get(url, {params: {...data}}, config)
  }

  post(
    url,
    data,
    config
  ) {
    return this.instance.post(url,data,config)
  }
  
  put(
    url,
    data,
    config
  ) {
    return this.instance.put(url,data,config)
  }

  delete(
    url,
    config
  ) {
    return this.instance.delete(url, config)
  }

}

export default new Request()