<!-- 每日健康统计 安徽-unicloud-王秀龙 -->
<template>
	<view>
		<form @submit="formSubmit">
		<view class="uni-title  uni-common-pl">学号</view>
		<view class="uni-form-item">
			<input class="uni-input" v-model="student.stu_num" name="stu_num" placeholder="请输入学号" />
		</view>
		<view class="uni-title  uni-common-pl">姓名</view>
		<view class="uni-form-item uni-column">
			<input class="uni-input" v-model="student.stu_name" name="stu_name" placeholder="请输入姓名" />
		</view>
		<view class="uni-title  uni-common-pl">有无接触湖北/武汉人员</view>
		<view class="uni-list">
			<radio-group name="contact_virus">
				<label class="uni-list-cell uni-list-cell-pd">
					<view>
						<radio value="1" />
					</view>
					<view class="k_left">有</view>
				</label>
				<label class="uni-list-cell uni-list-cell-pd">
					<view>
						<radio value="0" />
					</view>
					<view class="k_left">无</view>
				</label>
			</radio-group>
		</view>
		<view class="uni-title  uni-common-pl">有无疑似症状</view>
		<view class="uni-list">
			<radio-group name="have_symptom">
				<label class="uni-list-cell uni-list-cell-pd">
					<view>
						<radio value="1" />
					</view>
					<view class="k_left">有</view>
				</label>
				<label class="uni-list-cell uni-list-cell-pd">
					<view>
						<radio value="0" />
					</view>
					<view class="k_left">无</view>
				</label>
			</radio-group>
		</view>
		<view class="uni-title  uni-common-pl">当前位置</view>
		<view class="uni-list">
			<radio-group name="have_symptom">
				<label class="uni-list-cell uni-list-cell-pd">
					<view>
						<radio value="0" />
					</view>
					<view class="k_left">本地</view>
				</label>
				<label class="uni-list-cell uni-list-cell-pd">
					<view>
						<radio value="1" />
					</view>
					<view class="k_left">外地（除湖北）</view>
				</label>
				<label class="uni-list-cell uni-list-cell-pd">
					<view>
						<radio value="2" />
					</view>
					<view class="k_left">外地（湖北）</view>
				</label>
			</radio-group>
		</view>
		<view class="uni-title  uni-common-pl">当前健康状况</view>
		<view class="uni-list">
			<checkbox-group @change="checkboxChange" name="health">
				<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
					<view>
						<checkbox :value="item.value" :checked="item.checked" />
					</view>
					<view>{{item.name}}</view>
				</label>
			</checkbox-group>
		</view>
		<view class="uni-title  uni-common-pl">今日体温</view>
		<view class="uni-form-item uni-column">
			<input class="uni-input" name="temperature" type="digit" placeholder="请输入今日体温℃" />
		</view>
		<view class="uni-btn-v K_botton">
			<button form-type="submit" type="primary">提交</button>
		</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked:false,
				checkeds:false,
				student:{
					stu_num:"",
					stu_name:""
				},
				items: [{
						value: '良好',
						name: '良好'
					},
					{
						value: '咳嗽',
						name: '咳嗽'
					},
					{
						value: '乏力',
						name: '乏力'
					},
					{
						value: '发热',
						name: '发热'
					}
				]
			}
		},
		onLoad:function(){
			uni.showLoading({
				title: '加载中...'
			})
			this.$cloud.callFunction({
				name: 'getStudent',
				data: {
					stu_id: uni.getStorageSync('stu_id')
				},
			}).then((res) => {
				this.student = res.result.data[0];
				console.log(this.student);
				uni.hideLoading()
			}).catch((err) => {
				console.log(err);
				uni.hideLoading()
				uni.showModal({
					content: '加载失败，' + err.message,
					showCancel: false
				})
			})
		},
		methods: {
			formSubmit: function(e) {
				var data ={
					stu_id:this.student._id,
					class_id:this.student.class_id,
					create_time:Date.now()
				}
				var formData = e.detail.value, data;
				formData.health = formData.health.join();
				var submitData = Object.assign(formData, data);
				
				this.$cloud.callFunction({
				  name: 'studentDay',
				  data: submitData
				}).then((res) => {
				  uni.hideLoading()
				  uni.showModal({
					title: '提示',
				    content: `提交成功`,
				    showCancel: false,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				  })
				}).catch((err) => { 
				  uni.hideLoading()
				  uni.showModal({
				    content: `提交数据失败，错误信息为：${err.message}`,
				    showCancel: false
				  })
				  console.error(err)
				})
				console.log(submitData)
			},
			checkboxChange: function (e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.indexOf(item.value) >= 0){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
					if(values.indexOf(items[0].value) >= 0){
						this.$set(item,'checked',false)
					}
				}
			}
		}
	}
</script>

<style>
	.uni-list-cell {
		justify-content: flex-start
	}
	.k_left {
		margin-left: 16rpx;
	}
	
	/* #ifdef H5 */
	.K_botton {
		margin-bottom: 100rpx;
	}
	/* #endif */
</style>
