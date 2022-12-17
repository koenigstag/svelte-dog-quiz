<!-- Path: src\routes\test\+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '../../components/header/index.svelte';
	import type { PageData, Lang } from './types';
	import { getLangData } from '../../utils/lang';
	import { capitalize } from '../../utils/util.funcs';

	/** @type {import('./$types').PageLoad} */
	export let data: PageData;

	let langData: Lang;
	langData = getLangData<Lang>(data, (newLangData) => {
		langData = newLangData;
	});

	let started = false;
	let result: boolean | undefined = undefined;

	let imgSrc = '';
	let breed = '';
	let guess = '';

	const cleanUp = () => {
		started = false;
		result = undefined;
		imgSrc = '';
		breed = '';
		guess = '';
	};

	const startRound = async () => {
		cleanUp();

		started = true;

		const response = await fetch('https://dog.ceo/api/breeds/image/random');
		const json = await response.json();
		imgSrc = json.message;

		const regex = /\/breeds\/(?<breed>[\w-]+)\//;

		const execRes = regex.exec(imgSrc);

		const groups = execRes?.groups;

		breed = (groups?.breed ?? '').replace('-', ' ');

		console.log(capitalize(breed));
	};

	const checkGuess = (guess: string, breed: string) => {
		if (guess.toLowerCase().replace('-', ' ') === breed.toLowerCase().replace('-', ' ')) {
			return true;
		}

		return false;
	};

	const onSuccess = () => {
		// alert('Correct!');

		result = true;
	};

	const onFail = () => {
		// alert('Wrong!');

		result = false;
	};

	const onSelectChange = (e: Event) => {
		const target = e.target as HTMLSelectElement;
		guess = target?.value || '';
	};

	const makeGuess = () => {
		const verdict = checkGuess(guess, breed);

		if (verdict) {
			onSuccess();
		} else {
			onFail();
		}
	};
</script>

<title>Breed test</title>

<Header heading={langData.pageTitle} />

{#if !started}
	{#if result === undefined}
		<div>
			<h4>{langData.clickToStart}</h4>
		</div>
		<div>
			<button on:click={startRound}>{langData.startRound}</button>
		</div>
	{/if}
{/if}

{#if started}
	<div>
		<img src={imgSrc} alt="Random dog" class="image" width="500" height="500" />
	</div>

	{#if result === undefined}
		<div>
			<h4>{langData.question}</h4>
			<select on:change={onSelectChange} value={guess}>
				{#each data.breeds as { id, name }}}
					<option id={id.toLowerCase()} value={capitalize(name)}>{capitalize(name)}</option>
				{/each}
			</select>
			<button on:click={makeGuess}>Select</button>
		</div>
	{:else}
		<div>
			{#if result === true}
				<h4>{langData.correct}</h4>
				<h4>{langData.answer}: <span>{capitalize(breed)}</span></h4>
			{:else if result === false}
				<h4>{langData.wrong}</h4>
				<h4>{langData.correctAnswerIs}: <span>{capitalize(breed)}</span></h4>
				<h4>{langData.yourGuessIs}: <span>{capitalize(guess)}</span></h4>
			{/if}
		</div>
		<div>
			<button on:click={startRound}>{langData.nextRound}</button>
		</div>
	{/if}
{/if}

<style>
	.image {
		width: 100%;
		max-width: 500px;
		aspect-ratio: 1 / 1;

		object-fit: cover;
	}

	h4 {
		margin: 0.5rem;
	}
</style>
