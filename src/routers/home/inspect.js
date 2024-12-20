const  express = require("express");
const  router = express.Router();
const fs =  require('fs').promises
const moment = require("moment")
const db = require("../../config/db")

var crypto = require("crypto");
var axios = require("axios");


const { SolapiMessageService } = require("solapi");
const messageService = new SolapiMessageService("NCS2VWYIUO94SIGY", "JTGRZN7SISY7EGJZOQBZEXATCFEI1AEP");

// const path = require('path')

fs.readFile("./src/database/userGoodsKinds.json")
.then((data) => {
  const userGoodsKindsDdata = JSON.parse(data) 
  next_3()
function next_3() {
  console.log("3 진입")

fs. readFile("./src/database/kokoTime.json")
.then((kokoData) => {
const KOKODATA = JSON.parse(kokoData) 

      
          
      KOKODATA.forEach((item, index3) => {
       
        if(item.sendeType ===index3 && item.set === 1) {

          console.log(item.sendeType, index3)        
           

        }

    })
                      
                              

})
} 
})

// const ADminGoodsKiosk = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/adminUser/adminGoodsKiosk.json") 
// const UserGoodsKinds = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/database/userGoodsKinds.json") 
// const AdminNext = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/adminSetKinds/adminNext.json") 


//  setInterval(inspect, 60000);
// inspect();
function inspect() { 
 
fs.readFile("./src/database/userGoodsKinds.json")
.then((data) => {
 
const userGoodsKinds = JSON.parse(data)

const nowTime =  moment().format('yyyy-MM-DD hh:mm')

function  next(){
  return new Promise((resolve, reject) => {
    console.log("1")
  if(resolve) {
      
     userGoodsKinds.forEach((itme, index) => {
                itme.UseTime.forEach((useTime, inde) => {
                 
                  if(useTime !=="" && itme.loginStart[inde] !== ""){
                    
                         const nowTime =  moment().format('yyyy-MM-DD hh:mm')
                          const dateB = moment(`${nowTime}`);
                          const login =   userGoodsKinds[index].loginStart[inde]
                           
                           const nexetTime= dateB.diff(login, 'minute')
                
                                    
                          const kk = userGoodsKinds[index].UseTime[inde] - nexetTime
                       
                         
                          userGoodsKinds[index].UseTime[inde] = kk
                          userGoodsKinds[index].loginStart[inde] = nowTime
                          userGoodsKinds[index].loginStart[inde] = nowTime
                          console.log(userGoodsKinds[index].id)
                          const goodsExpire = `UPDATE kiki SET UseTime = JSON_SET(UseTime, '$.UseTime[${inde}]', ${kk}) WHERE phon = ?`;
                          
                                 
                                   // 쿼리 실행
                                   db.query(goodsExpire, [`${userGoodsKinds[index].phon}`], (err, data) => {
                                     if (err) {
                                       // 쿼리 실행 중 오류 발생 시 reject 호출
                                       return reject(err);
                                     }
                                     // 쿼리 성공 시 resolve 호출
                                     resolve(data);
                                   });

                  }
            

                })


     })
  
  
   
      resolve();

  }else { reject("err")  } 

  
})




}
function  next_2() {
  console.log("2 진입")
  if(userGoodsKinds[0].loginStart !== "") { 
    
  return new Promise((resolve, reject) => {
   
  if(resolve) {
     
    for(var q = 0; q<userGoodsKinds.length; q ++) {
      
      for(var b = 0; b<userGoodsKinds[q].UseTime.length; b ++)  {
   
      
             
            if(userGoodsKinds[q].expiryName[b] < nowTime   ) {
             
    
              userGoodsKinds[q].wonset.splice([b],1)
              userGoodsKinds[q].UseTime.splice([b],1)
              userGoodsKinds[q].loginStart.splice([b],1)
              userGoodsKinds[q].goodsName.splice([b],1) 
              userGoodsKinds[q].benchName.splice([b],1)
              userGoodsKinds[q].expiryName.splice([b],1)
              userGoodsKinds[q].logoutEnd.splice([b],1)
              userGoodsKinds[q].koko.splice([b],1)
              fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(userGoodsKinds) , 'utf8' , (err) => {
                if (err) throw err;
                   console.log("err") 
                   
                 })
                 return 
                }else if( userGoodsKinds[q].UseTime[b] < 0 ) {
                  
                  userGoodsKinds[q].wonset.splice([b],1)
                  userGoodsKinds[q].UseTime.splice([b],1)
                  userGoodsKinds[q].loginStart.splice([b],1)
                  userGoodsKinds[q].goodsName.splice([b],1) 
                  userGoodsKinds[q].benchName.splice([b],1)
                  userGoodsKinds[q].expiryName.splice([b],1)
                  userGoodsKinds[q].logoutEnd.splice([b],1)
                  userGoodsKinds[q].koko.splice([b],1)
           
                  fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(userGoodsKinds) , 'utf8' , (err) => {
                    if (err) throw err;
                       console.log("err") 
                       
                     })
 

                     return 
                   
                }
         
 
        
      }
   
    }
     

    }else { 
      reject("err")
    } 
 
       resolve();
    
  



})
}
}
// next_3() start
  //  if(userGoodsKinds[0] !== undefined) { 
  //       const userId = KOKODATA.filter(function (addSave) { return addSave.sendeType === "고정석" });

  //       if(userId[0].timeSend !== undefined) { 
         
  //       for(var q = 0; q<userGoodsKinds.length; q ++) { 
  //             for(var b = 0; b<userGoodsKinds[q].UseTime.length; b ++)  {
         
                
            
                
  //                var dayss = Math.floor(userGoodsKinds[q].UseTime[b]/1440)
                
  //                  var tme =  (userGoodsKinds[q].UseTime[b]%1440) //나머지 분
  //                // var day = Math.floor( userGoodsKinds[0].UseTime[listInfo]/1400) // 1일
  //                  var hour =  Math.floor(tme/60) // 시간
  //                // var min = tme%60  // 분
  //                // consle.log(userGoodsKinds[index].timeSend)
              
               
  //                      if(userId[0].timeSend >= userGoodsKinds[q].UseTime[b] && userGoodsKinds[q].koko[b] === "N") {
                        
  //                     console.log(userGoodsKinds[q].id, "카카오 문자 보냄")
  //                       const time =userGoodsKinds[q].UseTime[b]/60
  //                          messageService.send({
  //                            "to": userGoodsKinds[q].phon,
  //                            "from": "01029718573",
  //                                     "kakaoOptions": {
  //                                       "pfId": "KA01PF240201053925212fFkWt1ESnqq",
  //                                       "templateId": "KA01TP2402010546287663onuf9g48Ts",
  //                                       // 치환문구가 없을 때의 기본 형태
  //                                       "variables": {
  //                                         "#{NAME}" :`${userGoodsKinds[q].name}님의`,
  //                                         "#{time}" : `${userGoodsKinds[q].UseTime[b]}분`
                                    
  //                                       }
                                    
  //                                       // 치환문구가 있는 경우 추가, 반드시 key, value 모두 string으로 기입해야 합니다.
  //                                       /*
  //                                       variables: {
  //                                         "#{변수명}": "임의의 값"
  //                                       }
  //                                       */
                                    
  //                                       // disbaleSms 값을 true로 줄 경우 문자로의 대체발송이 비활성화 됩니다.
  //                                       // disableSms: true,
  //                                     }
  //                                   });
                       
                              
  //                                   var now = new Date().toISOString();
  //                                   // 16진수 64자의 랜덤 값 생성
  //                                   var genRanHex = size =>
  //                                     [...Array(size)]
  //                                       .map(() => Math.floor(Math.random() * 16).toString(16))
  //                                       .join("");
  //                                   var salt = genRanHex(64);
  //                                   var message = now + salt;
  //                                   var apiKey = "NCS2VWYIUO94SIGY";
  //                                   var apiSecret = "JTGRZN7SISY7EGJZOQBZEXATCFEI1AEP";
  //                                   var signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");
                                    
  //                                   // 생성한 시그니처를 사용하여 API 호출
  //                                   var uri = `https://api.solapi.com/messages/v4/list?limit=1`;
  //                                   axios
  //                                     .get(uri, {
  //                                       headers: {
  //                                         Authorization: `HMAC-SHA256 apiKey=${apiKey}, date=${now}, salt=${salt}, signature=${signature}`
  //                                       }
  //                                     })
  //                                     .then(res => {
  //                                       //  console.log(res.data, "ok");
  //                                     })
  //                                     .catch(error => {
  //                                       console.log(error.response.data);
  //                                     });
                                 
  //                                     userGoodsKinds[q].koko[b] = "Y"
                                 
  //                                     fs.writeFile("./src/database/userGoodskinds.json", JSON.stringify(userGoodsKinds), (err) => {
                  
  //                                     })  
  //                                  }
                                 
                                  
                                   
            
           
  //          }
             
         
  //     }
       
  //   }
  //     }

// next_3() end


function  next_4() {
  return new Promise((resolve, reject) => {
  
    
      if(userGoodsKinds[0].loginStart !== "") { 
        console.log("4 진입")
    if(resolve) {
       
      for(var q = 0; q<userGoodsKinds.length; q ++) {
        
        for(var b = 0; b<userGoodsKinds[q].UseTime.length; b ++)  {
     
         
               
              if(userGoodsKinds[q].expiryName[b] < nowTime   ) {
                   // SQL 쿼리 문자열 정의
                   const goodsExpire = `UPDATE kiki SET goodsName = JSON_REMOVE(goodsName, '$.goodsName[${b}]') WHERE phon = ?`;
                   const expirationDate = `UPDATE kiki SET expiryN = JSON_REMOVE(expiryN, '$.expiryN[${b}]') WHERE phon = ?`;
                   const USETIME = `UPDATE kiki SET UseTime = JSON_REMOVE(UseTime, '$.UseTime[${b}]') WHERE phon = ?`;     
                          
                            // 쿼리 실행
                            db.query(goodsExpire, [`${userGoodsKinds[q].phon}`], (err, data) => {
                              if (err) {
                                // 쿼리 실행 중 오류 발생 시 reject 호출
                                return reject(err);
                              }
                              // 쿼리 성공 시 resolve 호출
                              resolve(data);
                            });
                         
                                  
                               db.query(expirationDate , [`${userGoodsKinds[q].phon}`], (err, data) => {
                              if (err) {
                                // 쿼리 실행 중 오류 발생 시 reject 호출
                                return reject(err);
                              }
                              // 쿼리 성공 시 resolve 호출
                              resolve(data);
                            });
                            db.query(USETIME , [`${userGoodsKinds[q].phon}`], (err, data) => {
                              if (err) {
                                // 쿼리 실행 중 오류 발생 시 reject 호출
                                return reject(err);
                              }
                              // 쿼리 성공 시 resolve 호출
                              resolve(data);
                            });
      
      
                  }else if( userGoodsKinds[q].UseTime[b] < 0 ) {
                 
             
          // SQL 쿼리 문자열 정의
 const goodsExpire = `UPDATE kiki SET goodsName = JSON_REMOVE(goodsName, '$.goodsName[${b}]') WHERE phon = ?`;
 const expirationDate = `UPDATE kiki SET expiryN = JSON_REMOVE(expiryN, '$.expiryN[${b}]') WHERE phon = ?`;
 const USETIME = `UPDATE kiki SET UseTime = JSON_REMOVE(UseTime, '$.UseTime[${b}]') WHERE phon = ?`;    
        
          // 쿼리 실행
          db.query(goodsExpire, [`${userGoodsKinds[q].phon}`], (err, data) => {
            if (err) {
              // 쿼리 실행 중 오류 발생 시 reject 호출
              return reject(err);
            }
            // 쿼리 성공 시 resolve 호출
            resolve(data);
          });
       
                
             db.query(expirationDate , [`${userGoodsKinds[q].phon}`], (err, data) => {
            if (err) {
              // 쿼리 실행 중 오류 발생 시 reject 호출
              return reject(err);
            }
            // 쿼리 성공 시 resolve 호출
            resolve(data);
          });
          db.query(USETIME , [`${userGoodsKinds[q].phon}`], (err, data) => {
            if (err) {
              // 쿼리 실행 중 오류 발생 시 reject 호출
              return reject(err);
            }
            // 쿼리 성공 시 resolve 호출
            resolve(data);
          });
       
                     
                  }
           
   
          
        }
       
      }
       
  
      }
   
         resolve();
      
    }else { 
      reject("err")
    } 
  
  
  
  })




}


//  next_3 함수 start
function next_3() {
  console.log("3 진입")

fs. readFile("./src/database/kokoTime.json")
.then((kokoData) => {
const KOKODATA = JSON.parse(kokoData)


if(userGoodsKinds[0] !== undefined) { 
  const userId = KOKODATA.filter(function (addSave) { return addSave.sendeType === "고정석" });

  if(userId[0].timeSend !== undefined) { 
   
  for(var q = 0; q<userGoodsKinds.length; q ++) { 
        for(var b = 0; b<userGoodsKinds[q].UseTime.length; b ++)  {
   
          
      
          
           var dayss = Math.floor(userGoodsKinds[q].UseTime[b]/1440)
          
             var tme =  (userGoodsKinds[q].UseTime[b]%1440) //나머지 분
           // var day = Math.floor( userGoodsKinds[0].UseTime[listInfo]/1400) // 1일
             var hour =  Math.floor(tme/60) // 시간
           // var min = tme%60  // 분
           // consle.log(userGoodsKinds[index].timeSend)
        
         
                 if(userId[0].timeSend >= userGoodsKinds[q].UseTime[b] && userGoodsKinds[q].koko[b] === "N") {
                  
                console.log(userGoodsKinds[q].id, "카카오 문자 보냄")
                  const time =userGoodsKinds[q].UseTime[b]/60
                     messageService.send({
                       "to": userGoodsKinds[q].phon,
                       "from": "01029718573",
                                "kakaoOptions": {
                                  "pfId": "KA01PF240201053925212fFkWt1ESnqq",
                                  "templateId": "KA01TP2402010546287663onuf9g48Ts",
                                  // 치환문구가 없을 때의 기본 형태
                                  "variables": {
                                    "#{NAME}" :`${userGoodsKinds[q].name}님의`,
                                    "#{time}" : `${userGoodsKinds[q].UseTime[b]}분`
                              
                                  }
                              
                                  // 치환문구가 있는 경우 추가, 반드시 key, value 모두 string으로 기입해야 합니다.
                                  /*
                                  variables: {
                                    "#{변수명}": "임의의 값"
                                  }
                                  */
                              
                                  // disbaleSms 값을 true로 줄 경우 문자로의 대체발송이 비활성화 됩니다.
                                  // disableSms: true,
                                }
                              });
                 
                        
                              var now = new Date().toISOString();
                              // 16진수 64자의 랜덤 값 생성
                              var genRanHex = size =>
                                [...Array(size)]
                                  .map(() => Math.floor(Math.random() * 16).toString(16))
                                  .join("");
                              var salt = genRanHex(64);
                              var message = now + salt;
                              var apiKey = "NCS2VWYIUO94SIGY";
                              var apiSecret = "JTGRZN7SISY7EGJZOQBZEXATCFEI1AEP";
                              var signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");
                              
                              // 생성한 시그니처를 사용하여 API 호출
                              var uri = `https://api.solapi.com/messages/v4/list?limit=1`;
                              axios
                                .get(uri, {
                                  headers: {
                                    Authorization: `HMAC-SHA256 apiKey=${apiKey}, date=${now}, salt=${salt}, signature=${signature}`
                                  }
                                })
                                .then(res => {
                                  //  console.log(res.data, "ok");
                                })
                                .catch(error => {
                                  console.log(error.response.data);
                                });
                           
                                userGoodsKinds[q].koko[b] = "Y"
                           
                                fs.writeFile("./src/database/userGoodskinds.json", JSON.stringify(userGoodsKinds), (err) => {
            
                                })  
                             }
                           
                            
                             
      
     
     }
       
   
}
 
}
}
            
                   
                
                  
             

       
     
     

}).catch((err) => console.error(err));






} 
//  next_3 함수 end




if(userGoodsKinds[0] !== undefined) {
next().then(( )  => {return  next_3()})  
         .then(() =>{ return next_4()})
         .then(() =>{ return next_2()})
    //  nex() 실시간 데이터 차감하는 함수
    //  nex_2() UseTime 만기되면 제가 되는 함수
    //  nex_3() clint 가 설정한 시간내에 카카오톡 실행 하는 함수
    //  nex_4() Usetime 만기되면 db 데이터 제거 되는 함수
          console.log(userGoodsKinds,"kinds")
}

})
 

}


