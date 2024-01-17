
<script>
	import { page } from "$app/stores"



  const convertToPyeong = (squareMeter) => {
        // 1평은 약 3.3㎡(정확히는 3.305785㎡)이다. 
    // 따라서 주어진 '㎡' 단위의 값을 '평' 단위로 변환하기 위해 3.305785로 나눈다.
const pyeong = 3.305785;
    return squareMeter / pyeong;
  }


let value = 0
let output = 0

$ : output = typeof value === "number" ? convertToPyeong(value).toFixed(4) : 0



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
  keyword :  "강남구 개포동 12-2 101동 201호",
  confmKey : "U01TX0FVVEgyMDIzMTIyMTE1MTc0NDExNDM3OTU=",
  resultType : "json"
}

const url = "https://business.juso.go.kr/addrlink/addrLinkApi.do"
const res = getKBData(url, body)


  let headersList = {
 "Accept": "*/*",
 "User-Agent": "Thunder Client (https://www.thunderclient.com)"
}

let bodyContent = new FormData();
// bodyContent.append("keyword", "강남구 개포동 12-2 101동");
bodyContent.append("keyword", "마포구 창전동 450 101동");
bodyContent.append("confmKey", "U01TX0FVVEgyMDIzMTIyMTE1MTc0NDExNDM3OTU=");
bodyContent.append("resultType", "json");

let response = await fetch(url, { 
  method: "POST",
  body: bodyContent,
  headers: headersList
}) 

let data = await response.json()
console.log(data.results);
// console.log(data.results.juso[0].roadAddr);


}





</script>



<svelte:head>
	<title>평형계산기 | 비교 할 수 없는 Tech 기록</title>
	<meta name="title" content="평형계산기 | hololog | 비교 할 수 없는 Tech 기록" />
	<meta
		name="description"
		content=" 평형계산기 맨날 검색하다가 지쳐서 만든 ㎡을 평으로 계산하기 | holo <비교할 수 없는 tech 기록> log "
	/>

	<meta property="og:title" content="평형계산기 | Hololog" />
	<meta property="og:description" content="평형계산기 맨날 검색하다가 지쳐서 만든 ㎡을 평으로 계산하기" />
	<meta
		property="og:image"
		content="https://mjxiofcpqnyfnskvoxut.supabase.co/storage/v1/object/public/strapi-uploads/cal.001.001_1705397990658.jpeg"
	/>
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="평형계산기 | Hololog : 비교할 수 없는 Tech 기록" />
	<!-- <meta name="naver-site-verification" content="ab0c76700bc2d1b64f9fc8d624acc59336e69ec1" /> -->
</svelte:head>


<div class="title">
  <h1>㎡을 평으로 계산하기</h1>


</div>

<section>
  <div class="flex flex-col items-center justify-center p-4 bg-gray-100">

    <h2>가장 많이 등장하는 전용면적</h2>
    <div class="btn-list">
      <button class="btn-grad" on:click={() => value=17}>17㎡</button>
      <button class="btn-grad" on:click={() => value=29} >29㎡</button>
      <button class="btn-grad" on:click={() => value=36} >36㎡</button>
      <button class="btn-grad" on:click={() => value=84} >84㎡</button>
    </div>

    <div class="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
      <div class="flex justify-between mb-4">
        <div class="w-full text-lg p-2 border-2 border-gray-300 rounded-md flex">
          <input
          bind:value
            class="w-full text-right "
            id="calculator-input"
            placeholder=0
            type="number"
          />
          <span class='pl-1'> ㎡</span>
        </div>
      </div>
    
      <div class="bg-gray-200 p-2 text-right text-lg rounded-md">
        <span></span>
        <span id="calculator-result">{output}평</span>
      </div>
      <p class="text-center mt-5 mb-1">1평은 약 3.3㎡(정확히는 3.305785㎡)이다. </p>
    </div>
  </div>
</section>

<style>
input::-webkit-inner-spin-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

  .title {
  margin : 0 auto;
  }

  .title > h1 {
    font-size: 2rem;
    margin : 1rem 0 ;
  }

  .btn-list {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;

  }
  .btn-list button {
    /* border: 1px solid black; */
    border-radius: 5px;
    padding: 0.5rem;
    background-color: #50586C;
    color : white
  }

         
         
         


</style>