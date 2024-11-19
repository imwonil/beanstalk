const  express = require("express");
const  router = express.Router();
const fs =  require('fs').promises
const moment = require("moment")
const path = require('path')





// const ADminGoodsKiosk = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/adminUser/adminGoodsKiosk.json") 
// const UserGoodsKinds = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/database/userGoodsKinds.json") 
// const AdminNext = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/adminSetKinds/adminNext.json") 


// setInterval(inspect, 2002);
function inspect() { 
  
fs. readFile("./src/database/userGoodsKinds.json")
.then((data) => {
const userGoodsKinds = JSON.parse(data)
const nowTime =  moment().format('yyyy-MM-DD hh:mm')


function  next_2() {
    return new Promise((resolve, reject) => {
    
    console.log("2")
      if(userGoodsKinds[0].loginStart !== "") { 
       
    if(resolve) {
       
      for(var q = 0; q<userGoodsKinds.length; q ++) {
        
        for(var b = 0; b<userGoodsKinds[q].UseTime.length; b ++)  {
     
         
               
              if(userGoodsKinds[q].expiryName[b] < nowTime   ) {
                console.log('expiryNam')
      
                userGoodsKinds[q].wonset.splice([b],1)
                userGoodsKinds[q].UseTime.splice([b],1)
                userGoodsKinds[q].loginStart.splice([b],1)
                userGoodsKinds[q].goodsName.splice([b],1) 
                userGoodsKinds[q].benchName.splice([b],1)
                userGoodsKinds[q].expiryName.splice([b],1)
                userGoodsKinds[q].logoutEnd.splice([b],1)
                userGoodsKinds[q].koko.splice([b],1)
            
                  }else if( userGoodsKinds[q].UseTime[b] < 0 ) {
                    console.log('UseTime')
                    userGoodsKinds[q].wonset.splice([b],1)
                    userGoodsKinds[q].UseTime.splice([b],1)
                    userGoodsKinds[q].loginStart.splice([b],1)
                    userGoodsKinds[q].goodsName.splice([b],1) 
                    userGoodsKinds[q].benchName.splice([b],1)
                    userGoodsKinds[q].expiryName.splice([b],1)
                    userGoodsKinds[q].logoutEnd.splice([b],1)
                    userGoodsKinds[q].koko.splice([b],1)
            }
           
   
          
        }
       
      }
       
  
      }
   
         resolve();
        //  fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(userGoodsKinds) , 'utf8' , (err) => {
        //   if (err) throw err;
        //      console.log("err") 
             
        //    })
    }else { 
      reject("err")
    } 

  })
  
  }
 
    
next_2()
})
 

}

  
module.exports = router 