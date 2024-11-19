const  express = require("express");
const  router = express.Router();
const { SolapiMessageService } = require("solapi");
const messageService = new SolapiMessageService("NCS2VWYIUO94SIGY", "JTGRZN7SISY7EGJZOQBZEXATCFEI1AEP");
const fs =  require('fs').promises
const path = require('path')
const db = require("../../config/db")
var crypto = require("crypto");
var axios = require("axios");
const moment = require("moment")

var crypto = require("crypto");
var axios = require("axios");

//  setInterval(times, 20001);


// function times() {
//   const kkk = "SELECT json_extract(UseTime, '$.UseTime[0]') AS value FROM kakaoAlarm WHERE phon = ?";
//   function  next(){
//     return new Promise((resolve, reject) => {
//       console.log("1")
//     if(resolve) {
        
//        userGoodsKinds.forEach((itme, index) => {
//                   itme.UseTime.forEach((useTime, inde) => {
                   
//                     if(useTime !=="" && itme.loginStart[inde] !== ""){
                      
//                            const nowTime =  moment().format('yyyy-MM-DD hh:mm')
//                             const dateB = moment(`${nowTime}`);
//                             const login =   userGoodsKinds[index].loginStart[inde]
                             
//                              const nexetTime= dateB.diff(login, 'minute')
                  
                                      
//                             const kk = userGoodsKinds[index].UseTime[inde] - nexetTime
                         
                           
//                             userGoodsKinds[index].UseTime[inde] = kk
//                             userGoodsKinds[index].loginStart[inde] = nowTime
//                             userGoodsKinds[index].loginStart[inde] = nowTime
//                             console.log(userGoodsKinds[index].id)
//                             const goodsExpire = `UPDATE kakaoAlarm SET UseTime = JSON_SET(UseTime, '$.UseTime[${inde}]', ${kk}) WHERE phon = ?`;
                            
                                   
//                                      // 쿼리 실행
//                                      db.query(goodsExpire, [`${userGoodsKinds[index].phon}`], (err, data) => {
//                                        if (err) {
//                                          // 쿼리 실행 중 오류 발생 시 reject 호출
//                                          return reject(err);
//                                        }
//                                        // 쿼리 성공 시 resolve 호출
//                                        resolve(data);
//                                      });
  
//                     }
              
  
//                   })
  
  
//        })
    
    
     
//         resolve();
  
//     }else { reject("err")  } 
  
    
//   })
  
  
  
  
//   }
//   //loginStart - 컬럼명 kakaoAlarm 테이블명   '$.loginStart[0]' 배열에 순서 
//   db.query(kkk, ["01071038573"], (err, data) => {
//     // ["010710385735"] 특정한 값을 지정 id 와 같음 phon
//       if (err) return reject(err);
      
//       const loginStartArr =   JSON.parse(data[0].value)

//       // console.log(loginStartArr,"28")
 
//   });

//   fs.readFile("./src/database/userGoodsKinds.json")
//   .then((data) => {

//   const userGoodsdata = JSON.parse(data)
//    userGoodsdata.forEach((item, index) => {

//         if(item.UseTime.length > 0) {
//           console.log(item.name ,item.goodsName)

//         }else if(item.UseTime.length <= 0) {

//            console.log(item.name,"ppp")

//         }
   

//    })
// })




