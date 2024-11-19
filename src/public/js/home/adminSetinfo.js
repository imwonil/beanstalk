"use strict"

const designationBtn = document.querySelector(".designation-btn")

designationBtn.addEventListener("click", () =>{
  location.href = "/adminSetproduct"
})

//검색해서 일치하는 사람 데이터 조회, 선택시 해당 정보가 서버로 전달