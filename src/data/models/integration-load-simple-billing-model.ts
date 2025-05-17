export interface IntegrationLoadSimpleBillingModel {
    id: number;
    name: string;
    description: string;
    amount: number;
    order: number;
    user: number;
    service: number;
    payments: [
        {
            id: number;
            value: number;
            installment: number;
            type: {
                name: string;
                id: number;
            };
            expirationDate: Date;
            status: {
                name: string;
                id: number;
                date: Date;
            };
        }
    ];
}
