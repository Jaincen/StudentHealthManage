
<!-- Edit by zjc  -->
<template>
	<view>
		<view class="container">
			<view class="title">
				<text>批量数据导入</text>
			</view>
			<swiper :current="userType" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)"
			 indicator-active-color="rgba(255,255,255,0)">
			</swiper>
			<view class="login-form margin-top">
				<div class="buttonGroup">
					<button type="primary" @click="signUp">导入</button>
				</div>
			</view>
		</view>
	</view>
</template>
<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	//import data from './zhongmei171.json'

	export default {
		data() {
			return {
				class_id:'',
				stu_num:'',
				stu_name:'',
				username: '',
				password: '',
				repeatPassword:'',
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
			this.school = uni.getStorageSync('school')
		},
		methods: {
			tabChange(index) {
				this.userType = index;
			},
			signUp() { 
				var length = data.length;				
				for(var i = 0;i<length;i++){
				this.username = data[i].username;
				this.password = data[i].password;
				this.repeatPassword = data[i].password;
				this.userType = 1;
				this.class_id = data[i].class_id;
				this.stu_num = data[i].stu_num;
				this.stu_name = data[i].stu_name;
				//window.alert(username);
				const {
					class_id,
					stu_num,
					stu_name,
					username,
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
				if(username.indexOf('ls') && this.userType == 0){
					uni.showModal({
						content: '老师的注册方式请咨询管理员',
						showCancel: false
					})
					return 
				}
				if(username.indexOf('admin')  && this.userType == 2){
					uni.showModal({
						content: '您不是管理，请离开',
						showCancel: false
					})
					return 
				}
				console.log(userType);
				uni.showLoading({
					title: '注册中...'
				})
				
				//for(int i = 0; i < 10; 1++ ){
					
					
				
				uniCloud.callFunction({
					name: 'studentDataImport',
					data: {
						class_id,
						stu_name,
						stu_num,
						username,
						password,
						userType,
					},
				}).then((res) => {
					uni.hideLoading()
					if (res.result.status !== 0) {
						return Promise.reject(new Error(res.result.msg))
					}
					uni.setStorageSync('token', res.result.token)
                    
                    uni.showToast({
                        icon:"none",
                        title:"注册成功，请重新登录",
                        success() {
                            // uni.redirectTo({
                            //     url:"./importData/importData"
                            // })
                        }
                    })
                    
                    
				}).catch((err) => {
					console.log(err);
					uni.hideLoading()
					uni.showModal({
						content: '注册失败，' + err.message,
						showCancel: false
					})
				})
				}//循环
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

<!-- <script>
	import data from './Sheet1.json'
	
	export default {
		data() {
			return {
				
			}
			
		},
		methods: {
			  signIn(){
				  //for
				  
				  
				  console.log(data[19]);
			
			
			
			
		    }
			
			
		 
        }
		
		
		
				
	};
	
	
</script>

<style>
	.weixinBtn {
		color: #007AFF;
		text-align: center;
		font-size: 22upx;
		border-top: 1upx #333333 solid;
		margin-top: 50upx;
		padding-top: 50upx;
	}

	.weixinBtn div {
		color: #333333;
		margin-bottom: 20upx;
	}

	.linkBtn {
		color: #007AFF;
		font-size: 22upx;
	}

	.swiper {
		height: 100upx;
	}

	.swiper-title {
		font-size: 30upx;
	}

	.buttonGroup {
		display: flex;
	}

	.buttonGroup navigator {
		margin-right: 20upx;
		flex: 1;
	}

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
	.box{
			text-align: center;
			vertical-align: middle;
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
 -->