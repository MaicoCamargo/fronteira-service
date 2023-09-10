interface Pagination {
    total: number;
    lastPage: number;
    prevPage: number;
    nextPage: number;
    perPage: number;
    currentPage: number;
    from: number;
    to: number;
}

export interface Wrapper<T> {
    content: T;
    pagination?: Pagination;
}
