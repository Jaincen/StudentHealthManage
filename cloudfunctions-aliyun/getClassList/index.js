'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ' + event)
  
  const collection = db.collection('grade_list')
  
  const res = await collection.orderBy("order","asc").get()
  console.log("res:",res)
  
  
  let resData = {}
  
  if(res.data.length>0){
      resData.gradeList = res.data;
      let classCol = db.collection("class_list")
      for (var i = 0; i < res.data.length; i++) {
          let classRes = await classCol.where({
              grade_id:res.data[i]._id
          }).orderBy("order","asc").get()
          
          console.log("class_res",classRes)
          
          resData[res.data[i]._id] = classRes.data
      }
  }else{
      console.log("length is 0??")
  }
  
  
  //返回数据给客户端
  return resData
};
