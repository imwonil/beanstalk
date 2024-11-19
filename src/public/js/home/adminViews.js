"use strict"

//각 좌석 클릭하는 이벤트에 아래 코드를 넣으면 모달이 켜집니다.



//각 좌석을 클릭하면 모달의 X번 좌석 강제 시작과 좌석번호 placeholder에 해당 좌석의 번호가 담기게 로직을 구성하셔야 합니다. 

//상품명은 알아서 구성하시고요

//전화번호를 통해 검색하였을 때 나오는 회원을 선택하면 회원명 placeholder에 해당 회원의 이름이 담기게 로직을 구성하셔야 합니다. 

//index.css 수정한 거 다운 받는 거 깜박하셨으면 얼른 다운 받으시고요. 

//처음에 드릴 때는 모달 구성을 먼저 보시라고 hidden을 안시켰는데 html의 99번째 줄 div의 class 명에 hidden을 추가하면 사라지므로 참고하세요. 그냥 취소 버튼 눌러도 사라지고요

//세계적인 기업이 되기 위해 세계적인 수준으로 일을 합시다. 기본적으로 철자 틀리고 변수명이 글로벌 수준에 적합하지 않는 것은 용납되어선 안됩니다. id와 변수명 작성할 때 신중해주세요. 


//////////////////////////////Object 객체 생성을 선엄함/////////////////////

class seatInfor {
    constructor(body) {
    this.body = body
          
      }
    }

    const nowTime =  moment().format('yyyy-MM-DD hh:mm') 
    const adminOccupyModal = document.querySelector(".admin-occupy-modal")

    const occupyConfirmBtn = document.querySelector(".occupy-confirm-btn")
  
    const occupyCancelBtn = document.querySelector(".occupy-cancel-btn")

    const forcedStartModal = document.querySelector(".forced-start-modal")

    const dropModal = document.querySelector(".drop-modal")

    const forcedCance = document.querySelector(".forced-cancel-btn")
    const changeSeat = document.querySelector("#change-seat")
 const dropBtn = document.querySelector(".drop-btn")
 const dropCancelBtn = document.querySelector(".drop-cancel-btn")
      dropCancelBtn.addEventListener("click", ()=>{
      dropModal.classList.toggle("hidden")
      
 })
 occupyCancelBtn.addEventListener("click", ()=>{
  adminOccupyModal.classList.toggle("hidden")

})
 
///////////// 모달 창을 모두 숨긴 각각 해당하는 구역에서 모달 활상화 해줌  ////////////////////////
forcedStartModal.classList.toggle("hidden") //빈 좌석 강제 시작 모달 

dropModal.classList.toggle("hidden") //강제 시작 버튼, 강제 점유 버튼 모달

adminOccupyModal.classList.toggle("hidden") //관라지 점유 강제 시작 모달
///////////// 모달 창을 모두 숨긴 각각 해당하는 구역에서 모달 활상화 해줌  ////////////////////////

const Datepicker = document.getElementById("datepicker") 
const CHECK = document.getElementById("check") 
const SNLength =document.getElementsByClassName("seats-number").length
const goods = document.querySelectorAll(".goods")
const apply = document.getElementById("apply")
const FeeSet =document.getElementsByClassName("sc-seats-number").length
const startBtn = document.querySelector(".start-btn")
const force = document.getElementById("force")
const occupancyBtn = document.querySelector(".occupancy-btn")
const forceTake = document.getElementById("forcetake")

const forcedCancelBtn = document.querySelector(".forced-cancel-btn ")


const newTime =  moment().format('yyyy-MM-DD hh:mm') 
let changNextSeat = 0

for(var i=0; SNLength>i; i++) {

    const seetNumger = document.getElementsByClassName("seats-number")[i].outerText 
    
     document.getElementsByClassName("seats-number")[i].id = seetNumger
    
        const text=  document.getElementById(seetNumger).innerText
    
 
   
    
       const indexID =  document.getElementById(seetNumger).id =seetNumger;
     document.getElementById(seetNumger).onclick = () => {indexFunction(text )};
 }

 for(var i=0; FeeSet>i; i++) {
      
    const feeSeetNumger = document.getElementsByClassName("sc-seats-number")[i].outerText 
    
     document.getElementsByClassName("sc-seats-number")[i].id = feeSeetNumger
    
        const text=  document.getElementById(feeSeetNumger).innerText
    
       const indexID =  document.getElementById(feeSeetNumger).id =feeSeetNumger;
     
       document.getElementById(feeSeetNumger).onclick = () => {indexFunction(text)};
 }

 
