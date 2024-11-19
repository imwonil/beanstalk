fetch('/setKind')
.then(res => res.json())
.then(data => { console.log(data.wonset)
for(var i=0; data.wonset.length>i; i++) {



 const regex = /[^0-9]/g;
        const result = data.wonset[i].replace(regex, "");
        const number = parseInt(result);

   if(data.kindSet[i]=== "고정석") {
    const setColor=  document.getElementById(number).style ="background-color: #761ced;"}
    else if(data.kindSet[i] === "기간제")  {
        const setColor=  document.getElementById(number).style="background-color: #4cc4d4;" }
     else if(data.kindSet[i] === "자유석") {
              console.log("kkkk")
          const setColor=  document.getElementById(number).style ="background-color: #4cc4d4;" 
          
        }
}   

  })
const SNLength =document.getElementsByClassName("seats-number").length
const goods = document.querySelectorAll(".goods")
const apply = document.getElementById("apply")
const FeeSet =document.getElementsByClassName("sc-seats-number").length
console.log(document.getElementsByClassName("sc-seats-number"),"6",FeeSet)

// 고정석, 기간제 
for(var i=0; SNLength>i; i++) { 

   const seetNumger = document.getElementsByClassName("seats-number")[i].outerText 
   
    document.getElementsByClassName("seats-number")[i].id = seetNumger
   
       const text=  document.getElementById(seetNumger).innerText
   
      const indexID =  document.getElementById(seetNumger).id =seetNumger;
    document.getElementById(seetNumger).onclick = () => {indexFunction(text)};
}

// 자유석,
for(var i=0; FeeSet>i; i++) {
      
    const feeSeetNumger = document.getElementsByClassName("sc-seats-number")[i].outerText 
    
     document.getElementsByClassName("sc-seats-number")[i].id = feeSeetNumger
    
        const text=  document.getElementById(feeSeetNumger).innerText
    
       const indexID =  document.getElementById(feeSeetNumger).id =feeSeetNumger;
     document.getElementById(feeSeetNumger).onclick = () => {indexFunction(text)};
 }

function indexFunction(textSet) {
    document.querySelector("#apply").setAttribute("set", `${textSet}Set`)
    modalContainer.classList.toggle("hidden");
    function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;

    if (isDropdownOpen) {
        dropdownMenu[idx].classList.remove('hidden');
    } else {
        dropdownMenu[idx].classList.add('hidden');
    }
  

goods.forEach((goodsName) => { goodsName.onclick = () => {goodsClick(goodsName.innerText)} })}

function goodsClick(goodsNameText) {

     if(goodsNameText ==="고정석" ||goodsNameText ==="자유석" ||goodsNameText ==="기간제"){
     document.querySelector("#apply").setAttribute("goods", `${goodsNameText}`)
  
}
     if(goodsNameText ==="남자 전용" || goodsNameText ==="여자 전용" ||goodsNameText ==="남여 공용") {

            document.querySelector("#apply").setAttribute("gender", `${goodsNameText}`)
   
    }

}
console.log(apply)

toggleDropdown();


// 드룹 메뉴 생성 

dropdownButton.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
     
        idx = dropdownButton.indexOf(btn)
        toggleDropdown();

    })

})

  
}



 
apply.addEventListener("click", APPLY)

function APPLY() {
const set =   document.querySelector("#apply").getAttribute("set")
const goodss= document.querySelector("#apply").getAttribute("goods")
const genderss = document.querySelector("#apply").getAttribute("gender") 
   
if(goodss === null) { return alert("상품을 선택 하세요")} 
if(genderss === null) { return alert("성별를 선택 하세요")} 
  const req = {
  genderss,
  goodss,
  wonSet : set

    }
 

	fetch("/adminBench", {
		method: "POST",
		headers: {
		  "Content-Type" : "application/json",
		} ,
		body: JSON.stringify(req),
	   
		})
		.then((res) =>res.json())
		.then((res) =>  { 
			
		  if(res.success === "apply") {  alert("자리 타입이 설정 되였습니다.") ;
                           location.href = "/adminindex"}
          if(res.success === "repair"){  alert("자라 타입을 수정 하였습니다.");
          location.href = "/adminindex"}

		 
		}) 
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
const seatsContainer = document.querySelectorAll('.seats-container');
const modalContainer = document.querySelector(".modal-container")
const cancelButton = document.querySelector(".cancel-button")
const adjustButton = document.querySelector(".adjust-button")
const clickedSeat = document.querySelector(".clicked-seat")



// seatsContainer.forEach((ele)=>{
//     ele.addEventListener("click", function(){
    

//         //클릭한 좌석 번호를 indexFunction을 통해 받아오세요. clickedSeat가 --번에서 --이랍니다. 
//      // clickedSeat.innerHTML =  ??
//     }
//                         )})

//취소 버튼 누르면 모달 꺼짐
cancelButton.addEventListener("click", ()=>{
    modalContainer.classList.toggle("hidden")
})
