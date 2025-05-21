interface PaymentType {
    name: string;
    id: number;
}

interface PaymentStatus {
    name: string;
    id: number;
    date: Date;
}

interface Payment {
    id: number;
    value: number;
    installment: number;
    type: PaymentType;
    expirationDate: Date;
    status: PaymentStatus;
}

export interface BillingModel {
    id: number;
    name: string;
    description: string;
    amount: number;
    order: number;
    service?: number;
    user?: number;
    payments: Payment[];
}
