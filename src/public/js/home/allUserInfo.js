const userInfoTable = document.querySelector(".user-info-table")
const tableRows = userInfoTable.rows


//pagenatiion 시작 

const nextPageButton = document.querySelector(".next")
const prevPageButton = document.querySelector(".prev")
const firstButton =  document.querySelector(".first")
const lastButton = document.querySelector(".last")
const pagination = document.querySelector(".pagination")
const pageGroup = document.querySelector(".page-group")



let maxPageIdx = 6

let pagePerButton = 3

//내가 어떤 페이지를 보고 있는지
let pageIdx = 0;

//내가 어떤 페이지 그룹을 보고 있는지
let pageGroupIdx = 0;
let maxPageGroup = Math.ceil(maxPageIdx / pagePerButton)

let pagePerData = 8


let buttonStart = pageIdx;
let buttonEnd = pageIdx + pagePerButton




//데이터 슬라이스 시작점/끝점
let dataStart = pageIdx 
let dataEnd = pageIdx + pagePerData 



//페이지네이션 안에서 생성되는 페이지 버튼을 담는 배열
let array = []

function sliceArray(){

  let slicedArray = array.slice(buttonStart, buttonEnd)

  for (let value of slicedArray){
    pageGroup.append(value)
  }



  if(pageGroup.childNodes.length > 0) {
    pageGroup.childNodes.forEach((num) => {

        if(num.classList){
          if(num.classList.contains("focused-page-btn") ){
            num.classList.remove("focused-page-btn");
          };

        }

    })

  }


}

//buttton node를 pageGroupIdx에 따라 생성한다. 
function renderButton(){
  for (let i=1; i<=maxPageIdx; i++){
    let div = document.createElement('div');
    let text = document.createTextNode(`${i}`);
    div.appendChild(text)
    div.classList.add("page-btn")
    array.push(div)
  }
  sliceArray();
}

renderButton();



let pageBtn = document.querySelectorAll(".page-btn")
let pageBtns = [...pageBtn]   

//pageNumbers 중 어떤 하나의 노드를 클릭시 focused-page-btn를 활성화한다. 

//이상한 텍스트 노드 제거
pageGroup.removeChild(pageGroup.firstChild)

function clickEvent(){
  console.log("1111")
  pageGroup.childNodes.forEach((pageBtn) => {
    pageBtn.addEventListener("click", (e) => {
      pageGroup.childNodes.forEach((num) => {

        if(num.classList.contains("focused-page-btn")){
        num.classList.remove("focused-page-btn");
      };
      e.target.classList.add("focused-page-btn");


         fetchPage();
    })
  })
  })


}


pageGroup.childNodes[0].classList.add("focused-page-btn")

clickEvent();

//이전 버튼 & 다음 버튼 모두 가장 좌측 버튼 활성화를 시킴
prevPageButton.addEventListener("click", ()=>{
  while(pageGroup.hasChildNodes()){ //자식 요소가 있는지 확인-false가 될때까지 반복
    pageGroup.removeChild(pageGroup.firstChild); // 첫번째 자식 요소를 삭제
    }

  while(tableRows.length > 1){
    userInfoTable.deleteRow(-1);
  }

   fetchPage();

  pageIdx -= pagePerButton 
  pageGroupIdx -= 1 

  buttonStart = pageIdx;
  buttonEnd = pageIdx + pagePerButton


  renderButton();
  pageCheck();

  //이전 페이지로 이동시 맨 앞에 있는 페이지를 활성화
  pageGroup.childNodes[0].classList.add("focused-page-btn")

  //pageNumbers 중 어떤 하나의 노드를 클릭시 focused-page-btn를 활성화한다. 
  clickEvent()

})

