import { UpdateCliente, UpdateClienteParams } from '../../../domain/usecases/cliente/update-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { UpdateClienteRepository } from '../../protocols/db/cliente/update-cliente-repository';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { UpdateCarroRepository } from '../../protocols/db/carro/update-carro-repository';
import { CarroModel } from '../../../domain/models/carro-model';
import { SaveCarroRepository } from '../../protocols/db/carro/save-carro-repository';

export class DbUpdateCliente implements UpdateCliente {
    constructor(
        private readonly updateClienteRepository: UpdateClienteRepository,
        private readonly updateCarroRepository: UpdateCarroRepository,
        private readonly saveCarroRepository: SaveCarroRepository
    ) {}

    async update(model: UpdateClienteParams): Promise<Wrapper<ClienteModel>> {
        const updated = await this.updateClienteRepository.update({
            id_cliente: model.id,
            nome: model.nome,
            cpf: model.cpf,
            telefone: model.telefone
        });
        const cliente: ClienteModel = {
            id: updated.id_cliente,
            cpf: updated.cpf,
            telefone: updated.telefone,
            nome: updated.nome,
            carros: await this.updateCarros(model, updated.id_cliente)
        };
        return { content: cliente };
    }

    async updateCarros(model: UpdateClienteParams, clienteId: number): Promise<CarroModel[]> {
        const updated: CarroModel[] = [];
        for (const carro of model.carros) {
            if (carro.id) {
                const result = await this.updateCarroRepository.update({
                    id_carro: carro.id,
                    cor: carro.cor,
                    ano: carro.ano,
                    modelo: carro.modelo,
                    placa: carro.placa,
                    quilometragem: carro.quilometragem
                });
                updated.push({
                    cor: result.cor,
                    ano: result.ano,
                    modelo: result.modelo,
                    placa: result.placa,
                    quilometragem: result.quilometragem,
                    id: result.id_carro
                });
            } else {
                const result = await this.saveCarroRepository.save(
                    {
                        cor: carro.cor,
                        ano: carro.ano,
                        modelo: carro.modelo,
                        placa: carro.placa,
                        quilometragem: carro.quilometragem
                    },
                    clienteId
                );
                updated.push({
                    cor: result.cor,
                    ano: result.ano,
                    modelo: result.modelo,
                    placa: result.placa,
                    quilometragem: result.quilometragem,
                    id: result.id_carro
                });
            }
        }
        return updated;
    }
}
