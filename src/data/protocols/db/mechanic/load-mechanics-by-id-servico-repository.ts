import { Wrapper } from '@/main/protocols/http-wrapper';
import { DbMechanicModel } from '@/data/models/db-mechanic-model';

export interface LoadMechanicsByIdServicoRepository {
    loadByIdServico: (servico: number) => Promise<Wrapper<DbMechanicModel[]>>;
}
