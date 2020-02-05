<!-- 管理员管理班级信息 江西-前端-Ran -->
<template>
    <view class="warp" style="margin-top:50rpx ;">
        <view align="center">管理班级信息</view>
        <form action="">
            <view class="uni-title  uni-common-pl">班级</view>
            <view class="uni-form-item">
                <input id="name" class="uni-input" type="text" name="name" v-model="name" placeholder="请输入班级"/>
            </view>
            <view class="uni-title  uni-common-pl">班级总人数</view>
            <view class="uni-form-item">
                <input id="student_sum" class="uni-input" type="number" name="student_sum" v-model="student_sum"
                       placeholder="请输入班级总人数"/>
            </view>
            <button @click="submit" form-type="submit" type="primary" size="mini">提交</button>
        </form>
        <view class="box" style="margin-top:50rpx ;">
            <t-table border="3" border-color="#e6e5e5">
                <t-tr font-size="16" color="#101411" align="center">
                    <t-th align="left">序号</t-th>
                    <t-th align="left">班级</t-th>
                    <t-th align="left">班级总人数</t-th>
                    <t-th align="left">操作</t-th>
                </t-tr>
                <t-tr font-size="14" color="#494743" align="right" v-for="(item,index) of tableList" :key="item.id">
                    <t-td align="left">{{index + 1 }}</t-td>
                    <t-td align="left">{{ item.name }}</t-td>
                    <t-td align="left">{{ item.student_sum }}</t-td>
                    <t-td align="left">
                        <button size="mini" style="padding: 10rpx;" type="primary" @click="edit(index)">修改</button>
                        <button size="mini" style="padding: 10rpx;" type="warn" @click="del(item.name)">删除</button>
                    </t-td>
                </t-tr>
            </t-table>
        </view>
    </view>
</template>

<script>
    import tTable from '@/components/t-table/t-table.vue';
    import tTh from '@/components/t-table/t-th.vue';
    import tTr from '@/components/t-table/t-tr.vue';
    import tTd from '@/components/t-table/t-td.vue';
	
    export default {
        components: {
            tTable,
            tTh,
            tTr,
            tTd
        },
        data() {
            return {
                tableList: [
                    {
                        _id: "", // string，自生成--未处理
                        grade_id: 0,//所属年级ID
                        name: '胜利1班',//班级名称，如"994班"、"信计02"等
                        student_sum: 20,//当前班级总人数
                        order: 0, //int，同年级下的排序
                    },
                    {
                        _id: "", // string，自生成--未处理
                        grade_id: 1,//所属年级ID
                        name: '胜利2班',//班级名称，如"994班"、"信计02"等
                        student_sum: 30,//当前班级总人数
                        order: 1, //int，同年级下的排序
                    },
                    {
                        _id: "", // string，自生成--未处理
                        grade_id: 2,//所属年级ID
                        name: '胜利3班',//班级名称，如"994班"、"信计02"等
                        student_sum: 40,//当前班级总人数
                        order: 2, //int，同年级下的排序
                    }
                ],
                //_id: "", // string，自生成--未处理
                grade_id: "",//所属年级ID
                name: '',//班级名称，如"994班"、"信计02"等
                student_sum: '',//当前班级总人数
                order: '',//int，同年级下的排序
                isedit: false,
            };
        },
        methods: {
            submit() {
                if (this.name == '') {
                    alert("班级名称不允许为空！");
                    return false;
                }
                if (this.student_sum == 0) {
                    alert("班级总人数不允许为0！");
                    return false;
                }
                if (this.isedit == true) {
                    alert("是否提交对该班级的修改？");
                } else {
                    alert("是否添加该班级？");
                }
                var info = {
                    name: this.name,
                    student_sum: this.student_sum,
                }
                //利用this.isedit为true时，提示为修改。之后，把this.isedit修改为默认值false
                if (this.isedit == true) {
                    // 执行数据修改
                    // 数组下标 重新赋值  涉及深拷贝问题
                    // this.tableList[this.id] = info;
                    this.tableList[this.id].name = info.name;
                    this.tableList[this.id].student_sum = info.student_sum;
                    student_sum:this.shudent_sum;
                } else {
                    // 把指定的元素追加到数组的末尾
                    this.tableList.push(info)
                }
                // 点击提交之后，恢复默认值
                this.isedit = false;
                this.name = '';
                this.student_sum = '';
            },
            edit(item) {
                // 每次点击，给id赋新的值
                this.id = item;
                // 表格里显示出要修改的那一条信息
                this.name = this.tableList[item].name;
                this.student_sum = this.tableList[item].student_sum;
                // 此时直接点击提交后，调用的push方法，就不是修改，而是又增加一条信息
                this.isedit = true;
            },
            del(name) {
                // 此时的name是名字
                alert("警告！此操作会将该班级下所有学生及已有的健康报备数据全部删除！！！");
                // findIndex 遍历查找指定元素的数组下标。
                var idx = this.tableList.findIndex(item => {
                    return item.name == name;
                    /* 相当于
                    if(item.name == name){
                         return item;
                    }*/
                })
                this.tableList.splice(idx, 1)
                // splice根据数组下标删除指定的数组元素
                // this.tableList.splice(name,1)
            },
        }
    };
</script>

<style scoped>

</style>