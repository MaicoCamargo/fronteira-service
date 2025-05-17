export interface SaveSimplePayment {
    installments: number;
    value: number;
    // @todo criar enum
    status: string;
    // @todo criar enum
    type: string;
}

export interface SaveSimpleBillingParams {
    name: string;
    description: string;
    payments: SaveSimplePayment[];
    amount: number;
}

export interface SaveSimpleBilling {
    save: (billing: SaveSimpleBillingParams) => Promise<string>;
}
