'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var crypto = _interopDefault(require('crypto'));

const loginConfig = {
	AppId: 'wxc6a6390e3dbe372f', //微信小程序AppId
	AppSecret: '46ffc2c5373afa7113f7cdc5dfbb0416' //微信小程序AppSecret
};

//上面三个字段非常重要！！！

const tokenExp = 7200000;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var jwt_1 = createCommonjsModule(function (module) {
/*
 * jwt-simple
 *
 * JSON Web Token encode and decode module for node.js
 *
 * Copyright(c) 2011 Kazuhito Hokamura
 * MIT Licensed
 */

/**
 * module dependencies
 */



/**
 * support algorithm mapping
 */
var algorithmMap = {
  HS256: 'sha256',
  HS384: 'sha384',
  HS512: 'sha512',
  RS256: 'RSA-SHA256'
};

/**
 * Map algorithm to hmac or sign type, to determine which crypto function to use
 */
var typeMap = {
  HS256: 'hmac',
  HS384: 'hmac',
  HS512: 'hmac',
  RS256: 'sign'
};


/**
 * expose object
 */
var jwt = module.exports;


/**
 * version
 */
jwt.version = '0.5.6';

/**
 * Decode jwt
 *
 * @param {Object} token
 * @param {String} key
 * @param {Boolean} [noVerify]
 * @param {String} [algorithm]
 * @return {Object} payload
 * @api public
 */
jwt.decode = function jwt_decode(token, key, noVerify, algorithm) {
  // check token
  if (!token) {
    throw new Error('No token supplied');
  }
  // check segments
  var segments = token.split('.');
  if (segments.length !== 3) {
    throw new Error('Not enough or too many segments');
  }

  // All segment should be base64
  var headerSeg = segments[0];
  var payloadSeg = segments[1];
  var signatureSeg = segments[2];

  // base64 decode and parse JSON
  var header = JSON.parse(base64urlDecode(headerSeg));
  var payload = JSON.parse(base64urlDecode(payloadSeg));

  if (!noVerify) {
    if (!algorithm && /BEGIN( RSA)? PUBLIC KEY/.test(key.toString())) {
      algorithm = 'RS256';
    }

    var signingMethod = algorithmMap[algorithm || header.alg];
    var signingType = typeMap[algorithm || header.alg];
    if (!signingMethod || !signingType) {
      throw new Error('Algorithm not supported');
    }

    // verify signature. `sign` will return base64 string.
    var signingInput = [headerSeg, payloadSeg].join('.');
    if (!verify(signingInput, key, signingMethod, signingType, signatureSeg)) {
      throw new Error('Signature verification failed');
    }

    // Support for nbf and exp claims.
    // According to the RFC, they should be in seconds.
    if (payload.nbf && Date.now() < payload.nbf*1000) {
      throw new Error('Token not yet active');
    }

    if (payload.exp && Date.now() > payload.exp*1000) {
      throw new Error('Token expired');
    }
  }

  return payload;
};


/**
 * Encode jwt
 *
 * @param {Object} payload
 * @param {String} key
 * @param {String} algorithm
 * @param {Object} options
 * @return {String} token
 * @api public
 */
jwt.encode = function jwt_encode(payload, key, algorithm, options) {
  // Check key
  if (!key) {
    throw new Error('Require key');
  }

  // Check algorithm, default is HS256
  if (!algorithm) {
    algorithm = 'HS256';
  }

  var signingMethod = algorithmMap[algorithm];
  var signingType = typeMap[algorithm];
  if (!signingMethod || !signingType) {
    throw new Error('Algorithm not supported');
  }

  // header, typ is fixed value.
  var header = { typ: 'JWT', alg: algorithm };
  if (options && options.header) {
    assignProperties(header, options.header);
  }

  // create segments, all segments should be base64 string
  var segments = [];
  segments.push(base64urlEncode(JSON.stringify(header)));
  segments.push(base64urlEncode(JSON.stringify(payload)));
  segments.push(sign(segments.join('.'), key, signingMethod, signingType));

  return segments.join('.');
};

/**
 * private util functions
 */

function assignProperties(dest, source) {
  for (var attr in source) {
    if (source.hasOwnProperty(attr)) {
      dest[attr] = source[attr];
    }
  }
}

function verify(input, key, method, type, signature) {
  if(type === "hmac") {
    return (signature === sign(input, key, method, type));
  }
  else if(type == "sign") {
    return crypto.createVerify(method)
                 .update(input)
                 .verify(key, base64urlUnescape(signature), 'base64');
  }
  else {
    throw new Error('Algorithm type not recognized');
  }
}

function sign(input, key, method, type) {
  var base64str;
  if(type === "hmac") {
    base64str = crypto.createHmac(method, key).update(input).digest('base64');
  }
  else if(type == "sign") {
    base64str = crypto.createSign(method).update(input).sign(key, 'base64');
  }
  else {
    throw new Error('Algorithm type not recognized');
  }

  return base64urlEscape(base64str);
}

function base64urlDecode(str) {
  return Buffer.from(base64urlUnescape(str), 'base64').toString();
}

function base64urlUnescape(str) {
  str += new Array(5 - str.length % 4).join('=');
  return str.replace(/\-/g, '+').replace(/_/g, '/');
}

function base64urlEncode(str) {
  return base64urlEscape(Buffer.from(str).toString('base64'));
}

function base64urlEscape(str) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
});

var jwtSimple = jwt_1;

const db = uniCloud.database();

async function login(event) {
	let data = {
		appid: loginConfig.AppId,
		secret: loginConfig.AppSecret,
		js_code: event.code,
		grant_type: 'authorization_code'
	};

	const res = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/jscode2session', {
		method: 'GET',
		data,
		dataType: 'json'
	});

	const success = res.status === 200 && res.data && res.data.openid;
	if (!success) {
		return {
			status: -1,
			msg: '微信登录失败'
		}
	}

	const {
		openid,
		//session_key 暂不需要session_key
	} = res.data;

	let userInfo = {
		openid
	};
	
	const userOptionDB = {
		0:'teachers',
		1:'students',
		2:'parents',
	};
	const userDBkye = userOptionDB[event.TabCur];

	let tokenSecret = crypto.randomBytes(16).toString('hex');
	let secretKey = Object.assign(userInfo,{TabCur:event.TabCur});
	let token = jwtSimple.encode(secretKey, tokenSecret);
	const userInDB = await db.collection(userDBkye).where({
		openid
	}).get();

	let userUpdateResult;
	if (userInDB.data && userInDB.data.length === 0) {
		userUpdateResult = await db.collection(userDBkye).add({
			...userInfo,
			tokenSecret,
			exp: Date.now() + tokenExp
		});
	} else {
		userUpdateResult = await db.collection(userDBkye).doc(userInDB.data[0]._id).set({
			...userInfo,
			tokenSecret,
			exp: Date.now() + tokenExp
		});
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

exports.main = login;
