<template>
	<view class="margin-lr">
		<form @submit="formSubmit">
			<view class="uni-title  uni-common-pl">学号</view>
			<view class="uni-form-item uni-column dashed-bottom">
				<input class="uni-input" v-model="student.stu_num" name="stu_num" placeholder="请输入学号" />
			</view>
			<view class="uni-title  uni-common-pl">姓名</view>
			<view class="uni-form-item uni-column dashed-bottom">
				<input class="uni-input" v-model="student.stu_name" name="stu_name" placeholder="请输入姓名" />
			</view>
			<!-- <view class="uni-title  uni-common-pl">今日体温</view> -->
			<!-- zjc change -->
			<view class="uni-list">
			    <view class="uni-list-cell">
			        <view class="uni-list-cell-left">
			            选择体温
			        </view>
			        <view class="uni-list-cell-db">
			            <picker @change="bindPickerChange" :value="temIndex" :range="temArr" range-key="name">
			                <view class="uni-input">{{temperature}}</view>
			            </picker>
			        </view>
			    </view>
			</view>	
			<!-------------------------------->
			<!-- <view class="uni-form-item uni-column dashed-bottom"> 
				<input class="uni-input" name="temperature" type="digit" placeholder="请输入今日体温℃" />
			</view> -->
			<view class="uni-title  uni-common-pl margin-top text-bold text-center">选择项</view>
			<view class="uni-title  uni-common-pl">是否回苏州(常熟)</view>
			<view class="uni-list">
				<radio-group name="Come_Suzhou">
					<label class="uni-list-cell uni-list-cell-pd"> 
						<view>
							<radio value="1" />
						</view>
						<view class="k_left">是</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio value="0" />
						</view>
						<view class="k_left">否</view>
					</label>
				</radio-group>
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
				<radio-group name="current_location">
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
							<checkbox :value="item.value" :checked="item.checked" :disabled="item.disabled" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</checkbox-group>
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
				checked: false,
				checkeds: false,
				student: {
					stu_num: "",
					stu_name: ""
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
				],
				temArr :[36.0,36.1,36.2,36.3,36.4,36.5,36.6,36.7,36.8,36.9,
				         37.0,37.1,37.2,37.3,37.4,37.5,37.6,37.7,37.8,37.9,
						 38.0,38.1,38.2,38.3,38.4,38.5,38.6,38.7,38.8,38.9,
						 39.0,39.1,39.2,39.3,39.4,39.5,39.6,39.7,39.8,39.9,
						 40.0],
				temIndex:8,
				temperature:''
				
			}
		},
		onLoad: function() {
			if (uni.getStorageSync('token')) {
				this.student.stu_name = uni.getStorageSync("stu_name")
				this.student.stu_num = uni.getStorageSync("stu_num")
			} else {
				uni.navigateTo({
					url: '../login/login'
				})
			}
		},
		methods: {
			bindPickerChange: function(e) {
			    console.log(e.target.value)
			    this.temIndex = e.target.value
			    this.temperature = this.temArr[this.temIndex]
			},
			formSubmit: function(e) {
				//class_id需要动态读取
				var data = {
					stu_id: this.student.stu_num,
					class_id: uni.getStorageSync("class_id"),
					create_time: Date.now()
				}
				var formData = e.detail.value,
					data;
				formData.health = formData.health.join();
				var submitData = Object.assign(formData, data);
				submitData.temperature = this.temperature;

				console.log(submitData);
				uni.showLoading({
					title: '正在提交，请稍后...'
				})
				uniCloud.callFunction({
					name: 'studentDay',
					data: submitData
				}).then((res) => {
					uni.hideLoading()
					// 添加成功返回ID
					if (res) {
						uni.showModal({
							title: '提示',
							content: '提交成功！',
							showCancel: false,
							success: (res) => {
								uni.navigateTo({
									url: "../index/index"
								})
							}
						})
					}else{
						uni.showModal({
							title: '提示',
							content: '提交失败！请通知管理员',
							showCancel: false,
							
						})
					}
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
			checkboxChange: function(e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 1, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.indexOf(item.value) >= 0) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
						this.$set(item, 'disabled', false)
					}
					if (values.indexOf(items[0].value) >= 0) {
						this.$set(item, 'checked', false)
						this.$set(item, 'disabled', true)
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
	.uni-list-cell-left{
		font-size: 16px;
		
		
	}

	/* #ifdef H5 */
	.K_botton {
		margin-bottom: 100rpx;
	}
	

	/* #endif */
</style>
