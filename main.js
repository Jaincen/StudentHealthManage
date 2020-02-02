import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$cloud = uniCloud.init({
	provider: 'aliyun',
	spaceId: 'de6459c3-4d47-4544-ac63-2ebd61b5af59',
	clientSecret: '6IQkNoqXMyA9ayTLWD3zeA=='
})
const app = new Vue({
    ...App
})
app.$mount()
