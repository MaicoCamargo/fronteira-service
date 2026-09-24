import axios, { AxiosError, AxiosInstance, AxiosResponse, HttpStatusCode } from 'axios';
import http from 'node:http';
import https from 'node:https';
import { IntegrationError } from '@/presentation/errors/integration-error';
import { Wrapper } from '@/main/protocols/http-wrapper';

export class AxiosHelper {
    private static instances: { [key: string]: AxiosHelper } = {};
    private host: string;
    private readonly name: string;
    private axiosInstance: AxiosInstance;
    private readonly agent: http.Agent | https.Agent;

    private constructor(host: string, name: string = Math.random().toString(36).substring(7)) {
        this.host = host;
        this.name = name;
        const Agent = host.startsWith('https') ? https.Agent : http.Agent;
        this.agent = new Agent({ keepAlive: true, keepAliveMsecs: 1000 });
        this.axiosInstance = axios.create({
            baseURL: this.host,
            headers: {
                'Content-Type': 'application/json'
            },
            httpAgent: this.agent,
            httpsAgent: this.agent
        });

        // Adicionando interceptores, se necessário
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Manipulação de resposta
                return response.data;
            },
            async (error: AxiosError) => {
                if (error?.response?.status === HttpStatusCode.NotFound) {
                    return { content: null };
                }
                // Manipulação de erro
                console.error(error);
                throw await Promise.reject(
                    new IntegrationError(error.response?.status, error.stack, error.response?.data)
                );
            }
        );
    }

    public static getInstance(host: string, name?: string): AxiosHelper {
        if (!this.instances[host]) {
            this.instances[host] = new AxiosHelper(host, name);
        }
        return this.instances[host];
    }

    async get<T = any>(url: string, queryParams?: any, config?: any): Promise<Wrapper<T>> {
        return await this.axiosInstance.get(url + this.queryParams(queryParams), config);
    }

    async post<T = any>(url: string, data: any, config?: any): Promise<T> {
        return await this.axiosInstance.post(url, data, config);
    }

    async put<T = any>(url: string, data: any, config?: any): Promise<T> {
        return await this.axiosInstance.put(url, data, config);
    }

    async patch<T = any>(url: string, data?: any, config?: any): Promise<T> {
        return await this.axiosInstance.patch(url, data, config);
    }

    async delete<T = any>(url: string, config?: any): Promise<T> {
        return await this.axiosInstance.delete(url, config);
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
        const host = this.host;
        this.agent.destroy();
        this.host = null;
        this.axiosInstance = null;
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete AxiosHelper.instances[host];
    }

    static async destroyAll(): Promise<void> {
        await Promise.all(
            Object.keys(AxiosHelper.instances).map(async (key) => await AxiosHelper.instances[key].destroy())
        );
    }

    /**
     * add http header
     * @param key - header name
     * @param value - header value
     */
    setHeader(key: string, value: string): void {
        if (!this.axiosInstance) {
            throw new Error('Axios instance not initialized');
        }
        this.axiosInstance.defaults.headers.common[key] = value;
    }
}
