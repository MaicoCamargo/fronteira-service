import { DbMechanicModel } from '../../src/data/models/db-mechanic-model';
import { MechanicModel } from '@/domain/models/mechanic-model';

export const mockFakeDbMechanicModelList = (): DbMechanicModel[] => [
    {
        id_mecanico: 1,
        firstName: 'any_name',
        lastName: 'any_lastName',
        nickname: 'any_nickname',
        mail: 'any_email@email.com'
    },
    {
        id_mecanico: 2,
        firstName: 'other_name',
        lastName: 'other_lastName',
        nickname: 'other_nickname',
        mail: 'other_email@email.com'
    }
];

export const mockFakeMechanicModelList = (): MechanicModel[] => {
    return mockFakeDbMechanicModelList().map((row) => ({
        name: row.firstName,
        id: row.id_mecanico
    }));
};
