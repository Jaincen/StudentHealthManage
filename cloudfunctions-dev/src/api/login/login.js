import crypto from 'crypto'
import {
	loginConfig,
	tokenExp
} from '../../utils/constants.js'
import jwt from 'jwt-simple'

const db = uniCloud.database()

async function login(event) {
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
	const userDBkye = userOptionDB[event.TabCur];

	let tokenSecret = crypto.randomBytes(16).toString('hex');
	let secretKey = Object.assign(userInfo,{TabCur:event.TabCur});
	let token = jwt.encode(secretKey, tokenSecret)
	const userInDB = await db.collection(userDBkye).where({
		openid
	}).get()

	let userUpdateResult
	if (userInDB.data && userInDB.data.length === 0) {
		userUpdateResult = await db.collection(userDBkye).add({
			...userInfo,
			tokenSecret,
			exp: Date.now() + tokenExp
		})
	} else {
		userUpdateResult = await db.collection(userDBkye).doc(userInDB.data[0]._id).set({
			...userInfo,
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
		data:{
			
		},
		msg: '未注册，请先注册'
	}
}

export {
	login as main
}
