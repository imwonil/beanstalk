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








  next()
function  next(){


    console.log("1")



    const DBLoginStart = "SELECT json_extract(loginStart, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";
    const DBAllPhonData = "SELECT phon FROM kakaoAlarm";  //kakaoAlarm 테이블 에서 전체 길를 알l아냄   
      new Promise((resolve, reject) => {
        db.query(DBAllPhonData, (err, loginSubtract) => { 
            if (err) {
                return reject(err); // Rejects the promise on error
            }


            loginSubtract.forEach((item, index) => {
         new Promise((resolve, reject) => {
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


                      const DBUseTimeData = `SELECT json_extract(UseTime, '$.UseTime[${[y]}]') AS value FROM kakaoAlarm WHERE phon = ?`; 

                      const nowTime =  moment().format('yyyy-MM-DD hh:mm')
                      const dateB = moment(`${nowTime}`);
                      const login =   dbloginstart.loginStart[y]

                       const nexetTime= dateB.diff(login, 'minute')
                      //  console.log(dbloginstart.loginStart[index],[index],"ddi")
                        console.log(((loginSubtract[index].phon)),"kk")
                        // const dbrt=  JSON.parse( UseDatas[0].value)
                        console.log(y)
                        db.query(DBUseTimeData, [`${loginSubtract[index].phon}`], (err, UseDatas,indexof) => { 

              kk

                           const dbrt=  JSON.parse( UseDatas[0].value)
                             console.log(dbrt)

                           const lklk =   dbrt - nexetTime
                           console.log(lklk,"lklk")
                        resolve (lklk)

                      });



                    }

                   }                


              }

        });



              });

          });



           })
           resolve()
        });

    });













}
//  com()
function  com(){


    const DBUseTimeAllData = "SELECT json_extract(UseTime, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";    

    const DBLoginStart = "SELECT json_extract(loginStart, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";
    const DBAllPhonData = "SELECT phon FROM kakaoAlarm";  //kakaoAlarm 테이블 에서 전체 길를 알l아냄   
      new Promise((resolve, reject) => {
        db.query(DBAllPhonData, (err, loginSubtract) => { 

            loginSubtract.forEach((item, index) => {



          db.query(DBLoginStart, [`${item.phon}`], (err, datas) => { 
            if (err) return reject(err);

             const dbloginstart=  JSON.parse( datas[0].value)
               console.log(dbloginstart)

              if(dbloginstart.loginStart !== undefined  ) {

                   for(var y =0; dbloginstart.loginStart.length>y; ++y)  {

                    if(dbloginstart.loginStart[y] !== '') {

                      //  console.log([`${item.phon}`],"iii")
                      const DBUseTimeData = `SELECT json_extract(UseTime, '$.UseTime[${[y]}]') AS value FROM kakaoAlarm WHERE phon = ?`; 

                      const nowTime =  moment().format('yyyy-MM-DD hh:mm')
                      const dateB = moment(`${nowTime}`);
                      const login =   dbloginstart.loginStart[y]

                       const nexetTime= dateB.diff(login, 'minute')
                       console.log(dbloginstart.loginStart[index],[index],"ddi")
                        console.log(((loginSubtract[index].phon)),"imwonilil")
                         const dbrt=  JSON.parse( UseDatas[0].value)






                           const lklk = nexetTime - dbrt 
                        resolve (lklk)





                    }

                   }                


              }

        });








           })
           resolve()
        });

    });











  }


class kkk {

    constructor(body) {
    this.body = body


    }

    static ArrDB() {
      return fs.
      readFile("./src/database/dbUsetime.json")
      .then((data) => {

      return JSON.parse(data)
      }).catch((err) => console.error(err))

    }






