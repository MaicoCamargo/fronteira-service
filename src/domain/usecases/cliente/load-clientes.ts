import { Wrapper } from '@/main/protocols/http-wrapper';
import { PageFilter } from '@/main/protocols/page-filter';
import { ClienteModel } from '@/domain/models/cliente-model';

export interface LoadClientesParams extends PageFilter {
    nome: string;
}

export interface LoadClientes {
    load: (params?: LoadClientesParams) => Promise<Wrapper<ClienteModel[]>>;
}