const setup = () => {
    return {
      loading: true,
      isSidebarOpen: false,
      toggleSidbarMenu() {
        this.isSidebarOpen = !this.isSidebarOpen
      },
      isSettingsPanelOpen: false,
      isSearchBoxOpen: false,
    }
  }

 
 
   fetch('/userGoodsKinds')
  .then(res => res.json())
  .then( U_G_D => { 
  
       fetch('/setKind')
       .then(res => res.json())
       .then(data => { 
  
  for(var i=0; data.wonset.length>i; i++) {
  
  
      const regex = /[^0-9]/g;
      const result = data.wonset[i].replace(regex, "");
      const number = parseInt(result);
   
     if(data.kindSet[i]=== "고정석") {
     const setColor=  document.getElementById(number).style ="background-color: #761ced;"
    const a=   document.getElementById(number).setAttribute("setName",data.kindSet[i] )
    console.log(a,"12")
      document.getElementById(number).setAttribute("genderNmae",data.gender[i] )
  }
     else if(data.kindSet[i] === "기간제")  {
      const setColor=  document.getElementById(number).style="background-color: #4cc4d4;"  
      document.getElementById(number).setAttribute("setName",data.kindSet[i] )
      document.getElementById(number).setAttribute("genderNmae",data.gender[i] )
    }
      
     else if(data.kindSet[i] === "자유석") {
         
        const setColor=  document.getElementById(number).style ="background-color: #4cc4d4;" 
        document.getElementById(number).setAttribute("setName",data.kindSet[i] )
        document.getElementById(number).setAttribute("genderNmae",data.gender[i] )
      }

  
  
  
  }
  U_G_D.forEach((item, index)=> {
   item.wonset.forEach((itme2,index2)=> {
   
    if(itme2 !=="") {

      const regex = /[^0-9]/g;
      const result = itme2.replace(regex, "");
      const seatnumber = parseInt(result);
      
      const req = {
  
      phone: item.phon,
      seatUse : "사용중",
      seat : seatnumber,
      name : item.name,
      id : item.id,
      psword: item.psword,
      goods : item.goodsName,
     UseTime : item.UseTime,
      }
  
  
      const users = new seatInfor(req)

      const a= document.getElementById(seatnumber).setAttribute("seatUse",JSON.stringify(users.body))
     
      const setU = document.getElementById(seatnumber).getAttribute("seatUse")  
          
      document.getElementById(seatnumber).innerText ="사용"
        
    
    }
      
   })
  
  })
  })





    })



 //관리자 강제 점유 모달, 확인 버튼, 취소 버튼




  //취소 버튼 누르면 관리자 점유 모달 꺼짐
 


