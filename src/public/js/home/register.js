"use strict"

const findAnchor = document.querySelector(".find-anchor")
// const regiModal = document.querySelector(".regi-modal")
const findModal = document.querySelector(".find-modal")

const feather = document.querySelector(".feather")
const exit = document.querySelector(".exit")


  const warningModal = document.querySelector(".warning-modal")

    const modalText = document.querySelector(".modal-text")
    const cancelBtn = document.querySelector(".cancel-btn")



      cancelBtn.addEventListener("click", ()=>{
        warningModal.classList.toggle("hidden")
      })

     
      
      

/**아이디/비번 찾기랑 회원가입 모달 각각 끄는 방법 */



/**X 눌렀을 때 아이디/비밀번호 찾기 및 퇴실 창 제거 */

const VERIFICATION = document.querySelector("#verification"),
       ID = document.querySelector("#id"),
       PHONE = document.querySelector("#phone"),

       PSWORD = document.querySelector("#psword"),
       CONFIRM = document.querySelector("#confirm-psword")
var gender =""

      const btnHover = document.querySelectorAll(".flex-1")

      btnHover.forEach((tabs)=>{
        tabs.addEventListener("click", GENDER)
        function GENDER (){
          console.log(tabs.innerText)
        gender =  tabs.innerText
          }


        })


const verificaionBUTTON = document.querySelector(".bg-gray-900")

   verificaionBUTTON.addEventListener("click", VERIFICAIONBUTTON)

   function VERIFICAIONBUTTON() {

    fetch('/certifications')
    .then(res => res.json())
    .then(data => {
      console.log(data)
        const CERTIFICATION = data.certification[0]
        console.log( VERIFICATION.value)
       if(CERTIFICATION !== VERIFICATION.value) {


          modalText.innerHTML = "인증번호가 일치 하지 않습니다"
         warningModal.classList.toggle("hidden")
 
        // document.querySelector(".modal").classList.remove("hidden")
        setTimeout(() => {

           warningModal.classList.toggle("hidden")


        }, 2000);
    return
       }

      if(CONFIRM.value !== PSWORD.value ){
        modalText.innerHTML = "비밀번호가 일치하지 않습니다"
         warningModal.classList.toggle("hidden")
    
        // document.querySelector("#h2").innerText="비밀번호가 일치하지 않습니다."
        // document.querySelector(".modal").classList.remove("hidden")
        setTimeout(() => {

           warningModal.classList.toggle("hidden")

        }, 2000);
        return
    }
    if(!PSWORD.value) {
      modalText.innerHTML = "비밀번호를 입력해주세요"
       warningModal.classList.toggle("hidden")
     
      // document.querySelector("#h2").innerText="비밀번호를 입력해주세요."
      //   document.querySelector(".modal").classList.remove("hidden")
        setTimeout(() => {
           warningModal.classList.toggle("hidden")


        }, 2000);
        return
      }

      if(gender === "") {
        
         modalText.innerHTML = "성별을 선택해 주세요"
         warningModal.classList.toggle("hidden")
      
      // document.querySelector("#h2").innerText="비밀번호를 입력해주세요."
      //   document.querySelector(".modal").classList.remove("hidden")
        setTimeout(() => {
           warningModal.classList.toggle("hidden")


        }, 2000);
        return
      }

    const Certification =sessionStorage.getItem("certification")
    const req = {

    id : ID.value,
    psword : PSWORD.value,
    confirmPsword: CONFIRM.value,
    register:"register"  ,
    gender:gender,
    Certification:"Certification"
    }
    console.log(req)

    fetch("/register", {
    method: "POST",
    headers : {
      "Content-Type" :"application/json"
    },

     body: JSON.stringify(req),
    })
    .then((res => res.json()))
    .then((res) => {
      console.log(res)
    if(res.success === true) {
      sessionStorage.removeItem("certification")

        // document.querySelector("#h2").innerText="회원가입을 성공적으로 되였습니다.."
        // document.querySelector(".modal").classList.remove("hidden")
        setTimeout(() => {

        location.href = "/login"
        }, 1000);
        return
      }  else if(res.success === false) {

      modalText.innerHTML = "존재하는 아이디입니다."
       warningModal.classList.toggle("hidden")

   
        // document.querySelector("#h2").innerText="존재하는 아이디입니다."
        // document.querySelector(".modal").classList.remove("hidden")
        setTimeout(() => {

          warningModal.classList.toggle("hidden")

        }, 2000); 

      }
    })
     })

   }
