import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { IntegrationError } from '@/presentation/errors/integration-error';
import { Wrapper } from '@/main/protocols/http-wrapper';

export class AxiosHelper {
    private static instances: { [key: string]: AxiosHelper } = {};
    private host: string;
    private readonly name: string;
    private axiosInstance: AxiosInstance;

    private constructor(host: string, name: string = Math.random().toString(36).substring(7)) {
        this.host = host;
        this.name = name;
        this.axiosInstance = axios.create({
            baseURL: this.host,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Adicionando interceptores, se necessário
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Manipulação de resposta
                return response.data;
            },
            async (error: AxiosError) => {
                // Manipulação de erro
                console.error(error);
                throw await Promise.reject(
                    new IntegrationError(error.response?.status, error.stack, error.response?.data)
                );
            }
        );
        console.log(`new client:${name}::${host}`);
    }

    public static getInstance(host: string, name?: string): AxiosHelper {
        if (!this.instances[host]) {
            this.instances[host] = new AxiosHelper(host, name);
        }
        return this.instances[host];
    }

    async get(url: string, queryParams?: any, config?: any): Promise<Wrapper<any>> {
        return await this.axiosInstance.get(url + this.queryParams(queryParams), config);
    }

    async post(url: string, data: any, config?: any): Promise<any> {
        console.log(data);
        return await this.axiosInstance.post(url, data, config);
    }

    private queryParams(params: Object): string {
        if (!params) {
            return '';
        }
        const query = Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`) // Codifica os parâmetros
            .join('&');

        return `?${query}`;
    }

    async destroy(): Promise<void> {
        this.host = null;
        this.axiosInstance = null;
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete AxiosHelper.instances[this.host]; // Remove a instância do host
    }
}
