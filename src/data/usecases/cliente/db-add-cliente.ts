import { AddClienteModel, SaveClienteRepository } from '../../protocols/db/cliente/save-cliente-repository';
import { AddCliente, AddClienteParams } from '../../../domain/usecases/cliente/add-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { SaveCarroRepository } from '../../protocols/db/carro/save-carro-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import { CarroModel } from '../../../domain/models/carro-model';
import { SaveEnderecoRepository } from '../../protocols/db/endereco/save-endereco-repository';
import { AddEnderecoParams } from '../../../domain/usecases/endereco/add-endereco';
import { EnderecoModel } from '../../../domain/models/endereco-model';
import { ScanAndDeleteCacheRepository } from '@/data/protocols/cache/scan-and-delete-cache-repository';

export class DbAddCliente implements AddCliente {
    private readonly LIST_CACHE_KEY: string = 'customers::list';
    constructor(
        private readonly addClienteRepository: SaveClienteRepository,
        private readonly saveCarroRepository: SaveCarroRepository,
        private readonly saveEnderecoRepository: SaveEnderecoRepository,
        private readonly scanAndDeleteCacheRepository: ScanAndDeleteCacheRepository
    ) {}

    async add(params: AddClienteParams): Promise<ClienteModel> {
        const { carros, cpf, nome, telefone, endereco } = params;

        let savedEndereco: EnderecoModel | undefined;
        if (endereco) savedEndereco = await this.saveEndereco(endereco);
        const model: AddClienteModel = {
            cpf,
            nome,
            telefone,
            last_updated: new Date(),
            endereco_id: savedEndereco?.id
        };

        const cliente = await this.addClienteRepository.save(model);

        const promises: Array<Promise<DbCarroModel>> = [];
        if (carros && carros.length > 0) {
            carros.forEach((carro) => {
                promises.push(this.saveCarroRepository.save(carro, cliente.id_cliente));
            });
        }
        const savedCars: CarroModel[] = (await Promise.all(promises)).map((carro: DbCarroModel) => ({
            cor: carro.cor,
            ano: carro.ano,
            id: carro.id_carro,
            modelo: carro.modelo,
            placa: carro.placa,
            quilometragem: carro.quilometragem
        }));
        await this.scanAndDeleteCacheRepository.scanAndDelete(this.LIST_CACHE_KEY);
        return {
            id: cliente.id_cliente,
            lastUpdated: cliente.last_updated,
            cpf: cliente.cpf,
            nome: cliente.nome,
            telefone: cliente.telefone,
            carros: savedCars,
            endereco: savedEndereco
        };
    }

    private async saveEndereco(endereco: AddEnderecoParams): Promise<EnderecoModel> {
        const model = await this.saveEnderecoRepository.save(endereco);
        return {
            id: model.id_endereco,
            cep: model.cep,
            numero: model.numero,
            cidade: model.cidade,
            rua: model.rua,
            complemento: model.complemento
        };
    }
}
