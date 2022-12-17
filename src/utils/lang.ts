import { LangEnum } from '../types';
import mainStore from '../stores/main';

export const getLangData = <T>(
	data: { langs: Record<LangEnum, T> },
	onChange: (value: LangEnum) => void = () => undefined
) => {
	let langData = data.langs[LangEnum.EN];

	mainStore.lang.subscribe((value) => {
		const newData = data.langs[value];
		const lang = newData ? value : LangEnum.EN;
		langData = newData ?? data.langs[LangEnum.EN];
		onChange(lang);
	});

	return langData;
};
