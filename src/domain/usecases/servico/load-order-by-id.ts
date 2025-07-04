import { Wrapper } from '@/main/protocols/http-wrapper';
import { ServicoModel } from '@/domain/models/servico-model';

export interface LoadOrderById {
    loadById: (id: number) => Promise<Wrapper<ServicoModel>>;
}
