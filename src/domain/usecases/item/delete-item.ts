export interface DeleteItem {
    delete: (id: number) => Promise<void>;
}
