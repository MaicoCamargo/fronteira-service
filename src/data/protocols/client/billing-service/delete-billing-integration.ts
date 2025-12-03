export interface DeleteBillingIntegration {
    delete: (code: number) => Promise<void>;
}
