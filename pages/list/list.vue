<!-- 每日健康统计汇总 深圳-前端-张昊 -->
<template>
	<view class="body">
		<view class="collect">
			已统计
			<span>{{ stat }}</span>
			人，缺
			<span>{{ lack }}</span>
			人
			<view @click="selectTime = true" class="select">
				当前所选时间:
				<span>{{ time }}</span>
			</view>
		</view>
		<view
			:style="{ color: item.temperature > 37 || item.contact_like_virus == 1 || item.Suspected_symptoms == 1 ? '#f00' : '#000' }"
			class="list"
			:class="{ listBgc: index % 2 == 0, listOne: index == 0, listFinally: index == stat - 1 }"
			v-for="(item, index) in arr"
			:key="item"
		>
			<view class="top">
				<view class="id">学号:{{ item.stu_num }}</view>
				<view class="name">姓名:{{ item.stu_name }}</view>
				<view class="name">健康状态:{{ item.health }}</view>
			</view>
			<view class="top">
				{{ item.current_pos == 2 ? '在湖北' : item.current_pos == 1 ? '在外地' : '在本地' }}, 今日体温:{{ item.temperature }},
				{{ item.contact_virus == 0 ? '未接触湖北地区人员' : '接触过湖北地区人员' }}, {{ item.have_symptom == 0 ? '无疑似症状' : '出现过疑似症状' }}
			</view>
		</view>
		<view v-if="selectTime == true" class="time">
			<view class="masking" @click="selectTime = false"></view>
			<uni-calendar class="calendars" :insert="true" :lunar="true" :start-date="'2019-3-2'" :end-date="'2019-5-20'" @change="change"></uni-calendar>
		</view>
		<view v-if="arr.length == 0" class="null">该日期未登记健康状态</view>
	</view>
</template>

<script>
import uniCalendar from '@/components/uni-calendar/uni-calendar.vue';

const myDate = new Date();
let time2 = myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + (myDate.getDate() + 1);
export default {
	data() {
		return {
			class_id: '5e3848f8ba9452004dde255b', //  班级标志
			num: -1,
			time: '', //  当前选择的时间
			selectTime: false, //  选择时间弹框
			stat: 0, //  已统计人数
			lack: 0, //  缺少
			arr: [] //  学生的日健康统计数组
		};
	},
	components: {
		uniCalendar
	},
	onLoad(data) {
		this.class_id = data.class_id
		this.time = myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getDate();
		this.http();
	},
	methods: {
		change(e) {
			console.log(e);
			time2 = e.year + '/' + e.month + '/' + (e.date + 1);
			let str = e.year + '/' + e.month + '/' + e.date;
			if (this.time != str) {
				this.time = str;
				this.http();
			}
			this.selectTime = false;
		},
		http() {
			uni.showLoading({
				title: '处理中...'
			});
			let start = new Date(this.time).getTime();
			let start2 = new Date(time2).getTime();
			console.log(start);
			console.log(start2);
			uniCloud.callFunction({
					name: 'query_reports',
					data: {
						class_id: "5e3848f8ba9452004dde255b",
						time: start,
						time2: start2
					}
				})
				.then(res => {
					uni.hideLoading();
					console.log(res);
					this.stat = res.result.arr.length;
					this.arr = res.result.arr;
					if (res.result.student_sum != '未获取到该班级信息') {
						this.lack = res.result.student_sum - this.stat;
					} else {
						uni.showToast({
							title: res.result.student_sum,
							icon: 'none',
							duration: 2000
						});
					}
					let objectArraySort = function(keyName) {
						return function(objectN, objectM) {
							var valueN = objectN[keyName];
							var valueM = objectM[keyName];
							if (valueN > valueM) return 1;
							else if (valueN < valueM) return -1;
							else return 0;
						};
					};
					this.arr.sort(objectArraySort('stu_num'));
				})
				.catch(err => {
					uni.hideLoading();
					console.error(err);
				});
		}
	}
};
</script>

<style lang="scss">
.body {
	background-color: #fff;
	padding: 20rpx 0;
}
.collect {
	line-height: 80rpx;
	span {
		color: #f00;
	}
}
.select {
	display: inline-block;
	margin-left: 20rpx;
	color: #000 !important;
}

.list {
	width: 95%;
	margin: 0 auto;
	color: #999;
	border: 1px solid #999;
	padding-bottom: 20rpx;
}

.listBgc {
	background-color: rgb(245, 245, 244);
}
.listOne {
	border-radius: 20rpx 20rpx 0 0;
}

.listFinally {
	border-radius: 0 0 20rpx 20rpx;
}

.top {
	padding-left: 12rpx;
	font-size: 26rpx;
	view {
		display: inline-block;
		line-height: 80rpx;
	}
	.id {
	}
	.name {
		margin-left: 20rpx;
	}
}

.time {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}
.masking {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: #000;
	opacity: 0.6;
}
.calendars {
	position: fixed;
	top: 12%;
	left: 0;
	right: 0;
}

.null {
	position: fixed;
	top: 40%;
	left: 50%;
	transform: translateX(-50%);
	font-size: 36rpx;
	color: #ccc;
}
</style>