nextPageButton.addEventListener("click", ()=>{

  while(tableRows.length > 1){
    userInfoTable.deleteRow(-1);
  }


  while(pageGroup.hasChildNodes()){ //자식 요소가 있는지 확인-false가 될때까지 반복
    pageGroup.removeChild(pageGroup.firstChild); // 첫번째 자식 요소를 삭제
    }

   fetchPage();


  pageBtns.forEach((pageBtn)=>{
    if(pageBtn.classList.contains("focused-page-btn")){
       pageBtn.classList.remove("focused-page-btn")
    }
  })

  pageIdx += pagePerButton 
  pageGroupIdx += 1
  //buttonStart는 문제가 없는데 최대 배열 개수를 넘어가는 문제를 방지하고자
  //조건문을 써가지고 buttonEnd를 조정하였음
  buttonStart = pageIdx;

  if(pageGroupIdx == maxPageGroup -1){
    buttonEnd = maxPageIdx
  } else {
    buttonEnd = pageIdx + pagePerButton
  }



  renderButton();
  pageCheck();

  pageGroup.childNodes[0].classList.add("focused-page-btn")

  //pageNumbers 중 어떤 하나의 노드를 클릭시 focused-page-btn를 활성화한다. 
  // pageGroup.childNodes.forEach((pageBtn) => {
  //   pageBtn.addEventListener("click", (e) => {
  //     fetchPage();
  //     pageGroup.childNodes.forEach((num) => {
  //       num.classList.remove("focused-page-btn");
  //     });
  //     e.target.classList.add("focused-page-btn");

  //   });
  // });

  clickEvent()

  
})



lastButton.addEventListener("click", ()=>{

  while(tableRows.length > 1){
    userInfoTable.deleteRow(-1);
  }


  while(pageGroup.hasChildNodes()){ //자식 요소가 있는지 확인-false가 될때까지 반복
    pageGroup.removeChild(pageGroup.firstChild); // 첫번째 자식 요소를 삭제
    }

   fetchPage();

  pageBtns.forEach((pageBtn)=>{
    if(pageBtn.classList.contains("focused-page-btn")){
       pageBtn.classList.remove("focused-page-btn")
    }
  })
  pageGroupIdx = maxPageGroup -1
  pageIdx = pagePerButton * (maxPageGroup -1)
  buttonStart = pageIdx;
  buttonEnd = maxPageIdx


  renderButton();
  pageCheck();

  //이게 안되는 이유가 pageNumbers는 첫번쨰 pageGroup에서만 인식이 되는 것인가??
  pageGroup.childNodes[0].classList.add("focused-page-btn")

  //pageNumbers 중 어떤 하나의 노드를 클릭시 focused-page-btn를 활성화한다. 
  clickEvent()

})


firstButton.addEventListener("click", ()=>{


  while(tableRows.length > 1){
    userInfoTable.deleteRow(-1);
  }

  while(pageGroup.hasChildNodes()){ //자식 요소가 있는지 확인-false가 될때까지 반복
    pageGroup.removeChild(pageGroup.firstChild); // 첫번째 자식 요소를 삭제
    }

   fetchPage();



  pageBtns.forEach((pageBtn)=>{
    if(pageBtn.classList.contains("focused-page-btn")){
       pageBtn.classList.remove("focused-page-btn")
    }
  })
  pageGroupIdx = 0
  pageIdx = 0

  buttonStart = pageIdx;
  buttonEnd = pagePerButton


  renderButton();
  pageCheck();

  pageGroup.childNodes[0].classList.add("focused-page-btn")

  //pageNumbers 중 어떤 하나의 노드를 클릭시 focused-page-btn를 활성화한다. 
  clickEvent()
})


