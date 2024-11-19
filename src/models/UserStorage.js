const moment = require("moment")
const fs =  require('fs').promises
const  express = require("express");
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.mqtt-dashboard.com", { clientid: "emc22wonil/wonil/ilim" });

const { SolapiMessageService } = require("solapi");
const messageService = new SolapiMessageService("NCS9ZPGT6GJKQKYG", "C7P1EC1QEQ2ZRGTAYUOKNGHKWUDMBBUX");
const path = require('path')
const db = require("../config/db");
const { CONNREFUSED } = require("dns");
class UserStorage { 

  
  
static #uses = {
      id:[], psword:[] ,name:[], phon:[], gender:[] , certification:[]
               }
        
               static #creditCard = {
                id:[],phon:[],approvalDay:[],approvalNumber:[],fee:[],hangle:[], cancal:[],name:[],goodsName:[]

                         }
static #set ={
    wonset:[], day:[], expiry:[], logoutTime:[], loginStart:[],
    UseTime:[],  goods:[],  name:[],  phon:[],  id:[], cdId:[],
    expiry:[],
             
  } 
  static #arrObject =[]
 
static #y = { t:[]  } 
static #remove = {wonSet:[]}

static #adminSet = {  kindSet :[], wonset:[] , gender:[] }  
   


  static getUser(...fildes) {
  
 
    return fs.
    readFile("./src/database/users.json")
    .then((data) => {
      const users = JSON.parse(data)
      const newUsers = fildes.reduce((newUsers, filde ) =>{
        newUsers[filde] = users[filde]
        return newUsers;
         },{}) 
         
         return newUsers;
    }) 
    
    }

  static async first(){ 
    return fs.
    readFile("./src/database/first.json")
    .then((data) => {
    return JSON.parse(data)
    }).catch((err) => console.error(err))
  } 

  static getUserInfo(phon) {

    return fs.
    readFile("./src/database/users.json")
    
    .then((data) => {
  
      const users = JSON.parse(data)
      
      const idx = users.phon.indexOf(phon)
      const keys = Object.keys(users)
      const newUsers = keys.reduce((newUsers, filde ) =>{
      newUsers[filde] = users[filde][idx]
 
      return newUsers; 
      },{})
     
      return newUsers;
    }) .catch((err) => console.error(err))
    
    }
  
   
////////////////////////////DB 구축 했을때 쓰임 ///////////////////////////////////
// static getUserInfo(id) {
//   return new Promise((resolve, reject) => {
//     const query ="SELECT * FROM CUSTOMER WHERE id = ?"
//     db.query(query,[id], (err, data) =>{
      
//       if(err) reject(`${err}`)
//     return  resolve(data,"jdjfj")
//     })

//     return id
//   })


// }  

static async save(client) {
  const userGoodsKinds = await this.objectsave()

  const Users=  this.#uses
  const users = await this.getUser("id", "psword" , "name","phon","certification","gender")
  const First = await this.first()

  if(users.id === undefined)  { First.id.push(client.id);//회원 가입시 
    console.log("110")
    First.psword.push(client.psword);
  

   
    fs.writeFile("./src/database/first.json", JSON.stringify(First))
      
    Users.id.push(client.id);
    Users.name.push(First.name[0]);
    Users.phon.push(First.phon[0]);
    Users.gender.push(client.gender);
    Users.psword.push(client.psword);
    
    
     fs.writeFile("./src/database/users.json", JSON.stringify(Users))
     return {success: true} }
 
     if(users.id.indexOf(client.id) === -1 && client.Certification ===  "Certification" ){ //아이디 비번분실시 이용
      console.log("127")
 
  First.psword.push(client.psword);

  console.log(users, First , "savechang")
 
  fs.writeFile("./src/database/first.json", JSON.stringify(First))
    
  users.id.push(client.id);
  users.name.push(First.name[0]);
  users.phon.push(First.phon[0]);
  users.psword.push(First.psword[0]);
  users.gender.push(client.gender);
  
   fs.writeFile("./src/database/users.json", JSON.stringify(users))
   return {success: true}


  }else if(users.phon.includes(client.phon) === true && client.Certification === "CertificationChange"){
    var newUserGoodsKinds = userGoodsKinds.filter(function (addSave) { return addSave.phon === client.phon });
     const indexof =  users.name.indexOf(First.name[0])
     console.log(indexof)
  users.psword[indexof] =client.psword

 
fs.writeFile("./src/database/users.json", JSON.stringify(users))
newUserGoodsKinds[0].psword= client.psword

fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(userGoodsKinds))
return {success: true}



  }
    else  {
      console.log("160")
     return {success: false}
  
  } 
   
 
//    const users = await this.getUserInfo(client.id)
//    console.log(users,"uddeinf")
//   if(users !== undefined){ 
//     users.id.includes(client.id)
//     return {success:false}
// }else if(users === undefined) {
 
//   return new Promise((resolve, reject) => {
//     const nowTime =  moment().format('yyyy-MM-DD hh:mm')
//     const query ="INSERT INTO CUSTOMER(id, NAME, psword, phon, createDate, isDeleted) VALUES(?, ?, ?, ?, ?, ?);";
//     db.query(query,[client.id, client.name, client.psword, client.telephon, nowTime, 1], (err, data) =>{
//       if(err){reject(err)}
//       console.log("bb")
//       resolve({success: true});
      
//     }) 
//   })   
// }
 } 
