/** @type {import('./$types').PageData} */
export async function load({ url, fetch }: any) {
	const res = await fetch('/lang/index.json');

	const langs = await res.json();
	return {
		url,
		langs
	};
}
