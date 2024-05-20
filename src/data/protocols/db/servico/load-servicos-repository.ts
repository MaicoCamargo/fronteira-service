import { DbServicoModel } from '../../../models/db-servico-model';
import { Wrapper } from '../../../../main/protocols/http-wrapper';
import { Filter } from '../../../../main/protocols/filter';

export interface LoadServicosDbFilter {
    clientes?: number[];
    startDate?: Date;
    endDate?: Date;
    modelo?: string;
    placa?: string;
    cliente?: string;
}

export interface LoadServicosRepository {
    load: (filters?: Filter<LoadServicosDbFilter>) => Promise<Wrapper<DbServicoModel[]>>;
}
