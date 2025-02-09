import { DbMechanicModel } from '@/data/models/db-mechanic-model';

export type AddMechanicsModel = number[];

export interface SaveServiceMechanicsRepository {
    save: (servico: number, mechanics: AddMechanicsModel) => Promise<DbMechanicModel[]>;
}
