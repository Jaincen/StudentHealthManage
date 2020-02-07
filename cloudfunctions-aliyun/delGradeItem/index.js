// 删除年级项
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('grade_list')
	const res = await collection.doc(event._id).remove() //删除
	let resData = res.data
	// 需要循环删除对应班级的数据
	let classCol = db.collection("class_list")
	classCol.where({
		grade_id: event._id
	}).get().then((res) => {
			const promiseList = res.data.map(item => {
				return classCol.doc(item.grade_id).remove(); //删除
			});
			Promise.all(promiseList);
		})
		.catch((e) => {

		});
	//返回数据给客户端
	return resData
};
