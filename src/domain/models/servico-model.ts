import { CarroModel } from './carro-model';
import { ClienteModel } from './cliente-model';
import { MechanicModel } from '@/domain/models/mechanic-model';

export interface IncludedItemModel {
    id: number;
    nome: string;
    marca?: string;
    valor: number;
    quantidade: number;
    total: number;
}

type Cliente = Omit<ClienteModel, 'carros' | 'endereco' | 'telefone' | 'lastUpdated' | 'cpf'>;

export interface ServicoModel {
    id: number;
    descricao?: string;
    valor: number;
    data: Date;
    carro: CarroModel;
    quilometragem?: number;
    lastUpdate?: Date;
    itens: IncludedItemModel[];
    cliente: Cliente;
    nota?: boolean;
    mecanicos: MechanicModel[];
}
