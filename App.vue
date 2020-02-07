<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.setStorageSync('school','执信小学')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
    @import './common/uni.css';
    @import './common/my.css';
</style>
