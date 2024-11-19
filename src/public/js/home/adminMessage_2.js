"use strict"

const setup = () => {
  
    return {
      loading: true,
      isSidebarOpen: false,
      toggleSidbarMenu() {
        this.isSidebarOpen = !this.isSidebarOpen
        console.log(this.isSidebarOpen)
      },
      isSettingsPanelOpen: false,
      isSearchBoxOpen: false,
    }
  }


  
var add = 0 // data.set 영향을 줌

const addCancelBtn = document.querySelector(".add-cancel-btn")
const messageAddBtn = document.querySelector(".message-add-btn")
const sea = document.querySelector(".detail")
const SeverMessageContents = document.getElementById("sever-message")
const SeverUserSendTimeDay = document.getElementById("sever-user-send")
const appendTbody = document.querySelector("#a-c-s")

const select2 = document.querySelector('.detail2')
//메세지 작성 모달
const messageAddModal = document.querySelector(".message-add-modal")

//메세지 확인 모달
const messageCheckModal = document.querySelector(".message-check-modal")

//메세지 확인 모달의 취소 버튼

const checkCancelBtn = document.querySelector(".check-cancel-btn")


//메세지 확인 버튼

const messageCheckBtn = document.querySelector(".message-check-btn")

//메세지 작성 모달의 취소 버튼 누르기

 addCancelBtn.addEventListener("click", ()=>{


    messageAddModal.classList.toggle("hidden")
})


