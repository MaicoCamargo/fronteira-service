export interface DeleteCliente {
    delete: (id: number) => Promise<void>;
}
