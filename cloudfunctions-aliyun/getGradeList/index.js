// 获取年级列表数据
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event)
	const collection = db.collection('grade_list')
	const res = await collection.orderBy("order", "asc").get()
	console.log("res:", res)
	let resData = res.data
	//返回数据给客户端
	return resData
};
