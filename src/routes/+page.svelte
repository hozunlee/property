<script lang="ts">
	import { page } from '$app/state'
	import { Button } from '@skeletonlabs/skeleton'
	import type { PageData } from './$types'

	// 타입 정의
	interface JusoResult {
		results: {
			common: {
				totalCount: string
				currentPage: string
				countPerPage: string
				errorCode: string
				errorMessage: string
			}
			juso?: Array<{
				roadAddr: string
				jibunAddr: string
				zipNo: string
				// 필요한 다른 필드들 추가
			}>
		}
	}

	// 반응형 변수 선언
	let value = $state<number>(0)
	let output = $state<string>('0')

	// 평수 변환 함수
	const convertToPyeong = (squareMeter: number): number => {
		// 1평은 약 3.305785㎡
		return squareMeter / 3.305785
	}

	// 값이 변경될 때마다 평수 계산
	$effect(() => {
		output = typeof value === 'number' ? convertToPyeong(value).toFixed(4) : '0'
	})

	// URL 파라미터 타입 정의
	interface UrlParams {
		[key: string]: string | number | boolean | undefined
	}

	// 주소 검색 함수
	const address = async (keyword: string): Promise<JusoResult['results'] | null> => {
		const getKBData = (baseURL: string, params: UrlParams = {}): string => {
			// 쿼리 파라미터가 있는 URL 생성
			const url = new URL(baseURL)
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					url.searchParams.append(key, String(value))
				}
			})
			return url.toString()
		}

		const params: UrlParams = {
			keyword: '강남구 개포동 12-2 101동 201호',
			confmKey: 'U01TX0FVVEgyMDIzMTIyMTE1MTc0NDExNDM3OTU=',
			resultType: 'json'
		}

		const url = 'https://business.juso.go.kr/addrlink/addrLinkApi.do'
		const apiUrl = getKBData(url, params)

		try {
			const response = await fetch(apiUrl, {
				method: 'GET',
				headers: {
					Accept: '*/*',
					'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
				}
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data: JusoResult = await response.json()
			console.log('주소 검색 결과:', data.results)
			return data.results
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
			console.error('주소 검색 중 오류 발생:', errorMessage)
			return null
		}
	}

	// 버튼 클릭 핸들러
	const handleButtonClick = (size: number): void => {
		value = size
	}

	// 컴포넌트 마운트 시 초기 데이터 로드
	$effect(() => {
		// 초기 데이터 로딩 로직이 필요할 경우 여기에 추가
	})
</script>

<svelte:head>
	<title>평형계산기 | 비교 할 수 없는 Tech 기록</title>
	<meta name="title" content="평형계산기 | hololog | 비교 할 수 없는 Tech 기록" />
	<meta
		name="description"
		content=" 평형계산기 맨날 검색하다가 지쳐서 만든 ㎡을 평으로 계산하기 | holo <비교할 수 없는 tech 기록> log "
	/>

	<meta property="og:title" content="평형계산기 | Hololog" />
	<meta
		property="og:description"
		content="평형계산기 맨날 검색하다가 지쳐서 만든 ㎡을 평으로 계산하기"
	/>
	<meta
		property="og:image"
		content="https://mjxiofcpqnyfnskvoxut.supabase.co/storage/v1/object/public/strapi-uploads/cal.001.001_1705397990658.jpeg"
	/>
	<meta property="og:url" content={page.url.href} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="평형계산기 | Hololog : 비교할 수 없는 Tech 기록" />
	<!-- <meta name="naver-site-verification" content="ab0c76700bc2d1b64f9fc8d624acc59336e69ec1" /> -->
</svelte:head>

<section class="space-y-8">
  <div class="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">가장 많이 등장하는 전용면적</h2>
    
    <div class="flex flex-wrap justify-center gap-3 mb-6">
      {[17, 29, 36, 84].map((size) => (
        <button 
          on:click={() => handleButtonClick(size)}
          class="px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-700 text-white transition-colors duration-200 shadow-sm"
        >
          {size}㎡
        </button>
      ))}
    </div>

    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <div class="flex justify-between mb-6">
        <div class="w-full text-lg p-3 border-2 border-gray-300 rounded-md flex items-center">
          <input
            bind:value
            type="number"
            class="w-full text-right focus:outline-none"
            id="calculator-input"
            placeholder="0"
          />
          <span class="ml-2 text-gray-700">㎡</span>
        </div>
      </div>

      <div class="text-center text-3xl font-bold text-indigo-700 mb-2">
        = {output} <span class="text-2xl text-gray-600">평</span>
      </div>
      <p class="text-center text-gray-500 text-sm mt-6 mb-1">
        1평은 약 3.3㎡(정확히는 3.305785㎡)입니다.
      </p>
    </div>
  </div>
  
  <div class="flex flex-col items-center justify-center my-8">
    <img 
      src="/mongol.jpeg" 
      alt="고려 거란전쟁 일러스트레이션"
      class="w-full max-w-md rounded-lg shadow-md mb-2"
      loading="lazy"
    />
    <p class="text-sm text-gray-500 italic">
      고려거란전쟁 때 서울 집 크기를 보고 후퇴한 거란족 하배압 장군
    </p>
  </div>
</section>
