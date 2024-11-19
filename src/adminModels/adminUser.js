const adminUserUserStorage = require("./adminUserStorage")
class adminUser {
    constructor(body) {
 this.body = body
    }

 adminLogin() {
   const admin = this.body
const  adminUser = adminUserUserStorage.getAdminInfo(admin.id)
    if(adminUser.id) {
       if(adminUser.id === admin.id && adminUser.psword === admin.psword){
            return {success : true}

       }
      return {success: false , mag:"암호가 다릅니다."}

    }
   return { success: false, mag:"ID 다릅니다."}
 }
 
}






module.exports = adminUser