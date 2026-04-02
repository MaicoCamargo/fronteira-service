export interface IntegrationLoadSimpleBillingModel {
    id: number;
    name: string;
    description: string;
    amount: number;
    order: string;
    user: number;
    createdAt: Date;
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
    status: string;
    code: string;
}
