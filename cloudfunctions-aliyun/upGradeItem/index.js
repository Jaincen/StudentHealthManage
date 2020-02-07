// 修改年级项
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('grade_list')
	const res = await collection.doc(event.id).update(event.data);

	return res
};
