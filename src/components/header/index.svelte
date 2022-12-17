<!-- Path: src\components\header\index.svelte -->
<script lang="ts">
	type Link = {
		href: string;
		text: string;
		active: boolean;
	};

	import { onMount } from 'svelte';
	import mainStore from '../../stores/main';
	import { LangEnum } from '../../types';

	export let heading = 'Header';

	let lang = LangEnum.EN;

	mainStore.lang.subscribe((value) => {
		lang = value;
	});

	let currPath = typeof window === 'undefined' ? '/' : window.location.pathname;

	const getLinks = (lang: LangEnum, currPath: string) => {
		return [
			{
				href: '/',
				text: lang === LangEnum.RU ? 'Главная' : 'Home',
				active: currPath === '/'
			},
			{
				href: '/test',
				text: lang === LangEnum.RU ? 'Тест на знание пород' : 'Breed Test',
				active: currPath === '/test'
			},
			{
				href: '/best',
				text: lang === LangEnum.RU ? 'Лучшая порода' : 'Best Breed',
				active: currPath === '/best'
			}
		].filter((link) => link.href !== currPath) as Link[];
	};

	let links: Link[];

	$: links = getLinks(lang, currPath);

	onMount(() => {
		currPath = typeof window === 'undefined' ? '/' : window.location.pathname;

		const query = new URLSearchParams(window.location.search);

		const shortLang = query.get('hl');

		if (shortLang) {
			const langVal = LangEnum[shortLang.toUpperCase() as keyof typeof LangEnum];
			mainStore.lang.set(langVal);
			localStorage.setItem('lang', langVal);
		}
	});

	const changeLang = (lang: LangEnum) => {
		mainStore.lang.set(lang);

		localStorage.setItem('lang', lang);
	};
</script>

<header>
	<h2>{heading}</h2>
	<nav>
		<ul>
			{#each links as { href, text, active }}
				<li class:active>
					<a {href}>{text}</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div>
		<button on:click={() => changeLang(LangEnum.RU)}>RU</button>
		<button on:click={() => changeLang(LangEnum.EN)}>EN</button>
	</div>
</header>
