"use strict"


const row = document.querySelectorAll(".day-number")
const rows = [...row]
const prevButton = document.querySelector(".go-prev")
const nextButton = document.querySelector(".go-next")
const selectButton = document.querySelector(".select-button")


let currentYear = moment().year()// 현재 년도
let currentMonth =  moment().month()+1 // 현재 월 (0부터 시작하므로 +1 해줌)
let currentDay = moment().date() // 현재 일


let activedDate = ""
let activedMonth = ""
let activedYear = `${currentYear}`.substr(2,4)


let activedText = ""



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

console.log(selectedYear, "선택연")
  
  if(selectedYear !== "연도" && selectedMonth !== "월"){

    document.querySelector(".month-year").textContent= `${selectedYear}년 ${selectedMonth}월`

    //option으로 선택한 연도와 월을 파라미터로 던진다. 
    renderDays(selectedYear, selectedMonth);
    currentDate(selectedYear, selectedMonth)
  


    currentYear = selectedYear;
    currentMonth = selectedMonth ;

    console.log(currentYear, "11112d")

     renderCalender();


    //선택 버튼 클릭시, 날짜를 지정하지 않은 경우에는 1일의 내역을 조회할 수 있게 바꾼다.
    
    activedDate = "01";

   // currentYear= currentYear.substr(2,4)
  // modifyBannerDate(currentYear, currentMonth, activedDate)
  }
})
  


//현재 연도와 현재 월을 로딩해주는 함수 
const renderCalender = ()=>{

  document.querySelector(".month-year").textContent= `${currentYear}년 ${currentMonth}월`
  renderDays(currentYear, currentMonth);
  currentDate(currentYear, currentMonth)

  // modifyBannerDate(currentYear, currentMonth, activedDate)
  clickDate();
  fetchPage();
  console.log(activedText, "d1d1d2")

}
renderCalender();

//이전과 다음 버튼 클릭시 currentMonth에 +1, -1을 할당시키고 renderCalender를 실행시킨다. 


//말풍선 안에 있는 연도와 월 값 
const focusedYear = document.querySelector("#activedYear")
const focusedMonth = document.querySelector("#activedMonth")

focusedYear.innerHTML = currentYear
focusedMonth.innerHTML = currentMonth


const prevMonth = ()=>{
  console.log(currentYear)
  currentYear = moment(currentYear+"-"+currentMonth).subtract(1, "M").format('YYYY')
  currentMonth = moment(currentYear+"-"+currentMonth).subtract(1, "M").format('M')

  focusedYear.innerHTML = currentYear
  focusedMonth.innerHTML = currentMonth

  //월 매출 값 초기화
  const monthSales = document.querySelector("#month-sales")
  monthSales.innerHTML = 0




  renderCalender();
}

