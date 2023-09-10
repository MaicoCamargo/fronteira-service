import { Wrapper } from '../../presentation/protocols/http/http-wrapper';

export const knexPaginateAdapter = async <T>(query: any, page?: number, limit?: number): Promise<Wrapper<T>> => {
    if (!page && !limit) {
        return {
            content: await query
        };
    }
    const result = await query.paginate({ perPage: limit, currentPage: page, isLengthAware: true });
    return {
        content: result.data,
        pagination: result.pagination
    };
};