function next_3() {
  console.log("3 진입")

fs. readFile("./src/database/kokoTime.json")
.then((kokoData) => {
const KOKODATA = JSON.parse(kokoData)

if(KOKODATA[0] !== undefined) { 
  const timesend =  KOKODATA[0].timeSend
 
  
    
      if(userGoodsKinds[0] !== undefined) { 
        const userId = KOKODATA.filter(function (addSave) { return addSave.sendName === "fixedDeadine" });

        if(userId[0].timeSend !== undefined) { 
         
        for(var q = 0; q<userGoodsKinds.length; q ++) { 
              for(var b = 0; b<userGoodsKinds[q].UseTime.length; b ++)  {
         
                
            
                
                 var dayss = Math.floor(userGoodsKinds[q].UseTime[b]/1440)
                
                   var tme =  (userGoodsKinds[q].UseTime[b]%1440) //나머지 분
                 // var day = Math.floor( userGoodsKinds[0].UseTime[listInfo]/1400) // 1일
                   var hour =  Math.floor(tme/60) // 시간
                 // var min = tme%60  // 분
                 // consle.log(userGoodsKinds[index].timeSend)
              
               
                       if(userId[0].timeSend >= userGoodsKinds[q].UseTime[b] && userGoodsKinds[q].koko[b] === "N") {
                        
                      console.log(userGoodsKinds[q].id, "카카오 문자 보냄")
                        const time =userGoodsKinds[q].UseTime[b]/60
                           messageService.send({
                             "to": userGoodsKinds[q].phon,
                             "from": "01029718573",
                                      "kakaoOptions": {
                                        "pfId": "KA01PF240201053925212fFkWt1ESnqq",
                                        "templateId": "KA01TP2402010546287663onuf9g48Ts",
                                        // 치환문구가 없을 때의 기본 형태
                                        "variables": {
                                          "#{NAME}" :`${userGoodsKinds[q].name}님의`,
                                          "#{time}" : `${userGoodsKinds[q].UseTime[b]}분`
                                    
                                        }
                                    
                                        // 치환문구가 있는 경우 추가, 반드시 key, value 모두 string으로 기입해야 합니다.
                                        /*
                                        variables: {
                                          "#{변수명}": "임의의 값"
                                        }
                                        */
                                    
                                        // disbaleSms 값을 true로 줄 경우 문자로의 대체발송이 비활성화 됩니다.
                                        // disableSms: true,
                                      }
                                    });
                       
                              
                                    var now = new Date().toISOString();
                                    // 16진수 64자의 랜덤 값 생성
                                    var genRanHex = size =>
                                      [...Array(size)]
                                        .map(() => Math.floor(Math.random() * 16).toString(16))
                                        .join("");
                                    var salt = genRanHex(64);
                                    var message = now + salt;
                                    var apiKey = "NCS2VWYIUO94SIGY";
                                    var apiSecret = "JTGRZN7SISY7EGJZOQBZEXATCFEI1AEP";
                                    var signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");
                                    
                                    // 생성한 시그니처를 사용하여 API 호출
                                    var uri = `https://api.solapi.com/messages/v4/list?limit=1`;
                                    axios
                                      .get(uri, {
                                        headers: {
                                          Authorization: `HMAC-SHA256 apiKey=${apiKey}, date=${now}, salt=${salt}, signature=${signature}`
                                        }
                                      })
                                      .then(res => {
                                        //  console.log(res.data, "ok");
                                      })
                                      .catch(error => {
                                        console.log(error.response.data);
                                      });
                                 
                                      userGoodsKinds[q].koko[b] = "Y"
                                 
                                      fs.writeFile("./src/database/userGoodskinds.json", JSON.stringify(userGoodsKinds), (err) => {
                  
                                      })  
                                   }
                                 
                                  
                                   
            
           
           }
             
         
      }
       
    }
      }

  
}

            
                   
                
                  
             

       
     
     

}).catch((err) => console.error(err));






} 
  
module.exports = router 