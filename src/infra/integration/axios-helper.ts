import axios, { AxiosError, AxiosInstance } from 'axios';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { forbidden, unauthorized } from '@/presentation/helpers/http';

export const AxiosHelper = {
    instance: null as AxiosInstance,
    host: null as string,

    async create(host: string): Promise<void> {
        this.host = host;
        this.instance = axios.create({
            baseURL: this.host,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    async get(url: string, config?: any): Promise<any> {
        try {
            const response = await this.instance.get(url, config);
            if (response.data) return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.status === 401) {
                    return unauthorized('unauthorized');
                }
                if (error.status === 403) {
                    return forbidden('denied access');
                }
            }
        }
    },

    async post(url: string, data: any, config?: any): Promise<Wrapper<any>> {
        const response = await this.instance.post(url, data, config);
        if (response.data) return response.data;
    }
};
