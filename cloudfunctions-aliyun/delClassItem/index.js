// 删除班级项
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('class_list')
	const res = await collection.doc(event._id).remove() //删除
	let resData = res.data
	//返回数据给客户端
	return resData
};
