"use strict"



//240711 업데이트 입실 로직

//checkin이 로그인 버튼 눌렀을 때 나타나는 입실 관련 모달창

fetch('http://3.38.152.166:3000/adminGoodsKiosk')
.then(res => res.json())
.then(data => { 
console.log(data,"data")

})
const checkin = document.querySelector(".checkin-modal")
const checkinExit = document.querySelector(".checkin-exit")
const keyboardContainer = document.querySelector(".keyboard-container")


//240711 업데이트 퇴실 로직

//checkout이 로그아웃 버튼 눌렀을 때 나타나는 퇴실 관련 모달창
const checkout = document.querySelector(".checkout-modal")
const checkoutExit = document.querySelector(".checkout-exit")


const loginSection = document.querySelector(".login-section")
const findAnchor = document.querySelectorAll(".find-anchor")
// const regiModal = document.querySelector(".regi-modal")
const findModal = document.querySelector(".find-modal")

const feather = document.querySelector(".feather")
const findExit = document.querySelector(".find-exit")

/**아이디/비번 찾기랑 회원가입 모달 각각 끄는 방법 */



/**X 눌렀을 때 아이디/비밀번호 찾기 및 퇴실 창 제거 */
findExit.addEventListener("click", ()=>{

   findModal.classList.toggle("hidden")
  loginSection.classList.toggle("hidden")
  footer.classList.toggle("hidden")
  body.classList.toggle("flex-layout")
})




const id = document.querySelectorAll(".id")
const psword = document.querySelectorAll(".password")


const tab = document.querySelectorAll(".tab")
const tabs = [...tab]
const logoutPhone= document.querySelector("#logoutPhone")
const logoutPassword = document.querySelector("#logoutPassword")
const logoutButton = document.querySelector("#logoutButton")


const body = document.querySelector("body")

const footer = document.querySelector(".footer")

 const PHONE = document.querySelector("#PHONE"),  // 로그인 value id 값 html. 123 line
       PSWORD = document.querySelector("#PSWORD"), // 로그인 value id 값 html 126 line 
       BUTTON = document.querySelector("#BUTTON")





//아이디/비밀번호 변경 모달
  const changeModal = document.querySelector(".change-modal")
  const changeExit = document.querySelector(".change-exit")


/**X 눌렀을 때 아이디/비밀번호 변경 창 제거 */
changeExit.addEventListener("click", ()=>{

   changeModal.classList.toggle("hidden")
  loginSection.classList.toggle("hidden")
  footer.classList.toggle("hidden")
  body.classList.toggle("flex-layout")
})



// 아이디/비번찾기 모달 생성


