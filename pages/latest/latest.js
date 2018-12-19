import { getLatestTopics } from '../../utils/api.js';

Page({
  data: {
    title: "最新话题",
    latest: [],
    hidden: false
  },
  fetchData(cb) {
    this.setData({
      hidden: false
    })
    wx.request({
      url: getLatestTopics({page: 1}),
      success: (res) => {
        this.setData({
          latest: res.data,
          hidden: true
        })
          cb()
      }
    })
  },
  onLoad() {
    this.fetchData(() => (console.log()));
  },
  onPullDownRefresh() {
    this.fetchData(function() {
      wx.stopPullDownRefresh();
    });
  },
  goToDetail(event) {
    const id = event.currentTarget.id;
    const url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url,
    })
  }
})