const nextMonth = ()=>{
  currentYear = moment(currentYear+"-"+currentMonth).add(1, "M").format('YYYY')
  currentMonth = moment(currentYear+"-"+currentMonth).add(1, "M").format('M')

  focusedYear.innerHTML = currentYear
  focusedMonth.innerHTML = currentMonth

  //월 매출 값 초기화
  const monthSales = document.querySelector("#month-sales")
  monthSales.innerHTML = 0
  
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


//클릭한 날짜에 대해 day-actived 클래스 적용 
function clickDate(){
  rows.forEach((row) => {
    row.addEventListener("click", (e) => {
      // 모든 row에서 'day-actived' 클래스를 제거
      rows.forEach((r) => r.classList.remove("day-actived"));

      // 클릭된 row에 'day-actived' 클래스를 추가
      e.currentTarget.classList.add("day-actived");


      activedText = document.querySelector(".day-actived").textContent

      fetchPage();


      //날짜들을 클릭할 때마다 우선 테이블의 thead를 제외하고 모두 제거
      while(tableRows.length > 1){
        chargedTable.deleteRow(-1);
      }


    });
  });


  

}



function currentDate(currentYear, currentMonth){
  //currentYear과 currentMonth는 달력에 표기된 연도와 날짜를 일컫는 것임

  //today를 가리키는 원판 제거 
  rows.forEach((row)=>row.classList.remove("day-actived"))
  
  let todayDate = moment().date()

  if(currentYear == moment().year() && currentMonth == moment().month()+1){
    let idx = rows.findIndex((row)=>row.innerHTML == todayDate && !row.classList.contains("day-gray")) 

    //다른 달 클릭했다가 이번달로 넘어오면 현재 날짜에 해당하는 부분에 원판이 찍히도록 한다.
    activedText = currentDay;
    rows[idx].classList.add("day-actived")
    
}


  //회색으로 처리된 이전/다음 달의 날짜가 아닌 경우에 한해서 이전, 다음버튼 눌러도 기존 activedDate를 유지하도록 한다. 
  rows.forEach((row, idx)=> {
  if(row.innerText == activedText && !row.classList.contains("day-gray")){
    rows[idx].classList.add("day-actived")
  }
  }
  )

  
}



const chargedTable = document.querySelector(".charged-table")
const tableRows = chargedTable.rows




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


//월매출 테이블, 연매출 테이블
const yearlyTable = document.querySelector(".yearly-sales-table");
const monthlyTable = document.querySelector(".monthly-sales-table");


//연도, 날짜 선택
const yearChoiceBtn = document.querySelector(".year-choice-btn");
const monthChoiceBtn = document.querySelector(".month-choice-btn");


const yearlyTableRows = yearlyTable.rows;
const monthlyTableRows = monthlyTable.rows 



//월매출의 상세정보에 있는 페이지네이션을 담는 컨테이너와 일매출에서의 페이지네이션 
const paginationContainer = document.querySelector("#pagination-container")
const paginationWrap = document.querySelector(".pagination-wrap")
const paginationContent = document.querySelector(".pagination-content")




const tab = document.querySelectorAll(".tab")

//일매출, 월매출, 연매출 클릭시 fetchpage()를 호출한다.

tab[0].addEventListener("click", ()=>{
  fetchPage();
})

tab[1].addEventListener("click", ()=>{
  fetchPage();
})


tab[2].addEventListener("click", ()=>{
  fetchPage();
})


//


function fetchPage() {
  fetch('/paymentHistory')
        .then((response) => response.json())
        .then((json) => { 

           const isDailyTab = tab[0].classList.contains("bg-black")
          const isMonthlyTab =  tab[1].classList.contains("bg-black")
          const isYearlyTab = tab[2].classList.contains("bg-black")
      

          
          if(isYearlyTab){
            //상세 정보를 클릭하면 모달 창 안에 일매출에 있던 페이지네이션이 추가된다. 
            console.log("1")
            calYearlyData(json)
          } 
     
         if(isMonthlyTab){
           calMonthlyData(json)
          } 

        if(isDailyTab){
          displayData(json)
        }

          
          
          })
        }




function displayData(json){
  
  if(activedYear.length == 4){
    activedYear = activedYear.substr(2,4)
  }

  
  if (activedText < 10) {
    activedDate =  "0" + activedText
  } else {
    activedDate =   activedText
  }

  if (currentMonth < 10) {
    activedMonth =   "0" + currentMonth
  } else {
    activedMonth =  currentMonth
  }


  let activedDay = activedYear + activedMonth + activedDate
  

  
  findMonthlyData(json, activedDay)

  //메인배너 날짜 값 조정
  // modifyBannerDate(activedYear, activedMonth, activedDate)

 
}

function calYearlyData(json){

   for (let i = 1; i <=yearlyTableRows.length - 1; i++){
  
     activedYear = [...yearlyTableRows][i].childNodes[0].innerHTML.substr(2,4)

      activedMonth = [...yearlyTableRows][i].childNodes[1].innerHTML


     //월매출 합산이 나타나는 셀의 위치, findMonthlyData 함수의 세번째 파라미터로 던진다. 이 파라미터를 안던지는 경우는 월매출을 보는 경우가 아니라 일매출만 보는 경우이다. 
     let yearlySalesData = [...yearlyTableRows][i].childNodes[2]

     
      let activedDay = activedYear + activedMonth


    
      findMonthlyData(json, activedDay, yearlySalesData)
    
   }
}




function calMonthlyData(json){

   for (let i = 1; i <=monthlyTableRows.length - 1; i++){

     activedYear = new Date().getFullYear().toString().substr(2,4)
     activedMonth = [...monthlyTableRows][i].childNodes[0].innerHTML
     activedDate =  [...monthlyTableRows][i].childNodes[1].innerHTML


     //월매출 합산이 나타나는 셀의 위치, findMonthlyData 함수의 세번째 파라미터로 던진다. 이 파라미터를 안던지는 경우는 월매출을 보는 경우가 아니라 일매출만 보는 경우이다. 
     let monthlySalesData = [...monthlyTableRows][i].childNodes[2]


      let activedDay = activedYear + activedMonth + activedDate



      findMonthlyData(json, activedDay,  monthlySalesData)

   }

  

}



//필터화된 데이터 어레이를 담는 빈배열 정의
let salesArr = []


//적절한 월간 데이터를 먼저 찾고 그 이후에 일간 데이터를 조회하는 방식이다. 
//일매출과 월매출 확인할 때 모두 쓰는 함수이다. 세번째 파라미터는 월매출 볼때만 활용한다. 
function findMonthlyData(json, activedDay, salesData){


  
  for(let i = 0; i < json.length; i++){
    const findMontlyArr = json[i].approvalDay

      .map((item, index) => {

       
        if(item.substr(0,4) == activedDay.substr(0,4)) 
          return {
            name : json[i].name,
            phoneNumber : json[i].phoneNumber,
            goodsName : json[i].goodsName[index],
            fee :  json[i].fee[index],
            approvalDay : json[i].approvalDay[index],
          }
        else return -1;
  
      })
      .filter((item) => item !== -1)
    
    
    for (let value of findMontlyArr){
      salesArr.push(value)
    
    }



  }


    sumOfSales(salesArr, activedDay, salesData)
     sliceData(salesArr, activedDay)




}


function sumOfSales(json, activedDay, salesData){

//월매출과 연매출 데이터를 계산하기
  if(salesData){
     //총계의 초깃값은 0
      let sum = 0;
      let number = activedDay.length == 6 ? 6 : 4;

      json.map((item, index) => {

        if(item.approvalDay.substr(0, number) == activedDay) 
          {

            sum += parseInt(json[index].fee, 10)

            salesData.innerHTML = sum
          }

      })


    //오늘의 매출과 이번달 매출 계산하기. 
  } else {

    const todaySales = document.querySelector("#today-sales")
    const monthSales = document.querySelector("#month-sales")

    let todaySum = 0;
    let monthSum = 0;


    
    const year = new Date().getFullYear().toString().substr(2,4)
    const month = (new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : "0" + (new Date().getMonth() + 1));
    const date = new Date().getDate() > 9 ? new Date().getDate() : "0" + new Date().getDate();


    const day = year + month + date
    
    
    json.map((item, index) => {

      if(item.approvalDay.substr(0, 6) == day) 
        {

          todaySum += parseInt(json[index].fee, 10)

          todaySales.innerHTML = todaySum
        }

      if(item.approvalDay.substr(0, 4) == activedDay.substr(0, 4)) 
        {

          monthSum += parseInt(json[index].fee, 10)

          monthSales.innerHTML = monthSum
          
      

          
        }

      
    })

    
  }


}



//결제 내역 테이블의 table Row를 클릭시 호출, 결제 상세 모달 관련, 우선 테이블이 sliceData에 의해 만들어져야 정의가 된다. 


const paymentDetails = document.querySelector(".payment-details-modal")

const paymentDetailsCancelBtn = document.querySelector(".payment-details-cancel-btn")

paymentDetailsCancelBtn.addEventListener("click", () => {
  paymentDetails.classList.toggle("hidden");
});



function sliceData(arr, activedDay){
  //일간 데이터는 월간 데이터를 먼저 만들고 데이터를 자르는 함수 내에서 구한다. 
  const dailyData = arr.filter((ele)=> ele.approvalDay.substr(0,6) == activedDay)

  while(tableRows.length > 1){
    chargedTable.deleteRow(-1);
  }
  const tbody = document.querySelector(".charged-table tbody")

  let clickedBtn = document.getElementsByClassName("focused-page-btn")[0].textContent - 1

  dataStart = clickedBtn * pagePerData
  dataEnd = clickedBtn * pagePerData + pagePerData

  
  let slicedData = dailyData.slice(dataStart, dataEnd)
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




  
  //salesArr 초기화
  salesArr.length = 0;

  const userName = document.querySelector("#user-name")
  const userPhoneNumber = document.querySelector("#user-phoneNumber")
  const userPayment = document.querySelector("#user-payment");  

  //테이블이 만들어지고 테이블의 row를 클릭하면 이벤트가 발생된다. 
  const chargedTr = document.querySelectorAll(".charged-table tbody tr")

  chargedTr.forEach((ele, index)=>{
    ele.addEventListener("click", ()=>{
      userName.innerHTML = chargedTr[index].childNodes[0].innerHTML
      userPhoneNumber.innerHTML = chargedTr[index].childNodes[1].innerHTML
      userPayment.innerHTML =  chargedTr[index].childNodes[3].innerHTML
       paymentDetails.classList.toggle("hidden");
  })})

  
}



function searchYearlySales() {
  yearChoiceBtn.addEventListener("click", () => {
    // selectedYear를 선택된 연도로 가져옵니다
    const selectedYear = document.querySelector("select[name=selectedYear] option:checked").value;

    // 테이블 초기화
    while (yearlyTableRows.length > 1) {
      yearlyTable.deleteRow(-1);
    }

    makeYearlyTable(selectedYear);
    fetchPage()
  });
}


function searchmonthlySales() {


 monthChoiceBtn.addEventListener("click", () => {
    // selectedYear를 선택된 연도로 가져옵니다
    const selecteMonth = document.querySelector("select[name=selectedMonth] option:checked").value;

    // 테이블 초기화
    while (monthlyTableRows.length > 1) {
      monthlyTable.deleteRow(-1);
    }

    makeMonthlyTable(selecteMonth);
    fetchPage()
  });
}



document.addEventListener("DOMContentLoaded", () => {

 
  for (let i = 0; i < 3; i++) { // 예를 들어 2021부터 2024까지 연도를 추가
    let year = document.createElement("option");
    year.value = 24 - i; // value 속성 추가
    year.innerText = (2024 - i) + "년"; // 텍스트도 연도로 설정
    document.querySelector("select[name=selectedYear]").append(year);
  }


  const curMonth = new Date().getMonth() + 1

  for (let i = 0; i <= curMonth - 1; i++) { // 예를 들어 2021부터 2024까지 연도를 추가
    let month = document.createElement("option");
    month.value = curMonth - i < 10 ? `0${curMonth - i}` : curMonth - i; // value 속성 추가
    month.innerText = curMonth - i + "월"; // 텍스트도 연도로 설정
  
    document.querySelector("select[name=selectedMonth]").append(month);
  }
  
  searchYearlySales();
  searchmonthlySales();

  
  makeYearlyTable(new Date().getFullYear()); // 현재 연도로 초기화
  makeMonthlyTable(new Date().getMonth() + 1); // 현재 연도로 초기화



  currentDate(currentYear, currentMonth)
  
  //처음 로드되었을 때도 fetchPage()를 호출해야 한다. 
  activedText = document.querySelector(".day-actived").textContent
  activedMonth = currentMonth;

  console.log(activedText, activedMonth, activedYear, "dw")
  fetchPage();

  

});





function makeYearlyTable(selectedYear) {
  for (let i = 1; i <= 12; i++) {
    const tbody = document.querySelector(".yearly-sales-table tbody");
    const tr = document.createElement('tr');
    tr.className = "styled-tr";

    const td0 = document.createElement('td');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');

    td0.className = "styled-table-data";
    td1.className = "styled-table-data";
    td2.className = "styled-table-data";
   

    // 연도
    td0.innerText = selectedYear 
    td1.innerText = i < 10 ? `0${i}` : i;
    td2.innerText = 0; 


    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);

    tbody.appendChild(tr);
  }
}





function makeMonthlyTable(selectedMonth) {

  const curYear = new Date().getFullYear()
  const curMonth = new Date().getMonth() + 1

const lastNumber = 
  selectedMonth == curMonth ? new Date().getDate() 
  :  new Date(curYear, curMonth , 0).getDate()


  for (let i = 1; i <= lastNumber; i++) {
    const tbody = document.querySelector(".monthly-sales-table tbody");
    const tr = document.createElement('tr');
    tr.className = "styled-tr";

    const td0 = document.createElement('td');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');

    td0.className = "styled-table-data";
    td1.className = "styled-table-data";
    td2.className = "styled-table-data";


    // 연도
    td0.innerText = selectedMonth 
    td1.innerText = i < 10 ? `0${i}` : i;
    td2.innerText = 0; 


    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);

    tbody.appendChild(tr);
  }
}



function handleOnInput(el, maxlength) {
  if(el.value.length > maxlength)  {
    el.value 
      = el.value.substr(0, maxlength);
  }
}