findAnchor.forEach((ele)=>{
  ele.addEventListener("click", ()=>{


         findModal.classList.toggle("hidden")
         loginSection.classList.toggle("hidden")
        footer.classList.toggle("hidden")

    body.classList.toggle("flex-layout")


    // idx를 6으로 함으로써 모달의 첫번째 칸에 커서가 들어간다. 
    idx = 6;
    info[idx].focus();


         fetch('/users')
       .then(res => res.json())
       .then(data => {

        const S_N   = document.querySelector("#searchName")
        const S_P = document.querySelector("#searchPhone")
        const S_S = document.querySelector("#searchSend")
        const con_bu = document.querySelector("#confirm")
           const certification= document.querySelector("#certification")
        S_S.addEventListener("click",search)
        function search() {

          const userIndex = data.phon.indexOf(S_P.value)  
          const PhoneInclude =  data.phon.includes(S_P.value)
          const NameInclude =  data.name.includes(S_N.value)
          const userNameindex =  data.name.indexOf(S_N.value)
          const userPhoneindex = data.phon.indexOf(S_P.value)

           const UsersNAME =   data.name[userNameindex]
           const UsersPHONE = data.phon[userNameindex]



       if(userNameindex !== userPhoneindex){return alert(" 전화번호와 이름이 다릅니다.")}

                   else if(!PhoneInclude) {return alert("전화번호가 존재 하지 않습니다,")}
                        else if((!NameInclude)){return alert("존재하지 않은 이름 입니다.")}
                 const nowTimeSS = moment().format('ss')
                 const comb = S_P.value.substr(9, 10)
                 const combination =  nowTimeSS + comb 

                 const req = {
                  phon: S_P.value,
                  id :data.id[userIndex],
                  name :S_N.value,
                  psword:data.psword[userIndex],
                  conmbination : combination 


                 }
                
                 alert("인증번호 전송 하였습니다.")
                
                 setTimeout(() => {
          
          
          
                 }, 2000); 
            fetch("/search", {
              method: "POST",
              headers : {
                "Content-Type" :"application/json"
              },

               body: JSON.stringify(req),
              })
              .then((res => res.json()))
              .then((res) => {
                con_bu.addEventListener("click", CONFIRM) 
                function CONFIRM() {

                 if(certification.value === res) {
            const C_P = document.querySelector("#changPhone")
            const C_PS = document.querySelector("#changPsword")
            const C_C_P = document.querySelector("#changConfirm-psword")
            const C_B = document.querySelector("#changButton")
                   changeModal.classList.toggle("hidden")
                   findModal.classList.toggle("hidden")
              
              
         fetch('/users')
         .then(res => res.json())
         .then(data => { 

  
        C_B.addEventListener("click", changeSEND)

        function changeSEND () {
          const S_P =    data.phon.includes(C_P.value)
           console.log(C_P.value)
           console.log(C_PS.value)
           console.log(C_C_P.value)

         
            const req = {
    
              
              phon : C_P.value,
              psword: C_PS.value,
              Certification:"CertificationChange"
              


           }
          
         if(S_P === false) {return alert("전화번호가 다릅니다.")}
          if(C_PS.value !== C_C_P.value) {return alert("비밀번호가 일치 하지 않습니다.")}
            if(S_P === true) {

                  
    fetch("/register", {
      method: "POST",
      headers : {
        "Content-Type" :"application/json"
      },
      
       body: JSON.stringify(req),
      })
      .then((res => res.json()))
      .then((res) => {  
         
    if(res.success === true){ alert("비밀번호가 수정 되였습니다")
  location.href = "/login"
  }
      })

              
          
            }

        }

         })
              
              
                  }

                  if(certification.value !== res) {return alert("인증번호가 일치 하지 않습니다.")}
                   else{


                   }
                }

               })
        }

          })
       })
    })




const m = moment().format('yyyyMMDDhhmm')
const nowTime = moment().format('yyyyMMDDhhmm')

BUTTON.addEventListener("click", LOGINBUTTON) 


