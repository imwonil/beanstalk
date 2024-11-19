"use strict"

//각 좌석 클릭하는 이벤트에 아래 코드를 넣으면 모달이 켜집니다.

// forcedStartModal.classList.toggle("hidden")

//각 좌석을 클릭하면 모달의 X번 좌석 강제 시작과 좌석번호 placeholder에 해당 좌석의 번호가 담기게 로직을 구성하셔야 합니다. 

//상품명은 알아서 구성하시고요

//전화번호를 통해 검색하였을 때 나오는 회원을 선택하면 회원명 placeholder에 해당 회원의 이름이 담기게 로직을 구성하셔야 합니다. 

//index.css 수정한 거 다운 받는 거 깜박하셨으면 얼른 다운 받으시고요. 

//처음에 드릴 때는 모달 구성을 먼저 보시라고 hidden을 안시켰는데 html의 99번째 줄 div의 class 명에 hidden을 추가하면 사라지므로 참고하세요. 그냥 취소 버튼 눌러도 사라지고요

//세계적인 기업이 되기 위해 세계적인 수준으로 일을 합시다. 기본적으로 철자 틀리고 변수명이 글로벌 수준에 적합하지 않는 것은 용납되어선 안됩니다. id와 변수명 작성할 때 신중해주세요. 



//강제 점유 모달 
class seatInfor {
    constructor(body) {
    this.body = body
          
      }
    }
  
const forcedStartModal = document.querySelector(".forced-start-modal")
forcedStartModal.classList.toggle("hidden")
//강제 시작 버튼, 강제 점유 버튼 
const SNLength =document.getElementsByClassName("seats-number").length
const goods = document.querySelectorAll(".goods")
const apply = document.getElementById("apply")
const FeeSet =document.getElementsByClassName("sc-seats-number").length
const startBtn = document.querySelector(".start-btn")
const force = document.getElementById("force")
const occupancyBtn = document.querySelector(".occupancy-btn")
const forceTake = document.getElementById("forcetake")
console.log(forceTake)
const forcedCancelBtn = document.querySelector(".forced-cancel-btn ")


const newTime =  moment().format('yyyy-MM-DD hh:mm') 

//취소 버튼 누르면 모달 꺼짐
forcedCancelBtn.addEventListener("click", ()=>{
    forcedStartModal.classList.toggle("hidden")
})


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
      name : item.phon,
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
  const adminOccupyModal = document.querySelector(".admin-occupy-modal")

  const occupyConfirmBtn = document.querySelector(".occupy-confirm-btn")

  const occupyCancelBtn = document.querySelector(".occupy-cancel-btn")




  //취소 버튼 누르면 관리자 점유 모달 꺼짐
   occupyCancelBtn.addEventListener("click", ()=>{
       adminOccupyModal.classList.toggle("hidden")
  })


//강제퇴실 모달, 강제 퇴실 버튼, 취소 버튼 

 const dropModal = document.querySelector(".drop-modal")

 const dropBtn = document.querySelector(".drop-btn")

 const dropCancelBtn = document.querySelector(".drop-cancel-btn")

 //취소 버튼 누르면 강제퇴실 모달 꺼짐
 dropCancelBtn.addEventListener("click", ()=>{
      dropModal.classList.toggle("hidden")
 })



 
    function indexFunction(number) { //자석 click 하면 반응하는 함수
      forceTake.addEventListener("click", FORCETAKE) 



      function FORCETAKE () {

       console.log("kk")


 

        //res.suc일 때 아래 코드를 적용하면 관리자 점유 모달 생성
        // adminOccupyModal.classList.toggle("hidden")


        // const req = {
					 
        //   forcTime: time.value,
        //   forcDay: day.value,
        //   wonset : forcstart, 
        //   cdId : forcstart,
        //   id:"ADMIN"
   
        //  }
       
        //  fetch("/forcibley", {
        //    method: "POST",
        //    headers : {
        //      "Content-Type" :"application/json"
        //    },
           
        //     body: JSON.stringify(req),
        //    })
        //    .then((res => res.json()))
        //    .then(( res) => { 
        //      alert("강제시작 했습니다.")
        //     //  sessionStorage.removeItem("forc")
        //     //  sessionStorage.removeItem("forcEnd")
        //     //  sessionStorage.removeItem("bench")	
        //      location.href = "/adminViews"
        //    })

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
    
         console.log("280")
        // 모달로 사용 자 정보 들어감사용자 정보 들어감
 


        }

        const userGoodsname = document.getElementById("userGoodsname")
        const aTag = document.createElement('h1')
        
      
        function userGoods (userInfor) {
         
         
          
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
              console.log([i])
              const aTag = document.createElement('h1')
              userGoodsname.appendChild(aTag)
             
           aTag.className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-gray-100 dropdown-content goodss" 
           aTag.innerText=`${userInfor.goodsName[i]}`
           aTag.id=`${userInfor.goodsName[i]}`
          
           const idClick = document.getElementById(`${userInfor.goodsName[i]}`) // 드럽탑에서 클릭상품을 추출
           document.getElementById(`${userInfor.goodsName[i]}`).setAttribute("indexOF", `${[i]}`)
          const indexOF =  document.getElementById(`${userInfor.goodsName[i]}`).getAttribute("indexOf") //클릭한 순번 추출
           idClick.onclick = () => {goodsNAME(idClick.id,indexOF,userInfor)}
          

          }
          
       
          
          
          
        }
      
        
      
        }

        function goodsNAME (goodsNames,indexOF,UserInfor){
          
          console.log(indexOF)
          console.log(UserInfor.phon)
        force.addEventListener("click", FORCE)

        console.log()
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









