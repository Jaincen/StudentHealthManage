
## 学校班级信息表

一期仅支持单个学校，班级管理分年级、班级两个维度，涉及两张表：

年级表：
```
grade_list
{
    _id: "", // string，自生成
    name:'', //一年级、二年级等
    order:1'' //年级排序
}
```

班级表：

```
class_list
{
    _id: "", // string，自生成
    grade_id:"",//所属年级ID
    name:"",//班级名称，如"994班"、"信计02"等
    student_sum:0,//当前班级总人数
    order:1,//int，同年级下的排序
}
```

<!-- 暂不支持学校表
```
school
{
    _id: "", // string，自生成
    name: "", // string 学校名称不能为空
    phone: "", // string 联系方式不能为空，需验证符合规则
    address: "" // string 学校地址
	create_time: 0, // 时间戳 GMT
}
```
 -->

## 用户表

用户分为几个角色：

- 管理员（后台手动配置）
- 老师
- 学生
- 学生家长（小学、幼儿园代替孩子报备）

老师表：
```
teachers
{
    _id: "", // string，自生成
    username: "", // string 用户
    password: "", // string 密码(禁止明文)
    wx_open_id: "", // string 关联微信openid  用户code 换取
    class_info: "", // string 管理班级ID  一期仅支持一个老师管理一个班级
}
```

学生表：

```
students
{
    _id: "", // string，自生成
    username: "", // string 用户
    password: "", // string 密码(禁止明文)
    wx_open_id: "", // string 关联微信openid  用户code 换取
    stu_num: "", // string 学号 student number
    stu_name: "", // string 学生姓名
    class_id: "", // string 学生所属班级ID
}
```

学生家长表：

```
parents
{
    _id: "", // string，自生成
    username: "", // string 用户
    password: "", // string 密码(禁止明文)
    wx_open_id: "", // string 关联微信openid  用户code 换取
    class_id: "", // string 学生所属班级ID
    stu_id:"",//学校若提前录入学生信息，则可绑定；若没有学生信息表，本项可空
    stu_num: "", // string 学号 student number
    stu_name: "", // string 学生姓名
}
```

Tips：支持一个学生关联多个家长，可能每次报备的家长不同。

## 每日健康报备

```
daily_report_log
{
    _id: "", // string，自生成
	create_time: 0, // int 时间戳 GMT
	stu_id: "", // string 学生唯一标识，可选
    stu_num:"",//学号
    stu_name: "", // string 学生姓名
	contact_virus:0, // 有无接触湖北/武汉人员 int 0无，1有
	have_symptom:0, // 有无疑似症状 int 0无，1有
	current_pos:"", //当前位置，0：本地，1：外地（除湖北），2：外地（湖北）
    health:""//当前健康状况，多选，可选项：good/kesou/fali/fare，多选时逗号分隔,良好不能好其他多选
	temperature: 0, // 体温，可选
}
```

<!--
#### 成员表
```
member
{
    _id: "", // string，自生成
    guid: "", // string 用户唯一标识，添加时生成无法修改
    id_type: 0, // int 证件类型 0 身份证, 1 护照
    id_card: "", // string 证件号码，需验证符合规则
    name: "", // string 不能为空
    phone: "", // string 不能为空，需验证符合规则
    age: 18, // int
    sex: 0, // int (0女, 1男, 2未知)
    photo: "", // string 图片url地址
	school_id:"" //成员属于学校(新增了一个学院表id)
}
```

 #### 成员操作历史
```
// 增加人员时需要写入
member_opera_history
{
    _id: "", // string，自生成
    user_guid: "", // string 用户唯一标识
    member_id: 0, // string 成员唯一标识
    status: 0, // int 0新增，1删除
    create_time: 0, // int 时间戳 GMT
    create_ip: "", // string 当前操作ip
}
```


#### 学生表
```
student
{
    _id: "", // string，自生成
	create_time: 0,// 时间戳 GMT
	class_id:"",//班级唯一标识
    name: "", // string 学生姓名 不能为空
	sex: 0, // int (0女, 1男, 2未知)
    phone: "", // string 家长联系电话，需验证符合规则
	area:0, //归属地  0本地留守,1异地出访（除湖北）,2异地出访（湖北）
	area_info:
	{address:'',phone:"",status:0,comment:""}//本地留守,现住址(address),联系方式(phone),目前健康状况（单选项，候选项如下）0良好,1发热,2乏力,3咳嗽,备注(comment)
	{address:'',leave_info:{leave_time:0,vehicle:'',flight:''},status:0,comment:""}//异地出访,leave_time(离开时间),vehicle(交通工具),flight(航班)
}
```
 -->