class  kakaAlarm {
  constructor(body) {
  this.body = body
        
    }
  }
  fetch('/kokoTime')
  .then(res => res.json())
  .then(data => {
   console.log(data.length, data)
 for(var i =0; data.length>i; i++) {
const tr = document.createElement('tr') , td1 = document.createElement('td') , td2 = document.createElement('td'),td3 = document.createElement('td')
const  td4 = document.createElement('td') , td5 = document.createElement('td'), td6 = document.createElement("td")

const div1 = document.createElement("div"), div2 = document.createElement("div")
const button1 = document.createElement("button"), button2 = document.createElement("button"),  button4 = document.createElement("button")
const input1 = document.createElement("input")
const labal1 = document.createElement("labal")
  appendTbody.appendChild(tr) , tr.appendChild(td1) , tr.appendChild(td2) ,  tr.appendChild(td3),  tr.appendChild(td4), tr.appendChild(td6), td1.appendChild(div1)
  
  div1.className ="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in  float-right md:float-none"
  tr.className="styled-tr overflow-hidden", td1.className="styled-td",td2.className="styled-td",td3.className="styled-td",td4.className="styled-td",td5.className="styled-td",td6.className="styled-td"
  div1.appendChild(input1), div1.appendChild(labal1)
  
  

  
  input1.type ="checkbox", input1.name="toggle", input1.id=`${[i]}input`, input1.className ="toggle-checkbox block absolute w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
  labal1.for="toggle", labal1.id= `${[i]}labal` ,labal1.className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" 

  td2.appendChild(div2) , div2.className =" p-2 mt-2 text-black" ,div2.innerText = data[i].messageTitl
 
   td3.appendChild(button1) , button1.className="message-check-btn float-right md:float-none addition-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1",button1.innerText="알림톡 문구확인"
   button1.id=`${[i]}`
   td4.appendChild(button2) , button2.className="message-save-btn float-right md:float-none addition-btn middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1",button2.innerText="수정"
  
  
   
   td6.appendChild(button4)
   button4.className="message-change-btn float-right md:float-none  middle none center rounded-lg border-2 border-gray-400 py-3 px-4 font-sans text-xs font-bold text-black transition-all hover:opacity-75 focus:ring active:opacity-[0.85] disabled:pointer-events-none bg-white disabled:opacity-50 disabled:shadow-none z-50 mx-1",button4.innerText="삭제"
   
   button1.onclick = () => {ClickMessageContent(button1.id)}   //message 내용확인  button
   
   button2.onclick = () => {ClickMessageContentRevise(button1.id)} //message 수정 button 
  const titlMessage =  data[i].messageTitl
    button4.onclick = () => {ClickMessageDelete(button1.id, titlMessage)} //message 삭제 button
   
   const inputSET = document.getElementById(`${[i]}input`)
   const labalSET = document.getElementById(`${[i]}labal`)

   
     inputSET.setAttribute("use-choice" ,data[i].set )
     const ui = inputSET.getAttribute("use-choice")

     if(Number(ui) === 1){

    console.log("kkk")
    
    labalSET.classList.toggle("bg-green-400")
    inputSET.classList.toggle("right-0")
    inputSET.classList.toggle("border-green-400")

  
       inputSET.name="toggle"
       inputSET.type ="checkbox"
       labalSET.for="toggle"
       inputSET.onclick = () => {setPuls(inputSET.id, labalSET.id , data[i].messageTitl,data[i].Text,data[i].timeSend)}
     }

      const messageTitl = data[i].messageTitl , messageContent =data[i].Text,  DayDeadlineSend =data[i].timeSend
     
     
      inputSET.onclick = () => {setPuls(inputSET.id, labalSET.id, messageTitl ,messageContent, DayDeadlineSend ) }
     

   
  }
  

 
  function ClickMessageContent(indexOf) {
    messageCheckModal.classList.toggle("hidden") //메세지 확인 
   
  var time =  (data[indexOf].timeSend%1440) //나머지 분
  var hour =  Math.floor(time/60) // 시간
  var day = Math.floor( data[indexOf].timeSend/1400) // 1일
  var hour =  Math.floor(time/60) // 일단위 
  var min = time%60  // 분
  var hours =  Math.floor(data[indexOf].timeSend/60) // 시간단위 25시 22시
  var mon = Math.floor( time/60)
  
  
    
    SeverMessageContents.innerText=data[indexOf].Text
    SeverUserSendTimeDay.innerText= `${day}일 ${hour}시 종료일로 메세지 보냄`


      }


      function ClickMessageContentRevise (indexOf) {
        messageAddModal.classList.toggle("hidden")
        document.getElementById("revice=btn").style="display:block"
        document.getElementById("save=btn").style="display:none"
        document.getElementById("resaveName").innerText = "메세지 수정"
        document.getElementById("message-revies").innerText = "메세지 제목 수정"
        document.getElementById("message-content-revies").innerText = "메세지 내용 수정"
        document.getElementById("message-revies-send").innerText = "메세지 전송 일정 선택"
     

     const messageTitl = document.getElementById("message-name") 
     const messageContents = document.getElementById("message-text")
     const reviceBtn = document.getElementById("revice=btn")
    
      for (let i=1; i<=20; i++){
          let day = document.createElement("option"); 
          day.innerText = `${i}일`; 
          day.id = `${i}`
         document.querySelector("select[name=day]").append(day); 
                           
        }
      
        for(let i=1; i<=23; i++){
                let time = document.createElement("option"); 
                time.innerText = `${i}시간`; 
                time.id = `${i}`
                document.querySelector("select[name=time]").append(time); 
                
            }
      
    
       
       
            reviceBtn.onclick = () => { K_A_S_L_B(messageTitl.value, messageContents.value, indexOf )} //수정 함수

        }
  })
            
  function setPuls(inputID,labalID,messageTitl,Text,timeSend) {

             
  add = 1 + add
  const dataSetState =  document.getElementById(`${inputID}`).getAttribute("use-choice")
  
  var binaryVariable = add+Number(dataSetState) 
  var dataSetBinaryMake = binaryVariable%2
         
    const dataSetValuset =  document.getElementById(`${inputID}`).setAttribute("use-choice",dataSetBinaryMake)
    const dataSetState1 =  document.getElementById(`${inputID}`).getAttribute("use-choice")
    
    
    

   if(dataSetBinaryMake === 0) {
    
     document.getElementById(`${inputID}`).className = " toggle tkaka  absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
     document.getElementById(`${labalID}`).className=" block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
     
 
 
   add =0;
   return    UseSave(`${labalID}`,messageTitl,Text,timeSend,dataSetBinaryMake)
     
   }  else if(dataSetBinaryMake ===1) {
   console.log("1")
   
   document.getElementById(`${labalID}`).classList.toggle("bg-green-400")
   document.getElementById(`${inputID}`).classList.toggle("right-0")
   document.getElementById(`${inputID}`).classList.toggle("border-green-400")
  
   add =0;
   return  UseSave(`${labalID}`, messageTitl,Text,timeSend,dataSetBinaryMake)
   }
  
 
   function UseSave(indexOf,messageTitl,Text,timeSend,dataSetBinaryMake) {
    console.log(indexOf)

    if(dataSetBinaryMake === 0) {
      setTimeout(() => {
        const regex = /[^0-9]/g;
        const result = indexOf.replace(regex, "");
        const number = parseInt(result);
        const use = {
          
          

          messageTitl:messageTitl,
          meageContents:Text,
          dayDeadline : timeSend,
          timeDeadline: TimeDeadline,
          save : "UseChange",
          set:dataSetBinaryMake,
        }
        const USE = new kakaAlarm(use)
        console.log(JSON.stringify(USE.body))
      
     
        fetch("/adminMessage", {
          method: "POST",
          headers : {
            "Content-Type" :"application/json"
          },
          
           body: JSON.stringify(USE.body),
          })
          .then((res => res.json()))
          .then(( res) => { 
            
            
            location.href = "/adminMessage"
          })
             
       }, 300); 

    }
    if(dataSetBinaryMake === 1) {
     
             
        setTimeout(() => {
          const regex = /[^0-9]/g;
          const result = indexOf.replace(regex, "");
          const number = parseInt(result);
          const use = {
            messageTitl:messageTitl,
            meageContents:Text,
            dayDeadline : timeSend,
            timeDeadline: TimeDeadline,
            save : "UseChange",
            set:dataSetBinaryMake,
          }
          const USE = new kakaAlarm(use)
          console.log(JSON.stringify(USE.body))
        
       
          fetch("/adminMessage", {
            method: "POST",
            headers : {
              "Content-Type" :"application/json"
            },
            
             body: JSON.stringify(USE.body),
            })
            .then((res => res.json()))
            .then(( res) => { 
              
                console.log(res)
              location.href = "/adminMessage"
            })
               
         }, 200); 
     
             
   

    }
  
   }
    }