//강제퇴실 모달, 강제 퇴실 버튼, 취소 버튼 




 //취소 버튼 누르면 강제퇴실 모달 꺼짐




  
    function indexFunction(number) { //자석 click 하면 반응하는 함수
     
      if( changNextSeat === 0) {
      forceTake.addEventListener("click", FORCETAKE) 
       document.getElementById("bench-number").innerText=`${number}  -  좌석`
     const forcTime = document.getElementById("forc-time")
     const setNumber = document.getElementById("set-number")
      function FORCETAKE () { //  번 좌석 관리자 점유 모달창 생성 AND 관리자 점유 시간 함수
        document.getElementById("set-number")
        setNumber.innerText = `${number}좌석 - 관리자 점유`
        
       adminOccupyModal.classList.toggle("hidden") //관리자 점유  여기에선 on
       forcedStartModal.classList.toggle("hidden")  //빈좌석 강제  여기에선 off

    var SeatNumber = 90;

    for(var i=1; SeatNumber>i; i++ ) {

      const a = document.createElement('tr')
      forcTime.appendChild(a)
      
      a.id= `${i} 시간`
      a.innerText = `${i} 시간`
      
      document.getElementById(`${i} 시간`).onclick = () => {ins(a.id)};
      
 
     CHECK.onclick =() =>{timeCheck(Datepicker.value)}
    }

    
   
    function ins(a) {

        document.getElementById("days").innerText = a
 
    }

function timeCheck(a) {
  const daysDate = document.getElementById("days").outerText




 if(Datepicker.value ==="" && daysDate === "점유할 시간을 선택해주세요") {

   return alert("점유할 시간 날짜를 선택 해주세요")

 } 


 const nowTime =  moment().format('yyyy-MM-DD') 
//  const adminNe = await this.adminNe() //adimNext.json //초기화 데디터를 가지고있는 위치





  const dateB = moment(`${nowTime}`);
  const dateA = moment(Datepicker.value)

  const nexetTime =  dateA.diff(dateB , 'minute') //Moment 시간차이 날짜 차이 
  
  const DAYS = moment.duration(dateA.diff(dateB)).asDays() //Moment 함수 날짜 차이 
  
  const regex = /[^0-9]/g;
  const result = daysDate.replace(regex, "");
  const TimeHor = parseInt(result);
 const req = {
					 
  forcTime: TimeHor*60, 
  forcDay: DAYS,
  wonset :`${number}set`, 
  cdId :`${number}set`,
  id:"ADMIN",
  phone:"ADMIN"
 }

console.log(req)
 
 fetch("/forcibley", {
   method: "POST",
   headers : {
     "Content-Type" :"application/json"
   },
   
    body: JSON.stringify(req),
   })
   .then((res => res.json()))
   .then(( res) => { 
     alert("강제시작 했습니다.")
     
     location.href = "/adminViews"
   })
}


     
        //res.suc일 때 아래 코드를 적용하면 관리자 점유 모달 생성
        // adminOccupyModal.classList.toggle("hidden")


  

      }
        const setU = document.getElementById(number).getAttribute("seatUse")  
        if(setU === null) {
        forcedStartModal.classList.toggle("hidden")
        fetch('/userGoodsKinds')
        .then(res => res.json())
        .then( U_G_D => {  
    const namePhone =   document.getElementById("namePhone")
           document.getElementById("search").addEventListener("click", SEARCH)
           const searchIdPsword = document.getElementById("searchIdPsword")
            const tr = document.createElement('tr')
       
            const td = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
          
          
            const span = document.createElement("span")
            const span2 = document.createElement("span")
            const span3 = document.createElement("span")
       
          function SEARCH() {
          
            span.innerText="" 
            span2.innerText="" 
            span3.innerText="" 
          U_G_D.forEach((userInfor, index) => {
        

            searchIdPsword.appendChild(tr)
               if(userInfor.name === namePhone.value || userInfor.phon ===namePhone.value) {
                 
             

               
             tr.className="styled-tr"
             td.className="styled-td"
             td2.className="styled-td"
             td3.className="styled-td"
            

                tr.appendChild(td)
                tr.appendChild(td2)
                tr.appendChild(td3)
              
                td.appendChild(span)

                td2.appendChild(span2)
               
                td3.appendChild(span3)



                 
                 //res.suc일 때 아래 코드를 적용하면 강제퇴실 모달 생성
                 // dropModal.classList.toggle("hidden")

                 
             
                span.innerText=userInfor.name
                span2.innerText=userInfor.phon
                span3.innerText="선택"

                span3.onclick = () => {userGoods(userInfor)};
           
             
              }
              return
          })
          
          }
    
            })
      }if(setU !== null) {
    
        dropModal.classList.toggle("hidden")

        const userName = document.getElementById(number).getAttribute("seatUse")
         console.log(number)
     const UserInfor =  JSON.parse(userName)
     
            // const indexOf =  UserInfor.wonset.indexOf(`${number}set`)
     
                document.getElementById("userName").innerText = UserInfor.name
                document.getElementById("userPhone").innerText = UserInfor.phone
                changeSeat.onclick = () => {C_SEAT(UserInfor.name, UserInfor.phone, number)}

             
                document.getElementById("check-out").onclick = () => {CHECKOUt(UserInfor.name, UserInfor.phone, number)}
      }

        const userGoodsname = document.getElementById("userGoodsname")
        const aTag = document.createElement('h1')
        
      
        function userGoods (userInfor) {
         
           document.getElementById("forcetake").style = 'display:none'
          
         userGoodsname.innerText="" //테스트 초기화 <H1>
       for(var i=0; userInfor.loginStart.length>i; i++) {
        const userGoodsname = document.getElementById("userGoodsname")
        const aTag = document.createElement('h1') 
        
             if(userInfor.loginStart[i] !== ""){
              
               const aTag = document.createElement('h1')
              userGoodsname.appendChild(aTag)
             
           
             aTag.className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-gray-100 dropdown-content goodss"
             aTag.innerText=`${userInfor.goodsName[i]} - (사용중) 강제시작 불가`
            
          
             } else if(userInfor.loginStart[i] === "") {
             var time =  (userInfor.UseTime[i]%1440) //나머지 분
              var hour =  Math.floor(time/60) // 시간



            var day = Math.floor( userInfor.UseTime[i]/1400) // 1일
            var hour =  Math.floor(time/60) // 시간
            var min = time%60  // 분
            var hours =  Math.floor(userInfor.UseTime[i]/60)

            var mon = Math.floor( time/60)
              const aTag = document.createElement('h1')
              userGoodsname.appendChild(aTag)
             
           aTag.className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-gray-100 dropdown-content goodss" 
           aTag.innerText=`${userInfor.goodsName[i]} 잔여시간 :${day}일${hour}시${min}분`
          aTag.id=`${userInfor.goodsName[i]}-${[i]}`
          
           const idClick = document.getElementById(`${userInfor.goodsName[i]}-${[i]}`) // 드럽탑에서 클릭상품을 추출
           document.getElementById(`${userInfor.goodsName[i]}-${[i]}`).setAttribute("indexOF", `${[i]}`)
          const indexOF =  document.getElementById(`${userInfor.goodsName[i]}-${[i]}`).getAttribute("indexOf") //클릭한 순번 추출
           idClick.onclick = () => {goodsNAME(idClick.outerText,indexOF,userInfor)}
          

          }
          
       
          
          
          
        }
      
        
      
        }

        function goodsNAME (goodsNames,indexOF,UserInfor){
          
        
        force.addEventListener("click", FORCE)

        
        document.getElementById("GODDS-NAME").innerText = goodsNames
        function FORCE () { //강제시작

           console.log("force")
     
           const req = {
            phon : UserInfor.phon,
            goodsName: goodsNames,
            benchName: UserInfor.benchName[indexOF],
            expiry: UserInfor.expiryName[indexOF],
            wonset:number,
            index : indexOF,
            loginStart  : newTime,
             User  : "clinet"
          } ;
          fetch("/adminViews" , {
            method: "POST",
            headers: {
              "Content-Type" : "application/json",
            } ,
            body: JSON.stringify(req),
              
            }).then((res) =>  res.json())
              .then((res) => {
              alert("강제시작 했습니다.")
              sessionStorage.removeItem("forc")
              sessionStorage.removeItem("forcEnd")
              sessionStorage.removeItem("bench")	
              location.href = "/adminViews"
              
                  
              })

        }
           
           }
          } else {
            
           
            // const setU = document.getElementById(number).getAttribute("seatUse") 
            
            fetch('/userGoodsKinds')
            .then(res => res.json())
            .then( data => {   
              const setU = document.getElementById(number).getAttribute("seatUse")  
             
              if(setU !== null) { alert("사용중인 자리 이빈다.")
            
            
            }
              if(setU === null) {
                const INFORMATJION =  C_SEAT() 
               
                const userInformation = data.filter(function (addSave) { return addSave.phon === INFORMATJION.Phone });
            
                const index_of= userInformation[0].wonset.indexOf(`${INFORMATJION.NextSeat}set` )
                console.log(index_of,"535")
                console.log(setU,"536",INFORMATJION) 
             
                const REQ = {
                 indexOf:index_of,
                 changSeat: number,
                 Phone: INFORMATJION.Phone,
                 name: INFORMATJION.Name,
                 

                }

                fetch("/changeSeat" , {
                  method: "POST", 
                  headers: {
                    "Content-Type" : "application/json",
                  } ,
                  body: JSON.stringify(REQ),
                    
                  })
                  .then((res) =>  res.json())
                  .then((res) =>{  
                     if(res.success === true) {
                     alert("좌석 이동 되였습니다.")
                      location.href = "/adminViews"
                     }
                  }) 
                    

              }
             


  })
          }
        }
      
