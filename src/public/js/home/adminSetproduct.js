"use strict"



//좌석 종류 선택, 상품, 시간 같이 옵션의 대가리 부분
const dropdownButtons = document.querySelectorAll('.dropdown-button');
//일일권, 기간제, 고정석 등 요소들의 컨테이너
const dropdownMenus = document.querySelectorAll('.dropdown-menu');
//일일권, 기간제, 고정석 등 각 요소
const dropdownContent = document.querySelectorAll('.dropdown-content')
const expiryDate = document.getElementById("expiry-date")
const goodsInfo = document.getElementById("goods-info")
const N_P_S = document.getElementById('name-phone-search')

const name = document.getElementById("name")
const phone = document.getElementById("phone")
const choice = document.getElementById("choice")

let isDropdownOpen = true;
let idx = 0;



const justifyCenter = document.querySelector(".justify-center")
const SearchCancelBtn = document.querySelector(".search-cancel-btn")
 console.log(SearchCancelBtn)
justifyCenter.classList.toggle("hidden")
// justifyCenter.addEventListener("click", ()=>{

// })
const dropdownButton = [...dropdownButtons]
const dropdownMenu = [...dropdownMenus]

class seatInfor {
    constructor(body) {
    this.body = body
          
      }
    }
  
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
        idx = dropdownButton.indexOf(btn) // idx 는 마일리시 1번 , 상품 2번 요금은 3번 값을 뜻함

        
        toggleDropdown();
    })
})



//옵션 선택 중 외부를 클릭하였을 때 드롭다운이 꺼진다. 
window.addEventListener('click', (event) => {
    if (!dropdownButton[idx].contains(event.target)) {
        dropdownMenu[idx].classList.add('hidden');
        isDropdownOpen = false;
    }
    
});


//옵션의 각 요소를 선택하였을 때 옵션의 대가리를 내가 선택한 요소의 텍스트 콘텐츠로 결정한다.
// ex) 좌석 종류 선택 -> 좌석 선택시 옵션의 대가리 명을 좌석으로 한다. 


fetch('/adminGoodsKiosk')
.then(res => res.json())
.then(data => {  
 const typeGoods = document.getElementById("typeGoods")
 
dropdownContent.forEach((ele)=>{ //좌석, 상품, 시간 forEach
    ele.addEventListener("click", ()=>{
        dropdownMenu[idx].classList.add('hidden');
        isDropdownOpen = true;

        typeGoods.innerText =""//충전권, 기간제, 고정석 text 초기화
   
   dropdownButton[idx].textContent = ele.textContent;
   const goodsType = ele.textContent;


        if(goodsType === "고정석") {
          document.getElementById("time-choice").innerText = "시간을 선택해주세요"
 for(var i=0; data[0].feeName.length>i; i++) {
 const tr = document.createElement('tr')
 const td = document.createElement('td')

 
 typeGoods.appendChild(tr)
 tr.appendChild(td)


    td.innerText = data[0].feeName[i]
   td.id= `${data[0].feeName[i]}고정석`
   const req = {
                    
    goods:td.innerText,
   
    goodsKind:"feeType"

    }


    const Goods_push = new seatInfor(req)

     
      goodsInfo.setAttribute('goodsPush',JSON.stringify(Goods_push.body))
    document.getElementById(`${data[0].feeName[i]}고정석`).onclick = () => {change(td.innerText,expiryDate.value,"fixeType",td.id)};
    document.getElementById(`${data[0].feeName[i]}고정석`).setAttribute('goodsPush',JSON.stringify(Goods_push.body))
}

        }else if(goodsType === "기간제"){
          document.getElementById("time-choice").innerText = "시간을 선택해주세요"
            for(var i=0; data[2].feeName.length>i; i++) {
                const tr = document.createElement('tr')
                const td = document.createElement('td')
           
                
                typeGoods.appendChild(tr)
                tr.appendChild(td)
               
               
                   td.innerText = data[2].feeName[i]
                   td.id = `${data[2].feeName[i]}기간제`

                   const req = {
                    
                    goods:td.innerText,
                   
                    goodsKind:"feeType"
               
                    }
                
                
                    const Goods_push = new seatInfor(req)
            
                     
                      goodsInfo.setAttribute('goodsPush',JSON.stringify(Goods_push.body))
                   td.onclick = () => {change(userInfor)};
                   
                   document.getElementById(`${data[2].feeName[i]}기간제`).onclick = () => {change(td.innerText,expiryDate.value,"daysType",td.id)};
                   document.getElementById(`${data[2].feeName[i]}기간제`).setAttribute('goodsPush',JSON.stringify(Goods_push.body))
                }
      

        }else if(goodsType === "충전권") {
          document.getElementById("time-choice").innerText = "시간을 선택해주세요"
            for(var i=0; data[1].feeName.length>i; i++) {
                const tr = document.createElement('tr')
                const td = document.createElement('td')
               
                
                typeGoods.appendChild(tr)
                tr.appendChild(td)
               
               
                  td.innerText = data[1].feeName[i]
                  td.id= `${data[1].feeName[i]}충전권`
                 
                  const req = {
                    
                    goods:td.innerText,
                   
                    goodsKind:"feeType"
               
                    }
                
                
                    const Goods_push = new seatInfor(req)
            
                     
                      goodsInfo.setAttribute('goodsPush',JSON.stringify(Goods_push.body))
                
                    document.getElementById(`${data[1].feeName[i]}충전권`).onclick = () => {change(td.innerText,expiryDate.value,"feeType",td.id)};
                    document.getElementById(`${data[1].feeName[i]}충전권`).setAttribute('goodsPush',JSON.stringify(Goods_push.body))
                }

        }
    })
})

})