  static async DBallPhonData() { 

  const DBUseTimeAllData = "SELECT json_extract(UseTime, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";    

  const DBLoginStart = "SELECT json_extract(loginStart, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";
  const DBAllPhonData = "SELECT phon FROM kakaoAlarm";  //kakaoAlarm 테이블 에서 전체 길를 알l아냄   
   return new Promise((resolve, reject) => {
      db.query(DBAllPhonData, (err, loginSubtract) => { 
          if (err) {
              return reject(err); // Rejects the promise on error
          }



         resolve(loginSubtract)
      });

  });



}

static async  next_3() {
  const a = await this.DBallPhonData()

 const DBLoginStart = "SELECT json_extract(loginStart, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";
 return new Promise((resolve, reject) => {
 a.forEach((item, index) => {

db.query(DBLoginStart, [`${item.phon}`], (err, datas) => {  //
const dbloginstart=  JSON.parse( datas[0].value)

if(dbloginstart.loginStart !== undefined  ) {

   for(var y =0; dbloginstart.loginStart.length>y; ++y)  {

    if(dbloginstart.loginStart[y] !== '') {

      console.log(dbloginstart.loginStart[y],"jj")
      // const DBUseTimeData = `SELECT json_extract(UseTime, '$.UseTime[${[y]}]') AS value FROM kakaoAlarm WHERE phon = ?`; 

      const nowTime =  moment().format('yyyy-MM-DD hh:mm')
      const dateB = moment(`${nowTime}`);
      const login =   dbloginstart.loginStart[y]


       const nexetTime= dateB.diff(login, 'minute')
       const lklk = nexetTime - dbrt 

     console.log(y,"kkk")


    }


   }                

}

});









})

 })
  }


static async DBDATALENGTH () {
  const a = await this.DBallPhonData()
  var dd =[]

 const DBLoginStart = "SELECT json_extract(loginStart, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";
  new Promise((resolve, reject) => {
 a.forEach((item, index) => {
db.query(DBLoginStart, [`${item.phon}`], (err, datas) => {  //
const dbloginstart=  JSON.parse( datas[0].value)

if(dbloginstart.loginStart !== undefined  ) {

   for(var y =0; dbloginstart.loginStart.length>y; ++y)  {

    if(dbloginstart.loginStart[y] !== '') {


       const DBUseTimeData = `SELECT json_extract(UseTime, '$.UseTime[${[y]}]') AS value FROM kakaoAlarm WHERE phon = ?`; 

      const nowTime =  moment().format('yyyy-MM-DD hh:mm')
      const dateB = moment(`${nowTime}`);
      const login =   dbloginstart.loginStart[y]

       const nexetTime= dateB.diff(login, 'minute') 
      //  const lklk = nexetTime - dbrt 
      //  const goodsExpire = `UPDATE kakaoAlarm SET UseTime = JSON_SET(UseTime, '$.UseTime[${index}]', ${lklk}) WHERE phon = ?`;


                                            // 쿼리 실행

                                            db.query(DBUseTimeData, [[`${item.phon}`]], (err, data) => {

                                               if (err) {
                                                // 쿼리 실행 중 오류 발생 시 reject 호출
                                                return reject(err);
                                              }
                                              // 쿼리 성공 시 resolve 호출
                                              const kkkk = JSON.parse(data[0].value)




                                              //  fs.writeFile('./src/database/dbUsetime.json', JSON.stringify({ dd }), (err) => {
                                              //   if (err) {
                                              //     console.error('파일 쓰기 중 에러 발생:', err);
                                              //   } else {
                                              //     console.log('파일 쓰기 성공!');
                                              //   }
                                              // });
                                            });



    }


   }                

}

});







 return

})
return
 })
 return
}

static async DBUSETIMESUBTRACT() {
  const a = await this.DBallPhonData()
  // this.DBDATALENGTH()


}
 static async next_4() {






      const DBUseTimeAllData = "SELECT json_extract(UseTime, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";    

      const DBLoginStart = "SELECT json_extract(loginStart, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";
      const DBAllPhonData = "SELECT phon FROM kakaoAlarm";  //kakaoAlarm 테이블 에서 전체 길를 알l아냄   


          db.query(DBAllPhonData, (err, loginSubtract) => { 

                console.log(loginSubtract," 모든 전화 번호 전화번호")
              loginSubtract.forEach((item, index) => {




            db.query(DBLoginStart, [`${item.phon}`], (err, datas) => {  //

               const dbloginstart=  JSON.parse( datas[0].value)


                if(dbloginstart.loginStart !== undefined  ) {

                     for(var y =0; dbloginstart.loginStart.length>y; ++y)  {

                        if(dbloginstart.loginStart[y] !== '') {




                        const DBUseTimeData = `SELECT json_extract(UseTime, '$.UseTime[${[y]}]') AS value FROM kakaoAlarm WHERE phon = ?`; 

                        const nowTime =  moment().format('yyyy-MM-DD hh:mm')
                        const dateB = moment(`${nowTime}`);
                        const login =   dbloginstart.loginStart[y]

                         const nexetTime= dateB.diff(login, 'minute')

                         return new Promise((resolve, reject) => {
                         db.query(DBUseTimeData, [`${loginSubtract[index].phon}`], (err, UseDatas) => { 

                          if (err) {
                            return reject(err); // Rejects the promise on error
                        }

                             const dbrt=  JSON.parse( UseDatas[0].value)
                              console.log(dbrt)



                             resolve()   

                        });


                      })



                      }

                     }                


                }

          });









             })

          });



 } 
static async  next11() { // loginStart 중 login 한 전화번호 추출
  const a = await this.DBallPhonData()  //db 모든 전화번호 검색
  const DBLoginStart = "SELECT json_extract(loginStart, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";

  return new Promise((resolve, reject) => { 
    a.forEach((item, index) => {

    db.query(DBLoginStart, [`${item.phon}`], (err, datas) => { 
    if (err) return reject(err);

     const dbloginstart=  JSON.parse( datas[0].value)

             console.log(dbloginstart)
      if(dbloginstart.loginStart !== undefined ) {
                for(var uu =0; dbloginstart.loginStart.length>uu; uu++) {
                   if(dbloginstart.loginStart[uu] !== "") {

                    //  console.log(item.phon,"phon 784")
                   }

                }
      }     
      resolve(dbloginstart)
    })

});








   })





}

static DBallstartDate() { //모든 회원중에 loginstart data 출
  const DBAllLoginStart= "SELECT loginStart FROM kakaoAlarm";
  return new Promise((resolve, reject) => {
    db.query (DBAllLoginStart, (err, loginSubtract) => { 
        if (err) {
            return reject(err); // Rejects the promise on error
        }



       resolve(loginSubtract)
    });

});

}

static async next13() { //db 모든 loginStart 조회


  const DBAllPhonData = "SELECT loginStart FROM kakaoAlarm"; 

    return new Promise((resolve, reject) => {
      db.query(DBAllPhonData, (err, loginSubtract) => { 
          if (err) {
              return reject(err); // Rejects the promise on error
          }
          //  console.log(loginSubtract,"next13")

         resolve(loginSubtract)
      });

  });
}
static async next19() {
  const DBUseTimeData = `SELECT json_extract(UseTime, '$.UseTime[${[y]}]') AS value FROM kakaoAlarm WHERE phon = ?`; 
  const DBallPhonData = await this.DBallPhonData() 
return new Promise((resolve, reject) => {
  db.query(DBUseTimeData, [`${loginSubtract[index].phon}`], (err, UseDatas) => { 

   if (err) {
     return reject(err); // Rejects the promise on error
 }

      const dbrt=  JSON.parse( UseDatas[0].value)
       console.log(dbrt)



      resolve()   

 });


})
}
static async next14() {

  const DBallPhonData = await this.DBallPhonData() 
  const DBallstartDate = await this.DBallstartDate()



    DBallstartDate.forEach((item2, index2) => {
                    const loginStartArr =     JSON.parse(item2.loginStart)
                      // console.log(loginStartArr.loginStart)
                    if(loginStartArr.loginStart !== undefined) {

                    //  console.log( loginStartArr.loginStart.length,"kjj")

                     loginStartArr.loginStart.forEach((item3,index3) => {

                              if(item3 !=="") {
                                   console.log(item3,index3)

                                   const nowTime =  moment().format('yyyy-MM-DD hh:mm')
                                   const dateB = moment(`${nowTime}`);
                                   const login =  item3

                                    const nexetTime= dateB.diff(dateB, 'minute')

                                    console.log(nexetTime)
                                 return item3                              
                              }
                     })
                    }


    })




//  a.forEach((item, index) => {
  //         console.log(item.loginStart)



  // })


}

static DBallstartDate() { //모든 회원중에 loginstart data 출
  const DBAllLoginStart= "SELECT loginStart FROM kakaoAlarm";
  return new Promise((resolve, reject) => {
    db.query (DBAllLoginStart, (err, loginSubtract) => { 
        if (err) {
            return reject(err); // Rejects the promise on error
        }



       resolve(loginSubtract)
    });

});

}

static async next13() { //db 모든 loginStart 조회


  const DBAllPhonData = "SELECT loginStart FROM kakaoAlarm"; 

    return new Promise((resolve, reject) => {
      db.query(DBAllPhonData, (err, loginSubtract) => { 
          if (err) {
              return reject(err); // Rejects the promise on error
          }
          //  console.log(loginSubtract,"next13")

         resolve(loginSubtract)
      });

  });
}


static async next18() {

  const DBallPhonData = await this.next14() 
  const DBallstartDate = await this.DBallstartDate()



   console.log(DBallPhonData,"djf")





//  a.forEach((item, index) => {
  //         console.log(item.loginStart)



  // })


}


