export interface CancelBillingIntegration {
    cancel: (code: string) => Promise<void>;
}
