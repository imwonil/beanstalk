"use strict"


const row = document.querySelectorAll(".day-number")
const rows = [...row]
const prevButton = document.querySelector(".go-prev")
const nextButton = document.querySelector(".go-next")
const selectButton = document.querySelector(".select-button")


let currentYear = moment().year()// 현재 년도
let currentMonth =  moment().month()+1 // 현재 월 (0부터 시작하므로 +1 해줌)

//option 동적 생성하기 
addEventListener("load", ()=>{
for (let i=0; i<4; i++){
    let year = document.createElement("option"); 
    year.innerText = 2021 + i; 

  
    document.querySelector("select[name=year]").append(year); 
  }
  
  for(let i=1; i<=12; i++){
          let month = document.createElement("option"); 
          month.innerText = i; 

          document.querySelector("select[name=month]").append(month); 
      }
})

selectButton.addEventListener("click", ()=>{
  //today를 가리키는 원판 제거 
  rows.forEach((row)=>row.classList.remove("day-actived"))

  let selectedYear = document.querySelector("select[name=year] option:checked").text;
  let selectedMonth = document.querySelector("select[name=month] option:checked").text;
  

  const renderCalender = ()=>{


    document.querySelector(".month-year").textContent= `${selectedYear}년 ${selectedMonth}월`

    //option으로 선택한 연도와 월을 파라미터로 던진다. 
    renderDays(selectedYear, selectedMonth);
    currentDate(selectedYear, selectedMonth)
  }
  
  if(selectedYear !== "연도" && selectedMonth !== "월"){
   

    currentYear = selectedYear;
    currentMonth = selectedMonth ;

     renderCalender();
  }
  


 

})
  


//현재 연도와 현재 월을 로딩해주는 함수 
const renderCalender = ()=>{

  document.querySelector(".month-year").textContent= `${currentYear}년 ${currentMonth}월`
  renderDays(currentYear, currentMonth);
  currentDate(currentYear, currentMonth)

}
renderCalender();

//이전과 다음 버튼 클릭시 currentMonth에 +1, -1을 할당시키고 renderCalender를 실행시킨다. 



const prevMonth = ()=>{
  currentYear = moment(currentYear+"-"+currentMonth).subtract(1, "M").format('YYYY')
  currentMonth = moment(currentYear+"-"+currentMonth).subtract(1, "M").format('M')
  renderCalender();
}

const nextMonth = ()=>{
  currentYear = moment(currentYear+"-"+currentMonth).add(1, "M").format('YYYY')
  currentMonth = moment(currentYear+"-"+currentMonth).add(1, "M").format('M')
  renderCalender();

}
prevButton.addEventListener("click", ()=>{
  prevMonth()
})

nextButton.addEventListener("click", ()=>{
  nextMonth()
})


//사용자가 보는 월에 따라서 여러 변수들을 달리 계산해주는 함수

function renderDays (currentYear, currentMonth) {

  const prevMoment = moment(currentYear+"-"+currentMonth).subtract(1, "M").format('YYYY-M')
  const nextMoment = moment(currentYear+"-"+currentMonth).add(1, "M").format('YYYY-M')

  const prevEnd = moment(prevMoment).endOf('month').format('YYYY-M-D')
  const nextStart = moment(nextMoment).startOf('month').format('YYYY-M-D')
  //이번달 마지막일, 이전달 마지막 일 지난달 마지막 날의 요일과 다음달 첫번째 날의 요일을 확인한다. 
  const endDay = moment(currentYear+"-"+currentMonth).endOf('month').format('D')
  const prevEndday = moment(prevMoment).endOf('month').format('D')

  const prevDate = moment(prevEnd).day(); 
  const nextDate = moment(nextStart).day();


   currentArr(prevDate, prevEndday, endDay)
}

//날짜 배열을 만든다. 

function currentArr (prevDate, prevEndday, endDay) {
  //prevDate는 지난달 마지막 일의 요일, prevEndday는 지난달 마지막일, endDay는 현재 달 마지막일 
  let arr = [];
  
  for (let i=0; i<=prevDate; i++){
    arr.push((prevEndday - (prevDate-i)).toString())
  }

  for (let i=1; i<7-prevDate; i++){
    arr.push(i)
             }
  
    for (let i=7-prevDate; i<=endDay; i++){
      arr.push(i)
      }
   
  //현재달의 시작 일과 마지막 일의 배열에서의 idx를 확인한다. 
  let startIdx = arr.findIndex((arrs) => arrs == "1")
  let endIdx = parseInt(endDay, 10) + startIdx


  for (let i=1; i<=42-endIdx; i++){
      arr.push(i)
    }

  // 현재 달의 날짜를 매칭한다. 
  
  for (let i=0; i<42; i++){
    row[i].innerHTML = arr[i]
  }

  // 각 날짜에 대해서 이전달과 다음달에 포함된 날짜는 연하게 표기하겠다.
  rows.forEach((row)=>{
    row.classList.remove("day-gray")
  })

  for (let i=0; i<startIdx; i++){
    row[i].classList.add("day-gray")
 
  }

  for (let i=endIdx; i<42; i++){
     row[i].classList.add("day-gray")
    
  }
  //arr의 요소들을 모두 제거 
  arr.length = 0;

}


//
function currentDate(currentYear, currentMonth){
  //currentYear과 currentMonth는 달력에 표기된 연도와 날짜를 일컫는 것임

  //today를 가리키는 원판 제거 
  rows.forEach((row)=>row.classList.remove("day-actived"))
  
  let todayDate = moment().date()

  if(currentYear == moment().year() && currentMonth == moment().month()+1){
    let idx = rows.findIndex((row)=>row.innerHTML == todayDate && !row.classList.contains("day-gray")) 
    rows[idx].classList.add("day-actived")
    
}
}



