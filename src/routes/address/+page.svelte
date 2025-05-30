<script lang="ts">
	interface Address {
		roadAddr: string
		zipNo: string
		detBdNmList: string
		engAddr: string
		// Add other properties that might be in the address object
	}

	let input = $state('')
	let addressObj = $state<Address[]>([])
	let copiedAddress = $state('')

	async function copyToClipboard(text: string, type: string) {
		try {
			await navigator.clipboard.writeText(text)
			copiedAddress = `${type}-${text}`
			setTimeout(() => {
				copiedAddress = ''
			}, 2000) // Reset after 2 seconds
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}
	let isLoading = $state(false)
	let errorMsg = $state('')
	let isExpanded = $state(false)

	async function handleGetAddress(e: Event) {
		e.preventDefault()
		isLoading = true
		errorMsg = ''
		try {
			const result = await fetch('/api/address/road', {
				method: 'POST',
				body: JSON.stringify(input)
			})
			const response: Address[] = await result.json()
			if (response && Array.isArray(response)) {
				addressObj = response
			} else {
				addressObj = []
				errorMsg = '검색 결과가 없습니다.'
			}
		} catch (err) {
			addressObj = []
			errorMsg = '오류가 발생했습니다.'
		} finally {
			isLoading = false
		}
	}
</script>

<div class="container flex flex-col items-center justify-center">
	<h1 class="h2 my-5 text-gray-800 mb-4">한국의 모든 주소 찾기</h1>
	<div class="w-full max-w-lg mx-auto mb-6">
		<div class="relative">
			<div class="text-center text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out {isExpanded ? 'max-h-[500px]' : 'max-h-20 overflow-hidden'}">
				<p>
					한국의 모든 주소를 찾아주는 이 서비스는, 마치 어느 비 오는 화요일 오후의 조용한 카페처럼
					조용하지만 확실한 존재감을 드러냅니다.
					{#if isExpanded}
						<span class="block mt-2">
							주소 한 줄이 가진 무게와 그 속에 담긴 수많은 이야기들.
							그것들을 클릭 한 번으로 손에 쥘 수 있게 해주죠. 우편번호는 파란 뱃지로, 도로명은 검은 글씨로,
							영어 주소는 은은한 회색으로. 각각의 주소 조각들은 마치 소설의 한 문단처럼 정갈하게 정리되어
							있습니다. 복사 버튼을 누르면 '복사됨!'이라는 작은 메시지가 스쳐지나가는데, 마치 페이지를 넘길
							때의 그 만족스러운 소리처럼요. 이 서비스는 단순한 주소 검색을 넘어, 당신이 찾고자 하는 그
							장소와의 첫 만남을 도와주는 문지기입니다. 어쩌면 당신이 찾는 건 단순한 주소가 아니라, 그곳에서
							펼쳐질 새로운 이야기의 첫 문장일지도 모릅니다.
						</span>
					{/if}
				</p>
			</div>
			<button
				onclick={() => isExpanded = !isExpanded}
				class="mt-2 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors flex items-center mx-auto"
			>
				{#if isExpanded}
					<span>접기</span>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
					</svg>
				{:else}
					<span>더보기</span>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				{/if}
			</button>
		</div>
	</div>
	<form class="w-full max-w-lg mx-auto space-y-4" onsubmit={handleGetAddress} autocomplete="off">
		<div class="flex items-center gap-2">
			<input
				id="address-input"
				class="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg outline-none text-gray-900 placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-500"
				type="text"
				placeholder="[지번, 도로명, 우편번호, 건물명] 검색"
				bind:value={input}
				required
			/>
			<div class="relative">
				<button
					class="h-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors disabled:opacity-50 flex items-center justify-center"
					type="submit"
					disabled={isLoading}
					aria-label="도로명주소 찾기"
				>
					{#if isLoading}
						<svg
							class="animate-spin"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><circle cx="12" cy="12" r="10" stroke-opacity=".2" /><path
								d="M22 12a10 10 0 0 1-10 10"
							/></svg
						>
					{:else}
						<svg
							width="18"
							height="18"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
							><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg
						>
					{/if}
				</button>
			</div>
		</div>
	</form>

	{#if errorMsg}
		<p class="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>
	{/if}

	{#if addressObj && addressObj.length}
		<div class="w-full max-w-lg mx-auto mt-6 rounded-lg shadow border bg-white overflow-hidden">
			<div class="max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
				{#each addressObj as address}
					<div class="relative px-4 py-3">
						<!-- 우편번호 -->
						<div class="flex items-center gap-2 group mb-2">
							<button
								onclick={() => copyToClipboard(address.zipNo, 'zip')}
								class="flex items-center gap-1 hover:text-blue-500 transition-colors"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
								</svg>
								<span class="badge preset-filled-primary-500 w-fit">{address.zipNo}</span>
								{#if copiedAddress === `zip-${address.zipNo}`}
									<span class="text-xs text-green-600 ml-1">복사됨!</span>
								{/if}
							</button>
						</div>

						<!-- 도로명주소 -->
						<div class="flex items-center gap-2 group mb-2">
							<button
								onclick={() => copyToClipboard(address.roadAddr, 'road')}
								class="flex items-center gap-1 flex-1 text-left hover:text-blue-500 transition-colors"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
								</svg>
								<span class="flex-1 text-gray-900">{address.roadAddr}</span>
								{#if copiedAddress === `road-${address.roadAddr}`}
									<span class="text-xs text-green-600 ml-1">복사됨!</span>
								{/if}
							</button>
						</div>

						<!-- 상세 건물 목록 -->
						{#if address.detBdNmList}
							<div class="flex flex-wrap gap-2 ml-6 mb-2">
								{#each address.detBdNmList.split(',').map((item) => item.trim()) as item}
									<span class="badge preset-outlined-primary-500 text-gray-800">{item}</span>
								{/each}
							</div>
						{/if}

						<!-- 영어주소 -->
						<div class="flex items-center gap-2 group text-sm">
							<button
								onclick={() => copyToClipboard(address.engAddr, 'eng')}
								class="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
							>
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
								</svg>
								<span>영어주소: {address.engAddr}</span>
								{#if copiedAddress === `eng-${address.engAddr}`}
									<span class="text-xs text-green-600 ml-1">복사됨!</span>
								{/if}
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
