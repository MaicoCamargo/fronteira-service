import { CarroModel } from './carro-model';

export interface IncludedItemModel {
    id: number;
    nome: string;
    marca?: string;
    valor: number;
    quantidade: number;
    total: number;
}

export interface ServicoModel {
    id: number;
    descricao?: string;
    valor: number;
    data: Date;
    carro: CarroModel;
    quilometragem?: number;
    lastUpdate?: Date;
    itens: IncludedItemModel[];
}
