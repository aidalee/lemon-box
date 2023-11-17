// 下拉加载分页数据
module.exports = Behavior({
  data: {
    pageSize: 10,
    pageNum: 1,
    noMoreData: false,
    noMoreDataStatus: '',
    isLoading: false,
    pageList: [],
    pageTime: 0, //  管道机制  防止请求两次第一页，但是第一次请求的返回比第二次的慢，而导致数据是第一次的问题，比如 订单列表各状态之间来回快速切换会出现这种问题（其实可用cancelObj解决）
  },
  methods: {
    refresh() {
      this.loadFirstPage(true)
    },
    //滑动底部触发
    scrolltolower(e) {
      this.loadMore()
    },
    loadFirstPage(clearList = false) { //  加载第一页
      if (clearList) {
        this.setData({
          pageList: [],
        })
      }
      this.setData({
        pageTime: new Date().getTime(),
        pageNum: 1,
      })
      this.loadData(this.data.pageTime)
    },
    //  加载下一页
    loadMore() {
      if (this.data.noMoreData || this.data.isLoading) {
        this.setData({
          noMoreDataStatus: '已经没有更多啦！'
        })
        return
      }
      this.loadData()
    },
    loadData(time) { //  加载数据
      this.setData({
        isLoading: true
      })
      // request
      this.customerLoadMore().then((rs) => {
        if (time && time != this.data.pageTime) {
          console.log('数据防覆盖机制生效！')
          return
        }
        let listData = this.customerData(rs) //  获取用户自定义的列表数据信息
        this.setData({
          noMoreData: false,
          noMoreDataStatus: '加载中~'
        })
        if (!listData.hasNextPage) {
          this.setData({
            noMoreData: true,
            noMoreDataStatus: '已经没有更多啦！'
          })
        }

        if (this.data.pageNum == 1) {
          this.setData({
            pageList: []
          })
        }
        let pageNum = this.data.pageNum + 1
        let pageList = this.data.pageList.concat(listData.pageList)
        this.setData({
          pageList: pageList,
          pageNum: pageNum,
          isLoading: false
        })

        this.customerAfterLoadData(rs)
      }).catch(err => {
        if (time && time != this.data.pageTime) {
          console.log('err 数据防覆盖机制生效！')
          return
        }
        this.setData({
          isLoading: false
        })
        if (this.data.pageNum == 1) {
          this.setData({
            pageList: []
          })
        }
        this.customerAfterLoadData(err)
      })
    },
    customerLoadMore(params) {
      //  返回一个promise对象，如果要写then 请记得return responseData
    },
    customerData(data) {
      //  返回数据 可以在这里做数据准备
    },
    customerAfterLoadData(data) {
      //  do what you want after loadData whatever it is successful or failed
    }
  }
})