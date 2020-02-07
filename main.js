import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
//以下填写成自己测试云空间的 spaceId clientSecret
Vue.prototype.$cloud = uniCloud.init({
	provider:'aliyun',
	spaceId:'',
	clientSecret:''
})
const app = new Vue({
    ...App
})
app.$mount()
