<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/state'

	// State
	let value = $state(0)
	let output = $state('0')

	// 평수 변환 함수
	const convertToPyeong = (squareMeter: number): number => {
		// 1평은 약 3.305785㎡

		return squareMeter / 3.305785
	}

	// 값이 변경될 때마다 평수 계산 (Svelte reactive statement)
	$effect(() => {
		output = typeof value === 'number' ? convertToPyeong(value).toFixed(4) : '0'
	})

	// 버튼 클릭 핸들러
	const handleButtonClick = (size: number): void => {
		value = size
	}

	// 컴포넌트 마운트 시 초기화
	onMount(() => {
		// 초기화 로직
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
	<div
		class="text-8xl flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm"
	>
		<h2 class="text-xl font-semibold text-gray-800 mb-4">가장 많이 등장하는 전용면적</h2>

		<div class="flex flex-wrap justify-center gap-3 mb-6">
			<!-- {[17, 29, 36, 84].map((size) => (
        <button 
          onClick={() => handleButtonClick(size)}
          class="px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-700 text-white transition-colors duration-200 shadow-sm"
        >
          {size}㎡
        </button>
      ))} -->
			{#each [17, 29, 36, 84] as size}
				<button type="button" class="btn preset-filled" onclick={() => handleButtonClick(size)}
					>{size}㎡</button
				>
			{/each}
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
