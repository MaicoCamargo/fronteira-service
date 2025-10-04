import { DbServicoModel } from '@/data/models/db-servico-model';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import { mockFakeDbServicoModelList } from './mock-servico';
import { makePgCarroCreate } from './mock-db-carro';

export const makePgServicoCreate = async (): Promise<DbServicoModel[]> => {
    const carros = await makePgCarroCreate();
    return await KnexHelper.forTenant()
        .table('servico')
        .insert([
            { ...mockFakeDbServicoModelList()[0], carro_id: carros[0].id_carro },
            { ...mockFakeDbServicoModelList()[1], carro_id: carros[1].id_carro }
        ])
        .returning(['id_servico', 'valor', 'descricao', 'data', 'quilometragem', 'last_updated', 'carro_id', 'codigo']);
};
