<!-- Path: src\routes\+page.svelte -->
<script lang="ts">
	import mainStore from '../stores/main';
	import { LangEnum } from '../types';
	import Header from '../components/header/index.svelte';
	import type { PageData, Lang } from './types';

	/** @type {import('./$types').PageData} */
	export let data: PageData;

	let langData: Lang = data.langs[LangEnum.EN];

	mainStore.lang.subscribe((value) => {
		langData = data.langs[value];
	});
</script>

<title>{langData.pageTitle}</title>

<Header heading={langData.pageHeading} />
