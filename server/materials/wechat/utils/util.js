export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
export const getImage = (url) => {
  // 把现在的图片连接传进来，返回一个不受限制的路径
  if(url !== undefined){
    return url.replace(/^(http)[s]*(\:\/\/)/,'https://images.weserv.nl/?url=');
  }
}
// 时间格式化
export const formatTimestamp = (timer) => {
  let str = '';
  let day = parseInt((timer / 1000 / 60 / 60 / 24).toString()); //日
  let hours = parseInt(((timer / 1000 / 60 / 60) % 24).toString()); //时
  let minutes = parseInt(((timer / 1000 / 60) % 60).toString()); //分
  let seconds = parseInt(((timer / 1000) % 60).toString()); //秒
  if (day > 0) {
    str = str + day + '天';
  }
  if (hours) {
    str = str + (hours < 10 ? '0' + hours : hours) + '小时';
  }
  str =
    str +
    (minutes < 10 ? '0' + minutes : minutes) +
    '分' +
    (seconds < 10 ? '0' + seconds : seconds) +
    '秒';
  return str;
};
/*获取当前页带参数的url*/
export const getCurrentPageUrlWithArgs = () => {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length-1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options
  
  //拼接url的参数
  var urlWithArgs = url + '?'
  for(var key in options){
      var value = options[key]
      urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = '/' + urlWithArgs.substring(0, urlWithArgs.length-1)
  
  return urlWithArgs
}
/**
 * 获取当前页面中，选择器为 selector 的第一个node节点
 * @param {String} selector 符合微信小程序规范的选择器
 * @param {Object} context 调用环境，普通页面中为wx，自定义组件中为this；默认值为wx.
 * @return {Array} 返回一个数组，第一个元素为 node 节点
 */
export const querySelector = function (selector, context = wx) {
  return new Promise((resolve, reject) => {
    context.createSelectorQuery()
    .select(selector)
    .boundingClientRect((res) => {
      if (res) {
        resolve(res);
      } else {
        reject(`不存在选择器为 ${selector} 的wxml`);
      }
    })
    .exec();
  })
};

/**
 * 获取当前页面中，选择器为 selector 的所有node节点
 * @param {String} selector 符合微信小程序规范的选择器
 * @param {Object} context 调用环境，普通页面中为wx，自定义组件中为this；默认值为wx.
 * @return {Array} 返回一个数组，每个元素为 node 节点
 */
export const querySelectorAll = function (selector, context = wx) {
  return new Promise((resolve, reject) => {
    context.createSelectorQuery()
    .selectAll(selector)
    .boundingClientRect((res) => {
      if (res && res.length) {
        resolve(res);
      } else {
        reject(`不存在选择器为 ${selector} 的wxml`);
      }
    })
    .exec();
  })
};
export const timeDifference = (timeStart, timeEnd) => {
  let obj = {};
  let timeStarts = new Date(timeStart).getTime(); //开始时间,转换成时间戳
  let timeEnds = new Date(timeEnd).getTime(); //结束时间,转换成时间戳
  let timer = timeEnds - timeStarts; //将时间戳进行相减

  let day = parseInt((timer / 1000 / 60 / 60 / 24)) || 0; //日
  let hours = parseInt(((timer / 1000 / 60 / 60) % 24)) || 0; //时
  let minutes = parseInt(((timer / 1000 / 60) % 60)) || 0; //分
  let seconds = parseInt(((timer / 1000) % 60)) || 0; //秒
  
  obj = {
    day: day < 10 ? '0' + day : day,
    hours: hours < 10 ? '0' + hours : hours,
    minutes: minutes < 10 ? '0' + minutes : minutes,
    seconds: seconds < 10 ? '0' + seconds : seconds
  }
  return obj;
};
export const queryURLParams = (url) => {
  let obj = {};
  url.replace(/([^#&?=]+)=([^#&?=]+)/g, (_, $1, $2) => obj[$1] = $2);
  url.replace(/#([^#&?=]+)/g, (_, $1) => obj['HASH'] = $1);
  return obj;
}