const chargedTable = document.querySelector(".charged-table")
const tableRows = chargedTable.rows


//클릭한 날짜에 대해 day-actived 클래스 적용 

rows.forEach((row, index) => {
  row.addEventListener("click", (e) => {
    // 모든 row에서 'day-actived' 클래스를 제거
    rows.forEach((r) => r.classList.remove("day-actived"));

    // 클릭된 row에 'day-actived' 클래스를 추가
    e.currentTarget.classList.add("day-actived");

    fetchPage();


    //날짜들을 클릭할 때마다 우선 테이블의 thead를 제외하고 모두 제거
    while(tableRows.length > 1){
      chargedTable.deleteRow(-1);
    }

 
  });
});


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
  pageGroup.childNodes.forEach((pageBtn) => {
    pageBtn.addEventListener("click", (e) => {
      pageGroup.childNodes.forEach((num) => {

        if(num.classList.contains("focused-page-btn")){
        num.classList.remove("focused-page-btn");
      };
      e.target.classList.add("focused-page-btn");

        console.log(tableRows)
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
    chargedTable.deleteRow(-1);
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
  pageGroup.childNodes.forEach((pageBtn) => {
    pageBtn.addEventListener("click", (e) => {
      pageGroup.childNodes.forEach((num) => {
        num.classList.remove("focused-page-btn");
      });
      e.target.classList.add("focused-page-btn");
    });
  });

 
})

nextPageButton.addEventListener("click", ()=>{

  while(tableRows.length > 1){
    chargedTable.deleteRow(-1);
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

  console.log(pageIdx, "fe")
 
  renderButton();
  pageCheck();

  pageGroup.childNodes[0].classList.add("focused-page-btn")

  //pageNumbers 중 어떤 하나의 노드를 클릭시 focused-page-btn를 활성화한다. 
  pageGroup.childNodes.forEach((pageBtn) => {
    pageBtn.addEventListener("click", (e) => {
      pageGroup.childNodes.forEach((num) => {
        num.classList.remove("focused-page-btn");
      });
      e.target.classList.add("focused-page-btn");
    });
  });
})



lastButton.addEventListener("click", ()=>{
  
  while(tableRows.length > 1){
    chargedTable.deleteRow(-1);
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
  pageGroup.childNodes.forEach((pageBtn) => {
    pageBtn.addEventListener("click", (e) => {
      pageGroup.childNodes.forEach((num) => {
        num.classList.remove("focused-page-btn");
      });
      e.target.classList.add("focused-page-btn");
    });
  });

})


firstButton.addEventListener("click", ()=>{


  while(tableRows.length > 1){
    chargedTable.deleteRow(-1);
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
  pageGroup.childNodes.forEach((pageBtn) => {
    pageBtn.addEventListener("click", (e) => {
      pageGroup.childNodes.forEach((num) => {
        num.classList.remove("focused-page-btn");
      });
      e.target.classList.add("focused-page-btn");
    });
  });
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
        displayData(json)
        
          
          })
        }

function displayData(json){

    const activedText = document.querySelector(".day-actived").textContent
   let activedDate = ""
    let activedMonth = ""
  const activedYear = `${currentYear}`.substr(2,4)


  
  if (activedText < 10) {
    activedDate =  "0" + activedText
  } else {
    activedDate =   activedText
  }

  if (currentMonth < 10) {
    activedMonth =   "0" + currentMonth
  } else {
    activedMonth =   activedText
  }


   let activedDay = activedYear + activedMonth + activedDate

  findData(json, activedDay)


}



//필터화된 데이터 어레이를 담는 빈배열 정의
let filteredData = []


function findData(json, activedDay){

  filteredData.length = 0;

  for(let i = 0; i < json.length; i++){
    const findIndexArray = json[i].approvalDay
      .map((item, index) => {
   
        if(item.substr(0,6)  == activedDay) 
          return {
            name : json[i].name,
            phoneNumber : json[i].phoneNumber,
            goodsName : json[i].goodsName[index],
            approvalDay : json[i].approvalDay[index],
            
          }
        else return -1;

        
      })
      .filter((item) => item !== -1)

    for (let value of findIndexArray){

      filteredData.push(value)
    }
  }
   sliceData(filteredData)
}



//이전과 다음 버튼을 누를 때마다, 각각의 클릭 이벤트 발생시 이 함수가 호출되어야 한다. 만약 데이터의 길이가 18이고,
//한 페이지당 보여주는 데이터의 수가 8개라면 8 + 8 + 2로 나타나야 한다.
//start는 0, end는 8, 이후에는 focused된 버튼의 (text - 1)* 8이 시작점, text * 8이 시작점이 되어야 한다. 
function sliceData(arr){

  while(tableRows.length > 1){
    chargedTable.deleteRow(-1);
  }

  const tbody = document.querySelector(".charged-table tbody")

  let clickedBtn = document.getElementsByClassName("focused-page-btn")[0].textContent - 1

  dataStart = clickedBtn * pagePerData
  dataEnd = clickedBtn * pagePerData + pagePerData

  let slicedData = arr.slice(dataStart, dataEnd)

  console.log(arr, slicedData, dataStart, dataEnd)

  for(let i = 0; i < slicedData.length; i++){
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')
    const td4 = document.createElement('td')


    td1.innerText = slicedData[i].name
    td2.innerText = slicedData[i].phoneNumber
    td3.innerText = slicedData[i].goodsName
    td4.innerText = slicedData[i].approvalDay

    td1.classList.add("styled-td")
    td2.classList.add("styled-td")
    td3.classList.add("styled-td")
    td4.classList.add("styled-td")
    
    const tr = document.createElement('tr')

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    
    tbody.appendChild(tr)
  }

  
}
  




