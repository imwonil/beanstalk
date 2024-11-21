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



timeChangeBtn.forEach((ele)=>{
  ele.addEventListener("click", ()=>{
    timeChangeModal.classList.toggle("hidden")
  })
})


timeModalCancel.addEventListener("click", ()=>{
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
  valChangeModal.classList.toggle("hidden")
})