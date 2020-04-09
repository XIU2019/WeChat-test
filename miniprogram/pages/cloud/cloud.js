// pages/cloud/cloud.js
const db = wx.cloud.database(); //初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  insert: function (options) {
  //   db.collection('user').add(
  //     {
  //       data: {
  //         name: 'xiu',
  //         age: '18',
  //       },
  //       success: res => { console.log(res) },
  //       fail: err => {
  //         console.log(err);
  //       }

  //     }
  //   )


    db.collection('user').add({
      data:{
        name:'lwx',
        age:'17',
      }
    }).then(res => { console.log(res); }).catch(err => { console.log(err) });
  
  },

  //更新数据
   update:function(){
     db.collection('user').doc("42c9a7b15e8c9958005d98a43342070a").update({
       // data 传入需要局部更新的数据
       data: {
         // 表示将 done 字段置为 true
         age: 21
       }
     })
       .then(console.log)
       .catch(console.error)
   },
   //云数据库查询一条数据
  search: function () {
    db.collection('user').doc("dc65fe3e5e8c9b33004b92a6327b5dde").get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
    })
  },
  //云数据库查询多条数据
  get: function () {
    db.collection('user').where({
      name:'lwx',
    }).get().then(res=>{console.log(res)})
    .catch(err=>{console.log(err)})
  },

//云数据库删除一条数据
  remove:function(){
    db.collection('image').doc("42d70ff05e8e8b1a006148061d71854e").remove()
    .then(res =>{console.log(res)})
    .catch(err=>{console.log(err)})
  },

sum:function(){
  wx.cloud.callFunction(
    {
      name:"sum",
      data:{
        a:1,
        b:2,
      }
    }
  ).then(res=>{console.log(res)})
  .catch(err=>{console.log(err)})
},

  getOprnID:function(){
    wx.cloud.callFunction(
      {
        name:"login",
      }
    ).then(res=>{console.log(res)})
    .catch(err=>{console.log(err)})
  },
  bathdelete: function () {
    wx.cloud.callFunction(
      {
        name: "batchDelete",
      }
    ).then(res => { console.log(res) })
      .catch(err => { console.log(err) })
  },

upload:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        //云存储上传图片的API  将tempFilePaths转为文件ID 上传到云存储当中
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'.png', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID 文件的唯一标识
            console.log(res.fileID)
            db.collection('image').add({
              data:{
                fileID:res.fileID
              }
            }).then(res =>{console.log(res)})
            .catch(err=>{console.log(err)})
          },
          fail: console.error
        })
      }
    })
},

  getFlie: function () {
    wx.cloud.callFunction(
      {
        name:"login",
      }
    ).then(res=>{
      db.collection('image').where({
        _openid:res.result.openid
      }).get().then(res2=>{console.log(res2);
      this.setData({
        images:res2.data
      })
        })
    })
  },
  downloadFile:function(event){
    wx.cloud.downloadFile({
      fileID: event.target.dataset.fileid, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath);
        //保存图片到手机
        wx.saveImageToPhotosAlbum({
          filePath:res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
            })
           }
        })
      },
      fail: console.error
    })
  },

 

})