//좌석 종류 선택, 상품, 시간 같이 옵션의 대가리 부분
const dropdownButtons = document.querySelectorAll('.dropdown-button');
//일일권, 기간제, 고정석 등 요소들의 컨테이너
const dropdownMenus = document.querySelectorAll('.dropdown-menu');
//일일권, 기간제, 고정석 등 각 요소



const dropdownContent = document.querySelectorAll('.dropdown-content')

let isDropdownOpen = true;
let idx = 0;


const dropdownButton = [...dropdownButtons]
const dropdownMenu = [...dropdownMenus]


//boolean 값을 toggle 해서 dropdownMenu의 open/close를 결정한다. 
forcedStartModal.classList.toggle("hidden")

function toggleDropdown() { // 드럽다운 부분

    isDropdownOpen = !isDropdownOpen;
    if (isDropdownOpen) {
        dropdownMenu[idx].classList.remove('hidden');
        
    } else {
        
        dropdownMenu[idx].classList.add('hidden');
    }
}

toggleDropdown();


// 추가시 상품 설정 
dropdownButton.forEach((btn)=>{

    btn.addEventListener("click", ()=>{

        idx = dropdownButton.indexOf(btn)

        toggleDropdown();
    }) 
})




//옵션의 각 요소를 선택하였을 때 옵션의 대가리를 내가 선택한 요소의 텍스트 콘텐츠로 결정한다.
// ex) 좌석 종류 선택 -> 좌석 선택시 옵션의 대가리 명을 좌석으로 한다. 
dropdownContent.forEach((ele)=>{
    ele.addEventListener("click", ()=>{

        dropdownMenu[idx].classList.add('hidden');
        isDropdownOpen = true;
        dropdownButton[idx].textContent = ele.textContent;
    })
})

