<!-- 老师绑定班级信息 深圳-前端-张昊 -->
<template>
	<view class="body">
		<view class="grade">
			<view @click="select">
				点击选择年级:
				<view>{{ selectGrade }}</view>
			</view>
			<view v-if="gradeArr.length != 0" class="getGrade">
				<view @click="getGrade(item)" v-for="(item, index) in gradeArr" :key="item">{{ item.name }}</view>
			</view>
		</view>
		<view class="banji">
			<view @click="getClass()">
				点击选择班级:
				<view>{{ selectClass }}</view>
			</view>
			<view v-if="classArr.length != 0" class="getGrade">
				<view @click="bindClass(item)" v-for="(item, index) in classArr" :key="item">{{ item.name }}</view>
			</view>
		</view>

		<view v-if="selectGradeId != '' && selectClassId != ''" @click="queding" class="queding">确定</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			teacher_id: '5e369bd594a3c6004d0524b7', //  老师的id
			gradeArr: [], //  年级
			classArr: [], //  班级
			selectGrade: '', //  所选年级
			selectGradeId: '', //  所选年级id
			selectClass: '', //  所选班级
			selectClassId: '' //  所选班级id
		};
	},
	onLoad(data) {
		this.teacher_id = data.teacher_id;
	},
	methods: {
		queding() {
			this.http({
				grade_id: this.teacher_id,
				class_info: this.selectClassId
			});
		},
		select() {
			this.selectClass = '';
			this.selectClassId = '';
			this.classArr = [];
			if (this.gradeArr.length == 0) {
				this.gradeArr = [];
				this.http({
					grade_id: null
				});
			} else {
			}
		},
		getGrade(data) {
			// 选择年级
			this.selectGrade = data.name;
			this.selectGradeId = data._id;
			this.http({
				grade_id: data._id,
				class_info: null
			});
			this.gradeArr = [];
		},
		getClass(data) {
			// 选择班级
			if (this.selectGradeId != '') {
				this.http({
					grade_id: this.selectGradeId,
					class_info: null
				});
			} else {
				uni.showToast({
					title: '请先选择年级',
					icon: 'none',
					duration: 2000
				});
			}
		},
		bindClass(data) {
			this.selectClass = data.name;
			this.selectClassId = data._id;
			this.classArr = [];
		},
		http(obj) {
			uni.showLoading({
				title: '处理中...'
			});
			uniCloud
				.callFunction({
					name: 'teacher_bind',
					data: obj
				})
				.then(res => {
					uni.hideLoading();
					console.log(res);
					if (obj.grade_id == null) {
						this.gradeArr = res.result;
					} else if (obj.class_info == null) {
						this.classArr = res.result;
						if (res.result.length == 0) {
							uni.showToast({
								title: '该年级未绑定班级',
								icon: 'none',
								duration: 2000
							});
						}
					} else {
						if (res.result.classData.update == 1) {
							uni.showToast({
								title: '绑定成功',
								duration: 2000
							});
						}
					}
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
	padding-top: 20rpx;
	padding-left: 60rpx;
}
.grade {
	width: 49%;
	display: inline-block;
	position: fixed;
	top: 0;
	left: 0;
	text-align: center;
}

.getGrade {
	position: fixed;
	bottom: 0;
	top: 65%;
	left: 0;
	right: 0;
	border-radius: 40rpx 40rpx 0 0;
	text-align: center;
	border-top: 1px solid #000;
	padding-top: 20rpx;
	overflow: auto;
}

.banji {
	width: 49%;
	display: inline-block;
	position: fixed;
	top: 0;
	right: 0;
	text-align: center;
}

.queding {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%);
	width: 200rpx;
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 50rpx;
	color: #fff;
	text-align: center;
	background-color: rgb(26, 172, 25);
}
</style>
