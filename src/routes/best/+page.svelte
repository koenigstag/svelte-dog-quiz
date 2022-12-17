<!-- Path: src\routes\best\+page.svelte -->
<script lang="ts">
	import type { Lang, PageData } from './types';
	import { getLangData } from '../../utils/lang';
	import Header from '../../components/header/index.svelte';

	/** @type {import('./$types').PageLoad} */
	export let data: PageData;

	let langData: Lang;
	langData = getLangData(data, (newLangData) => {
		langData = newLangData;
	});
</script>

<title>{langData.pageTitle}</title>

<Header heading={langData.pageHeading} />

<h2>{langData.pageDescription}</h2>

<!-- <button>Start</button> -->