function LOGINBUTTON () {

 if(PHONE.value === "") {return alert ("전호번호를 입력 해주세요")}
   const a = document.querySelector("#PHONE").setAttribute("phone", `${PHONE.value}`)
  const b = document.querySelector("#PHONE").getAttribute("phone")
  const req = {
    phon: PHONE.value,
    psword: PSWORD.value,
    loginStart: nowTime,
    noName: b
  };




  fetch("login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),

  }).then((res) => res.json())
    .then((res) => {
  console.log(res)

    if(res.id !== undefined) {
      alert(`${req.phon} 방갑습니다 :)`)


      /*입실(checkin-anchor)을 눌렀을 때 checkin 모달창 열림 */
      setTimeout(() => {
        checkin.classList.toggle("hidden");
        loginSection.classList.toggle("blur")
        
      }, 500);

      if(res.goodsName.length === 0 ) {
        console.log("po")
      }



      for(var i = 0; res.goodsName.length>i; i++) {
        var time =  (res.UseTime[i]%1440) //나머지 분
        var hour =  Math.floor(time/60) // 시간



      var day = Math.floor( res.UseTime[i]/1400) // 1일
      var hour =  Math.floor(time/60) // 시간
      var min = time%60  // 분
      var hours =  Math.floor(res.UseTime[i]/60)

      var mon = Math.floor( time/60)
      console.log(day,"day")
      console.log(hour,"hour")
      console.log(min,"min")

         const useSet = document.getElementById("useSet")
      const div = document.createElement('div')
      const div2 = document.createElement('div')
      const span = document.createElement("span")
      const span2 = document.createElement("span")
      const span3 =  document.createElement("span")
      const span4 =  document.createElement("span")
      const span5 =  document.createElement("span")
      const  B = document.createElement('b') 

       useSet.appendChild(div)

       div.appendChild(span)

       div.appendChild(div2)



      span.className="px-2 text-xs font-semibold leading-[48px] text-green-800 bg-red-100 rounded-full"       
      span3.className="px-4 text-xs font-semibold leading-[48px] text-cyan-800 bg-cyan-200 rounded-md ml-5"
      span4.className="px-4 text-xs font-semibold leading-[48px] text-teal-800 bg-teal-200 rounded-md ml-5"
      span5.className="px-4 text-xs font-semibold leading-[48px] text-slate-800 bg-slate-200 rounded-md ml-5"

      div2.appendChild(B)
      div2.appendChild(span2)


      div.appendChild(span3)
      div.appendChild(span4)
      div.appendChild(span5)

      const UserName = document.querySelector("#UserName").innerText=`상품선택  -    ${res.id}님`

        span.innerText=""   // 상품 명

        B.innerHTML=`${res.goodsName[i]}`       // 상품 명

        span2.innerHTML=`잔여 시간 ${day}일 ${hour}시간 ${min}분 `  //남은 시간

         if(res.wonset[i] === '') {
         span3.innerHTML="미사용"
         span4.innerHTML= "자리선택"
         span4.id= `index${i}`

                 }
         if (res.wonset[i] !== ''){
          span3.innerHTML='사용중'
          span4.innerHTML='자리이동'
          span4.id=`index${i}`
        }                // 현자 사용하고 있는 여부




        span5.innerHTML="상품 취소(환불)"


       //  td.innerText =`현재 사용중인 자리 : ${data[0].wonset[i]}  상품:${data[0].goodsName[i]} - ${data[0].benchName[i]} `
       const text=  document.getElementById(`index${i}`).innerText
       const indexID =  document.getElementById(`index${i}`).id
       document.getElementById(`index${i}`).onclick = () => {indexFunction(indexID,text )};

      }







    }
    else if (res.success === false) {
        alert(res.msg)
      } 

    })



}



function indexFunction(index, text) { //자리 선택 및 자리 이동
  console.log(index, text)

  const regex1 = /[^0-9]/g;
  const result1= index.replace(regex1, "");
  const indexNumber = parseInt(result1);

  sessionStorage.setItem("indexOf",indexNumber)
  location.href = "/"  

   }

//퇴실 로직인데 어디다가 둬야될지 몰라서 그냥 여기둡니다. 
checkoutExit.addEventListener("click", function(){
  /**X 눌렀을 때 아이디/비밀번호 찾기 및 퇴실 창 제거 */
  location.reload(true)
})


/*퇴실(checkout-anchor) 눌렀을 때 checkout 모달창 열림 */
// checkoutAnchor.addEventListener("click", function(){
//   checkout.classList.toggle("hidden");

//   loginSection.classList.toggle("blur")
//   keyboardContainer.classList.toggle("blur")
// })






checkinExit.addEventListener("click", function(){
  /**X 눌렀을 때 아이디/비밀번호 찾기 및 퇴실 창 제거 */
  location.reload(true)
})



/**가상 키보드 부분 **/
const buttons = document.querySelectorAll(".btn");
  const fortis = document.querySelectorAll(".fortis")
 const textarea = document.querySelector("textarea")


 const deleteBtn = document.querySelectorAll(".delete")



 const koShiftBtn = document.querySelector(".ko-shift")
 const enShiftBtn = document.querySelector(".en-shift")


 const spaceBtn = document.querySelectorAll(".space")

 const translate = document.querySelector(".translate")
 const koKeyboard = document.querySelector(".ko-keyboard")
 const enKeyboard = document.querySelector(".en-keyboard")
  const enBtn = document.querySelectorAll(".en-btn")



/**아이디/비밀번호/번호 끝 네자리/비밀번호 앞 두자리/아이디/비밀번호 => 0, 1, 2, 3, 4, 5 
이렇게 새롭게 idx를 매기겠음. info로부터 인덱스를 추출하겠음.*/
const info = document.querySelectorAll(".info")


const infos = [...info]

// const idArr = [...id]
// const psArr = [...psword]
// const tabArr = [...tab]

let idx = 0;
 let arr = [];


