// window.Hangul = require('hangul-js'); 
/**가상 키보드 부분 */

const warningModal = document.querySelector(".warning-modal")

const warningModalText = document.querySelector(".warning-modal-text")

  const sucModal = document.querySelector(".warning-modal")

  const sucModalText = document.querySelector(".suc-modal-text")


  const fo = document.querySelectorAll("#register")

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
 const nowTimeSS= moment().format('ss')

 const sendBUTTON= document.querySelector("#send")


 const NAME = document.querySelector("#name"),
       PHON = document.querySelector("#phon")


/**아이디/비밀번호/번호 끝 네자리/비밀번호 앞 두자리/아이디/비밀번호 => 0, 1, 2, 3, 4, 5 
이렇게 새롭게 idx를 매기겠음. fadeIn으로부터 인덱스를 추출하겠음.*/
const fadeIn = document.querySelectorAll(".fadeIn")

const idArr = []
const psArr = []
const tabArr = []
const fadeIns = []

let tabIdx = 0;
let idx = 0;

 let chars = []
 let arr = []

/**다른 tab을 눌렀을 때 arr의 초기화*/


/**터치이벤트를 검증할 수 있는 방법을 잘 모르겠어서 mouse로 대체하겠음 */
/**아이디/비밀번호/번호 끝 네자리/비밀번호 앞 두자리/아이디/비밀번호 => 0, 1, 2, 3, 4, 5 
이렇게 새롭게 idx를 매기겠음 */



/**아디/비번 칸 클릭했다가 다른 칸 클릭한 뒤 다시 이전 칸 눌렀을 때 기존에 타이핑된 값들이 유지되어야겠지? 
한글 단위로 정확하게 split가 안되는거 같은데 원인 분석 다시 할 것 .. */

/**모달창은 그냥 들어갔다 나오면 초기화 하는 방법으로 할게 
그냥 모달 구성하는 4개 칸을 새로운 클래스로 묶고 foreach 반복문 돌릴게 */

sendBUTTON.addEventListener("click", send_BUTTON)

function send_BUTTON() { //인증번호 발송 버튼 클릭시 작동하는 함수
  const comb = PHON.value.substr(9, 10)
  const conmbination =  nowTimeSS + comb


  fetch("/userGoodsKinds") 
  .then(res => res.json())
  .then(data => { 


   const  PHONE = data.filter(function (addSave) { return addSave.phon === PHON.value });

 console.log(NAME.value)
  if(!NAME.value) {  
    console.log("pi")
    fo.style = "display:none"
    warningModalText.innerText = "이름 미입력"
    warningModal.classList.toggle("hidden")


   setTimeout(() => {
     warningModal.classList.toggle("hidden")

   }, 2000);


   return
 }
 if(!PHON.value) {  

 //  phon.value 의 값을 넣지않고 버튼을 클릭 했을 때....
// 모달창에 이름을 입력해주세요 띄우게 해줌
// html  26 line id=naem 롤 설정함....
// 중요한건 닫기 버튼 누르지 않아도 창이 닫게 설계바람..
// 밑에 있는 setTimeout 권장함 이때  if 문안에있는 return 값은 건디지말 것.
    warningModalText.innerHTML = "전화번호 미입력"
     warningModal.classList.toggle("hidden")

   
   setTimeout(() => {
      warningModal.classList.toggle("hidden")
   }, 2000);

  return
   } 
   if(PHONE[0] !== undefined) {

 // 이미등록한 회원 일 경우 
// 모달창에  등록된 회원입니다. 라고 띄움

// 중요한건 닫기 버튼 누르지 않아도 창이 닫게 설계바람..
// 밑에 있는 setTimeout 권장함 이때  if 문안에있는 return 값은 건디지말 것.
       warningModalText.innerHTML = "이미 등록한 회원 입니다."
       warningModal.classList.toggle("hidden")

     setTimeout(() => {

        warningModal.classList.toggle("hidden")


     }, 2000);
     return
   }
   if(PHONE[0] === undefined) {

     const req = {
       title:"certification",
       phone : PHON.value,
       name: NAME.value,
       certification:conmbination


   }




 fetch("/certification", {
 method: "POST",
 headers : {
   "Content-Type" :"application/json"
 },

  body: JSON.stringify(req),
 })
 .then((res => res.json()))
 .then((res) => {
   console.log(res,"kkjj")
    if(res.success === true) {

// 인증 번호 요청 하는 logic

// 모달창에  인증요청 했습니다. 라고 띄움

// 중요한건 닫기 버튼 누르지 않아도 창이 닫게 설계바람..
// 밑에 있는 setTimeout 권장함 이때  if 문안에있는 return 값은 건디지말 것.

      sucModalText.innerHTML = "인증요청 하였습니다."
      

      setTimeout(() => {
         sucModal.classList.toggle("hidden")
         location =  "/register"
     }, 1000);

 return 
   }


   })
 }

 })



}

 buttons.forEach((btn)=>{
   btn.addEventListener("click",()=>{
     arr.push(btn.textContent)
     textarea.textContent = Hangul.assemble(arr)
     fadeIn[idx].value =  Hangul.assemble(arr)
     console.log(arr)
     })}) 



 delete_btn.addEventListener("click", ()=>{
   //  arr.pop();

   // fadeIn[idx].value =  Hangul.assemble(arr)
 })


 space_btn.addEventListener("click", ()=>{
   arr.push(" ")
   fadeIn[idx].value = Hangul.assemble(arr)
 })


 ko_shift_btn.addEventListener("click", ()=>{
   fortis.forEach(btn=>{
     btn.classList.toggle("trans")
   })
 })

 en_shift_btn.addEventListener("click", ()=>{
   buttons.forEach(btn =>{
     btn.classList.toggle("upper")
   })

  })

 translate.addEventListener("click", ()=>{
   enKeyboard.classList.toggle("trans")
     koKeyboard.classList.toggle("trans")
 })