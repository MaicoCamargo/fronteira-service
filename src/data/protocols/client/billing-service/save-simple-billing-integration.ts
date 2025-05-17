export interface SimplePaymentModel {
    installments: number;
    value: number;
    status: string;
    type: string;
}

export interface SaveSimpleBillingModel {
    name: string;
    description: string;
    amount: number;
    order: number;
    user: number;
    payments: SimplePaymentModel[];
}

export interface SaveSimpleBillingIntegration {
    save: (billing: SaveSimpleBillingModel) => Promise<any>;
}
