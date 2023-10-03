import { CarroModel } from './carro-model';
import { ItemModel } from './item-model';

export interface ServicoModel {
    id: number;
    descricao?: string;
    valor: number;
    data: Date;
    carro: CarroModel;
    quilometragem?: number;
    lastUpdate?: Date;
    itens: ItemModel[];
}
