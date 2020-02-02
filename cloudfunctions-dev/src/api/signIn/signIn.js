import crypto from 'crypto'
import jwt from 'jwt-simple'
import {
	tokenExp
} from '../../utils/constants.js'

import encryptPassword from '../../utils/encryptPassword.js';
import userTypeConfig from '../../utils/userTypeConfig.js';

const db = uniCloud.database()

async function signUp(event) {
	const {
		username,
		password,
		userType,
	} = event

	let userInfo = {
		username
	}
	// 根据用户类型匹配表名称
	const userDBkye = userTypeConfig(userType);
	const userInDB = await db.collection(userDBkye).where({
		username,
		//管理员不加密 使用明文
		password: userDBkye === 'admin_users' ? password : encryptPassword(password),
	}).get()
	// 增加用户类型返回给前端
	userInfo.userType = userType;
	
	let tokenSecret = crypto.randomBytes(16).toString('hex'),
		token = jwt.encode(userInfo, tokenSecret)
	let userUpdateResult
	if (userInDB.data && userInDB.data.length === 0) {
		return {
			status: -1,
			msg: '用户名或密码不正确'
		}
	} else {
		userUpdateResult = await db.collection(userDBkye).doc(userInDB.data[0]._id).update({
			tokenSecret,
			exp: Date.now() + tokenExp
		})
	}

	if (userUpdateResult.id || userUpdateResult.affectedDocs === 1) {
		return {
			status: 0,
			token,
			msg: '登录成功'
		}
	}

	return {
		status: -1,
		msg: '登录失败'
	}
}

export {
	signUp as main
}
