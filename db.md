// 设计了一个数据库，我的群昵称是 安徽-unicloud-王秀龙 

# 学生健康报备管理系统 数据库(初稿)

# 前3张表复制外来人员登记系统（方便处理用户登入）

#### 用户表
```
user
{
    _id: "", // string，自生成
    guid: "", // string 用户唯一标识，注册时生成无法修改
    username: "", // string 用户
    password: "", // string 密码(禁止明文)
    wx_open_id: "", // string 关联微信openid  用户code 换取
    id_card: "", // string 身份证号，需验证符合规则
    name: "", // string 不能为空
    phone: "", // string 不能为空，需验证符合规则
    age: 18, // int
    sex: 0, // int (0女, 1男, 2未知)
    photo: "", // string 图片url地址
    status: 0, // int 0正常 1冻结
    permission: 0, int 默认2，0超级管理员, 1普通管理员, 2普通
    create_time: 0,// 时间戳 GMT
    create_ip: "",// 注册 ip
}
```

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

#### 学校表
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

#### 班级表
```
class
{
    _id: "", // string，自生成
	school_id: "", // string 学校唯一标识
    name: "", // string 班级名称不能为空
	create_time: 0, // 时间戳 GMT
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

#### 每日健康统计
```
student_day
{
    _id: "", // string，自生成
	create_time: 0, // int 时间戳 GMT
	student_id: "", // string 学生唯一标识
	contact_like_virus:0, // 有无接触湖北/武汉人员 int 0无，1有
	Suspected_symptoms:0, // 有无疑似症状 int 0无，1有
	check_in_address:"", //当前所在省市
	temperature: 0, // 体温
}
```