var  DayDeadline = "", TimeDeadline =""

//알림톡 메세지 추가하기 버튼 누르기
messageAddBtn.addEventListener("click", ()=>{
 
  
    messageAddModal.classList.toggle("hidden")
    document.getElementById("revice=btn").style="display:none"
    document.getElementById("save=btn").style="display:block"
    document.getElementById("resaveName").innerText = "메세지 추가하기"
    document.getElementById("message-revies").innerText = "메세지 제목 작성"
    document.getElementById("message-content-revies").innerText = "메세지 내용 작성"
    document.getElementById("message-revies-send").innerText = "메세지 전송 일정 선택"
    const saveBtn = document.getElementById("save=btn")
  const messageTitl = document.getElementById("message-name") 
 const messageContents = document.getElementById("message-text")


  for (let i=1; i<=20; i++){
      let day = document.createElement("option"); 
      day.innerText = `${i}일`; 
      day.id = `${i}`
     
      document.querySelector("select[name=day]").append(day); 
     
     
      
    }
  
    for(let i=1; i<=23; i++){
            let time = document.createElement("option"); 
            time.innerText = `${i}시간`; 
            time.id = `${i}`
            document.querySelector("select[name=time]").append(time); 
            
        }
  

      
      
   
        saveBtn.onclick = () => { K_A_S_B(messageTitl.value, messageContents.value ) }
         
  })


// data-ripple-dark



//알림톡 문구 확인 모달의 취소 버튼 누르기

checkCancelBtn.addEventListener("click", ()=>{
 
  messageCheckModal.classList.toggle("hidden")
  console.log("194")
})


//알림톡 문구 확인 버튼 클릭하면 알림톡 문구 확인 모달이 나온다. 

messageCheckBtn.addEventListener("click", ()=>{
  messageCheckModal.classList.toggle("hidden")
  console.log("202")
})






sea.addEventListener('change', function () { 
	const see = sea.options[sea.selectedIndex];
  DayDeadline = see.id

 
})



select2.addEventListener('change', function () { 
	const select = select2.options[select2.selectedIndex];
  TimeDeadline = select.id


}) 
function K_A_S_B(messageTitl, meageContents) {
  

  if(!DayDeadline && !TimeDeadline) {return alert("알자 및 시간 선택을 하나 이상 해주세요")}
   if(!messageTitl || !meageContents) {return alert("빈칸이 존재합니다 ")}
  const req = {
    messageTitl,
    meageContents,
    dayDeadline : DayDeadline,
    timeDeadline: TimeDeadline,
    save : "new",
    set : "0",
    
  }


const kakaMessage = new kakaAlarm(req)
    JSON.stringify(kakaMessage.body)
    fetch("/adminMessage", {
      method: "POST",
      headers : {
        "Content-Type" :"application/json"
      },
      
       body: JSON.stringify(kakaMessage.body),
      })
      .then((res => res.json()))
      .then(( res) => { 
        alert("추가되였습니다..")
        
        location.href = "/adminMessage"
      })
}


function  K_A_S_L_B(messageTitl, meageContents,indexOf) {
  
 if(!DayDeadline && !TimeDeadline) {return alert("알자 및 시간 선택을 하나 이상 해주세요")}
 if(!messageTitl || !meageContents) {return alert("빈칸이 존재합니다 ")}
   

  const AddkakaAlarm = {
    messageTitl,
    meageContents,
    dayDeadline : DayDeadline,
    timeDeadline: TimeDeadline,
    save : "revise",
    indexOf,
    set : "0",

    
  }
  

const kakaMessage = new kakaAlarm(AddkakaAlarm)
    JSON.stringify(kakaMessage.body)
    fetch("/adminMessage", {
      method: "POST",
      headers : {
        "Content-Type" :"application/json"
      },
      
       body: JSON.stringify(kakaMessage.body),
      })
      .then((res => res.json()))
      .then(( res) => { 
        alert("수정되였습니다...")
        
        location.href = "/adminMessage"
      })
}

function ClickMessageDelete(DeleteIndexOf,messageTitl) {

  const DeletSend = {
    messageTitl,
    save : "Delete",
    DeleteIndexOf
   
  }
  const kakaMessageDelet = new kakaAlarm(DeletSend)

  fetch("/adminMessage", {
    method: "POST",
    headers : {
      "Content-Type" :"application/json"
    },
    
     body: JSON.stringify(kakaMessageDelet.body),
    })
    .then((res => res.json()))
    .then(( res) => { 
      alert("삭제되였습니다....")
      
       location.href = "/adminMessage"
    })

}