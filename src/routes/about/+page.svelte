
<script>
	import { get } from "svelte/store";

  const convertToPyeong = (squareMeter) => {
        // 1평은 약 3.3㎡(정확히는 3.305785㎡)이다. 
    // 따라서 주어진 '㎡' 단위의 값을 '평' 단위로 변환하기 위해 3.305785로 나눈다.
const pyeong = 3.305785;
    return squareMeter / pyeong;
  }

  $ : output = convertToPyeong(value).toFixed(4)


let value
let output = 0


const address = async(keyword) => {

  const getKBData = (baseURL, params = {}) => {
	// build query URL
	let URL = baseURL + '?'
	// add query params
	Object.entries(params).forEach(([key, value]) => {
		if (value) URL += `${key}=${value}&`
	})
	// remove last character (? or &) from created URL
	URL = URL.slice(0, -1)

  return URL
}
// const ress =fetch("https://business.juso.go.kr/addrlink/addrLinkApi.do?keyword=한누리대로%20411&resultType=json&confmKey=U01TX0FVVEgyMDIzMTIyMTE1MTc0NDExNDM3OTU=")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

const body = {
  keyword :  "서울 구로구 고척동 57-9",
  confmKey : "U01TX0FVVEgyMDIzMTIyMTE1MTc0NDExNDM3OTU=",
  resultType : "json"
}

const url = "https://business.juso.go.kr/addrlink/addrLinkApi.do"
const res = getKBData(url, body)


  let headersList = {
 "Accept": "*/*",
 "User-Agent": "Thunder Client (https://www.thunderclient.com)"
}


const addressKb = "서울 구로구 고척동 57-9"

let bodyContent = new FormData();
// bodyContent.append("keyword", "강남구 개포동 12-2 101동");
bodyContent.append("keyword", addressKb);
bodyContent.append("confmKey", "U01TX0FVVEgyMDIzMTIyMTE1MTc0NDExNDM3OTU=");
bodyContent.append("resultType", "json");

let response = await fetch(url, { 
  method: "POST",
  body: bodyContent,
  headers: headersList
}) 

let {results} = await response.json()
console.log(results);
// console.log(data.results.juso[0].roadAddr);
  //error 처리
  if(results.common.errorMessage !== "정상")return 

  //주소가 1개로 정확히 나왔을 경우
if(results.juso.length === 1 ) {
	return console.log('object :>> ', results.juso[0].roadAddr ); 
} else {
//building number 만 뽑아오기 ((ex) 101동)
const buildingNumber = addressKb.split(' ')[3]
console.log('buildingNumber :>> ', buildingNumber);
const finding = results.juso.find((item) => item.detBdNmList.includes(buildingNumber))
console.log('finding :>> ', finding);
console.log('finding.roadAddr :>> ', finding.roadAddr);
}


}





</script>
<button on:click={address}>나는야 버튼</button>
<h1>㎡을 평으로 계산하기</h1>

<section>
  <div>1평은 약 3.3㎡(정확히는 3.305785㎡)이다. </div>
  <div class="flex flex-col items-center justify-center p-4 bg-gray-100">

    <div>
      <h2>선호평수</h2>
      <button on:click={() => value="17"}>17㎡</button>
      <button on:click={() => value="29"} >29㎡</button>
      <button on:click={() => value="36"} >36㎡</button>
      <button on:click={() => value="84"} >84㎡</button>
    </div>

    <div class="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
      <div class="flex justify-between mb-4">
        <div class="w-full text-lg p-2 border-2 border-gray-300 rounded-md flex">
          <input
          bind:value
            class="w-full text-right "
            id="calculator-input"
            placeholder=0
          />
          <span class='pl-1'> ㎡</span>
        </div>
      </div>
    
      <div class="bg-gray-200 p-2 text-right text-lg rounded-md">
        <span></span>
        <span id="calculator-result">{output}평</span>
      </div>
    </div>
  </div>
</section>