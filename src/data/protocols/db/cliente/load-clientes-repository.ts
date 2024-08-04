import { DbClienteModel } from '@/data/models/db-cliente-model';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { Filter } from '@/main/protocols/filter';

export interface LoadClientesDbFilter {
    nome?: string;
}

export interface LoadClientesRepository {
    load: (filters?: Filter<LoadClientesDbFilter>) => Promise<Wrapper<DbClienteModel[]>>;
}
