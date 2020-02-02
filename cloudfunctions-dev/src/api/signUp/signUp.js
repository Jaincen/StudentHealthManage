import crypto from 'crypto'
import jwt from 'jwt-simple'
import {
	tokenExp
} from '../../utils/constants.js'
import userTypeConfig from '../../utils/userTypeConfig.js'
import encryptPassword from '../../utils/encryptPassword.js'

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
	// 根据用户类型匹配表名
	const userDBkye = userTypeConfig(userType)
	const userInDB = await db.collection(userDBkye).where(userInfo).get()

	let tokenSecret = crypto.randomBytes(16).toString('hex'),
		token = jwt.encode(userInfo, tokenSecret)
	let userUpdateResult
	if (userInDB.data && userInDB.data.length === 0) {
		userUpdateResult = await db.collection(userDBkye).add({
			...userInfo,
			password: encryptPassword(password),
			tokenSecret,
			exp: Date.now() + tokenExp
		})
	} else {
		return {
			status: -1,
			msg: '此用户名已存在'
		}
	}

	if (userUpdateResult.id || userUpdateResult.affectedDocs === 1) {
		return {
			status: 0,
			token,
			msg: '注册成功'
		}
	}

	return {
		status: -1,
		msg: '注册失败'
	}
}

export {
	signUp as main
}