// }  
// setInterval(inspect, 60000);
inspect()
function inspect() { 
 
  fs.readFile("./src/database/userGoodsKinds.json")
  .then((data) => {
   
  const userGoodsKinds = JSON.parse(data)
  
  const nowTime =  moment().format('yyyy-MM-DD hh:mm')
  
  function  next(){
    return new Promise((resolve, reject) => {
      console.log("1")
    if(resolve) {
      const DBUseTimeData = "SELECT json_extract(UseTime, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";     
      const DBLoginStart = "SELECT json_extract(loginStart, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";
      const DBAllPhonData = "SELECT phon FROM kakaoAlarm";  //kakaoAlarm 테이블 에서 전체 길를 알l아냄   
        new Promise((resolve, reject) => {
          db.query(DBAllPhonData, (err, loginSubtract) => { 
              if (err) {
                  return reject(err); // Rejects the promise on error
              }
              

              loginSubtract.forEach((item, index) => {
              return new Promise((resolve, reject) => {
                db.query(DBAllPhonData, (err, loginSubtract) => { 
                    if (err) {
                        return reject(err); // Rejects the promise on error
                    }
                
            db.query(DBLoginStart, [`${item.phon}`], (err, datas) => { 
              if (err) return reject(err);
              
               const dbloginstart=  JSON.parse( datas[0].value)
               
              
                if(dbloginstart.loginStart !== undefined  ) {
                 
                     for(var y =0; dbloginstart.loginStart.length>y; ++y)  {
                                
                      if(dbloginstart.loginStart[y] !== '') {
                       

                        const nowTime =  moment().format('yyyy-MM-DD hh:mm')
                        const dateB = moment(`${nowTime}`);
                        const login =   dbloginstart.loginStart[y]
                        
                         const nexetTime= dateB.diff(login, 'minute')
                         console.log(nexetTime,"ii")
                          console.log(((loginSubtract[index].phon)),"kk")
                          // const kk = userGoodsKinds[index].UseTime[inde] - nexetTime
                      }

                     }                
                 
                  
                } if(dbloginstart.UseTime === undefined) { //삭제되는 구간 db에서 useTime 하나도 없으면 userGoodsKind 에서 goods가 N 이면
      
             
      
      
                  const DeleteDB = `DELETE FROM kakaoAlarm WHERE phon = ?`;
                  // db.query(DeleteDB, [item.phon], (err, data) => {
                  //     if (err) {
                  //         // If there's an error during query execution, reject the promise
                  //         return reject(err);
                  //     }
                  //     // If the query is successful, resolve the promise
                  //     resolve(data);
                  // });
                }
              resolve(data);
          });
      
                 
                    resolve(data); // Resolves with the data
                });
            });

           

             })
              resolve(data); // Resolves with the data
          });
      });
                
                   
                    // if(useTime !=="" && itme.loginStart[inde] !== ""){
                      
                    //        const nowTime =  moment().format('yyyy-MM-DD hh:mm')
                    //         const dateB = moment(`${nowTime}`);
                    //         const login =   userGoodsKinds[index].loginStart[inde]
                             
                    //          const nexetTime= dateB.diff(login, 'minute')
                  
                                      
                    //         const kk = userGoodsKinds[index].UseTime[inde] - nexetTime
                         
                           
                           
                    //         const goodsExpire = `UPDATE kakaoAlarm SET UseTime = JSON_SET(UseTime, '$.UseTime[${inde}]' ,  ${kk}) WHERE phon = ?`;
                           
                                   
                    //                  // 쿼리 실행
                    //                  db.query(goodsExpire, [`${userGoodsKinds[index].phon}`], (err, data) => {
                    //                    if (err) {
                    //                      // 쿼리 실행 중 오류 발생 시 reject 호출
                    //                      return reject(err);
                    //                    }
                    //                    // 쿼리 성공 시 resolve 호출
                    //                    resolve(data);
                    //                  });
  
                    // }
               
  
               
  
  

    
    
     
        resolve();
  
    }else { reject("err")  } 
  
    
  })
  
  
  
  
  }

  function  next_2(){
    return new Promise((resolve, reject) => {
      
    if(resolve) {
      

      const kkk = "SELECT json_extract(loginStart, '$.loginStart[0]') AS value FROM kakaoAlarm WHERE phon = ?";
      const DBUseTimeData = "SELECT json_extract(UseTime, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";     

      

      const DBAllPhonData = "SELECT phon FROM kakaoAlarm";       
      return new Promise((resolve, reject) => {
          db.query(DBAllPhonData, (err, data) => { 
              if (err) {
                  return reject(err); // Rejects the promise on error
              }
              console.log(data.length,"전채 길이");

             data.forEach((item, index) => {
              console.log(item.phon)
           
      db.query(DBUseTimeData, [`${item.phon}`], (err, datas) => { 
        if (err) return reject(err);
        
         const dbloginstart=  JSON.parse( datas[0].value)
          
        
          if(dbloginstart.UseTime !== undefined) {
              console.log(dbloginstart,"phon")
     
 
            console.log(item.phon,"itme")
            
          } if(dbloginstart.UseTime === undefined) { //삭제되는 구간 db에서 useTime 하나도 없으면

            console.log(item.phon,"delet")


            const DeleteDB = `DELETE FROM kakaoAlarm WHERE phon = ?`;
            db.query(DeleteDB, [item.phon], (err, data) => {
                if (err) {
                    // If there's an error during query execution, reject the promise
                    return reject(err);
                }
                // If the query is successful, resolve the promise
                resolve(data);
            });
          }
        resolve(data);
    });

             })
              resolve(data); // Resolves with the data
          });
      });
  
    }else { reject("err")  } 
  
    
  })
   
  
  
  
  }
 
  
  function  next_4() {
    return new Promise((resolve, reject) => {
    
      
        if(userGoodsKinds[0].loginStart !== "") { 
          console.log("4 진입")
      if(resolve) {
         
        for(var q = 0; q<userGoodsKinds.length; q ++) {
          
          for(var b = 0; b<userGoodsKinds[q].UseTime.length; b ++)  {
       
           
                 
                if(userGoodsKinds[q].expiryName[b] < nowTime   ) {
                     //  유효기간 경과시 db 삭제 SQL 쿼리 문자열 정의 
                     const goodsExpire = `UPDATE kakaoAlarm SET goodsName = JSON_REMOVE(goodsName, '$.goodsName[${b}]') WHERE phon = ?`;
                     const expirationDate = `UPDATE kakaoAlarm SET expiryN = JSON_REMOVE(expiryN, '$.expiryN[${b}]') WHERE phon = ?`;
                     const USETIME = `UPDATE kakaoAlarm SET UseTime = JSON_REMOVE(UseTime, '$.UseTime[${b}]') WHERE phon = ?`;     
                            
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
                   
               
            //  사용시간 지나면 삭제 SQL 쿼리 문자열 정의 
   const goodsExpire = `UPDATE kakaoAlarm SET goodsName = JSON_REMOVE(goodsName, '$.goodsName[${b}]') WHERE phon = ?`;
   const expirationDate = `UPDATE kakaoAlarm SET expiryN = JSON_REMOVE(expiryN, '$.expiryN[${b}]') WHERE phon = ?`;
   const USETIME = `UPDATE kakaoAlarm SET UseTime = JSON_REMOVE(UseTime, '$.UseTime[${b}]') WHERE phon = ?`;    
          
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
  
  
  
  
  if(userGoodsKinds[0] !== undefined) {
  // next().then(( )  => {return  next_2()})  
          //  .then(() =>{ return next_2()})
          
          next()
          
      //  nex_2() UseTime 만기되면 제가 되는 함수
      //  nex_3() clint 가 설정한 시간내에 카카오톡 실행 하는 함수
      //  nex_4() Usetime 만기되면 db 데이터 제거 되는 함수
      
  }
  
  })
   
  
  }
   
module.exports = router 