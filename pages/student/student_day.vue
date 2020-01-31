<!-- 每日健康统计 安徽-unicloud-王秀龙 -->
<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
		<view class="uni-title  uni-common-pl">学校</view>
		<view class="uni-form-item">
			<input class="uni-input" name="school" placeholder="请输入学校" />
		</view>
		<view class="uni-title  uni-common-pl">班级</view>
		<view class="uni-form-item uni-column">
			<input class="uni-input" name="class" placeholder="请输入班级" />
		</view>
		<view class="uni-title  uni-common-pl">姓名</view>
		<view class="uni-form-item uni-column">
			<input class="uni-input" name="name" placeholder="请输入姓名" />
		</view>
		<view class="uni-title  uni-common-pl">有无接触湖北/武汉人员</view>
		<view class="uni-list">
			<radio-group name="contact_like_virus">
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
			<radio-group name="Suspected_symptoms">
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
		<view class="uni-title  uni-common-pl">当前所在省市</view>
		<view class="uni-form-item" @tap="openAddres">
			<input class="uni-input" v-model="pickerText" disabled="true" name="check_in_address" placeholder="请选择省市" />
		</view>
		<view class="uni-title  uni-common-pl">今日体温</view>
		<view class="uni-form-item uni-column">
			<input class="uni-input" name="temperature" type="digit" placeholder="请输入今日体温℃" />
		</view>
		<view class="uni-btn-v K_botton">
			<button form-type="submit" type="primary">提交</button>
		</view>
		</form>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cityPickerValueDefault: [0, 0, 1],
				pickerText: ''
			}
		},
		methods: {
			openAddres() {
				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				this.pickerText = e.label;
			},
			formSubmit: function(e) {
				console.log(e)
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
	.K_botton {
		margin-bottom: 100rpx;
	}
</style>
