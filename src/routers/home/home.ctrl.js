const Usertorage = require("../../models/UserStorage")

const adminUserInfo = require("../../adminModels/adminUserInfo")
const adminUserUserStorage = require("../../adminModels/adminUserStorage")
const User = require("../../models/User")
const Benchs = require("../../models/Benchs");
const moment = require("moment")
const  express = require("express");

const  router = express.Router();
const fs = require('fs').promises



const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.mqtt-dashboard.com", { clientid: "emc22wonil/wonil/ilim" });


const output = {

   adminindex :(req, res) => {
      res.render("home/adminindex")
   },


      adminViews :(req, res) => {
      res.render("home/adminViews")
   },
 calender :(req, res) => {
      res.render("home/calender")
   },
  adminSetproduct :(req, res) => {
      res.render("home/adminSetproduct")
   },
   adminSetinfo :(req, res) => {
      res.render("home/adminsetinfo")
   },

   index :(req, res) => {
      res.render("home/index")
   },

   idChange :(req, res) => {
      res.render("home/idChange")
   },
   login: (req, res) => {
      res.render("home/login")
   },
   register: (req, res) => {
      res.render("home/register")
   },
   certification: (req, res) => {
      res.render("home/certification")
   },
   productlist: (req, res) => {
      res.render("home/productList")
   },
   adminProductlist: (req, res) => {
      res.render("home/adminProductlist")
   },


    adminMessage: (req, res) => {
      res.render("home/adminMessage")
   },

   admin: (req, res) => {
      res.render("home/admin")
   },
   allUserInfo: (req, res) => {
      res.render("home/allUserInfo")
   },
   detailedUserInfo: (req, res) => {
      res.render("home/detailedUserInfo")
   },
   userGoodsKinds: (req, res) => {
      res.render("home/userGoodsKinds")
   },

   
};


