function userTypeConfig(userType) {
	// 根据tab类型匹配对应用户表
	// 0：老师
	// 1：学生
	// 2：家长
	// 3：管理员
	const userOptionDB = {
		0:'teachers',
		1:'students',
		2:'parents',
		3:'admin_users',
	}
	return userOptionDB[userType];
}

export default userTypeConfig