static  async Certification(client) {
  console.log(client)
  
  const Users=  this.#uses
  const users = await this.getUser("phon","name","certification")
  console.log(users,"phon")

if(users.phon === undefined) {
  const Users=  this.#uses
  Users.phon.push(client.phone)
  Users.name.push(client.name)
  Users.certification.push(client.certification)
  
  fs.writeFile("./src/database/first.json", JSON.stringify(Users))
 console.log("1")
  messageService.send({
    "to": client.phone,
    "from": "01029718573",
    "kakaoOptions": {
      "pfId": "KA01PF240201072156304ikVz36WEuTC",
      "templateId": "KA01TP230131084504073zoRX27WkwHB",
      // 치환문구가 없을 때의 기본 형태
      "variables": {
       
        "#{인증번호}" : client.certification
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
 return {success:true}
}else if (users.phon !== undefined && !users.phon.includes(client.phone)) {
  console.log(client,"135")
  messageService.send({
    "to": client.phone,
    "from": "01029718573",
    "kakaoOptions": {
      "pfId": "KA01PF240201072156304ikVz36WEuTC",
      "templateId": "KA01TP230131084504073zoRX27WkwHB",
      // 치환문구가 없을 때의 기본 형태
      "variables": {
      
        "#{인증번호}" : client.certification
  
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
  

  Users.phon.push(client.phone)
  Users.name.push(client.name)
  Users.certification.push(client.certification)
  

  fs.writeFile("./src/database/first.json", JSON.stringify(Users))
  return {success: true}
}
else if (users.phon.includes(client.phone)) {return {success : false}}                        

} 
static objectsave(...fildes) { //userGoodsKinds data file
  return fs.
  readFile("./src/database/userGoodsKinds.json",  'utf8', (err, data) => {
  })
  
 .then((data) => {
  return JSON.parse(data, ...fildes)
 }).catch((err) => console.error(err))
} 


////////////////////// 위 부분은 User 저장및 로그인 과정 ////////////
static async call(){ // 폴더 database/user.json 정보를 읽어 오겠다
   return fs.
   readFile("./src/database/user.json")
   .then((data) => {
   return  JSON.parse(data)
   }).catch((err) => console.error(err))
 } 
 // --------------- 파일 불러오는 모듈 ----------- //
// ------ src/Use 에있는 폴더들 ---------//

// ------ src/day data 들 즉 시간이 지난 data들를 삭제하기 위한 전초 작업 --------//

//////// admin data ////////////////
static  nice() {
  return fs.
  readFile("./src/database/nice.json")
  .then((data) => {
    
  return JSON.parse(data)
  }).catch((err) => console.error(err))

}
// fs.writeFile("./src/database/nice.json", JSON.stringify(users), (err) => {
//   fs.readFile("./src/database/nice.json", "{}", 'utf8', (err, data) => {
    
//   });
// })
static async admincall (){ 
  return fs.
  readFile("./src/adminUser/adminUserInfo.json")
  .then((data) => {
  return JSON.parse(data)
  }).catch((err) => console.error(err))
} 
//////// admin data ////////////////

static adminSet() {
   return fs.
   readFile("./src/adminSetKinds/adminsetkinds.json",  'utf8', (err, data) => {
   })
  
  .then((data) => {
   return JSON.parse(data)
  })
} 
static datasrr() {  //
  return fs.
  readdir("./src/redata") 
  .then((data) => {
    
  return data
 })
} 

static objectSet(...fildes) {
  return fs.
  readFile("./src/adminSetKinds/adminSeet.json",  'utf8', (err, data) => {
  })
 
 .then((data) => {
  return JSON.parse(data, ...fildes)
 })
} 

static adminNe() {
  return fs.
  readFile("./src/adminSetKinds/adminNext.json",  'utf8', (err, data) => {
  })
 
 .then((data) => {
  return JSON.parse(data)
 })
}
// ------ src/client 에서 입력한 id를 가지고 데이터를 불러오겠다. ---------//


static async dataKakaAlarm(phon) {
   console.log(phon,"356")
     
  return new Promise((resolve, reject) => {
    const query ="SELECT * FROM kakaoAlarm  WHERE phon = ?"
    db.query(query,[phon], (err, data) =>{
      
      if(err) reject(`${err}`)
     
    return  resolve(data[0])
    })
  
    return 
  })
}

///////////////////////////////////////////////////////////////////////


static  async As(cl) {   //기존 로그인 id, psword 를 덮어쓰기 즉 초기화 해줌
                         //newLogin 에서 login 하면 실행되는 함수
                        
                         const users = await this.getUserInfo(cl.phon)

  const uiuiu = await this.adminNe()
  const us = this.#uses
  
 

  const dataKaKao =await this.dataKakaAlarm(cl.phon)
   // 회원 가입 할떄 작성한 정보
  const a =this.#set

  const nowTime =  moment().format('yyyy-MM-DD hh:mm')
  const dateB = moment(`${nowTime}`);

 const dd = dateB + nowTime 


  fs.writeFile("./src/database/user.json", JSON.stringify(users), (err) => {
    fs.readFile("./src/database/user.json", "{}", 'utf8', (err, data) => {
      
    });
  }) 


  const userGoodsKinds = await this.objectsave() //userGoodsKinds.json 파일이 존재 하는곳

  var newUserGoodsKinds = userGoodsKinds.filter(function (addSave) { return addSave.phon === cl.phon });

   
 

     function  delivery() {
      return new Promise( (resolve, reject) => {
     
     console.log("1")
        if(resolve) {
            
          const phonSub = users.phon.substring(7,11)
          const pswsub = users.psword.substring(0,2) 
          const comb = phonSub + pswsub //문열기 비번 조합 comb
                  userGoodsKinds.push({"id": users.id ,"name":users.name, "cdId": comb,
                              "psword":users.psword,  "phon":users.phon, "gender":users.gender,"wonset":[] ,
                              "UseTime":[] , "goodsName":[],  "benchName":[],"expiryName":[],
                              "loginStart": [], "logoutEnd" : [], "koko":[], "goods":"N",  
                               } 
                              )
                             
                              fs.writeFile("./src/database/userGoodsKinds.json",JSON.stringify(userGoodsKinds))
                              fs.writeFile("./src/database/user.json", JSON.stringify(users), (err) => {
                             
                              })  

                          

                              resolve(userGoodsKinds);
        
      } else{
        reject("err");
                }
    
    
      });
    
    
    }


      function  next_3() {
        return new Promise((resolve, reject) => {
         
      
        if(resolve) {
          console.log("3")
          var kend = userGoodsKinds.filter(function (addSave) { return addSave.phon === cl.phon });
           
          fs.writeFile('./src/adminSetKinds/adminNext.json', JSON.stringify(kend), (err) => {
            fs.readFile('./src/adminSetKinds/adminNext.json', "[]", 'utf8', (err, data) => {
            
            
            });
         })  
               fs.writeFile("./src/database/user.json", JSON.stringify(users), (err) => {
                
                  }) 
            resolve();
        } else{
          reject("err");
                  } 
      
        });}

        function next_4() {
          
          return new Promise((resolve, reject) => {
           
        
          if(resolve) {
            console.log("4")
            return new Promise((resolve, reject) => {
              const phonSub = users.phon.substring(7,11)
              const pswsub = users.psword.substring(0,2) 
              const comb = phonSub + pswsub //문열기 비번 조합 comb
             
              const query ="INSERT INTO kiki(id, name,cdId, psword, phon, wonset, UseTime, goodsName, benchName,loginstart, logoutEnd, koko,expiryN,gender) VALUES(?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?,?,?,?);";
              db.query(query,
                [users.id, users.name, comb, users.psword, users.phon,"{}","{}","{}","{}","{}","{}","{}","{}",users.gender],(err, data) =>{
                if(err){reject(err)}
                
                resolve();
                
              }) 
            })
              
          } else{
            reject("err");
                    } 
        
          });}

              function next_5() {
                
                
          return new  Promise((resolve, reject) => {
           
         

            console.log(dataKaKao,"U/S 502")
          if(resolve) {
            console.log("5")
            return new Promise((resolve, reject) => {
              const phonSub = users.phon.substring(7,11)
              const pswsub = users.psword.substring(0,2) 
              const comb = phonSub + pswsub //문열기 비번 조합 comb
             
              const query ="INSERT INTO kakaoAlarm(phon,wonset,UseTime,goodsName,benchName,loginStart, logoutEnd, koko,expiryN) VALUES( ?, ?,?, ?, ?, ?, ?,?,?);";
              console.log(users.phon, "U/S 502")
              db.query(query,
                [users.phon,"{}","{}","{}","{}","{}","{}","{}","{}"],(err, data) =>{
                if(err){reject(err)}
                
                resolve();
                
              }) 
            })
              
          } else{
            reject("err");
                    } 
        
          });}
  if(newUserGoodsKinds[0] === undefined && dataKaKao === undefined)  {
      console.log("U/S 527")
    
    delivery().then(() =>{return  next_3()})   //초기화 해주는 함수
                             .then(() =>{return next_4()})
                             .then(() =>{return next_5()})
    
                             var kend = userGoodsKinds.filter(function (addSave) { return addSave.phon === cl.phon });
   
                             return kend[0]

    
  
  }else if(dataKaKao === undefined && newUserGoodsKinds[0] !== undefined) { 
    next_3().then(() =>{return  next_5()})   //초기화 해주는 함수
  
    console.log("542")
    
     var kend = userGoodsKinds.filter(function (addSave) { return addSave.phon === cl.phon });
   
     return kend[0]
     
        } else if(dataKaKao !== undefined && newUserGoodsKinds[0] !== undefined) {

          next_3().then() 
          var kend = userGoodsKinds.filter(function (addSave) { return addSave.phon === cl.phon });
          
           return kend[0]
        }


    
      

   
  
}  

 
static async Addsavesk(add) { ///  자리 선정 localhost:3000 클릭시 실행하는 위치 ///// 
// 자리 선정하는 함수 경로 bench.js "/"}
  
   const  adminNexet = await this.adminNe()
   const modiFY = await this.objectsave()
   const nowTime =  moment().format('yyyy-MM-DD hh:mm')
   const ab = await this.call("phon") //database/user.json 담겨있는 id
  
   const userGoodsKinds = await this.objectsave()//userGoodsKinds.json


  
 
   var userRemove = userGoodsKinds.filter(function (addSave) { return addSave.phon === ab.phon});
    
   const index = add.indexOf
    var changeGender =[]
   const benchSet =  userRemove[0].goodsName[index]
 
   const benchGender =  userRemove[0].gender
      
   if(benchGender ==="남자") {console.log("pp")
   changeGender ="남자 전용"}
       else if(benchGender ==="여자") { changeGender ="여자 전용"}
       
       if(add.goodsName === "고정석"){add.goodsName ="fixedType"}
     else if(add.goodsName ==="자유석") {add.goodsName ="feeType"}
          else if(add.goodsName ==="기간제") {add.goodsName="daysType"}
       
             
    if(benchSet !== add.goodsName) { throw ( "보유하신 이용권으로 선택할 수 없는 자리입니다.") }
    
    if(add.gender !=="남여 공용") {
      
      if(changeGender !== add.gender) {
      
      { throw ( "성별 제한이 있는 좌석입니다.") }}
      }

  
      
           function  paymentAPI() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                if(resolve) {

                      
        const kkk = "SELECT json_extract(loginStart, '$.loginStart[0]') AS value FROM kakaoAlarm WHERE phon = ?";

        //loginStart - 컬럼명 kakaoAlarm 테이블명  
        db.query(kkk, ["010710385735"], (err, data) => {
            if (err) return reject(err);
            // 데이터가 이미 객체일 가능성이 높으므로 추가적인 변환이 필요 없을 수 있음
            console.log(data[0].value, "dkfdjjf");
            resolve(data);
        });
        
                  const nowTime =  moment().format('yyyy-MM-DD hh:mm')
                  userRemove[0].wonset[index]= `${add.wonset}set`
                  userRemove[0].loginStart[index] = nowTime
                  //  `UPDATE kakaoAlarm SET loginStart = JSON_SET(loginStart, '$.loginStart[${index}]', nowTime ) WHERE phon = ?`;
                  const loginstart = `UPDATE kakaoAlarm SET loginStart = JSON_SET(loginStart, '$.loginStart[${index}]', '${nowTime}') WHERE phon = ?`;
                                 
                  // 쿼리 실행
                  db.query(loginstart, [`${userRemove[0].phon}`], (err, data) => {
                    if (err) {
                      // 쿼리 실행 중 오류 발생 시 reject 호출
                      return reject(err);
                    }
                    // 쿼리 성공 시 resolve 호출
                    resolve(data);
                  });
                  fs.writeFile("./src/database/userGoodsKinds.json",JSON.stringify(userGoodsKinds))
                    
                  resolve();

                }else{
                reject("err");
                        }   },300);
                });}
           
                function  deliveryAPIS() {
            return new Promise((resolve, reject) => {
            setTimeout(() => {
            if(resolve) {
              adminNexet[0].wonset[index] =`${add.wonset}set`
              fs.writeFile("./src/adminSetKinds/adminNext.json", JSON.stringify(adminNexet) , 'utf8' , (err) => {
                if (err) throw err;
                   console.log("err") 
                   
                 })
                resolve();
            }else{reject("err");
                    } },300);
            });}
            
           
 
           
            paymentAPI().then(()  => { return  deliveryAPIS() })  

 
          return adminNexet
  

}

static async days(add) { // kiosk 버튼을 누르면 day data 등록
 
  const Nice =  await this.nice()

  const creditCard = this.#creditCard
  const ab = await this.call("id") //초기화 된 정보

  
  const userGoodsKinds = await this.objectsave()//userGoodsKinds.json  
 

  const day = add.day// client 상품구매한 날짜 충전 data 

 
  const  Nicename = Nice.filter(function (addSave) { return addSave.phon === ab.phon });
        
  

  
  const yy = this.#y 
    

  //요일를 나타냄
 //////////문자가 숫자가 혼합해있으면 숫자만추출 /////////////
 
  const regex = /[^0-9]/g;
  const result = add.expiry.replace(regex, "");
  const number = parseInt(result);
   //////////문자가 숫자가 혼합해있으면 숫자만추출 /////////////
  const expiryN =  moment ().add(number, 'day').format ('yyyy-MM-DD hh:mm')  //유효기간
  const  userRemove = userGoodsKinds.filter(function (addSave) { return addSave.phon === ab.phon });

    
    function  delivery() { 
      return new Promise((resolve, reject) => {

      if(resolve) {
        
        if(add.setGoods === "fixedType" || add.setGoods === "daysType" ) {
      
        
          console.log( userRemove[0].UseTime, "629")
             userRemove[0].UseTime.push(`${day*60}`)
              userRemove[0].goodsName.push(add.setGoods)
              userRemove[0].expiryName.push(expiryN)
              userRemove[0].benchName.push (`${add.day}-Time`) 
              userRemove[0].wonset.push("")
              userRemove[0].loginStart.push("")
              userRemove[0].logoutEnd.push("")
                         
              userRemove[0].koko.push("N")
              userRemove[0].goods = "Y"
              
             

              fs.writeFile("./src/database/userGoodsKinds.json",JSON.stringify(userGoodsKinds))
            
              const GOODS ='UPDATE kiki SET goodsName = JSON_MERGE_PRESERVE(goodsName, ?) WHERE phon = ?';
              const EXPIRY ='UPDATE kiki SET expiryN = JSON_MERGE_PRESERVE(expiryN, ?) WHERE phon = ?';
              const USETIME ='UPDATE kiki SET UseTime = JSON_MERGE_PRESERVE(UseTime, ?) WHERE phon = ?';

              const KakaGOODS ='UPDATE kakaoAlarm SET goodsName = JSON_MERGE_PRESERVE(goodsName, ?) WHERE phon = ?';
              const kakaEXPIRY ='UPDATE kakaoAlarm SET expiryN = JSON_MERGE_PRESERVE(expiryN, ?) WHERE phon = ?';
              const kakaUSETIME ='UPDATE kakaoAlarm SET UseTime = JSON_MERGE_PRESERVE(UseTime, ?) WHERE phon = ?';
              const kakaloginStart ='UPDATE kakaoAlarm SET loginStart = JSON_MERGE_PRESERVE(loginStart, ?) WHERE phon = ?';
               db.query(GOODS,[JSON.stringify({"goodsName":add.setGoods}), ab.phon], (err, data) => {
              if (err) return reject(err);
               resolve(data);
               })
               
              db.query(EXPIRY,[JSON.stringify({"expiryN":expiryN}), ab.phon], (err, data) => {
              if (err) return reject(err);
               resolve(data);
               })
               db.query(USETIME,[JSON.stringify({"UseTime":`${day*1440}`}), ab.phon], (err, data) => {
                if (err) return reject(err);
                 resolve(data);
                 })

                 db.query(KakaGOODS,[JSON.stringify({"goodsName":add.setGoods}), ab.phon], (err, data) => {
                  if (err) return reject(err);
                   resolve(data);
                   })
                   
                  db.query(kakaEXPIRY,[JSON.stringify({"expiryN":expiryN}), ab.phon], (err, data) => {
                  if (err) return reject(err);
                   resolve(data);
                   })
                   db.query(kakaUSETIME,[JSON.stringify({"UseTime":`${day*1440}`}), ab.phon], (err, data) => {
                    if (err) return reject(err);
                     resolve(data);
                     })
          
                     db.query(kakaloginStart,[JSON.stringify({"loginStart":""}), ab.phon], (err, data) => {
                      if (err) return reject(err);
                       resolve(data);
                       })
                 if(Nicename[0] === undefined) {  
                  Nice.push({"id": ab.id ,"name":ab.name,"phon":ab.phon, 
                  "approvalNumber":[add.approvalNumber] , "approvalDay":[add.approvalDay],"fee":[add.fee],"hangle":[add.hangle],
                  "goodsName":[add.setGoods], "cancal": ["N"] 
                   } 
                  )
                           
                fs.writeFile("./src/database/nice.json", JSON.stringify(Nice), (err) => {
                 
                })
                      
          
                 
            
              

                }else if(Nicename[0].id !== undefined) {  
             
                Nicename[0].approvalNumber.push(add.approvalNumber)
                Nicename[0].approvalDay.push(add.approvalDay)
                Nicename[0].fee.push(add.fee)
                Nicename[0].hangle.push(add.hangle)
                Nicename[0].goodsName.push(add.setGoods)
                Nicename[0].cancal.push("N")
                fs.writeFile("./src/database/nice.json", JSON.stringify(Nice), (err) => {
                 
                })
              }
       
      }else if(add.setGoods === "feeType") { 
     
           
            
              userRemove[0].UseTime.push(`${day*60}`)
              userRemove[0].goodsName.push(add.setGoods)
              userRemove[0].expiryName.push(expiryN)
              userRemove[0].benchName.push (`${add.day}-Time`) 
              userRemove[0].wonset.push("")
              userRemove[0].loginStart.push("")
              userRemove[0].logoutEnd.push("")
                         
              userRemove[0].koko.push("N")
              userRemove[0].goods = "Y"
               fs.writeFile("./src/database/userGoodsKinds.json",JSON.stringify(userGoodsKinds))
            
               if(Nicename[0] === undefined) {  
                Nice.push({"id": ab.id ,"name":ab.name,"phon":ab.phon, 
                "approvalNumber":[add.approvalNumber] , "approvalDay":[add.approvalDay],"fee":[add.fee],"hangle":[add.hangle],
                "cancal": ["N"] , "goodsName":[add.setGoods]
                 } 
                )
                         
              fs.writeFile("./src/database/nice.json", JSON.stringify(Nice), (err) => {
               
              })

            
              }
            else if(Nicename[0].id !== undefined) {  
           
              Nicename[0].approvalNumber.push(add.approvalNumber)
              Nicename[0].approvalDay.push(add.approvalDay)
              Nicename[0].fee.push(add.fee)
              Nicename[0].hangle.push(add.hangle)
              Nicename[0].goodsName.push(add.setGoods)
              Nicename[0].cancal.push("N")
              fs.writeFile("./src/database/nice.json", JSON.stringify(Nice), (err) => {
               
              })
            }
   
            const GOODS ='UPDATE kiki SET goodsName = JSON_MERGE_PRESERVE(goodsName, ?) WHERE phon = ?';
            const EXPIRY ='UPDATE kiki SET expiryN = JSON_MERGE_PRESERVE(expiryN, ?) WHERE phon = ?';
            const USETIME ='UPDATE kiki SET UseTime = JSON_MERGE_PRESERVE(UseTime, ?) WHERE phon = ?';
            
             db.query(GOODS,[JSON.stringify({"goodsName":add.setGoods}), ab.phon], (err, data) => {
            if (err) return reject(err);
             resolve(data);
             })
             
            db.query(EXPIRY,[JSON.stringify({"expiryN":expiryN}), ab.phon], (err, data) => {
            if (err) return reject(err);
             resolve(data);
             })
             db.query(USETIME,[JSON.stringify({"UseTime":`${day*60}`}), ab.phon], (err, data) => {
              if (err) return reject(err);
               resolve(data);
               })
     
       }
          resolve();
      }else{
        reject(`${error}`);
      }
    
      });}
      

  

  

 
  
  function deliveryAPI() {
    return new Promise((resolve, reject) => {
      
  
    if(resolve) {
    
     const  kend = userGoodsKinds.filter(function (addSave) { return addSave.phon === `${ab.phon}` });
     
     fs.writeFile('./src/adminSetKinds/adminNext.json',JSON.stringify(kend), (err) => {
     fs.readFile("./src/adminSetKinds/adminNext.json", "{}", 'utf8', (err, data) => {
                    
                 });
           })  

        
        resolve({cdId:ab.id, indexOf : kend[0].goodsName.length -1});
    }else{
      reject(`${error}`);
    }

    });}
    
   
    delivery().then(()  => { return deliveryAPI()  })  
           
 return {success : true}

} 


static async locaUser(client) { //logout 버튼 시 초기감 만들어줌
                 
  const adminNe = await this.adminNe() //adimNext.json //초기화 데디터를 가지고있는 위치
  
  const modiFY = await this.objectsave() // //초기화 데디터를 가지고있는 위치
 
 
  var kend = modiFY.filter(function (addSave) { return addSave.phon === client.phon })
   
  
  const KEND =kend[0]
  fs.writeFile("./src/adminSetKinds/adminNext.json", JSON.stringify([KEND]), (err) => {
    fs.readFile("./src/adminSetKinds/adminNext.json", "{}", 'utf8', (err, data) => {
                           
                 });
           })

  
   const phone = kend[0]
    fs.writeFile("./src/database/user.json", JSON.stringify(phone), (err) => {
      fs.readFile("./src/database/user.json", "{}", 'utf8', (err, data) => {
        
      });
    })  
  
 
    return kend[0]     
       
        
          
        
         
          
        
   }

  static async logouttimes(client) { //logout 버튼 다음으로 퇴실 처리시 실행하는 함수 logout 시간을 담아줌 또는 
    //adminViews.js 에서 강제 퇴실 버튼 누르면 실행하는 함수

    const nowTime =  moment().format('yyyy-MM-DD hh:mm') 
    const adminNe = await this.adminNe() //adimNext.json //초기화 데디터를 가지고있는 위치
  
    const modiFY = await this.objectsave()
    var kend = modiFY.filter(function (addSave) { return addSave.phon === client.phone });
    //  Number(kend[0].loginStart[client.index])
  
     const dateB = moment(`${nowTime}`);
   
     const login =   kend[0].loginStart[client.index]
     const nexetTime = dateB.diff(login, 'minute') //시간차
    
              
      
     const Usetime = kend[0].UseTime[client.index] - nexetTime

     const save = [] 
    function de() { 
     
      return new Promise((resolve, reject) => {
     
        var kend = modiFY.filter(function (addSave) { return addSave.phon === client.phone });
       
        
        if(kend[0].UseTime[client.index]>0 && kend[0].wonset[client.index] !== undefined  && client.adminId === "user") {
        
        if(resolve) {
          
        adminNe[0].logoutEnd[client.index] = nowTime
        adminNe[0].UseTime[client.index] = Usetime
        adminNe[0].wonset[client.index] = ""
        adminNe[0].loginStart[client.index] = ""
       fs.writeFile("./src/adminSetKinds/adminNext.json", JSON.stringify(adminNe), (err) => {
        })  
        kend[0].logoutEnd[client.index] = nowTime
        kend[0].UseTime[client.index] = Usetime
        kend[0].wonset[client.index] = ""
        kend[0].loginStart[client.index] = ""
        
           fs.writeFile("./src/database/userGoodsKinds.json",JSON.stringify(modiFY))
     
          }
         
       } else {
        if(resolve) {
          
          adminNe[0].logoutEnd[client.index] = nowTime
          adminNe[0].UseTime[client.index] = Usetime
          adminNe[0].wonset[client.index] = ""
          adminNe[0].loginStart[client.index] = ""
         fs.writeFile("./src/adminSetKinds/adminNext.json", JSON.stringify(adminNe), (err) => {
          })  
          kend[0].logoutEnd[client.index] = nowTime
          kend[0].UseTime[client.index] = Usetime
          kend[0].wonset[client.index] = ""
          kend[0].loginStart[client.index] = ""
          
             fs.writeFile("./src/database/userGoodsKinds.json",JSON.stringify(modiFY))
       
            }



       }
   
     
       
      
      });}
       

      if(kend[0].UseTime[client.index]>0 && client.index !== undefined  && client.adminId === "ADMIN") {
    
           modiFY.forEach((item, index) =>{
          if(item.id === "ADMIN") {
      

            kend[0].logoutEnd[client.index] = nowTime
            kend[0].UseTime[client.index] = Usetime
            kend[0].wonset[client.index] = ""
            kend[0].loginStart[client.index] = ""
            // item.wonset.splice(client.index,1)
            // item.UseTime.splice(client.index,1)
            // item.loginStart.splice(client.index,1)
    fs.writeFile("./src/database/userGoodsKinds.json",JSON.stringify(modiFY))
          }
    
     
        })
       
     }  
     de()      
      return {success: true}
  }

    
  
  

 
 static async goods (add) {
  //여기서 add 는 고정석, 자유석, 기간제 
  
  const ab = await this.call()

  const modiFY = await this.objectsave() //"./src/database/userGoodsKinds.json".json
  
  const users = await this.getUser("id","phon","name")
  const goods = modiFY.map((obj) => obj.id === ab.id[0] ? { ...obj, goods:add.goods } : obj)
  
  fs.writeFile("./src/database/userGoodsKinds.json",JSON.stringify(goods))

const index = users.id.indexOf(ab.id[0])
const object = Object.keys(users)
const newuser = object.reduce((newuser, fileds) =>{
  
  newuser[fileds] = users[fileds][index]
   
return newuser
},{})

  
 return {success : true}
 } 

 static async changSEAT (user) {
  //여기서 add 는 고정석, 자유석, 기간제 
  
  console.log(user)

  const userGoodsKinds = await this.objectsave() //"./src/database/userGoodsKinds.json".json
   var  userinfor = userGoodsKinds.filter(function (setAdd) { return setAdd.phon === user.Phone });
       
     userinfor[0].wonset[user.indexOf] = `${user.changSeat}set`

     fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(userGoodsKinds ), (err) => {
    })  
    
    return {success:true}
 } 

 static async adminSetKindSave(add) { // 좌석 유형 설정 adminbench
 
  const adminset = add
 const setAdd = await this.adminSet() //저장할곳
 const objectSet =await this.objectSet() //

 const set = this.#adminSet
//  users.id.indexOf(client.id) === -1 
console.log(objectSet.wonset.includes(add.wonSet),"912")

console.log((objectSet.wonset),"9124")
 if(objectSet.wonset === undefined) {

   
  set.wonset.push(add.wonSet)
  set.kindSet.push(add.goodss)
  set.gender.push(add.genderss)
  

   fs.writeFile("./src/adminSetKinds/adminSeet.json", JSON.stringify(set) , 'utf8' , (err) => {
       
          }) 
          return {success: "apply"}
  } else if(objectSet.wonset !== undefined && objectSet.wonset.includes(add.wonSet) === true )  { 

   console.log("1")
   const indexNume = objectSet.wonset.indexOf(add.wonSet)
   console.log(indexNume)
    objectSet.kindSet[indexNume] = add.goodss
    objectSet.gender[indexNume] = add.genderss
    
  
     fs.writeFile("./src/adminSetKinds/adminSeet.json", JSON.stringify(objectSet) , 'utf8' , (err) => {
         
            }) 
        return {success: "repair"}
    }else if(objectSet.wonset !== undefined && objectSet.wonset.includes(add.wonSet) === false) { 

   
      console.log("-1")
  
      objectSet.wonset.push(add.wonSet)
      objectSet.kindSet.push(add.goodss)
      objectSet.gender.push(add.genderss)
      
    
       fs.writeFile("./src/adminSetKinds/adminSeet.json", JSON.stringify(objectSet) , 'utf8' , (err) => {
           
              }) 
              return {success: "apply"}
      }






       
      // const cdid = set.wonset[set.wonset.length -1]
      // console.log(cdid)
      // var men = setAdd.filter(function (setAdd) { return setAdd.cdId === add.wonset });
      
          
      // if(men[0] === undefined && add.kindSet === undefined) {
      // setAdd.push({'cdId': cdid})
      //     fs.writeFile("./src/adminSetKinds/adminsetkinds.json", JSON.stringify(setAdd) , 'utf8' , (err) => {
      //   if (err) throw err;
      //      console.log("err")   
      //    })  
      // }
      // if(add.wonset !== undefined) {
      // objectSet.cdIdSeet.push(add.wonset)
      // fs.writeFile("./src/adminSetKinds/adminSeet.json", JSON.stringify(objectSet) , 'utf8' , (err) => {
       
      //      })  }
          
          
          
            
      //      const objS = objectSet.cdIdSeet[objectSet.cdIdSeet.length - 1]
      //      var menz = setAdd.filter(function (setAdd) { return setAdd.cdId === objS });
      
         
      //   if (menz[0].cdId === objS && add.wonset === undefined) {
       
      //    menz[0].kindSet = add.kindSet
      
       
      //   fs.writeFile("./src/adminSetKinds/adminsetkinds.json", JSON.stringify(setAdd) , 'utf8' , (err) => {
       
      //    })  
      //    objectSet.cdIdSeet.splice(1, objectSet.cdIdSeet.length);
      //    fs.writeFile("./src/adminSetKinds/adminSeet.json", JSON.stringify(objectSet) , 'utf8' , (err) => {
       
      //    })  
      //   }
   
      
       
  
}



static async adminnext(userIds) { 
 
  const adminNe = await this.adminNe()
  const arrObject =this.#arrObject
  const userGoodsKinds = await this.objectsave()
 
  // const  toTall= this.#set 
  var menz = userGoodsKinds.filter(function (setAdd) { return setAdd.id === userIds.id });

  // file 초기화 함
  fs.writeFile('./src/adminSetKinds/adminNext.json', JSON.stringify([menz[0]]), (err) => {
    fs.readFile('./src/adminSetKinds/adminNext.json', "[]", 'utf8', (err, data) => {
    
    
    });
 }) 
 return [userIds]
} 

static async modify(userIds) { // admin 에서 자리 이동 adminViews 에서 클릭시 작동함수
  
  const next =await this.adminNe()
  const modiFY = await this.objectsave() //"./src/database/userGoodsKinds.json".json
  


  console.log(userIds,"iii")
    var menz = modiFY.filter(function (setAdd) { return setAdd.phon === userIds.phon});

     const indexOF = menz[0].wonset.indexOf(userIds.wonsetIndexOf)
    if(userIds.goodsName === undefined) {
     
      menz[0].wonset[indexOF] = userIds.wonset
     
      

    fs.writeFile('./src/adminSetKinds/adminNext.json', JSON.stringify(menz), (err) => {
    })    
   fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(modiFY), (err) => {
      })    
  
    
       return  modiFY
    } else if(userIds.goodsName !== undefined && userIds.User === "clinet") {
       
     
      function  deliveryAPI() {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
        if(resolve) {
           

            modiFY.forEach((itme, index) =>{

            if(itme.phon === userIds.phon) {
              menz[0].wonset[userIds.index] = `${userIds.wonset}set`
              menz[0].loginStart[userIds.index] = userIds.loginStart
             itme.wonset[userIds.index] = `${userIds.wonset}set`
             itme.loginStart[userIds.index] = userIds.loginStart

            }
      
            })
            
            fs.writeFile('./src/adminSetKinds/adminNext.json', JSON.stringify(menz), (err) => {
            })    
        
            fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(modiFY), (err) => {
              })    
           
            resolve();
        } },100);
        });}
        
            

          deliveryAPI().then
      
          
   }
   
   return {success : true}

}

