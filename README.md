[ 项目原地址 ](https://gitee.com/dcloud/xinguan2020-xuesheng)

##修复
1. 学生信息登记覆盖
2. 同一天提交数据，只记录最后提交的信息
3. 删除家长登录

## 新增
1. 批量学生数据导入
2. 将登记的信息导出为Excel(PS 仅支持电脑端谷歌内核浏览器)
3. 学生修改密码功能
## 数据库设计
参考 [db.md](db.md)
```JS
validateToken() {
				uni.showLoading({
					title: '加载中...'
				});
				uniCloud.callFunction({
					name: 'validateToken',
					data: {
						token: uni.getStorageSync('token')
					}
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: res.result.msg,
						showCancel: false
					})
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: '请求云函数发生错误，' + err.message,
						showCancel: false
					})
				})
			},
```


## 项目运行和部署说明  

- 本项目需要[HBuilderX 2.5.8（Alpha版）](https://www.dcloud.io/hbuilderx.html)以上版本才能运行。  

- 项目需要[注册](https://dev.dcloud.net.cn/)和开通uniCloud ,因阿里云审核要求,需要实名认证。

- 拉取项目源码后,对`cloudfunctions`目录点右键,选择你的服务空间。如果没有服务空间,需要创建,创建时会引导登录和注册uniCloud。
  
- 配好服务空间后,请根据项目下的[db.md](db.md)文件,在你的云数据库中创建相应的表。具体方式是对`cloudfunctions`目录点右键,打开uniCloud web控制台,在里面的云数据库界面点击"新建表",表名里把[db.md](db.md)涉及的表名都创建一遍。

- 对每个云函数（文件夹）点右键，"上传并部署"到你的服务空间中。

- 修改`manifest.json`中的`DCloud_AppID`为自己的,再修改`main.js`中云空间的`spaceId`、`clientSecret`为自己的(在uniCloud web控制台复制)。

- 最后，可以运行了。如果是win版,可以直接运行在内置浏览器。如果是mac版,内置浏览器也有跨域问题,需要运行到小程序模拟器或app中,或者给mac的外部浏览器[安装跨域插件](https://ask.dcloud.net.cn/article/35267)。