info.forEach((ele)=>{
  ele.addEventListener("click", ()=>{

    idx = infos.indexOf(ele)

    if(info[idx].value !== ""){
      arr.length = 0;
      arr = info[idx].value.split("")

    }

   if(info[idx].value == ""){
     arr.length = 0;
   }

  })
})


//innerhtml은 어지간하면 쓸일 없고, innerText나 textContent 쓴다.
//innerText를 써야.. css 스타일이 적용된 상태가 출력된다. 

//innerHTML은 'Element'의 속성으로, element내에 포함 된 HTML 또는 XML 마크업을 가져오거나 태그와 함께 입력하여 내용을 직접 설정할 수 있다.

//innerText 'Element'의 속성으로, element내에서 사용자에게 보여지는 text값들을 가져오거나 설정할 수 있다.

 buttons.forEach((btn)=>{
   btn.addEventListener("click",()=>{

     arr.push(btn.innerText)
     textarea.textContent = Hangul.assemble(arr)
     info[idx].value =  Hangul.assemble(arr)

     })}) 


deleteBtn.forEach((ele)=>{
  ele.addEventListener("click", ()=>{
     arr.pop();
    console.log(ele, info)
     info[idx].value =  Hangul.assemble(arr)
  })
})


spaceBtn.forEach((ele)=>{
  ele.addEventListener("click", ()=>{
      arr.push(" ")
     info[idx].value = Hangul.assemble(arr)
  })
})



koShiftBtn.addEventListener("click", ()=>{
 fortis.forEach(btn=>{
   btn.classList.toggle("hidden")
 })
})


enShiftBtn.addEventListener("click", ()=>{
 enBtn.forEach(btn=>{
   btn.classList.toggle("uppercase")
 })
})


translate.addEventListener("click", ()=>{
 console.log(translate)
 enKeyboard.classList.toggle("hidden")
   koKeyboard.classList.toggle("hidden")
})


//다른 tab을 눌렀을 때 tabIdx는 초기화되고, 고정석인 경우가 0임

let tabIdx = 0;

/**아이디/비밀번호/번호 끝 네자리/비밀번호 앞 두자리/아이디/비밀번호 => 0, 1, 2, 3, 4, 5 
이렇게 새롭게 idx를 매기겠음 */

info[idx].focus();

//tab은 tab 여러개를 querySelectorAll로 가져온 것, 그리고 그것을 forEach로 돌린다.

