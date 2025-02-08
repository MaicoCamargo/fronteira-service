import { DbMechanicModel } from '@/data/models/db-mechanic-model';

export type AddMechanicsModel = number[];

export interface UpdateServiceMechanicsRepository {
    update: (servico: number, mechanics: AddMechanicsModel) => Promise<DbMechanicModel[]>;
}