static async timesubadd(userIds) { //admin 에서 시간 조정 함수
  const  modiFY = await this.objectsave() //adminGoodsKinds.json data 
  const restart = await this.adminNe()
  const nowTime=  moment().format('yyyy-MM-DD hh:mm') 

       const kindinfo = modiFY.filter(function (modiFY) { return modiFY.id === userIds.id });
        
       const useTime = kindinfo[0].UseTime/1 
   
     
       
        const regex = /[^0-9]/g;
        const result = userIds.resaveTime.replace(regex, "");
        const number = parseInt(result);
     
        const result2 = userIds.resaveExpiryAdd.replace(regex, "");
        const number2 = parseInt(result2);
        console.log(number2)
      
      
        if(userIds.add === "add") {
          const nowTime =  moment().format('yyyy-MM-DD hh:mm')
       
          
          const kindinfo = modiFY.filter(function (modiFY) { return modiFY.id === userIds.id });
          const addTimes = Number(kindinfo[0].UseTime[userIds.index]) + Number(number*60)
          
           
          const dateB = moment(`${kindinfo[0].expiryName[userIds.index]}`);
          
          const dateA = moment(`${nowTime}`);
         
          const nexetTime= dateB.diff(dateA, 'day')
           const Add = nexetTime + number2
          
          
           const expiryN =  moment ().add(Add, 'day').format('yyyy-MM-DD hh:mm')
          kindinfo[0].UseTime[userIds.index] = addTimes 
          kindinfo[0].expiryName[userIds.index] =expiryN
          
          fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(modiFY), (err) => {
      })   
             
           
                          fs.writeFile("./src/adminSetKinds/adminNext.json", JSON.stringify([kindinfo[0]]), (err) => {
                    })
              }else if(userIds.sub === "sub") {
               
             
               const kindinfo = modiFY.filter(function (modiFY) { return modiFY.id === userIds.id });
               const addTimes = Number(kindinfo[0].UseTime[userIds.index]) - Number(number*60)
            
               const dateB = moment(`${kindinfo[0].expiryName[userIds.index]}`);
               const dateA = moment(`${nowTime}`);
         
          const nexetTime= dateB.diff(dateA, 'day')
           const Add = nexetTime - number2
      
           const expiryN =  moment ().add(Add, 'day').format ('yyyy-MM-DD hh:mm')
          
           
   
               
              kindinfo[0].UseTime[userIds.index] = addTimes
              kindinfo[0].expiryName[userIds.index] = expiryN
              
          
              
              fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(modiFY), (err) => {
              })   
             
              fs.writeFile("./src/adminSetKinds/adminNext.json", JSON.stringify([kindinfo[0]]), (err) => {
              })
                 
               }
     
 
 
}
static async adminGoods(userIds) { //admin 에서 상품권 지급

  const  modiFY = await this.objectsave() //adminGoodsKinds.json data 
 
  const kindinfo = await modiFY.filter(function (modiFY) { return modiFY.phon === userIds.phone });
   console.log(kindinfo[0],"1242")
  const expiryN =  moment ().add(userIds.expiryName, 'day').format ('yyyy-MM-DD hh:mm') 
  
  const indexs = []
  //////////문자와  숫자가 혼합해있으면 숫자만추출 /////////////
  const regex = /[^0-9]/g;
  const result = userIds.goodsName.replace(regex, "");
  const number = parseInt(result);
  
  
  const resultTime = userIds.goodsName.replace(regex, "");
  const numberTime = parseInt(resultTime);
    //////////문자와  숫자가 혼합해있으면 숫자만추출 /////////////
   
 
    // kindinfo[0].goodsName.forEach((cl, index) => { 
    //   console.log(cl,"jjieii")
    //     if(cl === ""){
        
    //       console.log("kkkll")
    //    indexs.push(index)
    //     }else if( cl !==""){
    //       indexs.push(index + 1)
    
    //     }
    // })
         
           
         if(userIds.feeName === "fixedType" || userIds.feeName === "daysType") {
           kindinfo[0].benchName.push(userIds.goodsName)
           kindinfo[0].goodsName.push(userIds.feeName)  
           kindinfo[0].expiryName.push(expiryN) 
           kindinfo[0].UseTime.push(number*1440 )
           kindinfo[0].loginStart.push("")  
           kindinfo[0].logoutEnd.push("") 
           kindinfo[0].wonset.push("") 
           kindinfo[0].koko.push("N")
             
           fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(modiFY), (err) => {
           
        })  
            return {success: true}     
         } else if(userIds.feeName === "feeType") {
          kindinfo[0].benchName.push(userIds.goodsName)
          kindinfo[0].goodsName.push(userIds.feeName)  
          kindinfo[0].expiryName.push(expiryN) 
          kindinfo[0].UseTime.push(number*1440 )
          kindinfo[0].loginStart.push("")  
          kindinfo[0].logoutEnd.push("") 
          kindinfo[0].wonset.push("") 
          kindinfo[0].koko.push("N")
            fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(modiFY), (err) => {
        })
        return {success: true}
        
         }  
  }



  static async Userinfor(userIds) {
    const  userGoodsKinds = await this.objectsave()
    const  adminNexet = await this.adminNe()
  var kend = userGoodsKinds.filter(function (addSave) { return addSave.id === userIds.id });{
 
    const nowTime =  moment().format('yyyy-MM-DD hh:mm')
  if(kend[0].loginStart[userIds.sessionIndexof] !== "" && kend[0].wonset[userIds.sessionIndexof] === "" && userIds.sessionIndexof !== null){
   
    kend[0].loginStart[userIds.sessionIndexof] = nowTime
    fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(userGoodsKinds) , 'utf8' , (err) => {
  if (err) throw err;
     console.log("err") 
    
   }) 

  }else if(kend[0].loginStart[userIds.sessionIndexof] !== "" && kend[0].wonset[userIds.sessionIndexof] !== "" && userIds.sessionIndexof !== null){
      console.log(kend[0].wonset[userIds.sessionIndexof])
  return { success: false, mag : `현재 상품에 ${kend[0].wonset[userIds.sessionIndexof]} 자리를 사용하고 계습니다.` , wonset:kend[0].wonset[userIds.sessionIndexof]}

  }else if(kend[0].loginStart[userIds.sessionIndexof] === "") {
    kend[0].loginStart[userIds.sessionIndexof] = nowTime
    fs.writeFile("./src/database/userGoodsKinds.json", JSON.stringify(userGoodsKinds) , 'utf8' , (err) => {
  if (err) throw err;
     console.log("err") 
    
   }) 
   
    adminNexet[0].loginStart[userIds.sessionIndexof] = nowTime

        fs.writeFile("./src/adminSetKinds/adminNext.json", JSON.stringify(adminNexet) , 'utf8' , (err) => {
    if (err) throw err;
       console.log("err") 
       
     })
     return { success: false, mag : "자리를 선택 해주세요"}
  } else if (userIds.sessionIndexof === null) {
           
    return { success: false, mag : " 상품을  먼져 선택(클릭) 해주세요." , wonset:kend[0].wonset[userIds.sessionIndexof]}
  }
}
  }
  static async forciBley(client) {
   console.log(client,"00")
   
    const userGoodsKinds = await this.objectsave() //userGoodsKinds.json 파일이 존재 하는곳
    const nowTime =  moment().format('yyyy-MM-DD hh:mm')
    var newUserGoodsKinds = userGoodsKinds.filter(function (addSave) { return addSave.phon === client.phone });
    if(client.forcTime ===null ) {client.forcTime ="0"
  }
   const dayTime = Number(client.forcDay)*1440 + Number(client.forcTime)
   
   if(newUserGoodsKinds[0] === undefined && client.id === "ADMIN") {
    console.log("1351")
    userGoodsKinds.push({"id": client.id,"phon": client.phone ,"name":"ADMIN", "cdId":client.cdId,
     "wonset":[client.cdId], "UseTime":[dayTime] , "goodsName":[],
    "benchName":[],"expiryName":[],
    "loginStart": [nowTime], "logoutEnd" : [], "koko":[]
   })
   
    fs.writeFile("./src/database/userGoodsKinds.json",JSON.stringify(userGoodsKinds))
   }
   if(newUserGoodsKinds[0] !== undefined && client.id === "ADMIN") {
    const userGoodsKinds = await this.objectsave()
    console.log("1361")
    userGoodsKinds.forEach((item, index) =>{
      if(item.id === "ADMIN") {
        
         item.wonset.push(client.wonset)  
        item.UseTime.push(dayTime)  
        item.loginStart.push(nowTime) 
        item.koko.push("Y")
        

      }


    })
    console.log(userGoodsKinds)
   fs.writeFile("./src/database/userGoodsKinds.json",JSON.stringify(userGoodsKinds))
    }
    return {success : true}
  }

  static async getnext(client) {
  
    const comb = client.id + client.psword
 
    const userGoodsKinds = await this.objectsave()
    var newUserGoodsKinds = userGoodsKinds.filter(function (addSave) { return addSave.cdId === comb });
    
  if(newUserGoodsKinds[0] === undefined ){

    return {success : false , mag: "등록된 회원이 이니거나 휴대폰 끝네자리 비번 앞두자리가 옳지 않습니다." }
   }else if(newUserGoodsKinds[0].goodsName[0] !== undefined && newUserGoodsKinds[0] !== undefined ) {
    
    return {success : true} 
    }
   
   else if(newUserGoodsKinds[0].goodsName[0] === undefined ){
      
    return {success: false, mag: "상품이 존재하지 않습니다."}
   }else{
     
   }
         
  }
  static async KOKO(adminRes) {
                console.log(adminRes)
    const userGoodsKinds = await this.objectsave()
   fs. readFile("./src/database/kokoTime.json")
.then((data) => { 
  
const kakadatas = JSON.parse(data)

var kokoFile = kakadatas.filter(function (addSave) { return addSave.messageTitl === adminRes.messageTitl });
console.log(kokoFile)
const deadineDaysTime = Number(adminRes.timeDeadline*60) + Number(adminRes.dayDeadline*1440)

console.log(deadineDaysTime,"1438")

 if(kokoFile[0] === undefined && adminRes.save === "new") {
   const deadineDaysTime = Number(adminRes.timeDeadline*60) + Number(adminRes.dayDeadline*1440)

   console.log(deadineDaysTime,"1438")
   kakadatas.push({"sendeType":adminRes.sendeType,"messageTitl":adminRes.messageTitl, "Text":adminRes.meageContents, 
                "timeSend":deadineDaysTime, "messageKindeindexOf":adminRes.messageKindeindexOf ,"set":adminRes.set})

    fs.writeFile("./src/database/kokoTime.json",JSON.stringify(kakadatas))
  } if(kokoFile[0] !== undefined && adminRes.save === "new") {

    kakadatas.push({"messageTitl":adminRes.messageTitl, "Text":adminRes.meageContents, 
    "timeSend":deadineDaysTime, "set":adminRes.set})

fs.writeFile("./src/database/kokoTime.json",JSON.stringify(kakadatas))

  } if(kokoFile[0] !== undefined && adminRes.save === "UseChange") {
     
      kokoFile[0].set = adminRes.set

   
fs.writeFile("./src/database/kokoTime.json",JSON.stringify(kakadatas))

return {success: true}
  } if(kokoFile[0] === undefined && adminRes.save === "revise") {
    console.log("1468")

    kakadatas[adminRes.indexOf].sendeType = adminRes.sendeType
    kakadatas[adminRes.indexOf].set = adminRes.set
    kakadatas[adminRes.indexOf].messageTitl = adminRes.messageTitl
    kakadatas[adminRes.indexOf].Text = adminRes.meageContents
    kakadatas[adminRes.indexOf].timeSend = deadineDaysTime
 
    fs.writeFile("./src/database/kokoTime.json",JSON.stringify(kakadatas))

return {success: true}


  }if(kokoFile[0] !== undefined && adminRes.save === "Delete") {
    console.log("1468")

    // Niceinformation[0].approvalNumber.splice(index, 1);
    kakadatas.splice(adminRes.indexOf, 1)
   
 
    fs.writeFile("./src/database/kokoTime.json",JSON.stringify(kakadatas))

return {success: true}


  }


  
  // else if( kokoFile[0].sendName === "fixedDeadine" && adminRes.save === "option") {
  //   const deadineDaysTime = Number(adminRes.timeSend*60) + Number(adminRes.daySend*1440)
  //   const a = datas.map((item) => item.sendName === adminRes.sendName ? { ...item, "Text": adminRes.Text ,  "timeSend":deadineDaysTime, "set":adminRes.set } : item)
  //   fs.writeFile("./src/database/kokoTime.json",JSON.stringify(a))
 
  // }else if(adminRes.sendName === "fixedDeadine" && adminRes.save === "save") {
  //   const deadineDaysTime = Number(adminRes.timeSend*60) + Number(adminRes.daySend*1440)
  //   const a = datas.map((item) => item.sendName === adminRes.sendName ? { ...item, "set":adminRes.set } : item)
  //   fs.writeFile("./src/database/kokoTime.json",JSON.stringify(a))
  //  return a 
  // }else if( kokoFile[0].sendName === "feeDeadine" && adminRes.save === "option") {
  //   const deadineDaysTime = Number(adminRes.timeSend*60) + Number(adminRes.daySend*1440)
  //   const a = datas.map((item) => item.sendName === adminRes.sendName ? { ...item, "Text": adminRes.Text , "timeSend":deadineDaysTime, "set":adminRes.set } : item)
  //   fs.writeFile("./src/database/kokoTime.json",JSON.stringify(a))
  // }else if( adminRes.sendName === "feeDeadine" && adminRes.save === "save") {
  //   console.log("se2")
  //   const a = datas.map((item) => item.sendName === adminRes.sendName ? { ...item, "set":adminRes.set } : item)
  //   fs.writeFile("./src/database/kokoTime.json",JSON.stringify(a))
  // }else if( adminRes.sendName === "expiryDeadine" && adminRes.save === "option") {
  //   const deadineDaysTime = Number(adminRes.timeSend*60) + Number(adminRes.daySend*1440)
  //   const a = datas.map((item) => item.sendName === adminRes.sendName ? { ...item, "Text": adminRes.Text , "timeSend":deadineDaysTime, "set":adminRes.set } : item)
  //   fs.writeFile("./src/database/kokoTime.json",JSON.stringify(a))
  // }else if( adminRes.sendName === "expiryDeadine" && adminRes.save === "save") {
  //   console.log("4")
  //   const a = datas.map((item) => item.sendName === adminRes.sendName ? { ...item, "set":adminRes.set } : item)
  //   fs.writeFile("./src/database/kokoTime.json",JSON.stringify(a))
  // }else if( adminRes.sendName === "information" && adminRes.save === "option") {
  //   const deadineDaysTime = Number(adminRes.timeSend*60) + Number(adminRes.daySend*1440)
  //   const a = datas.map((item) => item.sendName === adminRes.sendName ? { ...item, "Text": adminRes.Text , "timeSend":deadineDaysTime, "set":adminRes.set } : item)
  //   fs.writeFile("./src/database/kokoTime.json",JSON.stringify(a))
  // }else if( adminRes.sendName === "information" && adminRes.save === "save") {
  //   console.log("sedii")
  //   const a = datas.map((item) => item.sendName === adminRes.sendName ? { ...item, "set":adminRes.set } : item)
  //   fs.writeFile("./src/database/kokoTime.json",JSON.stringify(a))
  // }
})
     return {success: true}
  } 
  static async NIce(Niceinfor) {

 const userGoodsKinds = await this.objectsave()
  const Nice =  await this.nice()
  const index = Niceinfor.indexOf
console.log(Niceinfor.id)

 function UserRemove(){
  console.log("1")
  return new Promise((resolve, reject) => {
   const  newUserGoodsKinds = userGoodsKinds.filter(function (addSave) { return addSave.id ===Niceinfor.id });
   const  Niceinformation = Nice.filter(function (addSave) { return addSave.id === Niceinfor.id });
  
 
  if(resolve) {
   
   

    newUserGoodsKinds[0].wonset.splice(index, 1);
    newUserGoodsKinds[0].UseTime.splice(index, 1);
    newUserGoodsKinds[0].goodsName.splice(index, 1);
    newUserGoodsKinds[0].benchName.splice(index, 1);
    newUserGoodsKinds[0].expiryName.splice(index, 1);
    newUserGoodsKinds[0].loginStart.splice(index, 1);
    newUserGoodsKinds[0].logoutEnd.splice(index, 1);

    Niceinformation[0].approvalNumber.splice(index, 1);
    Niceinformation[0].approvalDay.splice(index, 1);
    Niceinformation[0].fee.splice(index, 1);
    Niceinformation[0].hangle.splice(index, 1);
    Niceinformation[0].cancal.splice(index, 1);
    
    fs.writeFile("./src/database/userGoodsKinds.json",JSON.stringify(userGoodsKinds))
    fs.writeFile("./src/database/nice.json",JSON.stringify(Nice))
      resolve();
  } else{
    reject("err");
            } 

  });}

  function  niceCancal(){
    console.log("2")
    return new Promise((resolve, reject) => {
        
    if(resolve) {
        
      const  newUserGoodsKinds = userGoodsKinds.filter(function (addSave) { return addSave.id ===Niceinfor.id });
          
      fs.writeFile("./src/adminSetKinds/adminNext.json", JSON.stringify(newUserGoodsKinds) , 'utf8' , (err) => {
        if (err) throw err;
           console.log("err") 
           
         })
        resolve();
    } else{
      reject("err");
              } 
  
    });}

    UserRemove().then(() =>{return niceCancal()}) 
    return {success : true}
  }

