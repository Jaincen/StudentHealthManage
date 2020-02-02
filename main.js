import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$cloud = uniCloud.init({
	provider: 'aliyun',
	spaceId: '',
	clientSecret: ''
})
const app = new Vue({
    ...App
})
app.$mount()
