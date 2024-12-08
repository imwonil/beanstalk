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









class kkk {

    constructor(body) {
    this.body = body


    }

    static #DBUseTimeChange = {
       phon:[], indexOf:[], useTimeSubtract:[]
               }

    static  DBUseTimeChange() {
      return fs.
      readFile("./src/database/dbUsetime.json")
      .then((data) => {

      return JSON.parse(data)
      }).catch((err) => console.error(err))

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

       const DBUseTimeAllData = "SELECT json_extract(UseTime, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";    
 const   DBUseTimeChange = await this.DBUseTimeChange()

      const DBLoginStart = "SELECT json_extract(loginStart, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";
      const DBAllPhonData = "SELECT phon FROM kakaoAlarm";  //kakaoAlarm 테이블 에서 전체 길를 알l아냄   
        new Promise((resolve, reject) => {
          db.query(DBAllPhonData, (err, loginSubtract) => { 
              if (err) {
                  return reject(err); // Rejects the promise on error
              }


              loginSubtract.forEach((item, indexs) => {



                // console.log(item.phon,"uuuu")


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


               if(DBUseTimeChange[0] === undefined) {  

              var kend = DBUseTimeChange.filter(function (addSave) { return addSave.phon === item.phon });

                 if(kend[0] === undefined ) {   //최초 DB 에 값이 존재하지 않으면 실행


                DBUseTimeChange.push({"phon": item.phon , "indexOF":[], "UseTimeSubtract":[]})



                             fs.writeFile('./src/database/dbUsetime.json', JSON.stringify(DBUseTimeChange), (err) => {
                              if (err) {
                                console.error('파일 쓰기 중 에러 발생:', err);
                              } else {
                                console.log('파일 쓰기 성공!');
                              }
                            });

               } 

                      } 
                       if(DBUseTimeChange[0] !== undefined) {

                        var kend = DBUseTimeChange.filter(function (addSave) { return addSave.phon === item.phon });

                        if(kend[0] === undefined ) { 


                       DBUseTimeChange.push({"phon": item.phon , "indexOF":[], "UseTimeSubtract":[]})



                                    fs.writeFile('./src/database/dbUsetime.json', JSON.stringify(DBUseTimeChange), (err) => {
                                     if (err) {
                                       console.error('파일 쓰기 중 에러 발생:', err);
                                     } else {
                                       console.log('파일 쓰기 성공!');
                                     }
                                   });

                      } 
                      }


                        const DBUseTimeData = `SELECT json_extract(UseTime, '$.UseTime[${[y]}]') AS value FROM kakaoAlarm WHERE phon = ?`; 

                        const nowTime =  moment().format('yyyy-MM-DD hh:mm')
                        const dateB = moment(`${nowTime}`);
                        const login =   dbloginstart.loginStart[y]

                         const nexetTime= dateB.diff(login, 'minute')


                          db.query(DBUseTimeData, [`${loginSubtract[indexs].phon}`], (err, UseDatas,next) => { 
                                        //  console.log(`${loginSubtract[indexs].phon}`,item.phon)
                                //  console.log( DBUseTimeChange[0])

                                const dbrt=  JSON.parse( UseDatas[0].value)
                                const lklk =   dbrt - nexetTime

                                  var kend = DBUseTimeChange.filter(function (addSave) { return addSave.phon === item.phon });

                                  kend[0].UseTimeSubtract.push(lklk)

                                  const goodsExpire = `UPDATE kiki SET UseTime = JSON_SET(UseTime, '$.UseTime[${[y]}]', ${lklk}) WHERE phon = ?`;


                                  // 쿼리 실행
  //  db.query(goodsExpire, [`${userGoodsKinds[index].phon}`], (err, data) => {
  //    if (err) {return reject(err);}
  //         // 쿼리 성공 시 resolve 호출
  //      resolve(data);  });



                          //  fs.writeFile('./src/database/dbUsetime.json', JSON.stringify(DBUseTimeChange), (err) => {
                          //     if (err) {
                          //       console.error('파일 쓰기 중 에러 발생:', err);
                          //     } else {
                          //       console.log('파일 쓰기 성공!');
                          //     }
                          //   });
                      // console.log(DBUseTimeChange,"3721")

                          //   fs.writeFile('./src/database/dbUsetime.json', JSON.stringify(DBUseTimeChange), (err) => {
                          //     fs.readFile('./src/database/dbUsetime.json', "[]", 'utf8', (err, data) => {


                          //     });
                          //  }) 

                          resolve ()

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

static async next20() { //db 모든 loginStart 조회


      const DB = await this.next18() 




}

}

  // com()
   kkk.next20();  // Call the async method
module.exports = router  