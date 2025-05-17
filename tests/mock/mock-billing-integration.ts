// @todo setar o nome no padrão
export const mockFakeBilling = (): any => ({
    id: 29,
    name: 'Fronteira service:781:765:15',
    description: 'okokokokok',
    amount: 15,
    order: 1895,
    service: null,
    user: 1,
    payments: [
        {
            id: 42,
            value: 15,
            installment: 1,
            type: {
                name: 'CASH_ON_DELIVERY',
                id: 1
            },
            expirationDate: '2025-06-01T23:59:59.441381',
            status: {
                name: 'PAID/COMPLETED',
                id: 2,
                date: '2025-05-10T19:23:29.441437'
            }
        }
    ]
});
