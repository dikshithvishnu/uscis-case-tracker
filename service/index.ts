/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios, { AxiosResponse, AxiosError } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const client = axios.create({
	baseURL: baseURL,
	timeout: 60000,
	headers: {
		'Content-Type': 'application/json',
	},
});

const handleUnauthorized = async () => {
	await postData('/logout', {});
    window?.location?.href === '/';
};

const handleAxiosError = async (error: AxiosError) => {
	if (error?.response?.status === 401) {
		window?.sessionStorage?.removeItem('session_id');
		window?.location.href === '/';
	}
	return error.response;
};

export const getData = async (
	endpoint: string
): Promise<AxiosResponse | undefined> => {
	try {
		const response = await client.get(endpoint);
		if (response.status === 401) {
			await handleUnauthorized();
		}
		return response;
	} catch (error) {
		return handleAxiosError(error as AxiosError);
	}
};

export const postData = async (
	endpoint: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload: any
): Promise<AxiosResponse | undefined> => {
	try {
		const response = await client.post(endpoint, payload);
		if (typeof window !== 'undefined' && response.status === 401) {
			await handleUnauthorized();
		}
		return response;
	} catch (error) {
		return handleAxiosError(error as AxiosError);
	}
};
