import type { LangEnum } from '../../types';

export type AllBreedsResponse = {
	status: string;
	message: {
		[key: string]: string[];
	};
};

export type PageData = {
	breeds: {
		id: string;
		name: string;
	}[];
	langs: Record<LangEnum, Lang>;
};

export type Lang = {
	pageTitle: string;
	pageHeading: string;
	pageDescription: string;
};
