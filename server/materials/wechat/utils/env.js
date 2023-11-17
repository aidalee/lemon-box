let DOMAIN = ''; //后台接口域名
let OSSDOMAIN = ''; // oss 图片存储
const {
  envVersion
} = wx.getAccountInfoSync().miniProgram
switch (envVersion) {
  case 'develop': // 开发版
    DOMAIN = 'https://wocs-dev.soterea.cn';
    OSSDOMAIN = 'https://oss-dev.soterea.cn/xiaoan_wechat';
    break;
  case 'trial': // 体验版	
    DOMAIN = 'https://wocs-dev.soterea.cn';
    OSSDOMAIN = 'https://oss-dev.soterea.cn/xiaoan_wechat'
    break;
  case 'release': // 正式版	
    DOMAIN = 'https://wocs.soterea.cn';
    OSSDOMAIN = 'https://oss-xiaoan.soterea.cn/xiaoan_wechat'
    break;
}
exports.DEV = {
  DOMAIN,
  OSSDOMAIN,
  envVersion
}