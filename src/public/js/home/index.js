const warningModal = document.querySelector(".warning-modal")


const warningModalText = document.querySelector(".warning-modal-text")
  const sucModal = document.querySelector(".suc-modal")

  const sucModalText = document.querySelector(".suc-modal-text")
  
//////////////////////////////Object 객체 생성을 선엄함/////////////////////
class seatInfor {
  constructor(body) {
  this.body = body
        
    }
  }


const SNLength =document.getElementsByClassName("seats-number").length
const goods = document.querySelectorAll(".goods")
const apply = document.getElementById("apply")
const FeeSet =document.getElementsByClassName("sc-seats-number").length

console.log(SNLength,"1")
console.log(FeeSet,"2")
console.log(goods,"3")
// console.log(startBtn,"4")
// console.log(occupancyBtn,"5")

// console.log(cancelBtn)
let isDropdownOpen = true;
let idx = 0;

//좌석 종류 선택, 상품, 시간 같이 옵션의 대가리 부분
const dropdownButtons = document.querySelectorAll('.dropdown-button');
//일일권, 기간제, 고정석 등 요소들의 컨테이너
const dropdownMenus = document.querySelectorAll('.dropdown-menu');
//일일권, 기간제, 고정석 등 각 요소
const dropdownContent = document.querySelectorAll('.dropdown-content')
const dropdownButton = [...dropdownButtons]
const dropdownMenu = [...dropdownMenus]

//기간제, 고정석 id 생성 

for(var i=0; SNLength>i; i++) {

   const seetNumger = document.getElementsByClassName("seats-number")[i].outerText 
   
    document.getElementsByClassName("seats-number")[i].id = seetNumger
   
       const text=  document.getElementById(seetNumger).innerText
   

  
   
      const indexID =  document.getElementById(seetNumger).id =seetNumger;
    document.getElementById(seetNumger).onclick = () => {indexFunction(text )};
}

// 자유석 id 생성
for(var i=0; FeeSet>i; i++) {
      
    const feeSeetNumger = document.getElementsByClassName("sc-seats-number")[i].outerText 
    
     document.getElementsByClassName("sc-seats-number")[i].id = feeSeetNumger
    
        const text=  document.getElementById(feeSeetNumger).innerText
    
       const indexID =  document.getElementById(feeSeetNumger).id =feeSeetNumger;
     document.getElementById(feeSeetNumger).onclick = () => {indexFunction(text)};
 }



fetch('/userGoodsKinds')
.then(res => res.json())
.then( U_G_D => { 

     fetch('/setKind')
     .then(res => res.json())
     .then(data => { 

for(var i=0; data.wonset.length>i; i++) {


    const regex = /[^0-9]/g;
    const result = data.wonset[i].replace(regex, "");
    const number = parseInt(result);
   
   if(data.kindSet[i]=== "고정석") {
   const setColor=  document.getElementById(number).style ="background-color: #761ced;"
    document.getElementById(number).setAttribute("setName",data.kindSet[i] )
    document.getElementById(number).setAttribute("genderNmae",data.gender[i] )
}
   else if(data.kindSet[i] === "기간제")  {
    const setColor=  document.getElementById(number).style="background-color: #4cc4d4;"  
    document.getElementById(number).setAttribute("setName",data.kindSet[i] )
    document.getElementById(number).setAttribute("genderNmae",data.gender[i] )
  }
    
   else if(data.kindSet[i] === "자유석") {
       
      const setColor=  document.getElementById(number).style ="background-color: #4cc4d4;" 
      document.getElementById(number).setAttribute("setName",data.kindSet[i] )
      document.getElementById(number).setAttribute("genderNmae",data.gender[i] )
    }

  //   for(var y =0; U_G_D.length > y; y++) {
  //     for(var k=0; U_G_D[y].wonset.length>k; k++)
  //  if(U_G_D[y].wonset[k] !=="") {


  //   const regex = /[^0-9]/g;
  //   const result = U_G_D[y].wonset[k].replace(regex, "");
  //   const number1 = parseInt(result);
  //   document.getElementById(number1).setAttribute("wonsetInfor", U_G_D[y].phon)
  //   document.getElementById(number1).setAttribute("useIng","사용중")
    
   
  //  }
 
  //  const a=  document.getElementById(number).getAttribute("wonsetInfor")
  //  const b = document.getElementById(number).getAttribute("useIng")
    
  //   if(b === "사용중") {
  //     console.log(number)
  //     console.log(a,b,"97") 

  //   }

  //  }





}
U_G_D.forEach((item, index)=> {
 item.wonset.forEach((itme2,index2)=> {
  if(itme2 !=="") {
    const regex = /[^0-9]/g;
    const result = itme2.replace(regex, "");
    const seatnumber = parseInt(result);

    const req = {

    phone: item.phon,
    seatUse : "사용중",
    seat : seatnumber

    }


    const users = new seatInfor(req)

    document.getElementById(seatnumber).setAttribute("seatUse",JSON.stringify(users.body))
    const setU = document.getElementById(seatnumber).getAttribute("setUse")  
 

    document.getElementById(seatnumber).innerText ="사용"
      
  
  }
    
 })

})
})
  })



  function indexFunction(number) { //자석 click 하면 반응하는 함수
const indexOf = sessionStorage.getItem("indexOf")//login.js 402 line에서 sessionStorage set 생성 
const goodsName = document.getElementById(number).getAttribute("setName")
const wonset   =  document.getElementById(number).outerText
const  gender = document.getElementById(number).getAttribute("genderNmae")
const seatInfor = document.getElementById(number).getAttribute("seatUse") // 자리 사용자 정보
if(seatInfor !==null){
  warningModalText.innerHTML = "사용중인 자리 입니다."
warningModal.classList.toggle("hidden")
setTimeout(() => {
  warningModal.classList.toggle("hidden")


}, 2000);
return 
}
if(indexOf === null) {

  warningModalText.innerHTML = "로그인 후 상품을 먼져 선택 해주세요"
warningModal.classList.toggle("hidden")


setTimeout(() => {
    warningModal.classList.toggle("hidden")


 }, 2000);
return
} //

const req = {
  wonset,
  goodsName,
  gender,
  indexOf 
}




 if(wonset === null || goodsName === null || goodsName === null) {return alert("좌석타입이 설정되어 있지 않은 유형입니다. 관리자에게 문의하세요")}

 fetch("/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(req),

})
  .then((res) => res.json()) 
  .then((res) => { 
    if(res.success === false){ 

      console.log("215")
      warningModalText.innerHTML = res.msg
      warningModal.classList.toggle("hidden")   
       setTimeout(() => {
          
        warningModal.classList.toggle("hidden")
    
            
      }, 1600); 
      return 
    } else{ 
      sucModalText.innerHTML = `${res[0].name}님 열공하세요`

      sucModal.classList.toggle("hidden")
      console.log("223")
   
    setTimeout(() => {
          
       location.href = "/login";
  
          
    }, 1600); 
    sessionStorage.removeItem("indexOf") //login.js 402 line에서 sessionStorage set 생성 
  }
   })


   
}