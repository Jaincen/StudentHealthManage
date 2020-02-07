// 根据年级ID获取班级列表数据
'use strict';

const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event)
	const collection = db.collection('class_list')
	const res = await collection.orderBy("order", "asc").where({
		grade_id: dbCmd.eq(event.grade_id)
	}).get()
	console.log("res:", res)
	let resData = res.data
	//返回数据给客户端
	return resData
};
