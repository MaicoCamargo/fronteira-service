export interface DeleteItemRepository {
    delete: (id: number) => Promise<void>;
}
