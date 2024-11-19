"use strict"

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

//드롭다운은 html 103: 참고
const timeID =  moment().format('1MMDDhhmmss') 
//좌석 종류 선택, 상품, 시간 같이 옵션의 대가리 부분
const dropdownButtons = document.querySelectorAll('.dropdown-button');
//일일권, 기간제, 고정석 등 요소들의 컨테이너
const dropdownMenus = document.querySelectorAll('.dropdown-menu');
//일일권, 기간제, 고정석 등 각 요소

const TEB = document.querySelectorAll('.teb');
const SAVE = document.getElementById("save")
const TYPE = document.getElementById("seetType")
const resaveName = document.getElementById("resaveName")
TEB.forEach((tebKinde) => {

 tebKinde.onclick = () => {tebClick(tebKinde.innerText)};



})



function tebClick(tebKinde) {

    fetch('/adminGoodsKiosk')
.then(res => res.json())
.then((data => { 
    for(var i =0; i<data.length; i++ ) {
    const menz = data.filter(function (setAdd) { return setAdd.indexType === data[i].indexType });
    if(tebKinde === "고정석" && menz[0].indexType === "fixedType") {
        document.getElementsByTagName("tbody")[0].innerHTML=""
           for(var y = 0; y<menz[0].feeName.length; y++) {
          
            const tr =  document.createElement('tr')
            const tbody = document.querySelector('tbody')
            
            tbody.appendChild(tr)
                         
            const td0 = document.createElement('td')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const td4 = document.createElement('td')
            
            const button = document.createElement("button")
            const button2 = document.createElement("button")
            
            td0.className = "styled-td"
            td1.className = "styled-td"
            td2.className = "styled-td"
            td3.className =  "styled-td"
            td4.className =  "styled-td"
         
            
          
           
            td0.innerText = "고정석"
            td1.innerText = menz[0].feeName[y] 
            td2.innerText = menz[0].fee[y]  
            td3.innerText =  menz[0].expiry[y]
          
            
           
            tr.appendChild(td0).id = [y]
            tr.appendChild(td1).id = menz[0].feeName[y] 
            tr.appendChild(td2).id =  menz[0].fee[y]  
            tr.appendChild(td3).id = menz[0].expiry[y]
            tr.appendChild(td4)
                    
            td4.appendChild(button).className ="correction-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
            td4.appendChild(button2).className ="deletion-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
             
            button.innerText ="수정"
            button2.innerText="삭제"
            button.id=`default${[y]}`
            button2.id=`delet${[y]}`
            document.getElementById(`default${[y]}`).setAttribute('cdId',`${menz[0].cdId}`)

          
          
           button.className ="correction-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
           button2.className= "deletion-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
            const feeName = document.getElementById(`${menz[0].feeName[y] }`)
            const fee = document.getElementById(`${menz[0].fee[y]  }`)
            const expiry = document.getElementById(`${menz[0].expiry[y]}`)
            const index = document.getElementById(`${[y]}`)
            const cdId = document.getElementById(`default${[y]}`).getAttribute('cdId',`${menz[0].cdId}`)
             
            // console.log( document.getElementById('${data[i].type}'))
            document.getElementById(`default${[y]}`).onclick = () => {resave(cdId,feeName.id,fee.id,expiry.id, index.id, "fixedType")};
            document.getElementById(`delet${[y]}`).onclick = () => {delet(cdId,index.id, "fixedType")};  
          }
        
  return;
    }
    if(tebKinde === "자유석" && menz[0].indexType === "feeType"){
        document.getElementsByTagName("tbody")[1].innerHTML=""
     
        for(var y = 0; y<menz[0].feeName.length; y++) {
          
            const tr =  document.createElement('tr')
            const tbody = document.querySelector('#feeType')
            
            tbody.appendChild(tr)
                         
            const td0 = document.createElement('td')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const td4 = document.createElement('td')
            
            const button = document.createElement("button")
            const button2 = document.createElement("button")
            
            td0.className = "styled-td"
            td1.className = "styled-td"
            td2.className = "styled-td"
            td3.className =  "styled-td"
            td4.className =  "styled-td"
         
            
          
           
            td0.innerText = "자유석"
            td1.innerText = menz[0].feeName[y] 
            td2.innerText = menz[0].fee[y]  
            td3.innerText =  menz[0].expiry[y]
          
            
           
            tr.appendChild(td0).id = [y]
            tr.appendChild(td1).id = menz[0].feeName[y] 
            tr.appendChild(td2).id =  menz[0].fee[y]  
            tr.appendChild(td3).id = menz[0].expiry[y]
            tr.appendChild(td4)
           
            td4.appendChild(button).className ="correction-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
            td4.appendChild(button2).className ="deletion-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
             
            button.innerText ="수정"
            button2.innerText="삭제"
            button.id=`feeResave${[y]}`
            button2.id=`feeDelet${[y]}`
            document.getElementById(`feeResave${[y]}`).setAttribute('cdId',`${menz[0].cdId}`)

          
          
           button.className ="correction-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
           button2.className= "deletion-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
            const feeName = document.getElementById(`${menz[0].feeName[y] }`)
            const fee = document.getElementById(`${menz[0].fee[y]  }`)
            const expiry = document.getElementById(`${menz[0].expiry[y]}`)
            const index = document.getElementById(`${[y]}`)
           
            const cdId = document.getElementById(`feeResave${[y]}`).getAttribute('cdId')
             
            // console.log( document.getElementById('${data[i].type}'))
            document.getElementById(`feeResave${[y]}`).onclick = () => {resave(cdId,feeName.id,fee.id,expiry.id, index.id, "feeType")};
            document.getElementById(`feeDelet${[y]}`).onclick = () => {delet(cdId,index.id, "feeType")};  
          }  
         
        }
         if(tebKinde === "기간제" && menz[0].indexType === "daysType"){
            document.getElementsByTagName("tbody")[2].innerHTML=""
           
        for(var y = 0; y<menz[0].feeName.length; y++) {
          
            const tr =  document.createElement('tr')
            const tbody = document.querySelector('#daysType')
            
            tbody.appendChild(tr)
                         
            const td0 = document.createElement('td')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const td4 = document.createElement('td')
            
            const button = document.createElement("button")
            const button2 = document.createElement("button")
            
            td0.className = "styled-td"
            td1.className = "styled-td"
            td2.className = "styled-td"
            td3.className =  "styled-td"
            td4.className =  "styled-td"
         
            
          
           
            td0.innerText = "기간제"
            td1.innerText = menz[0].feeName[y] 
            td2.innerText = menz[0].fee[y]  
            td3.innerText =  menz[0].expiry[y]
          
            
           
            tr.appendChild(td0).id = [y]
            tr.appendChild(td1).id = menz[0].feeName[y] 
            tr.appendChild(td2).id =  menz[0].fee[y]  
            tr.appendChild(td3).id = menz[0].expiry[y]
            tr.appendChild(td4)
           
            td4.appendChild(button).className ="correction-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
            td4.appendChild(button2).className ="deletion-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
             
            button.innerText ="수정"
            button2.innerText="삭제"
            button.id = `daysResave${[y]}`
            button2.id = `daysDelet${[y]}`
            document.getElementById(`daysResave${[y]}`).setAttribute('cdId',`${menz[0].cdId}`)

          
          
           button.className ="correction-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
           button2.className= "deletion-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
            const feeName = document.getElementById(`${menz[0].feeName[y] }`)
            const fee = document.getElementById(`${menz[0].fee[y]  }`)
            const expiry = document.getElementById(`${menz[0].expiry[y]}`)
            const index = document.getElementById(`${[y]}`)
           
            const cdId = document.getElementById(`daysResave${[y]}`).getAttribute('cdId',`${menz[0].cdId}`)
             
            // console.log( document.getElementById('${data[i].type}'))
             document.getElementById(`daysResave${[y]}`).onclick = () => {resave(cdId,feeName.id,fee.id,expiry.id, index.id, "daysType")};
             document.getElementById( `daysDelet${[y]}`).onclick = () => {delet(cdId, index.id, "daysType")};  
            }  
        
        
        }
      
      
      
 
}
  
      }))  
    
     }