 static async next_5() {

  const a = await this.DBallPhonData() //DB all DATA phon 서치
   const b = await this.next_4()
  console.log(a)
  console.log(b,'djfj')
  a.forEach((item, inde) =>{

  console.log(item.phon,"kk") //전화번호

  const DBUseTimeData = `SELECT json_extract(UseTime, '$.UseTime[${1}]') AS value FROM kakaoAlarm WHERE phon = ?`; 

  db.query(DBUseTimeData, [item.phon], (err, UseDatas) => { 

            console.log(UseDatas,"jj")

})

   })





           a.forEach((item, index) => {
        new Promise((resolve, reject) => {
             db.query(a, (err, loginSubtract) => { 
                 if (err) {
                     return reject(err); // Rejects the promise on error
                 }

         db.query(DBLoginStart, [`${item.phon}`], (err, datas) => { 
           if (err) return reject(err);

            const dbloginstart=  JSON.parse( datas[0].value)


             if(dbloginstart.loginStart !== undefined  ) {

                  for(var y =0; dbloginstart.loginStart.length>y; ++y)  {

                   if(dbloginstart.loginStart[y] !== '') {
                       console.log(y)

                     const DBUseTimeData = `SELECT json_extract(UseTime, '$.UseTime[${[y]}]') AS value FROM kakaoAlarm WHERE phon = ?`; 

                     const nowTime =  moment().format('yyyy-MM-DD hh:mm')
                     const dateB = moment(`${nowTime}`);
                     const login =   dbloginstart.loginStart[y]

                      const nexetTime= dateB.diff(login, 'minute')
                     //  console.log(dbloginstart.loginStart[index],[index],"ddi")
                       console.log(((loginSubtract[index].phon)),"imwonilil")
                       // const dbrt=  JSON.parse( UseDatas[0].value)

                     //   db.query(DBUseTimeData, [`${loginSubtract[index].phon}`], (err, UseDatas,indexof) => { 



                     //      const dbrt=  JSON.parse( UseDatas[0].value)
                     //      const lklk = nexetTime - dbrt 
                     //   resolve (lklk)

                     // });



                   }

                  }                


             }

       });



             });

         });



          })










  const DBUseTimeAllData = "SELECT json_extract(UseTime, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";    

  const DBLoginStart = "SELECT json_extract(loginStart, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";
  const DBAllPhonData = "SELECT phon FROM kakaoAlarm";  //kakaoAlarm 테이블 에서 전체 길를 알l아냄   










} 

}

  // com()
    //  kkk.next_3();  // Call the async method
module.exports = router  