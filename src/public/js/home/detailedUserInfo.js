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

const timeChangeBtn = document.querySelectorAll(".time-change-btn")
const timeChangeModal = document.querySelector(".time-change-modal")
const timeModalCancel = document.querySelector(".time-modal-cancel")

const detailName = document.querySelector("#user-name")
const detailPhone = document.querySelector("#user-phoneNumber")
const addDayName = document.querySelector("#add-day-name")

const daySubtraction = document.querySelector("#day-subtraction")
const dayAdd = document.querySelector("#day-add")
const inputDays = document.querySelector("#input-days")
const inputTime = document.querySelector("#input-time")
const inputMinute = document.querySelector("#input-minute")

timeChangeBtn.forEach((ele)=>{
 
  ele.addEventListener("click", ()=>{
    timeChangeModal.classList.toggle("hidden")
  })
})


timeModalCancel.addEventListener("click", ()=>{ //닫기
  
  timeChangeModal.classList.toggle("hidden")
})



const valChangeBtn = document.querySelectorAll(".val-change-btn")
const valChangeModal = document.querySelector(".val-change-modal")
const valModalCancel = document.querySelector(".val-modal-cancel")



valChangeBtn.forEach((ele)=>{
  
  ele.addEventListener("click", ()=>{
    valChangeModal.classList.toggle("hidden")
  })
})

valModalCancel.addEventListener("click", ()=>{
console.log("lkkk")
  valChangeModal.classList.toggle("hidden")
})

fetch('/adminNext')
.then(res => res.json())
.then(data => { 
 
  detailPhone.innerText =data[0].phon
 console.log(detailName)
  detailName.innerText = data[0].name
  
  console.log(data[0].UseTime.length)
  for(var i=0; data[0].UseTime.length>i; i++) {

    

    
    
  } 
  daySubtraction.addEventListener("click", SUBT) 
  dayAdd.addEventListener("click", ADD)
  function SUBT () {
    if(inputDays.value === "" && inputTime.value === "" && inputMinute.value ==="") {
      return  alert("3개의 작성란에 1 이상이 여야합니다")
    }
    // const req = {
       
    //   resaveTime: inputTime.value,
    //   phon: data[0].phon,
      
    //   sub : "sub",
    //   index : listInfo
    // }
    // console.log(req,"sub")
    // fetch("/adminControl", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type" : "application/json",
    //   } ,
    //   body: JSON.stringify(req),
        
    //   }).then((res => res.json()))
    //     .then((res) => {  
      
    //       })
    
  }

  function ADD () {
    if(inputDays.value === "" &&  inputTime.value === "" && inputMinute.value ==="") {
      return  alert("3개의 작성란에 1 이상이 여야합니다")
    }
  //   const req = {
     
  //     resaveTime: inputTime.value,
  //    phon: data[0].phon,
     
  //     add : "add",
  //     index : listInfo
  //  }
   
  //    fetch("/adminControl", {
  //      method: "POST",
  //      headers: {
  //        "Content-Type" : "application/json",
  //      } ,
  //      body: JSON.stringify(req),
         
  //      }).then((res => res.json()))
  //        .then((res) => {  
           
  //          })



  }

}




)