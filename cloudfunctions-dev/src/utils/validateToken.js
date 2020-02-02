import jwt from 'jwt-simple'
import userTypeConfig from './userTypeConfig.js'
const db = uniCloud.database()
async function validateToken(token) {
	const userFromToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
	const { userType, ...others } = userFromToken;
	// 根据tab类型匹配表名
	const userDBkye = userTypeConfig(userType)
	const userInDB = await db.collection(userDBkye).where(others).get()
	
	if (userInDB.data.length !== 1) {
		return {
			status: -1,
			errCode: 'TOKEN_INVALID',
			msg: '查无此人'
		}
	}
	const userInfoDB = userInDB.data[0]
	// 增加token中的标识 0老师、1学生、2家长、3管理员
	userInfoDB.userType = userType;
	let userInfoDecode

	userInfoDecode = jwt.decode(token, userInfoDB.tokenSecret)

	function checkUser(userFromToken, userInfoDB) {
		return Object.keys(userFromToken).every(function(item) {
			return userFromToken[item] === userInfoDB[item] && userFromToken[item] === userInfoDecode[item]
		})
	}


	if (userInfoDB.exp > Date.now() && checkUser(userFromToken, userInfoDB)) {
		return {
			statue: 0,
			data:userInfoDB,
			msg: 'token验证成功'
		}
	}

	if (userInfoDB.exp < Date.now()) {
		return {
			status: -3,
			errCode: 'TOKEN_EXPIRED',
			msg: 'token已失效'
		}
	}

	return {
		status: -2,
		errCode: 'TOKEN_INVALID',
		msg: 'token无效'
	}

}

export default validateToken
