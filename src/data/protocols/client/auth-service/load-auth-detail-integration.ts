export interface LoadAuthDetailIntegration {
    load: (token: string) => Promise<any>;
}
