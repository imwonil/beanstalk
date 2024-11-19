const adminUserUserStorage = require("./adminUserStorage")
const UserStorage = require("../models/UserStorage")
class AdminUserUserInfo {
    constructor(body) {
 this.body = body
    }
 
 

async adminUserSeve()   {
const  c =  this.body
  
 const a = await adminUserUserStorage.save(c)
 return a
 
}
 async adminNext() {
    const  c =  this.body
    const a = await UserStorage.adminnext(c) 
    return a
 }

}


 



module.exports =  AdminUserUserInfo