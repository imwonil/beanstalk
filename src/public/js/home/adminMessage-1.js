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

//메세지 작성 취소 버튼, 메세지 작성 버튼, 메세지 확인 버튼
const addCancelBtn = document.querySelector(".add-cancel-btn")
const messageAddBtn = document.querySelector(".message-add-btn")

//메세지 작성 모달
const messageAddModal = document.querySelector(".message-add-modal")

//메세지 확인 모달
const messageCheckModal = document.querySelector(".message-check-modal")

//메세지 확인 모달의 취소 버튼

const checkCancelBtn = document.querySelector(".check-cancel-btn")


//메세지 확인 버튼

const messageCheckBtn = document.querySelector(".message-check-btn")

//메세지 작성 모달의 취소 버튼 누르기
addCancelBtn.addEventListener("click", ()=>{
    messageAddModal.classList.toggle("hidden")
})


messageCheckBtn.addEventListener("click", ()=>{
   messageCheckModal.classList.toggle("hidden")
})

// const kaka = document.querySelectorAll(".kaka")


fetch('/kokoTime')
.then(res => res.json())
.then(data => { 
 
  for(var i=0; data.length>i; i++) {

    const  kakaMessage = data.filter(function (addSave) { return addSave.sendName ===data[i].sendName });
   
    
    if( data[i].set === '1') {

      document.querySelector("#feeMessage").setAttribute("kokoMessageUse",`${data[i].set}`)

      kaka.forEach((item, index) => {
        if(item.dataset.active === "isactiv-fee-activ") {

          
        }
 
        item.onclick = () =>  {kkk(item.dataset.unactive, item.dataset.active)}
   
   
     })

    }
    // if(kakaMessage[0].sendnNme === data[i].sendName) {

    //     console.log(data[i])

    // }else if(kakaMessage[0].sendName === data[i].sendName) {

    //   console.log(data[i])
    // }
  }
  
  

         
 })
  
  kaka.forEach((item, index) => {
 
     item.onclick = () =>  {kkk(item.dataset.unactive, item.dataset.active)}


  })
  function kkk(unactive, active) {


if(active ==="isactiv-fee-activ") {


} else if(active ==="isactiv-fixed-activ") {
 

}
  }



//option 동적 생성하기 
addEventListener("load", ()=>{
for (let i=0; i<=7; i++){
    let day = document.createElement("option"); 
    day.innerText = `${i}일`; 
    document.querySelector("select[name=day]").append(day); 
  }

  for(let i=0; i<=23; i++){
          let time = document.createElement("option"); 
          time.innerText = `${i}시간`; 

          document.querySelector("select[name=time]").append(time); 
      }
})


