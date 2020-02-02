import crypto from 'crypto'
import {
	passSecret
} from './constants.js'

function encryptPassword(password) {
	const hmac = crypto.createHmac('sha1', passSecret.toString('ascii'));
	hmac.update(password);
	return hmac.digest('hex');
}

export default encryptPassword