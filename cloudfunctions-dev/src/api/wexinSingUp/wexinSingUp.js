import crypto from 'crypto'
import {
	loginConfig,
	tokenExp
} from '../../utils/constants.js'
import encryptPassword from '../../utils/encryptPassword.js'
import jwt from 'jwt-simple'

const db = uniCloud.database()

async function wexinSingUp(event) {
	let data = {
		appid: loginConfig.AppId,
		secret: loginConfig.AppSecret,
		js_code: event.code,
		grant_type: 'authorization_code'
	}

	const res = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/jscode2session', {
		method: 'GET',
		data,
		dataType: 'json'
	})

	const success = res.status === 200 && res.data && res.data.openid
	if (!success) {
		return {
			status: -1,
			msg: '微信登录失败'
		}
	}

	const {
		openid,
		//session_key 暂不需要session_key
	} = res.data

	let userInfo = {
		openid
	}
	
	const userOptionDB = {
		0:'teachers',
		1:'students',
		2:'parents',
	}
	const userDBkye = userOptionDB[event.userType];

	let tokenSecret = crypto.randomBytes(16).toString('hex'),
		token = jwt.encode(userInfo, tokenSecret)


	// openId判断
	const userInDB = await db.collection(userDBkye).where({
		openid
	}).get()
	if (userInDB.data && userInDB.data.length > 0) {
		return {
			status: -1,
			msg: '已经注册，请直接登录'
		}
	}
	
	// 用户名判断
	const userNameInfo  = await db.collection(userDBkye).where({username:event.username}).get();
	// 用户名判断
	if (userNameInfo.data && userNameInfo.data.length > 0) {
		return {
			status: -1,
			msg: '此用户名已存在'
		}
	}
	
	let userUpdateResult
	if (userInDB.data && userInDB.data.length === 0) {
		userUpdateResult = await db.collection(userDBkye).add({
			...userInfo,
			username:event.username,
			tokenSecret,
			password: encryptPassword(event.password),
			exp: Date.now() + tokenExp
		})
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
	wexinSingUp as main
}
