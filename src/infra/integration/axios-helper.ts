import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { IntegrationError } from '@/presentation/errors/integration-error';

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

        // Adicionando interceptores, se necessário
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Manipulação de resposta
                return response.data;
            },
            async (error: AxiosError) => {
                // Manipulação de erro
                console.error(error);
                throw await Promise.reject(
                    new IntegrationError(error.response.status, error.stack, error.response.data)
                );
            }
        );
    },

    async get(url: string, config?: any): Promise<any> {
        return this.instance.get(url, config);
    },

    async post(url: string, data: any, config?: any): Promise<any> {
        return this.instance.post(url, data, config);
    }
};