const process = {
   index: async (req, res) => {
      
      const benchs = new Benchs(req.body)
      const response = await benchs.Add() //Bench 9 UserStrage 267
     
      return res.json(response)

   },

   calender: async (req, res) => {
    

   },
   
   productlist: async (req, res) => {
      const days = new Benchs(req.body)
      const ACC = await days.Acc()//Benchs.js 23 UserStorage UserStorage 321

      const admin = await adminUserUserStorage.adminInfo()
   
      return res.json(ACC)


   }, 
   adminSetproduct: async (req, res) => {
      console.log(req.body)
      const adminId = new Benchs(req.body)
      const response = await adminId.adimingoods()
      console.log(response,"djj")
       return res.json(response)

   },

   adminViews: async (req, res) => {

      const adminId = new Benchs(req.body)

      const response = await adminId.modIfy()

      return res.json(response)

   },

   // goodsPush: async (req, res) => {

    
   //    const adminId = new Benchs(req.body)
   //    const response = await adminId.adimingoods()
   //    console.log(response,"djj")
   //     return res.json(response)

   //    // const adimingoods=await adminId.adimingoods()
   // },
  
   forcibley: async (req, res) => {
      console.log(req.body)
      const benchs = new Benchs(req.body)
      const respons = benchs.Forcibley()
      return res.json(respons)
   },
   adminSetinfo: async (req, res) => {
      const days = new Benchs(req.body)
      const ACC = await days.Acc()//Benchs.js 23 UserStorage UserStorage 321

      const admin = await adminUserUserStorage.adminInfo()
   
      return res.json(ACC)


   }, 
   
     adminProductlist: async (req, res) => {
      const adminuserinfo = new adminUserInfo(req.body)
      const response = await adminuserinfo.adminUserSeve()//adminUserInfo.js 10 adminUserStorage.js 69
      // const b = await adminuserinfo.adminNext()

      return res.json(response)

   },
   adminindex: async (req, res) => {
      
      const benchs = new Benchs(req.body)
      const response = await benchs.Add() //Bench 9 UserStrage 267
     
      return res.json(response)

   },
   
   login: async (req, res) => {

      const users = new User(req.body)

      const response = await users.login()
   
      return res.json(response)
   },
   logout: async (req, res) => {

      const users = new User(req.body)
      // const response =await  users.logoutTime(); //User.js 60 UserStorage 594
      const b = await users.loca();// User.js 80 UserStorage 523

      return res.json(b)
   },
   logoutTime: async (req, res) => {
      console.log(req.body)
      const users = new User(req.body)
      const respons = await users.loguttime()

      return res.json(respons)

   },
   register: async (req, res) => {
   
      const users = new User(req.body)
      const response = await users.register()
      
      return res.json(response)

   }, 

   
   certification: async (req, res) => {
      
     
      const users = new User(req.body)
      const respons = await users.certiFication()
      return res.json(respons)

   },
   adminBench: async (req, res) => {
      console.log(req.body,'jjjjj')
      const benchs = new Benchs(req.body)
      const kinds =await benchs.setKind()
      console.log(kinds,"kk")
      const KindsSet = await Usertorage.adminSet()
      
       return res.json(kinds)


   },
   search: async (req, res) => {
      
     
      const users = new Benchs(req.body)
      const response =await users.SEARCH()
        
      return res.json(response)

   },
   changeSeat: async (req, res) => {
         console.log(req.body,"home.ctrl.js 222")
     
      const users = new Benchs(req.body)
      const response =  await users.changseat()
      return res.json(response)

   },
   adminMessage: async (req, res) => {
      // console.log(req.body,"home.ctrl.js 222")
      const benchs = new Benchs(req.body)
      const response = await benchs.KoKo()
      console.log(response,'ctrl 206')
      return res.json(response)
},
   
   enter: async (req, res) => {

      const benchs = new Benchs(req.body)
      const respons =await benchs.getNext()
 
 
        if(respons === "goodsfalse"){
           return res.json(respons)
        }
       else if (respons.success === true) {
          //MQTT 보내는 쪽
          var topic = "emc22wonil/wonil/ilim"
          var message = "2"
          var options = {
             retain: true,
             qos: 0 // 정확도
 
          };
 
          // 받는곳_1
          var count = 0
          client.on("message", function (topic, msg, packet) {
             console.log(" messabe : " + msg);
 
 
          });
          // 받는곳_2
          client.on("connect", function () {
             // console.log("connected " + client.connected);
             client.subscribe(topic, { qos: 0 });
 
          })
 
 
          //publish  발해하는 곳
          function publish(topic, message, options) {
             console.log(topic, message, "re", options)
             if (client.connected == true) {
                // console.log("publish :{ ", topic, " : ", message, "}")
                //topic으로 를 발행한다.
 
                client.publish(topic, message, options);
 
             }
          }
 
 
          publish(topic, message, options)
       }
 
       return res.json(respons)
    },





   // enter: async (req, res) => {

   //   const benchs = new Benchs(req.body)
   //   const respons =await benchs.getNext()


   //     if(respons === "goodsfalse"){
   //        return res.json(respons)
   //     }
   //    else if (respons.success === true) {
   //       //MQTT 보내는 쪽
   //       var topic = "emc22wonil/wonil/ilim"
   //       var message = "2"
   //       var options = {
   //          retain: true,
   //          qos: 0 // 정확도

   //       };

   //       // 받는곳_1
   //       var count = 0
   //       client.on("message", function (topic, msg, packet) {
   //          console.log(" messabe : " + msg);


   //       });
   //       // 받는곳_2
   //       client.on("connect", function () {
   //          // console.log("connected " + client.connected);
   //          client.subscribe(topic, { qos: 0 });

   //       })


   //       //publish  발해하는 곳
   //       function publish(topic, message, options) {
   //          console.log(topic, message, "re", options)
   //          if (client.connected == true) {
   //             // console.log("publish :{ ", topic, " : ", message, "}")
   //             //topic으로 를 발행한다.

   //             client.publish(topic, message, options);

   //          }
   //       }


   //       publish(topic, message, options)
   //    }

   //    return res.json(respons)
   // },
}


module.exports = {
   output,
   process
}