const UserStorage = require( "../models/UserStorage")
const fs =  require('fs').promises
class User {
 
constructor(body) {
this.body = body


}
async login(){
  
  const client = this.body

   
  const {phon, psword}  = await UserStorage.getUserInfo(client.phon)
                          
    if(phon) {
         if(client.psword !== psword ) { 
        return  {success: false , msg: "비밀번호가 다릅니다"} 
  
           } else if(client.phon !== phon){
                        
            return {success: false, msg: "전화번호가 다릅니다"}
          } else if (client.phon === phon && client.psword === psword)  {
          const a = await UserStorage.As(client) 
          
          return  a
          }
          }
         
          return {success: false, msg: "전화번호와 비밀번호를 모두 입력해주세요"}
                    
                   
  }

async register(){
const client = this.body


  const response = await UserStorage.save(client)
  return response 

  

  
}

   
     async rss() {
      const client = this.body


    
      
    
  }
   loguttime() {
     
     const client =this.body 
     const a =UserStorage.logouttimes(client) 
      return a
    }
        
 async loca(){
const client = this.body
 
   
const {phon, psword}  = await UserStorage.getUserInfo(client.phon)

  if(phon) {
       if(client.psword !== psword ) { 
      return  {success: false , msg: "비밀번호가 다릅니다"} 

         } else if(client.phon !== phon){
                      
          return {success: false, msg: "전화번호가 다릅니다"}
        } else if (client.phon === phon && client.psword === psword)  {
        const a = await UserStorage.locaUser(client) 
        return  a
        }
        }
       
        return {success: false, msg: "전화번호가 다릅니다"}
                  
                 
                }
      

   async certiFication() { 
    const client = this.body
    const a =  UserStorage.Certification(client)
    return a
     }
 
}
module.exports = User;

