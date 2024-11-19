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

//좌석 종류 선택, 상품, 시간 같이 옵션의 대가리 부분
const dropdownButtons = document.querySelectorAll('.dropdown-button');
//일일권, 기간제, 고정석 등 요소들의 컨테이너
const dropdownMenus = document.querySelectorAll('.dropdown-menu');
//일일권, 기간제, 고정석 등 각 요소

const TEB = document.querySelectorAll('.teb');

TEB.forEach((tebKinde) => {

 tebKinde.onclick = () => {tebClick(tebKinde.innerText)};



})



function tebClick(tebKinde) {

    fetch('/adminGoodsKiosk')
.then(res => res.json())
.then((data => { 
    for(var i =0; i<data.length; i++ ) {
    const menz = data.filter(function (setAdd) { return setAdd.indexType === data[i].indexType });
    if(tebKinde === "고정석") {
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
         
            
          
           
            td0.innerText = "RoomType"
            td1.innerText = menz[0].feeName[y] 
            td2.innerText = menz[0].fee[y]  
            td3.innerText =  menz[0].expiry[y]
          
            
           
            tr.appendChild(td0).id = [y]
            tr.appendChild(td1).id = menz[0].feeName[y] 
            tr.appendChild(td2).id =  menz[0].fee[y]  
            tr.appendChild(td3).id = menz[0].expiry[y]
            tr.appendChild(td4).id =  `default${[y]}`
           
            td4.appendChild(button).className ="correction-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
            td4.appendChild(button2).className ="deletion-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
             
            button.innerText ="수정"
            button2.innerText="삭제"
            document.getElementById(`default${[y]}`).setAttribute('cdId',`${menz[0].cdId}`)

          
          
           button.className ="correction-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
           button2.className= "deletion-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1"
            const feeName = document.getElementById(`${menz[0].feeName[y] }`)
            const fee = document.getElementById(`${menz[0].fee[y]  }`)
            const expiry = document.getElementById(`${menz[0].expiry[y]}`)
            const index = document.getElementById(`${[y]}`)
            const cdId = document.getElementById(`default${[y]}`).getAttribute('cdId',`${menz[0].cdId}`)
             
            // console.log( document.getElementById('${data[i].type}'))
             document.getElementById(`default${[y]}`).onclick = () => {myFunction(cdId,feeName.id,fee.id,expiry.id, index.id, "fixedType")};
          }
        
  
    }else if(tebKinde === "기간제") { 
           
     
  
    }else if(tebKinde === "자유석") {


        
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



dropdownButton.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        
        idx = dropdownButton.indexOf(btn)
        console.log(idx)
        
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



const addCancelBtn = document.querySelector(".add-cancel-btn") 
const addAdditionBtn = document.querySelector(".add-Addition-btn") 
    
const cancelBtn = document.querySelector(".cancel-button")
const adjustBtn = document.querySelector(".adjust-button")



additionBtn.forEach((ele)=>{
    ele.addEventListener("click", ()=>{
        additionModal.classList.toggle("hidden")
    })
})


//취소 버튼 누르면 추가 모달 꺼짐
addCancelBtn.addEventListener("click", ()=>{
    additionModal.classList.toggle("hidden")
})


//취소 버튼 누르면 수정 모달 꺼짐

cancelBtn.addEventListener("click", ()=>{
    correctionModal.classList.toggle("hidden")
})


correctionBtn.forEach((ele)=>{
    ele.addEventListener("click", ()=>{
        correctionModal.classList.toggle("hidden")
    })
})


//추가 버튼을 눌러서 나타난 모달에서 추가 버튼을 누르면 새로 고침이 되어서 해당 목록이 테이블에 나타나게끔 js를 설계해야 한다. 

//수정 버튼을 눌러서 나타난 모달에서 수정 버튼을 누르면 새로 고침이 되어서 해당 목록이 테이블에 나타나게끔 js를 설계해야 한다.