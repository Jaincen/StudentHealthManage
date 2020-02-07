// 修改班级项
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('class_list')
	const res = await collection.doc(event.id).update(event.data);
	return res.data
};