//옵션 선택 중 외부를 클릭하였을 때 드롭다운이 꺼진다. 
window.addEventListener('click', (event) => {
    if (!dropdownButton[idx].contains(event.target)) {
        dropdownMenu[idx].classList.add('hidden');
        isDropdownOpen = false;
    }

});


function CHECKOUt (name, phone, wonsetNumber) {


fetch('/userGoodsKinds')
.then(res => res.json())
.then( data => { 
  
  var userinformation = data.filter(function (addSave) { return addSave.phon === phone });
 const indexOf= userinformation[0].wonset.indexOf(`${wonsetNumber}set`)

const req = {
  name : name,
  phone: phone,
  logOutTime : newTime,
   index : indexOf,
  adminId:"ADMIN"
}
// console.log(req,"337")
    
fetch("/logoutTime", {
 method: "POST",
 headers : {
   "Content-Type" :"application/json"
 },
 
  body: JSON.stringify(req),
 })
 .then((res => res.json()))
 .then(( res) => { 

   setTimeout(() => {
     alert("강제퇴실 했습니다.")
    
     location.href = "/adminViews"	
     }, 1000);
        
 })
 
}) 
}



forcedCance.addEventListener("click" , FORCEDCANCE) 
function FORCEDCANCE () {
  forcedStartModal.classList.toggle("hidden") //이용자 검색 모달창 forced-cancel-btn 
  changNextSeat =0;
}


let Phone = "",  Name ="", NextSeat ="", indexOF=""
function C_SEAT(ChoiceName, ChoicePhone, ChoiceSeat) {
  
  changNextSeat = Number(changNextSeat) +1;
  let ii = changNextSeat%2
 

  // console.log(changNextSeat)
  // console.log(ChoiceName, ChoicePhone, ChoiceSeat)


  fetch('/userGoodsKinds')
  .then(res => res.json())
  .then( data => { 
    if(ii === 1) {
    dropModal.classList.toggle("hidden")
    }

  Phone = ChoicePhone
  Name = ChoiceName
  NextSeat = ChoiceSeat 

  })  

 const req = {
 Phone,
 Name,
 NextSeat,


  }
  const users = new seatInfor(req) , U_J_S =  JSON.stringify(users.body) , U_J_P = JSON.parse(U_J_S)
  return U_J_P
}

y