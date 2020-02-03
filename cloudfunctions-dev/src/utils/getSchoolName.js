const db = uniCloud.database()
async function getSchoolName(token) {
	try{
		const userInDB = await db.collection('admin_users').get()
		return userInDB[0].school
	}catch(e){
		return ''
	}
}

export default getSchoolName