tab.forEach((ele)=>{  //tab 클릭시 반응하는 함수
  ele.addEventListener("click", ()=>{



    //tab의 매개변수가 ele인 것을 실수하지 말것


    
    /**수정,
     * 각 탭을 누를 때마다 두개의 플레이스홀더 중 첫번째 플레이스 홀더에
     * 커서가 들어갈 수 있게 focus 매서드를 쓴다.  */
    tabIdx = tabs.indexOf(ele)
    idx = tabIdx * 2

    setTimeout(() => {
        info[idx].focus();
    }, 0); // 현재 이벤트 루프가 완료된 후 실행


      
     const TAB =  ele.dataset.alt
      
    if(TAB === "tab3") {

  console.log("kkk")
      logoutButton.addEventListener("click", logOUT) 

  function logOUT() {

    const req = {

     phon:logoutPhone.value,
     psword:logoutPassword.value,


    }
  

    fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),

    }).then((res) => res.json())
      .then((res) => {

          var conter =0; 
          if(res.id !== undefined) {

            if(res.goodsName.length === "0") {alert("상품이 존재하지 않습니다")

             location.href = "/login"
          }


            /*입실(checkin-anchor)을 눌렀을 때 checkin 모달창 열림 */

              
              // keyboardContainer.classList.toggle("blur") //err 남


            for(var i = 0; res.goodsName.length>i; i++) {
              if(res.wonset[i] !== ''){ conter = +1 
                console.log(conter ,"630")
             }
            }
             if(conter === 0) { return alert("퇴실할 상품이 없습니다.")
             
            console.log(conter,"636")
             
            }else if(conter > 0) { 
              checkin.classList.toggle("hidden");
             loginSection.classList.toggle("blur")
              console.log(conter,"639")
          for(var k = 0; res.goodsName.length>k; k++) { 
              var time =  (res.UseTime[i]%1440) //나머지 분
              var hour =  Math.floor(time/60) // 시간



            var day = Math.floor( res.UseTime[k]/1400) // 1일
            var hour =  Math.floor(time/60) // 시간
            var min = time%60  // 분
            var hours =  Math.floor(res.UseTime[k]/60)

            var mon = Math.floor( time/60)
        

               const useSet = document.getElementById("useSet")
            const div = document.createElement('div')
            const div2 = document.createElement('div')
            const span = document.createElement("span")
            const span2 = document.createElement("span")
            const span3 =  document.createElement("span")
            const span4 =  document.createElement("span")
            const span5 =  document.createElement("span")
            const  B = document.createElement('b') 

             useSet.appendChild(div)

             div.appendChild(span)

             div.appendChild(div2)



            span.className="px-2 text-xs font-semibold leading-[48px] text-green-800 bg-red-100 rounded-full"       
            span3.className="px-4 text-xs font-semibold leading-[48px] text-cyan-800 bg-cyan-200 rounded-md ml-5"
            span4.className="px-4 text-xs font-semibold leading-[48px] text-teal-800 bg-teal-200 rounded-md ml-5"
            span5.className="px-4 text-xs font-semibold leading-[48px] text-slate-800 bg-slate-200 rounded-md ml-5"

            div2.appendChild(B)
            div2.appendChild(span2)


            div.appendChild(span3)
            div.appendChild(span4)
            div.appendChild(span5)

            const UserName = document.querySelector("#UserName").innerText=`상품선택  -    ${res.id}님`

              span.innerText=""   // 상품 명

              B.innerHTML=`${res.goodsName[k]}`       // 상품 명

              span2.innerHTML=`잔여 시간 ${day}일 ${hour}시간 ${min}분 `  //남은 시간

               if(res.wonset[k] === '') {
               span3.innerHTML="미사용"
               span4.innerHTML= "자리선택"
               span4.id= `index${k}`

                       }
               if (res.wonset[k] !== ''){
                span3.innerHTML='사용중'
                span4.innerHTML='퇴실 하기'
                span4.id=`indexOut${k}`
                const text=  document.getElementById(`indexOut${k}`).innerText
                const indexID =  document.getElementById(`indexOut${k}`).id
                document.querySelector(`#indexOut${k}`).onclick =() =>{logoutTime(indexID,text)}
              }                // 현자 사용하고 있는 여부




              span5.innerHTML="상품 취소(환불)"


             //  td.innerText =`현재 사용중인 자리 : ${data[0].wonset[i]}  상품:${data[0].goodsName[i]} - ${data[0].benchName[i]} `

               
            }
            }
                      }  
                      if (res.success === false) { alert(res.msg) } 

                      function logoutTime(indexID,text) {

                        const regex1 = /[^0-9]/g;
                        const result1= indexID.replace(regex1, "");
                        const index = parseInt(result1);

                        if (res.loginStart[index] !== "N") {
                          const req = {
                            id: res.id,
                            logOutTime: nowTime,
                            index,
                            adminId:"user"
                          };

                          console.log(req)

                          fetch("/logoutTime", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(req),

                          }).then((res) => res.json())
                            .then((res) => {
                                                 if (res.success) {
                                alert("퇴실 처리 되였습니다.")
                                location.href = "/"

                                 }


                                          })
                                       }

                        }




       })


  }




      // fetch("/logoutTime", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(req),

      // }).then((res) => res.json())
      //   .then((data) => { })

    }    if(TAB === "tab2") { 
    const enterId=document.querySelector("#enterId")
    const enterPassword = document.querySelector("#enterPassword")
    const enterNext = document.querySelector("#enterNext")
enterNext.addEventListener("click", next) 

function next() {

//  const combine= enterId.value + enterPassword.value
 const req = {
  id: enterId.value,
  psword: enterPassword.value
 }
          
 fetch("/enter", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(req),

}).then((res) => res.json())
  .then((res) => {
    console.log(res)
   if(res.success === true) {

    location = "/login"

   }else if(res.success === false){
   return alert(res.mag) //UserStorage.js
     
   }else if(res === "goodsfalse") {
    alert("상품이 존재 하지 않습니다.")

location = "/login"
   }
  

  })
}
  
    }

  })
})





