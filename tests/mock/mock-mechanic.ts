import { DbMechanicModel } from '../../src/data/models/db-mechanic-model';
import { MechanicModel } from '@/domain/models/mechanic-model';

export const mockFakeDbMechanicModelList = (): DbMechanicModel[] => [
    {
        nome: 'any_name',
        id_mecanico: 1
    },
    {
        nome: 'other_name',
        id_mecanico: 2
    }
];

export const mockFakeMechanicModelList = (): MechanicModel[] => {
    return mockFakeDbMechanicModelList().map((row) => ({
        name: row.nome,
        id: row.id_mecanico
    }));
};