function change(a,b, c,e) {



console.log(a,b,c,e)
document.getElementById("time-choice").innerText = a
document.getElementById(e).getAttribute('goodsPush')

goodsInfo.onclick = () => {enter(e)}
  }




  function enter(userTtegId) {
    if(expiryDate.value ==="") {return alert("만료기간을 입력해주세요")}

    const regex = /[^0-9]/g;
    const result = expiryDate.value.replace(regex, "");
    const number = parseInt(result);

    console.log(`${number}`,"215")
    if(`${number}` === "NaN") {return alert("만료기간 입력란에 숫자만 입력해주세요")}
    justifyCenter.classList.toggle("hidden")
   
  console.log(userTtegId,"iii")
    const userGoodsPush = document.getElementById(userTtegId).getAttribute('goodsPush')

    N_P_S.addEventListener("click", Search)

    function Search() {
     const UserGoodsPush =   JSON.parse(userGoodsPush)
   fetch('/users')
   .then(res => res.json())
   .then(data => { 
 const userPhone = document.getElementById("userPhone").value
       
     const u_p_indexOf  =  data.phon.indexOf(userPhone)
      
     if(!userPhone) {return alert("전화번를 입력해주세요")}
     if(u_p_indexOf === -1){return alert("회원이 존재하지 않습니다")}
     name.innerText =   data.name[u_p_indexOf]
     phone.innerText = data.phon[u_p_indexOf]
     choice.innerText ="선택 하세요"  
     choice.addEventListener("click" , CHOISE)

       function CHOISE() {
     
       
        
       const req = {
        
        naem: name.outerText,
        phone : userPhone,
        expiryName: expiryDate.value,
        goodsName :UserGoodsPush.goods,
        feeName :  UserGoodsPush.goodsKind
       }

    console.log(req)
    fetch("/adminSetproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
  
      body: JSON.stringify(req),
    })
      .then((res => res.json()))
      .then((res) => {
          console.log(res)
           if(res.success === true) {
            alert("상품이 지급되였습니다..")
            location.href = "/adminViews"
  
           }
          
      })

       }
   })
    }

  }
   
//내가 발급한 이용권을 서버로 던져야한다. 
SearchCancelBtn.addEventListener("click" , S_C)


function S_C() {

 console.log("kkk")
 location.href = "/adminSetproduct"
    
}