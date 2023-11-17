const DEVCONFIG = require('./env.js')
import {
  getCurrentPageUrlWithArgs
} from './util'

function request(url, data = {}, params = {}) {
  params = {
    showLoading: true,
    ...params
  }
  return new Promise((resolve, reject) => {
    const header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      authorization: 'Bearer ' + wx.getStorageSync('token'),
      'token': wx.getStorageSync('token'),
      ...params.header,
    };
    if (params.showLoading) {
      wx.showLoading({
        title: '加载中'
      })
    }
    let starttime = Number(new Date());
    wx.request({
      url: DEVCONFIG.DEV.DOMAIN + DEVCONFIG.DEV.API_ROOT + url,
      method: params.method || 'GET',
      header,
      credentials: 'include',
      data: {
        ...data
      },
      success(res) {
        wx.hideLoading()
        if (res.statusCode === 500) {
          wx.showToast({
            title: '服务异常!',
            icon: 'none'
          })
          return
        }
        if (res.statusCode === 404) {
          wx.showToast({
            title: '接口异常!',
            icon: 'none'
          })
          return
        }
        if (res.data && res.data.ok || res.data.result?.errorCode === "MORE_THAN_THREE_PEOPLE") {
          resolve(res.data);
        }  else if (res?.data?.result?.errorCode == 'USER_AUTH_OVER') {
          resolve(res.data);
        } else if (res?.data?.result?.errorCode == 'LOGIN_EXPIRE') {
          // INVALID_TOKEN 登录过期 
          try {
            wx.removeStorageSync('token')
            wx.removeStorageSync('userInfo')
            wx.removeStorageSync('data')
            wx.removeStorageSync('popup')
            wx.removeStorageSync('invitee-vehicleNumber')
          } catch (e) {
            console.log(e, "wx.removeStorageSync");
          }
          let redirectUrl = getCurrentPageUrlWithArgs()
          if (redirectUrl.indexOf('/pages/index/index') > -1) {
            return
          }
          return wx.showToast({
            title: '登录已过期，请重新登录',
            icon: 'none',
            duration: 1000,
            success: () => {
              wx.redirectTo({
                url: '/pages/index/index?redirectUrl=' + encodeURIComponent(redirectUrl)
              })
            }
          })
        } else {
          // 所托认证重定向接口 错误信息不提示
          reject(res.data);
          wx.showToast({
            title: res?.data?.result?.errorMsg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail(res) {
        wx.hideLoading()
        /**
         * 错误都会走这里，
         * 所以reject多加一些防御代码
         */
        console.error('-'.repeat(51));
        console.error('request data:', {
          url,
          ...data
        });
        console.error('request params:', params);
        console.error('response data', res);
        console.error('excute time: ', Number(new Date()) - starttime + 'ms');
        console.error('-'.repeat(51));
      },
      complete(res) { }
    });
  });
}
exports.request = {
  get: (url, data, params = {}) => {
    return request(url, data, params);
  },
  post: (url, data, params = {}) => {
    return request(url, data, {
      ...params,
      method: 'POST'
    });
  },
  formTypeGet: (url, data, params = {}) => {
    return request(url, data, {
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      ...params
    });
  },
  formTypePost: (url, data, params = {}) => {
    return request(url, data, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      ...params
    });
  }
};