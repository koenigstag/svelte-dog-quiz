import { writable } from 'svelte/store';
import { LangEnum } from '../types';

const mainStore = {
	lang: writable<LangEnum>(
		typeof window !== 'undefined'
			? (localStorage.getItem('lang') as LangEnum) ?? LangEnum.EN
			: LangEnum.EN
	)
};

export default mainStore;
