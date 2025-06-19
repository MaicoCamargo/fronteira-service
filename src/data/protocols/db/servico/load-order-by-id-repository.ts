import { DbServicoModel } from '@/data/models/db-servico-model';

export interface LoadOrderByIdRepository {
    loadById: (id_servico: number) => Promise<DbServicoModel>;
}
