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
			<view
				@click="
					http({
						grade_id: selectGradeId,
						class_info: null
					})
				"
				v-if="selectGrade != ''"
			>
				点击选择班级:
				<view>{{ selectClass }}</view>
			</view>
			<view v-if="classArr.length != 0" class="getGrade">
				<view @click="getClass(item)" v-for="(item, index) in classArr" :key="item">{{ item.name }}</view>
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
		// this.teacher_id = data.teacher_id;
	},
	methods: {
		queding() {
			this.http({
				grade_id: this.teacher_id,
				class_info: this.selectClassId
			});
		},
		select(data) {
			this.selectGrade = '';
			this.selectGradeId = '';
			this.selectClass = '';
			this.selectClassId = '';
			this.gradeArr = [];
			this.classArr = [];
			this.http({
				grade_id: null
			});
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
			// 选择年级
			this.selectClass = data.name;
			this.selectClassId = data._id;
			this.classArr = [];
		},
		http(obj) {
			uni.showLoading({
				title: '处理中...'
			});
			uniCloud.callFunction({
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
.queding {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%);
	width: 100rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
}
</style>