static async SEarch(search){
  
  const Users=  this.#uses
   console.log(search)
 
Users.certification.push(search.conmbination)
Users.id.push(search.id)
Users.phon.push(search.phon)
Users.name.push(search.name)  
Users.psword.push(search.psword)  

fs.writeFile("./src/database/first.json", JSON.stringify(Users))
  
  // messageService.send({
  //   "to": search.Phone,
  //   "from": "01029718573",
  //   "kakaoOptions": {
  //     "pfId": "KA01PF240201053925212fFkWt1ESnqq",
  //     "templateId": "KA01TP240206110644561nFhQnMjvfkx",
  //     // 치환문구가 없을 때의 기본 형태
  //     "variables": {
  //       "#{name}" :search.name,
  //       "#{certification}" : search.conmbination
  //     }
  
  //     // 치환문구가 있는 경우 추가, 반드시 key, value 모두 string으로 기입해야 합니다.
  //     /*
  //     variables: {
  //       "#{변수명}": "임의의 값"
  //     }
  //     */
  
  //     // disbaleSms 값을 true로 줄 경우 문자로의 대체발송이 비활성화 됩니다.
  //     // disableSms: true,
  //   } 
  // });
  messageService.send({
    "to": search.phon,
    "from": "01029718573",
    "kakaoOptions": {
      "pfId": "KA01PF240201072156304ikVz36WEuTC",
      "templateId": "KA01TP230131084504073zoRX27WkwHB",
      // 치환문구가 없을 때의 기본 형태
      "variables": {
       
        "#{인증번호}" : search.conmbination
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
const req = {
  search : search.conmbination,
  phone : search.phon
}
return  req
}
}


module.exports = UserStorage;