//pageGroupIdx에 따라서 처음/이전/다음/마지막 버튼을 toggle 하게 하였음. 
function pageCheck(){


  if(pageGroupIdx==0){
    prevPageButton.classList.add("hidden-btn")
    firstButton.classList.add("hidden-btn")
  } else  {
    if(prevPageButton.classList.contains("hidden-btn"))
    prevPageButton.classList.remove("hidden-btn")

    if(firstButton.classList.contains("hidden-btn")){
      firstButton.classList.remove("hidden-btn")
    }
  }

  if(pageGroupIdx == maxPageGroup -1){
    nextPageButton.classList.add("hidden-btn")
    lastButton.classList.add("hidden-btn")
  } else  {
    if(nextPageButton.classList.contains("hidden-btn")){
      nextPageButton.classList.remove("hidden-btn")
  }
    if(lastButton.classList.contains("hidden-btn")){
     lastButton.classList.remove("hidden-btn")
    }
  }
}


pageCheck();


function fetchPage() {
  fetch('/paymentHistory')
        .then((response) => response.json())
        .then((json) => { 

          classifyData(json)
          })
        }

function classifyData(json){
  for(let i = 0; i < json.length; i++){

    const data = json.map((item) => {

      for (let j = 0; j < item.approvalDay.length; j++){
        return {
          name : item.name,
          phoneNumber : item.phoneNumber,
          goodsName : item.goodsName[j],
          fee :  item.fee[j],
          approvalDay : item.approvalDay[j],
        }

      }
      }
                         )

          makeTable(data)

  }

}



 fetchPage(); 

//유저 정보 모달 
  const userDetailsModal = document.querySelector(".user-details-modal")

//모달에서의 이름과 전화번호
  const userName = document.querySelector("#user-name")
  const userPhoneNumber = document.querySelector("#user-phoneNumber")


//자리 이동, 상세페이지 이동, 닫기

  const seatChangeBtn = document.querySelector(".seat-change-btn")
  const pageChangeBtn = document.querySelector(".page-change-btn")


//닫기 버튼 누르면 모달 사라진다. 
const modalCancelBtn = document.querySelector(".modal-cancel-btn")
modalCancelBtn.addEventListener("click", ()=>{
  userDetailsModal.classList.toggle("hidden")
})




function makeTable(arr){

  while(tableRows.length > 1){
    userInfoTable.deleteRow(-1);
  }
  const tbody = document.querySelector(".user-info-table tbody")

  let clickedBtn = document.getElementsByClassName("focused-page-btn")[0].textContent - 1


  dataStart = clickedBtn * pagePerData
  dataEnd = clickedBtn * pagePerData + pagePerData

 

  let slicedData = arr.slice(dataStart, dataEnd)
  for(let i = 0; i < slicedData.length; i++){
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')
    const td4 = document.createElement('td')
    const td5 = document.createElement('td')

    td1.innerText = slicedData[i].name
    td2.innerText = slicedData[i].phoneNumber
    td3.innerText = slicedData[i].goodsName
    td4.innerText = slicedData[i].fee
     td5.innerText = slicedData[i].approvalDay

    td1.classList.add("styled-td")
    td2.classList.add("styled-td")
    td3.classList.add("styled-td")
    td4.classList.add("styled-td")
     td5.classList.add("styled-td")

    const tr = document.createElement('tr')

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tbody.appendChild(tr)
  }

  // 테이블이 만들어지고 테이블의 row를 클릭하면 이벤트가 발생된다. 
  const userInfoTr = document.querySelectorAll(".user-info-table tbody tr")

  userInfoTr.forEach((ele, index)=>{
    ele.addEventListener("click", ()=>{
      userName.innerHTML = userInfoTr[index].childNodes[0].innerHTML
      userPhoneNumber.innerHTML = userInfoTr[index].childNodes[1].innerHTML
      userDetailsModal.classList.toggle("hidden");
  })})


}

const detailedPageMoveBtn = document.querySelector(".detailed-page-move-btn")

detailedPageMoveBtn.addEventListener("click", ()=>{
  const phoneNumber = userPhoneNumber.innerHTML
  console.log(phoneNumber)
  moveDetailedPage();
})

function moveDetailedPage(){
  
  const phoneNumber = userPhoneNumber.innerText
  
  location.href = `/detailedUserInfo?phoneNumber=${phoneNumber}`
}