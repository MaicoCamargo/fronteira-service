import { DbPositionModel } from '../../src/data/models/db-position-model';

export const mockFakeDbPositionModelList = (): DbPositionModel[] => [
    { id_position: 1, name: 'Mechanic' },
    { id_position: 2, name: 'Gerente' }
];
