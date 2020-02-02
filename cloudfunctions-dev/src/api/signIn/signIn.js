import crypto from 'crypto'
import jwt from 'jwt-simple'
import {
	tokenExp
} from '../../utils/constants.js'
import encryptPassword from '../../utils/encryptPassword.js'

const db = uniCloud.database()

async function signUp(event) {
	const {
		username,
		password,
		TabCur,
	} = event

	let userInfo = {
		username
	}
	// 根据tab类型匹配对应用户表
	const userOptionDB = {
		0:'teachers',
		1:'students',
		2:'parents',
		3:'admin_users',
	}
	const userDBkye = userOptionDB[TabCur];

	const userInDB = await db.collection(userDBkye).where({
		username,
		password: userDBkye === 'admin_users' ? password : encryptPassword(password),
	}).get()

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
