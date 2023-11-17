## 快速开始

安装依赖

`pnpm i`

运行方式

1. 下载并打开微信开发者工具

2. 微信开发者工具中打开项目， 工具栏中： 工具->构建npm

## 内置功能配置

1. 加入了css的预编译语言less功能

2. ui组件引用的是 `Vant Weapp` ![Vant Weapp文档](https://youzan.github.io/vant-weapp/#/home)。根据业务需要可以自行替换或去除

3. `app.json`中配置了一部分常用的路径别名，避免导入路径很长且混乱

4. `pages`文件夹用于存放主包，要加分包可自行创建分包文件夹，如示例`subpkg`文件夹。`components`文件夹放公共组件。静态资源放在`assets`文件夹。

5. `service`文件夹放封装的api接口请求。http请求的统一拦截与响应处理封装在`utils`文件夹下的`request.js`中。`utils`文件夹放项目常用的工具函数等文件。

6. 如果要代码复用，考虑使用`behaviors`和`mixins`,两者区别如下：

`behaviors`是微信小程序中的一种组件化编程方式，它可以将一些通用的逻辑封装到一个单独的模块中，然后在需要使用这些逻辑的地方引入这个模块。behaviors可以包含数据、生命周期函数、事件处理函数等。使用`behaviors`的好处是可以在不同的页面中重复使用相同的逻辑，提高代码的复用性。但是，由于`behaviors`是一个独立的模块，所以在使用时需要进行引入和注册

`mixins`是微信小程序中另一种代码复用的方式，它可以将一些通用的属性或方法混入到目标组件中。`mixins`可以包含数据、属性、方法等。使用`mixins`的好处是可以直接在目标组件中使用混入的属性和方法，不需要进行额外的引入和注册。但是，由于`mixins`会直接修改目标组件的属性和方法，所以可能会导致命名冲突等问题。

当前`behaviors`文件夹下已封装了下拉加载分页数据的通用逻辑，如果有其他需要可以自行增加

![behaviors使用参考文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html)

![mixins使用参考](https://developers.weixin.qq.com/community/develop/article/doc/000e28ac778e887858c8bff5b5b413)

### 当前项目中 下拉加载分页数据behaviors的使用基础示例

// demo.wxml

![scroll-view属性文档](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)

```html
<scroll-view style="height: {{scrollHeight}}px;" scroll-anchoring scroll-y paging-enabled="{{true}}" refresher-enabled="{{true}}" bindrefresherrefresh="refresh" catchscrolltolower="scrolltolower" wx:if="{{pageList.length}}">
  <view class="list-item" wx:for="{{pageList}}" wx:key="index">
    {{item}}
  </view>
</scroll-view>
```

// demo.js

```js
const paging = require('@/behaviors/paging.js')
page({
  behaviors: [paging],
  // 数据列表接口请求
  queryList: async function (data) {
    return new Promise(async (resolve, reject) => {
      const {
        ok,
        result
      } = await httpGetList(data)
      if (ok) {
        resolve(result)
      }
    })
  },
  // 请求分页数据
  customerLoadMore() { 
    const data = { //定义在paging.js中的pageNum pageSize参数
      pageNum,
      pageSize
    }
    return this.queryList(data)
  },
  // 请求分页后的数据映射
  customerData(res) {
    const pageList = res?.list
    const hasNextPage = res?.hasNextPage
    return {
      pageList,
      hasNextPage
    }
  }
})
```

