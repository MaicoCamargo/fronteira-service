import { PageFilter } from './page-filter';

export interface Filter<T> {
    params?: T;
    pageFilter?: PageFilter;
}
