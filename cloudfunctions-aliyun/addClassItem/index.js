// 添加班级项
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('class_list')
	const res = await collection.add(event)
	return res.data
};
