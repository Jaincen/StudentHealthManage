'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
 const collection = db.collection('students')
 const res = await collection.doc(event.stu_id).get()
 return res
};
