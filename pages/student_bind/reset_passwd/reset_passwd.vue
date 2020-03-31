<!-- 用户注册 邯郸-前端-秦少卫 -->
<template>
	<view>
		<view class="container">
			<view class="title">
				<text>密码修改</text>
			</view>
			<wuc-tab textFlex :tab-list="tabList" :tabCur.sync="userType" tab-class="text-center text-black bg-white swiper-title" select-class="text-blue" />
			<view class="login-form margin-top">
				<!-- <input type="text" value="" placeholder="请输入用户名" v-model="username" /> -->
				<input type="text" value="" placeholder="请输入新密码" password="true" v-model="password" />
				<input type="text" value="" placeholder="请再次确认密码" password="true" v-model="repeatPassword" />
				<div class="buttonGroup">
					<button type="primary" @click="signUp">确定</button>
				</div>
			</view>
		</view>
	</view>
</template>
<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	window.alert = function(name){
	     var iframe = document.createElement("IFRAME");
	     iframe.style.display="none";
	     iframe.setAttribute("src", 'data:text/plain,');
	     document.documentElement.appendChild(iframe);
	     window.frames[0].window.alert(name);
	     iframe.parentNode.removeChild(iframe);
	 };
	
	//默认，要引用的话再页面中添加

	export default {
		data() {
			return {
				password: '',
				repeatPassword:'',
				tabList: [{
						name: '老师',
						icon: 'cuIcon-comment'
					},
					{
						name: '学生',
						icon: 'cuIcon-dianhua'
					},
					// {
					// 	name: '家长',
					// 	icon: 'cuIcon-wifi'
					// },
					{
						name: '管理员',
						icon: 'cuIcon-wifi'
					}
				],
				userType: 1,
				school:''
			};
		},
		components: {
			WucTab,
			uniIcons,
		},
		computed: {},
		onLoad() {
			if (uni.getStorageSync('token')) {
			
			} 
			this.school = uni.getStorageSync('school')
		},
		methods: {
			tabChange(index) {
				this.userType = index;
			},
			signUp() {
				
				const {
					password,
					repeatPassword,
					userType,
				} = this
				if(repeatPassword !== password){
					uni.showModal({
						content: '两次密码不一致',
						showCancel: false
					})
					return 
				}
				
				console.log(userType);
				uni.showLoading({
					title: '修改中...'
				})
				
				//for(int i = 0; i < 10; 1++ ){
					
					
				
				uniCloud.callFunction({
					name: 'ResetPasswd',
					data: {
						uid: uni.getStorageSync("uid"),
						password,
						userType
					},
				})
                    
				uni.showToast({

					icon:"none",
					title:"修改成功，请重新登录",
					
					success() {
						window.alert("修改成功，请重新登录");
						//customAlertUrl('724助理提醒您', 1);
						uni.redirectTo({
							url:"../../login/login"
						})
					}
				})
			},
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
					console.log(res);
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
			
		},
		onReady() {}
	};
	
	
</script>

<style>
	.weixinBtn{ color: #007AFF; text-align: center; font-size: 22upx; border-top: 1upx #333333 solid; margin-top: 50upx; padding-top: 50upx;}
	.weixinBtn div{ color: #333333; margin-bottom: 20upx;}
	.linkBtn{ color: #007AFF; text-align: right; font-size: 22upx;}
	.swiper{ height: 100upx;}
	.buttonGroup{ display: flex;}
	.swiper-title{ font-size: 30upx;}
	.buttonGroup button:nth-child(1){margin-right: 20upx;}
	.container {
		padding: 30px;
	}

	.title {
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		padding: 20px 0px;
	}

	.desc {
		padding: 10px 0px;
		font-size: 14px;
		line-height: 22px;
		color: #999999;
	}

	.login-form input {
		height: 40px;
		border: solid 1px #DDDDDD;
		text-indent: 10px;
	}

	.login-form input,
	.login-form button {
		width: 100%;
		margin-bottom: 10px;
	}
</style>
