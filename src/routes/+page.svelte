<script lang="ts">
	import { page } from '$app/state'

	// State
	let value = $state(0)
	let result = $state({} as AreaCalculation)

	interface AreaCalculation {
		exclusiveArea: string // 전용면적
		supplyArea: string // 공급면적 (분양면적)
		contractArea: string // 계약면적
		exclusiveAreaPyeong: string
		supplyAreaPyeong: string
		contractAreaPyeong: string
	}

	// 평수 변환 함수
	const convertToPyeong = (squareMeter: number): number => {
		// 1평은 약 3.305785㎡
		const PYEONG_TO_SQM = 3.3057851239669 // 정확한 평 단위

		return squareMeter / PYEONG_TO_SQM
	}

	const calculateAreas = (exclusiveArea: number): AreaCalculation => {
		// 일반적인 비율 (아파트 기준)
		const supplyAreaRatio = 1.3 // 공급면적은 전용면적의 약 130%
		const contractAreaRatio = 1.6 // 계약면적은 전용면적의 약 160%

		const supplyArea = exclusiveArea * supplyAreaRatio
		const contractArea = exclusiveArea * contractAreaRatio

		return {
			exclusiveArea: exclusiveArea.toFixed(4),
			supplyArea: supplyArea.toFixed(4),
			contractArea: contractArea.toFixed(4),
			exclusiveAreaPyeong: convertToPyeong(exclusiveArea).toFixed(4),
			supplyAreaPyeong: convertToPyeong(supplyArea).toFixed(4),
			contractAreaPyeong: convertToPyeong(contractArea).toFixed(4)
		}
	}

	const handlerCalculateAreas = (exclusiveArea: number): void => {
		result = calculateAreas(exclusiveArea)
		value = exclusiveArea
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
	<meta
		property="og:description"
		content="평형계산기 :  맨날 검색하다가 지쳐서 만든 ㎡을 평으로 계산하기"
	/>
	<meta
		property="og:image"
		content="https://mjxiofcpqnyfnskvoxut.supabase.co/storage/v1/object/public/strapi-uploads/ogimg01_1693478745390.jpeg"
	/>
	<meta property="og:url" content={page.url.href} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="평형계산기 | Hololog : 비교할 수 없는 Tech 기록" />
	<!-- <meta name="naver-site-verification" content="ab0c76700bc2d1b64f9fc8d624acc59336e69ec1" /> -->
</svelte:head>

<section class="space-y-8">
	<div class=" flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm">
		<h1 class="h2 my-5 text-gray-800 mb-4">가장 많이 등장하는 전용면적</h1>

		<div class="flex flex-wrap justify-center gap-3 mb-6">
			{#each [0, 17, 29, 36, 59, 84] as size}
				<button
					type="button"
					class="btn preset-filled bg-primary-500"
					onclick={() => handlerCalculateAreas(Number(size))}>{size}㎡</button
				>
			{/each}
		</div>

		<div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
			<div class="flex justify-between mb-6">
				<div class="w-full text-lg p-3 border-2 border-gray-300 rounded-md flex items-center">
					<input
						oninput={(e: Event) => {
							const value = (e.target as HTMLInputElement).value
							result = calculateAreas(Number(value))
						}}
						bind:value
						type="number"
						class="w-full text-right focus:outline-none text-black"
						id="calculator-input"
						placeholder="0"
					/>
					<span class="ml-2 text-gray-700">㎡</span>
				</div>
			</div>

			<div class="text-center text-3xl font-bold text-indigo-700 mb-2">
				= {result.exclusiveAreaPyeong} <span class="text-2xl text-gray-600">평</span>
			</div>
			<p class="text-center text-gray-500 text-sm mt-6 mb-1">
				1평은 약 3.3㎡(정확히는 3.305785㎡)입니다.
			</p>
		</div>
		{#if result.exclusiveAreaPyeong}
			<div class="shadow-md rounded-lg p-6 w-full max-w-md mt-5 text-black">
				<h2 class="h4">면적 계산 결과</h2>
				<div>
					<p>
						전용면적 : {result?.exclusiveArea}㎡
						<span>({result.exclusiveAreaPyeong}평)</span>
					</p>
					<p>
						공급면적 : {result.supplyArea}㎡
						<span>({result.supplyAreaPyeong}평)</span>
					</p>
					<p>
						계약면적 : {result.contractArea}㎡
						<span>({result.contractAreaPyeong}평)</span>
					</p>
				</div>

				<div class="my-2">
					<h4 class="font-semibold">💡 참고사항</h4>
					<ul>
						<li>전용면적: 실제 거주 공간</li>
						<li>공급면적: 분양가 계산 기준 (전용면적의 약 130%)</li>
						<li>계약면적: 관리비 계산 기준 (전용면적의 약 160%)</li>
					</ul>
				</div>
			</div>
		{/if}
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
