export enum LangEnum {
	EN = 'en',
	RU = 'ru'
}

Object.keys(LangEnum).forEach((key /* LangEnum.key */) => {
	const e = LangEnum as any;
	/* LangEnum.val */
	const val = e[key];
	// inverse mapping
	e[val.toLowerCase()] = key.toLowerCase();
});