const dropdownContent = document.querySelectorAll('.dropdown-content')

let isDropdownOpen = true;
let idx = 0;


const dropdownButton = [...dropdownButtons]
const dropdownMenu = [...dropdownMenus]


//boolean 값을 toggle 해서 dropdownMenu의 open/close를 결정한다. 


function toggleDropdown() {
    
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


//각 좌석, 모달, 모달의 취소버튼, 모달의 적용버튼
const correctionModal = document.querySelector(".correction-modal")
const additionModal = document.querySelector(".addition-modal")

//추가 버튼 (pc에서 보이는 거, 모바일 사이즈에서 보이는 것, 총 2개라 forEach 써야함)

const additionBtn = document.querySelectorAll(".addition-btn")

//수정 및 삭제 버튼은 테이블의 각 row별로 N개임
const correctionBtn = document.querySelectorAll(".correction-btn")
const deletionBtn = document.querySelectorAll(".deletion-btn")

const Type = document.getElementById("type")

const addCancelBtn = document.querySelector(".add-cancel-btn") 
const addAdditionBtn = document.querySelector(".add-Addition-btn") 
    
const cancelBtn = document.querySelector(".cancel-button")
const adjustBtn = document.querySelector(".adjust-button")


//수정 추가 모달창 생성
additionBtn.forEach((ele)=>{
    ele.addEventListener("click", ()=>{
        additionModal.classList.toggle("hidden")
    })
})


//취소 버튼 누르면 추가 모달 꺼짐
addCancelBtn.addEventListener("click", ()=>{
    additionModal.classList.toggle("hidden")
   location.href = location.href;
})




cancelBtn.addEventListener("click", ()=>{
    
    correctionModal.classList.toggle("hidden")
})


correctionBtn.forEach((ele)=>{
    ele.addEventListener("click", ()=>{
        console.log(els)
        correctionModal.classList.toggle("hidden")
    })
})


//추가 버튼을 눌러서 나타난 모달에서 추가 버튼을 누르면 새로 고침이 되어서 해당 목록이 테이블에 나타나게끔 js를 설계해야 한다. 

//수정 버튼을 눌러서 나타난 모달에서 수정 버튼을 누르면 새로 고침이 되어서 해당 목록이 테이블에 나타나게끔 js를 설계해야 한다.


const  add = document.getElementById("kkk")
add.addEventListener("click" , ADD) 
function ADD() {
  console.log('kjjjj')
    const goodss = document.querySelectorAll('.goodss')

    goodss.forEach((goods) => {
    

      
    goods.onclick = () => {GOODS()};
    
    function GOODS() {
       
        const goodsName = document.getElementById("goodsName")
        const  fee = document.getElementById("fee")
        const expiry = document.getElementById("expiry")
       
        SAVE.addEventListener("click" , save)
    
        function save() {
          var GOODSNAME = ""
           if(goods.innerText === "고정석"){ GOODSNAME = "fixedType"}
            else if(goods.innerText === "기간제"){ GOODSNAME = "daysType"}
                   else if(goods.innerText ==="자유석") { GOODSNAME = "feeType"} 

           if(goodsName.value===""|| fee.value === "" || expiry.value === "") {return alert("상품 기입란에 공백이 존재 하면 안됩니다.")}        
          const req = {
            save:"save",
            cdId: timeID,
           goodsType:GOODSNAME, // 상품 타입
           feeName: goodsName.value, //상품 명
           fee:fee.value, // 요금
           expiry:expiry.value, // 유효기간
           indexType:GOODSNAME,
    
    
          }    
        
         fetch("/adminProductlist" , {
      method: "POST", 
      headers: {
        "Content-Type" : "application/json",
      } ,
      body: JSON.stringify(req),
        
      })
      .then((res) =>  res.json())
      .then((res) =>{  
        location.href = location.href  
        alert("추가되였습니다")
        // location.href = location.href
      }) 
         
        }
    
    
    }
    
    })

}

function resave(a,b,c,d,e,f) {  //104line 에서 받아온 파라미터 
console.log(a) //cdId
console.log(b) //상퓸이름
console.log(c) //금액
console.log(d)//유효기간
console.log(e) //인덱스
console.log(f) //상품 타입
const i =document.getElementById("goodsName").setAttribute('placeholder',b)
const z =document.getElementById("fee").setAttribute('placeholder', c)
const y = document.getElementById("expiry").setAttribute('placeholder', d)
// console.log(i + br + z + br + y)
const goodsName = document.getElementById("goodsName")
const  fee = document.getElementById("fee")
const expiry = document.getElementById("expiry")

 additionModal.classList.toggle("hidden")
 TYPE.style = "display:none"
 resaveName.innerText ="상품 수정"
//  console.log(additionModal.classList.toggle("hidden"))
//  dropdownButtons.className=''
   
SAVE.addEventListener("click" , save)
    
function save() {
  
   goodsName.setAttribute('value',b)
  fee.setAttribute('value', c)
  expiry.setAttribute('value', d)

   if(goodsName.value===""|| fee.value === "" || expiry.value === "") {return alert("상품 기입란에 공백이 존재 하면 안됩니다.")}        
  const req = {
  save:"resave",
  cdId: a,
  goodsType:f, // 상품 타입
  feeName: goodsName.value, //상품 명
   fee:fee.value, // 요금
  expiry:expiry.value, // 유효기간
  index:e,
  indexType:f


  }    
  console.log(req)

        
  fetch("/adminProductlist" , {
    method: "POST", 
    headers: {
      "Content-Type" : "application/json",
    } ,
    body: JSON.stringify(req),
      
    })
    .then((res) =>  res.json())
    .then((res) =>{    
      alert("수정되였습니다.")
       location.href = location.href
    }) 
       
      
 
}
}

function delet(cdId,index,indexType) {


const req = {
  delet: "delet",
  cdId ,
  index,
  indexType,


}

fetch("/adminProductlist" , {
  method: "POST", 
  headers: {
    "Content-Type" : "application/json",
  } ,
  body: JSON.stringify(req),
    
  })
  .then((res) =>  res.json())
  .then((res) =>{    
    location.href = location.href
    alert("삭제되였습니다.")
    // location.href = location.href
  }) 


}