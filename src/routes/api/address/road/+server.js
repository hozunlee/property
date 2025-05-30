import { json } from '@sveltejs/kit'
import { ADDRESS_KEY } from '$env/static/private'

// 사용방법
// const addressList = await getRoadAddress(complexAddressKb)
// console.log('converted address:', addressList)

export async function POST({ request }) {
	/** @type {string} */
	const complexAddressKb = await request.json()
	console.log('complexAddressKb: ', complexAddressKb)

	const address = await getRoadAddress(complexAddressKb)
	console.log('converted address:', address)

	return json(address)
}

/**
 * @typedef {Object} RoadAddrResult
 * @property {string} [AddressOld] 지번 주소
 * @property {string} [roadAddr] 도로명 주소
 * @property {string} [message] 에러 시 메세지
 */

/**
 * @param {string} AddressOld KbAPI에서 받아온 (구) 주소 ex) 강서구 내발산동 742 103동 1402호
 * @returns {Promise<string[]>} 도로명 주소를 담은 객체
 */
const getRoadAddress = async (AddressOld) => {
	// 지번주소까지만 담는 변수 ex) ㅇㅇ구 ㅇㅇ동 123 // 이하 삭제
	const numberAddr = AddressOld.split(' ').slice(0, 3).join(' ')

	//api :: https://business.juso.go.kr/addrlink/openApi/searchApi.do
	let bodyContent = new FormData()
	bodyContent.append('keyword', numberAddr)
	bodyContent.append('confmKey', ADDRESS_KEY)
	bodyContent.append('resultType', 'json')

	const url = 'https://business.juso.go.kr/addrlink/addrLinkApi.do'

	//header 요소가 json이 아니어서 기존 fetch 사용
	let response = await fetch(url, {
		method: 'POST',
		body: bodyContent
	})

	let { results } = await response.json()

	console.log('🚀 ~ getRoadAddress ~ results:', results)
	//error 처리
	if (results.common.errorMessage !== '정상' && results.juso.length <= 0) {
		console.log('/api/address/road:', results.common.errorMessage, results.juso.length)
		return []
	}

	let addressObj = results?.juso.map((/** @type {{ [key: string]: string }} */ item) => {
		return {
			roadAddr: item.roadAddr,
			detBdNmList: item.detBdNmList,
			engAddr: item.engAddr,
			zipNo: item.zipNo
		}
	})

	// 주소가 1개로 정확히 나왔을 경우
	if (results.juso.length === 1) {
		return addressObj
	} else {
		// 주소가 2개 이상의 객체로 나왔을 경우
		//building number 만 뽑아오기 ((ex) 101동)
		const buildingNumber = AddressOld.split(' ')[3]
		console.log('buildingNumber :>> ', buildingNumber)
		// detBdNmList 값을 buildingNumber 로 검색함(string 형태로 나오기 때문에 해당 단어가 포함되어있는지 확인 ex)11동, 1동, 3동 )
		// TODO 정확한 검색을 위해 여러가지 세부 조건이 더 필요할 것으로 보임

		const findBuildingNumberArray = results.juso.find(
			(/** @type {{ [key: string]: string }} */ item) => item.detBdNmList.includes(buildingNumber)
		)
		// 정상! 특정 된 array의 roadAddr을 반환함
		// if (findBuildingNumberArray) return { AddressOld, roadAddr: findBuildingNumberArray.roadAddr }
		// else return results?.juso // bulidingNumber로 특정하지 못할경우 juso array 전체를 반환

		// 미진) 다른 특정값들 없이 도로명주소만 보내주면 될 것 같아 필터링 해줌.
		if (findBuildingNumberArray) return [findBuildingNumberArray.roadAddr]
		else {
			let addressArr = results?.juso.map((/** @type {{ [key: string]: string }} */ addressObj) => {
				return addressObj
			})
			return addressArr
		}
	}
}
