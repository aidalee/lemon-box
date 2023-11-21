let DOMAIN = ''; //后台接口域名
let OSSDOMAIN = ''; // oss 图片存储
const {
  envVersion
} = wx.getAccountInfoSync().miniProgram
switch (envVersion) {
  case 'develop': // 开发版
    DOMAIN = '';
    OSSDOMAIN = '';
    break;
  case 'trial': // 体验版	
    DOMAIN = '';
    OSSDOMAIN = ''
    break;
  case 'release': // 正式版	
    DOMAIN = '';
    OSSDOMAIN = ''
    break;
}
exports.DEV = {
  DOMAIN,
  OSSDOMAIN,
  envVersion
}