import { DbServicoModel } from '@/data/models/db-servico-model';
import { ServicoModel } from '@/domain/models/servico-model';
import { mockFakeCarroModelList } from './mock-carro';
import { mockFakeAddItemParams, mockFakeIncludedItemModelList } from './mock-included-itens';
import { AddServicoParams, PaymentStatus, PaymentType } from '@/domain/usecases/servico/add-servico';
import { SaveServicoModel } from '@/data/protocols/db/servico/save-servico-repository';
import { mockFakeClienteModel } from './mock-cliente';
import { mockFakeMechanicModelList } from './mock-mechanic';

export const mockFakeAddServicoParams = (): AddServicoParams => ({
    valor: 100,
    descricao: 'any_descricao',
    carro: mockFakeCarroModelList()[0],
    itens: [mockFakeAddItemParams()],
    quilometragem: 1000,
    cliente: {
        id: mockFakeClienteModel().id,
        nome: mockFakeClienteModel().nome
    },
    mechanics: [1],
    billing: {
        amount: 100,
        description: 'any description',
        payments: [
            {
                status: PaymentStatus.COMPLETED,
                type: PaymentType.CREDIT_CARD,
                value: 100,
                installments: 1
            }
        ]
    }
});

export const mockFakeSaveServicoModel = (): SaveServicoModel => ({
    valor: 100,
    carro_id: 1,
    descricao: 'any_descricao',
    quilometragem: 1000,
    code: 'OANY_CODE'
});

export const mockFakeDbServicoModelList = (): DbServicoModel[] => [
    {
        id_servico: 1,
        valor: 100,
        carro_id: 1,
        descricao: 'any_descricao',
        quilometragem: 1000,
        codigo: 'any_code'
    },
    {
        id_servico: 2,
        valor: 200,
        carro_id: 2,
        descricao: 'other_descricao',
        quilometragem: 2000,
        codigo: 'other_code'
    }
];

export const mockFakeDbServicoModel = (): DbServicoModel => mockFakeDbServicoModelList()[0];

export const mockFakeServicoModelList = (): ServicoModel[] => [
    {
        id: mockFakeDbServicoModelList()[0].id_servico,
        valor: mockFakeDbServicoModelList()[0].valor,
        data: mockFakeDbServicoModelList()[0].data,
        quilometragem: mockFakeDbServicoModelList()[0].quilometragem,
        descricao: mockFakeDbServicoModelList()[0].descricao,
        lastUpdate: mockFakeDbServicoModelList()[0].last_updated,
        carro: mockFakeCarroModelList()[0],
        itens: mockFakeIncludedItemModelList(),
        cliente: {
            id: mockFakeClienteModel().id,
            nome: mockFakeClienteModel().nome
        },
        nota: false,
        mecanicos: mockFakeMechanicModelList(),
        billing: {
            amount: mockFakeAddServicoParams().billing.amount,
            order: mockFakeDbServicoModelList()[0].id_servico,
            name: `Fronteira service:${mockFakeAddServicoParams().cliente.id}:${mockFakeAddServicoParams().carro.id}:${
                mockFakeAddServicoParams().valor
            }`,
            description: mockFakeAddServicoParams().billing.description,
            id: 44,
            payments: [
                {
                    id: 59,
                    value: 1,
                    status: {
                        name: 'PAID/COMPLETED',
                        id: 2,
                        date: new Date('2025-05-17T19:32:57.441Z')
                    },
                    expirationDate: new Date('2025-06-03T02:59:59.441Z'),
                    type: {
                        name: 'CASH_ON_DELIVERY',
                        id: 3
                    },
                    installment: 1
                }
            ],
            createdAt: new Date('2025-05-17T19:32:57.441Z'),
            status: 'COMPLETED'
        },
        code: mockFakeDbServicoModelList()[0].codigo
    },
    {
        id: mockFakeDbServicoModelList()[1].id_servico,
        valor: mockFakeDbServicoModelList()[1].valor,
        data: mockFakeDbServicoModelList()[1].data,
        quilometragem: mockFakeDbServicoModelList()[1].quilometragem,
        descricao: mockFakeDbServicoModelList()[1].descricao,
        lastUpdate: mockFakeDbServicoModelList()[1].last_updated,
        carro: mockFakeCarroModelList()[1],
        itens: [],
        cliente: {
            id: mockFakeClienteModel().id,
            nome: mockFakeClienteModel().nome
        },
        nota: false,
        mecanicos: [],
        code: mockFakeDbServicoModelList()[1].codigo
    }
];

export const mockFakeServicoModel = (): ServicoModel => mockFakeServicoModelList()[0];
