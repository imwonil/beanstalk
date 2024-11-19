const fs = require('fs').promises
const path = require('path')





// const adminUserInfo = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/adminUser/adminUserInfo.json") 
// const UserGoodsKinds = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/database/userGoodsKinds.json") 
// const AdminNext = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/adminSetKinds/adminNext.json") 

class adminUserStorage {
static  #adminUser = {
   id : ["wonil8573"],
   psword : ["1234"],
   feeMame:[],
   time:[],
   fee:[],
   day:[],
 }
 static  #adminTime = {
   
   feeMameTime:[],
   time2:[],
   fee:[],
   
 }
  static  #number = {
   
    number:[]
  
  
}
 static objectsave() { //adminGoodsKiosk.json data file
  return fs.
  readFile("./src/adminUser/adminGoodsKiosk.json",  'utf8', (err, data) => {
  })
 
 .then((data) => {
  return JSON.parse(data)
 })
}  
//  static Numbers() { //adminGoodsKiosk.json data file
//   return fs.
//   readFile("./src/database/number.json",  'utf8', (err, data) => {
//   })
 
//  .then((data) => {
//   return JSON.parse(data)
//  })
// } 
 static getAdmin(...fildes) {
  const admin = this.#adminUser
  const newAdmin = fildes.reduce((newadmin, flid) => {
    newadmin[flid] = admin[flid]
   return  newadmin
  },{})
  return newAdmin 
 }  
 static getAdminInfo (admin) {
    
 const adminuser = this.#adminUser
 const idx = adminuser.id.indexOf(admin)
 const fides = Object.keys(adminuser)
 const AdminInfo = fides.reduce((newAdmin, fied) => {
      newAdmin[fied] = adminuser[fied][idx]
      return newAdmin
 },{}) 
  return AdminInfo
 }
 static adminInfo() {
    
  return fs.
  readFile("./src/adminUser/adminUserInfo.json")
  
  .then((data) => {
     return JSON.parse(data)
  }) 

  .catch((err) => console.error(err))
  } 

 static async save(userinfo) {
  console.log(userinfo,"kkkk")
   const a = await this.adminInfo()
   const kiosck  = await this.objectsave()
  
   var menz = kiosck.filter(function (setAdd) { return setAdd.indexType === userinfo.indexType });

 console.log(menz[0])
  if(menz[0] === undefined ) {
   
    kiosck.push({ "indexType":userinfo.indexType,"cdId":`${userinfo.cdId}`,
                "feeName": [userinfo.feeName],"fee":[userinfo.fee], "expiry":[userinfo.expiry]})
    
     
   fs.writeFile("./src/adminUser/adminGoodsKiosk.json", JSON.stringify(kiosck) , 'utf8' , (err) => {
    if (err) throw err;
     console.log("err") 
     }) 
    
  return kiosck 
  
  } else if(userinfo.save === "save"  ){
    console.log("kjuuuu")
    menz[0].feeName.push(userinfo.feeName)
    menz[0].fee.push(userinfo.fee)
    menz[0].expiry.push(userinfo.expiry)
   
     fs.writeFile("./src/adminUser/adminGoodsKiosk.json", JSON.stringify(kiosck) , 'utf8' , (err) => {
     if (err) throw err;
      console.log("err") 
    })
 }
  else if(userinfo.delet === "delet") { 
        
    kiosck.forEach((item, index)=> {

  
        if(item.indexType === userinfo.indexType) {
           console.log("kklkl")
         item.feeName.splice(userinfo.index, 1)
         item.fee.splice(userinfo.index, 1)
         item.expiry.splice(userinfo.index, 1)

             fs.writeFile("./src/adminUser/adminGoodsKiosk.json", JSON.stringify(kiosck) , 'utf8' , (err) => {
               if (err) throw err;
                 console.log("err") 
           })
        }
      }); 
 
  
    

  } else if(userinfo.save === 'resave' ) {  
    console.log(userinfo.save,"162")    
   
  
    menz[0].feeName[userinfo.index] = userinfo.feeName
    menz[0].fee[userinfo.index] = userinfo.fee
    menz[0].expiry[userinfo.index] = userinfo.expiry
    
    
    

      
       fs.writeFile("./src/adminUser/adminGoodsKiosk.json", JSON.stringify(kiosck) , 'utf8' , (err) => {
        if (err) throw err;
         console.log("err") 
         })
  }
   // RoomType
  // if(userinfo.feeMame2 !=='') {

  //  a.feeMame2.push(userinfo.feeMame2)
  //  a.feeTime.push(userinfo.feeTime)
  //  a.time2.push(userinfo.time2)
 
  //  fs.writeFile("./src/adminUser/adminUserInfo.json", JSON.stringify(a) , 'utf8' , (err) => {
  //  if (err) throw err;
  //   console.log("err") 
     
  //   })
  return kiosck
  //  }  

  }
  
 
   
  
  
 }
 

module.exports = adminUserStorage;
 