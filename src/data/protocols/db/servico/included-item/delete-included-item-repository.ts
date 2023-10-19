export interface DeleteIncludedItemRepository {
    delete: (pecaId: number, servicoId: number) => Promise<void>;
}
