import type { AllBreedsResponse } from "./types";

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }: any) {
	const langRes = await fetch(`/lang/test/index.json`);
	const langs = await langRes.json();

	const breedsRes = await fetch(`https://dog.ceo/api/breeds/list/all`);
	const breedsData = (await breedsRes.json()) as AllBreedsResponse;
	if (breedsData.status !== 'success') {
		return {
			breeds: []
		};
	}

	const breeds = Object.keys(breedsData.message)
		.map((breed) =>
			breedsData.message[breed].length > 0
				? breedsData.message[breed].map((subbreed) => ({
						id: `${breed}-${subbreed}`,
						name: `${breed} ${subbreed}`
				  }))
				: {
						id: breed,
						name: breed
				  }
		)
		.flat(1);

	return {
		url,
		breeds,
		langs
	};
}
