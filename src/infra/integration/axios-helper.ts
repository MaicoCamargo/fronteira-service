import axios, { AxiosInstance, AxiosResponse } from 'axios';

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
            async (error) => {
                // Manipulação de erro
                console.error(error);
                return await Promise.reject(error);
            }
        );
    },

    async get(url: string, config?: any): Promise<any> {
        if (!this.instance) throw new Error('Axios instance not created. Call createInstance first.');
        return this.instance.get(url, config);
    },

    async post(url: string, data: any, config?: any): Promise<any> {
        if (!this.instance) throw new Error('Axios instance not created. Call createInstance first.');
        return this.instance.post(url, data, config);
    }
};
