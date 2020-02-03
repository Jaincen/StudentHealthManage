const loginConfig = {
	AppId: 'wxc6a6390e3dbe372f', //微信小程序AppId
	AppSecret: '46ffc2c5373afa7113f7cdc5dfbb0416' //微信小程序AppSecret
}

const passSecret = '' //用于用户数据库密码加密的密钥，使用一个比较长的随机字符串即可

//上面三个字段非常重要！！！

const tokenExp = 7200000

export {
	loginConfig,
	passSecret,
	tokenExp
}
