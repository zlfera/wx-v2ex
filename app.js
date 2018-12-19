//app.js
App({
  onLaunch() {
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //
    wx.getNetworkType({
      success: (res) => {
        const networkType = res.networkType
        if (networkType === 'none') {
          this.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    }),
    goStartIndexPage: () => {
      setTimeout(() => {
      wx.redirectTo({
        url: "/pages/hotest/hotest"
      })
      }, 1000)
    },
     /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange((res) => {
      if (!res.isConnected) {
        this.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: () => {
            this.goStartIndexPage()
          }
        })
      } else{
        this.globalData.isConnected = true
        wx.hideToast()
      }
    }),
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
      }
    })
  },
  globalData: {
    userInfo: null,
    isConnected: true
  }
})
