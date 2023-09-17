import { Wrapper } from '../../../main/protocols/http-wrapper';
import { ServicoModel } from '../../models/servico-model';

export interface LoadServicos {
    load: () => Promise<Wrapper<ServicoModel[]>>;
}
