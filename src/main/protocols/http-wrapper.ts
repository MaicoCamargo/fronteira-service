interface Pagination {
    total: number;
    lastPage: number;
    prevPage: number;
    nextPage: number;
    perPage: number;
    currentPage: number;
    totalItemPage: number;
    from: number;
    to: number;
}

export interface Wrapper<T> {
    content: T;
    pagination?: Pagination;
}
