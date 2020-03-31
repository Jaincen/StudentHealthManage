<!-- 绑定学生信息 -->
<template>
    <view class="margin-lr">
        <view class="uni-list" style="margin-top: 30px;">
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">
                    选择年级
                </view>
                <view class="uni-list-cell-db">
                    <picker @change="bindPickerChange" :value="temIndex" :range="gradeArr" range-key="name">
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
        
        <view class="uni-title  uni-common-pl margin-top">学号</view>
        <view class="uni-form-item dashed-bottom">
            <input class="uni-input" type="text" name="stu_num" value="" placeholder="请输入学号" v-model="stu_num" />
        </view>
        
        
        <view class="uni-title  uni-common-pl">姓名</view>
        <view class="uni-form-item dashed-bottom">
            <input class="uni-input" type="text" name="stu_name" value="" placeholder="请输入学生姓名" v-model="stu_name" />
        </view>
       
        <view class="buttonGroup">
            <button type="primary" @click="bind">确定</button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
				gradeArr:['1','2','3'],
				temIndex:1
               
            }
        },
       
        methods: {
	
            bindPickerChange: function(e) {
                console.log(e.target.value)
                this.temIndex = e.target.value
                this.gradeName = this.gradeArr[this.gradeIndex].name
                this.classArr = this.classList[this.gradeArr[this.gradeIndex]._id]
            },

            bindClassChange: function(e) {
                this.classIndex = e.target.value
                this.className = this.classArr[this.classIndex].name
            },

            bind: function() {
                uni.showLoading({})
                uniCloud.callFunction({
                    name: 'StudentBind',
                    data: {
                        grade_id: this.gradeArr[this.gradeIndex]._id,
                        class_info: this.classArr[this.classIndex]._id,
                        token: uni.getStorageSync("token"),
                        uid: uni.getStorageSync("uid"),
                        userType: uni.getStorageSync("userType"),
                        stu_num:this.stu_num,
                        stu_name:this.stu_name
                    }
                })
                .then(res => {
                    uni.hideLoading();
                    console.log(res);
					uni.setStorageSync('stu_num',this.stu_num)
					uni.setStorageSync('stu_name',this.stu_name)
					uni.setStorageSync('class_id',this.classArr[this.classIndex]._id)
                    uni.showToast({
                        title: '绑定成功',
                        duration: 2000,
                        success() {
                            uni.navigateTo({
                                url:'/pages/index/index'
                            })
                        }
                    });
                })
                .catch(err => {
                    uni.hideLoading();
                    console.error(err);
                });
            }
        }
    }
</script>

<style>
.buttonGroup{
	margin-top: 150rpx;
}
</style>
