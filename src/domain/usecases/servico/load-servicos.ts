import { Wrapper } from '../../../main/protocols/http-wrapper';
import { ServicoModel } from '../../models/servico-model';
import { PageFilter } from '../../../main/protocols/page-filter';

export interface LoadServicos {
    load: (pageFilter?: PageFilter) => Promise<Wrapper<ServicoModel[]>>;
}