// const modalContent = document.querySelector(".modal-content")


// const findInfo = document.querySelectorAll(".find")
// const regiInfo = document.querySelectorAll(".register")

// const id = document.querySelectorAll(".id")
// const psword = document.querySelectorAll(".password")

const tab = document.querySelectorAll(".tab")

// const check = document.querySelector(".check")
// const checkout = document.querySelector(".checkout-modal")


/**가상 키보드 부분 */
const buttons = document.querySelectorAll(".btn");
  const fortis = document.querySelectorAll(".fortis")
 const textarea = document.querySelector("textarea")
 const delete_btn = document.querySelector(".delete")
 const ko_shift_btn = document.querySelector(".ko-shift")
 const en_shift_btn = document.querySelector(".en-shift")
 const space_btn = document.querySelector(".space")
 const translate = document.querySelector(".translate")
 const koKeyboard = document.querySelector(".ko-keyboard")
 const enKeyboard = document.querySelector(".en-keyboard")

/**아이디/비밀번호/번호 끝 네자리/비밀번호 앞 두자리/아이디/비밀번호 => 0, 1, 2, 3, 4, 5 
이렇게 새롭게 idx를 매기겠음. info로부터 인덱스를 추출하겠음.*/
const info = document.querySelectorAll(".info")


let tabIdx = 0;
let idx = 0;

 let chars = []
 let arr = []

/**다른 tab을 눌렀을 때 arr의 초기화*/


/**아이디/비밀번호/번호 끝 네자리/비밀번호 앞 두자리/아이디/비밀번호 => 0, 1, 2, 3, 4, 5 
이렇게 새롭게 idx를 매기겠음 */

// tab.forEach((tabs)=>{
//   tabs.addEventListener("click", ()=>{
//     tabIdx = tabArr.indexOf(tabs)
//     arr.length = 0;
//     id[tabIdx].value = ""
//     psword[tabIdx].value = ""

//   })
// })

/**아디/비번 칸 클릭했다가 다른 칸 클릭한 뒤 다시 이전 칸 눌렀을 때 기존에 타이핑된 값들이 유지되어야겠지? 
한글 단위로 정확하게 split가 안되는거 같은데 원인 분석 다시 할 것 .. */

/**모달창은 그냥 들어갔다 나오면 초기화 하는 방법으로 할게 
그냥 모달 구성하는 4개 칸을 새로운 클래스로 묶고 foreach 반복문 돌릴게 */
// info.forEach((ele)=>{
//   ele.addEventListener("click", ()=>{
//   console.log("kkk")
//     idx = infos.indexOf(ele)

//     if(info[idx].value !== ""){
//       arr.length = 0;
//       arr = info[idx].value.split("")

//     }

//    if(info[idx].value == ""){
//      arr.length = 0;
//    }

//   })
// })

//  buttons.forEach((btn)=>{
//    btn.addEventListener("click",()=>{
//       console.log(idx, "왜지")
//      arr.push(btn.textContent)
//      textarea.textContent = Hangul.assemble(arr)
//      info[idx].value =  Hangul.assemble(arr)
//      console.log(arr)
//      })}) 



 delete_btn.addEventListener("click", ()=>{
    arr.pop();

   info[idx].value =  Hangul.assemble(arr)
 })


 space_btn.addEventListener("click", ()=>{
   arr.push(" ")
   info[idx].value = Hangul.assemble(arr)
 })


 ko_shift_btn.addEventListener("click", ()=>{
   fortis.forEach(btn=>{
     btn.classList.toggle("hidden")
   })
 })

 en_shift_btn.addEventListener("click", ()=>{
   buttons.forEach(btn =>{
     btn.classList.toggle("upper")
   })

  })

 translate.addEventListener("click", ()=>{
   console.log(translate)
   enKeyboard.classList.toggle("hidden")
     koKeyboard.classList.toggle("hidden")
 })