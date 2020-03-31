'use strict';

function userTypeConfig(userType) {
	// 根据tab类型匹配对应用户表
	// 0：老师
	// 1：学生
	// 2：家长
	// 3：管理员
	const userOptionDB = {
		0:'teachers',
		1:'students',
		2:'admin_users',
	};
	return userOptionDB[userType];
}

const db = uniCloud.database()

exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ' + event)
  
  let userType = event.userType
  if(!(userType==1 || userType==2)){
      return {
      	status: -1,
      	msg: '参数错误'
      }
  }
  
  const userDB = userTypeConfig(userType);
  
  db.collection(userDB).doc(event.uid).update({
      class_id:event.class_info,
      stu_num:event.stu_num,
      stu_name:event.stu_name
  });
  
  //返回数据给客户端
  return event
};
