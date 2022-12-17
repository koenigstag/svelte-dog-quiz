import { goto } from '$app/navigation';

export const setSearchParam = (search: string, key: string, value: string) => {
	const query = new URLSearchParams(search);
	query.set(key, value);
	goto(`?${query.toString()}`);
};

export const getSearchParam = (search: string, key: string) => {
	const query = new URLSearchParams(search);
	return query.get(key);
}
