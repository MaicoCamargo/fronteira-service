import { Wrapper } from '../../../main/protocols/http-wrapper';
import { ServicoModel } from '../../models/servico-model';
import { PageFilter } from '../../../main/protocols/page-filter';

export interface LoadServicosParams extends PageFilter {
    modelo?: string;
    placa?: string;
    cliente?: string;
    startDate?: Date;
    endDate?: Date;
    clientes?: number[];
}

export interface LoadServicos {
    load: (params?: LoadServicosParams) => Promise<Wrapper<ServicoModel[]>>;
}
