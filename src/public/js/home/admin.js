class PaymentHistory {
  constructor(seatType, name, date, fee) {
    this.seatType = seatType;
    this.name = name;
    this.date = date;
    this.fee = fee;
  }

  makePaymentHistory() {
    console.log("Hi");
  }
}


function fetchPaymentHistory() {
  fetch("/paymentHistory")
    .then((response) => response.json())
    .then((json) => {
      classifyData(json);
    });
}

function classifyData(json) {
  const data = []; // PaymentHistory 객체를 담을 지역 배열

  for (let i = 0; i < json.length; i++) {
    const item = json[i]; // json 배열에서 하나씩 가져옴

    // 각 item의 approvalDay와 fee, goodsName에 대해 반복
    for (let j = 0; j < item.approvalDay.length; j++) {
      const paymentHistory = new PaymentHistory(
        item.goodsName[j],    // 상품 이름
        item.name,            // 이름
        item.approvalDay[j],  // 결제 날짜
        item.fee[j]           // 결제 금액
      );

      data.push(paymentHistory); // data 배열에 추가
    }
  }

  filterData(data)
}

fetchPaymentHistory(); // API 호출


function filterData(userInfo){

  const filteredData = []

  const date = userInfo.map((ele)=>{
    return ele.date
  })
    while (filteredData.length < 5){
      const max = date.reduce((a, b) => Math.max(a, b), -Infinity);

    for(let j = 0; j < date.length; j++) {
      if(date[j] == max)  {

        filteredData.push(
          new PaymentHistory(
           userInfo[j+filteredData.length].seatType, 
           userInfo[j+filteredData.length].name, 
          userInfo[j+filteredData.length].date, 
         userInfo[j+filteredData.length].fee)
        )

        date.splice(j, 1);
      }
    }
    }
  console.log(filteredData)

}