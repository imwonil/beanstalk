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


           c
       resolve(loginSubtract)
    });

});

}



static async next20() { //db 모든 loginStart 조회
  return new Promise( async (resolve, reject) => {


      const DBUseTimeChange =  await this.DBUseTimeChange()
      // console.log(DBUseTimeChange,"next20")
       DBUseTimeChange.forEach((item, index) => {
           item.indexOF.forEach((item2, index2) => {

            //  console.log(item.phon) 
            //  console.log(item.indexOF[index2]) 
            // console.log(item.UseTimeSubtract[index2])
             const goodsExpire = `UPDATE kakaoAlarm SET UseTime = JSON_SET(UseTime, '$.UseTime[${item.indexOF[index2]}]', ${item.UseTimeSubtract[index2]}) WHERE phon = ?`;

                console.log(goodsExpire,"expe")
            // console.log(item.indexOF[index])
            // console.log(index,"index 숫자")
            // console.log(item.UseTimeSubtract[index])
            // console.log(item.phon)
            // console.log(goodsExpire )
                         db.query(goodsExpire, [item.phon], (err, data) => {
                               if (err) {
                                 // 쿼리 실행 중 오류 발생 시 reject 호출
                                 return reject(err);
                               }
                               // 쿼리 성공 시 resolve 호출

                             });
       })

           })
           resolve() 
          })

}

static async next18() {

       const DBUseTimeAllData = "SELECT json_extract(UseTime, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";    
 const   DBUseTimeChange = await this.DBUseTimeChange()

      const DBLoginStart = "SELECT json_extract(loginStart, '$[0]') AS value FROM kakaoAlarm WHERE phon = ?";
      const DBAllPhonData = "SELECT phon FROM kakaoAlarm";  //kakaoAlarm 테이블 에서 전체 길를 알l아냄   
     return new Promise((resolve, reject) => {
          db.query(DBAllPhonData, (err, loginSubtract) => { 


              loginSubtract.forEach((item, indexs) => {

            db.query(DBLoginStart, [`${item.phon}`], (err, datas) => { 


               const dbloginstart=  JSON.parse( datas[0].value)


                if(dbloginstart.loginStart !== undefined  ) { 

                     for(var opp =0; dbloginstart.loginStart.length>opp; ++opp)  {

                      if(dbloginstart.loginStart[opp] !== '') {
                        if(DBUseTimeChange[0] === undefined) {    

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

                                  }else if(DBUseTimeChange[0] !== undefined) {

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

                        const DBUseTimeData = `SELECT json_extract(UseTime, '$.UseTime[${[opp]}]') AS value FROM kakaoAlarm WHERE phon = ?`; 
                         const kie = opp
                        const nowTime =  moment().format('yyyy-MM-DD hh:mm')
                        const dateB = moment(`${nowTime}`);


                             db.query(DBUseTimeData, [`${loginSubtract[indexs].phon}`],  (err, UseDatas) => { 

                              const login =   dbloginstart.loginStart[kie]
                              // console.log(login, "-----", nowTime )
                               const nexetTime= dateB.diff(login, 'minute')  //사용자가 시작한 시간

                                const dbrt=  JSON.parse( UseDatas[0].value)
                                 console.log(dbrt)
                                const lklk =   Number(dbrt)  - 1
                          //  console.log(Number(dbrt) ,"db가지고 있는거",kie)

                           console.log( Number(nexetTime ),"login 차",kie)
                              console.log("----------------------")
                              //  console.log(lklk,"kie")

                           const usePhon =   loginSubtract[indexs].phon
                    // var iie =  DBUseTimeChange.filter(function (addSave) { return addSave.phon === item.phon });

                    //    iie[0].indexOF[kie] = kie
                    //    iie[0].UseTimeSubtract[kie] =  lklk 


                       resolve() 


                        });  



                      }

                     }                


                }

          });









             })

                      //      fs.writeFile('./src/database/dbUsetime.json', JSON.stringify(DBUseTimeChange), (err) => {
                      //   if (err) {
                      //     console.error('파일 쓰기 중 에러 발생:', err);
                      //   } else {
                      //     console.log('파일 쓰기 성공!');
                      //   }
                      // });

            //  console.log(DBUseTimeChange)   

          });


      });



}



}

setInterval(nexetTime, 20000);
function nexetTime() { 

  kkk.next18().then(( )  => {return  kkk.next20() })  }

module.exports = router   