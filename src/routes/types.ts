import type { LangEnum } from 'src/types';

export type PageData = {
	url: URL;
	langs: Record<LangEnum, Lang>;
};

export type Lang = {
	pageTitle: string;
	pageHeading: string;
};
