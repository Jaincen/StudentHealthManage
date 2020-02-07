<!-- 老师绑定班级信息 深圳-前端-张昊 -->
<template>
    <view class="body">
        <view>请选择您所负责的班级：</view>
        <view class="uni-list">
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">
                    选择年级
                </view>
                <view class="uni-list-cell-db">
                    <picker @change="bindPickerChange" :value="gradeIndex" :range="gradeArr" range-key="name">
                        <view class="uni-input">{{gradeName}}</view>
                    </picker>
                </view>
            </view>

            <view class="uni-list-cell">
                <view class="uni-list-cell-left">
                    选择班级
                </view>
                <view class="uni-list-cell-db">
                    <picker @change="bindClassChange" :value="classIndex" :range="classArr" range-key="name">
                        <view class="uni-input">{{className}}</view>
                    </picker>
                </view>
            </view>
        </view>
        <view class="buttonGroup" style="margin-top: 150rpx;">
        	<button type="primary" style="margin-bottom: 10rpx;" @click="bind">确定</button>
        	<button type="primary" @click="go_back">返回</button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                teacher_id: '', //  老师的id
                classList: [], //所有班级列表
                gradeArr: [], //  年级
                gradeIndex: "", //年级索引
                gradeName:"",
                classArr: [], //  特定年级下的班级
                classIndex: "", //班级索引
                className:""
            };
        },
        onLoad(data) {
			this.teacher_id = uni.getStorageSync("uid")
			uniCloud.callFunction({
			    name: 'getClassList',
			})
			.then(res => {
			    console.log(res);
			    this.classList = res.result
			    this.gradeArr = res.result.gradeList
				if (uni.getStorageSync('class_id')) {
					uni.showModal({
						title:'提示',
						content:'您已经设置过班级信息了，真的要重新绑定吗？',
						success: (res) => {
							if (res.cancel) {
								this.go_back()
							}
						}
					})
				}
			})
			.catch(err => {
			    uni.hideLoading();
			    console.error(err);
			});
        },
        methods: {

            bindPickerChange: function(e) {

                console.log(e.target.value)

                this.gradeIndex = e.target.value
                this.gradeName = this.gradeArr[this.gradeIndex].name
                this.classArr = this.classList[this.gradeArr[this.gradeIndex]._id]
            },

            bindClassChange: function(e) {
                this.classIndex = e.target.value
                this.className = this.classArr[this.classIndex].name
            },

            bind() {
                uni.showLoading({})
                uniCloud.callFunction({
                        name: 'teacherBind',
                        data: {
                            grade_id: this.gradeArr[this.gradeIndex]._id,
                            class_info: this.classArr[this.classIndex]._id,
                            token: uni.getStorageSync("token"),
                            uid: uni.getStorageSync("uid"),
                            userType: uni.getStorageSync("userType")
                        }
                    })
                    .then(res => {
                        uni.hideLoading();
                        console.log(res);
                        uni.showToast({
                            title: '绑定成功',
                            duration: 2000
                        });
                    })
                    .catch(err => {
                        uni.hideLoading();
                        console.error(err);
                    });

            },
			go_back: function() {
				if (getCurrentPages().length > 1) {
					uni.navigateBack();
				} else {
					uni.switchTab({
						url: '../index/index'
					})
				}
			},
        }
    };
</script>

<style lang="scss">
    .body {
        padding: 60rpx;
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
