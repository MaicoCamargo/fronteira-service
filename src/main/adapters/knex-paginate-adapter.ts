import { Wrapper } from '../protocols/http-wrapper';
import { PageFilter } from '../protocols/page-filter';

export const knexPaginateAdapter = async <T>(query: any, pageFilter?: PageFilter): Promise<Wrapper<T>> => {
    if (!pageFilter.size || !pageFilter.page) {
        return {
            content: await query
        };
    }
    const result = await query.paginate({
        perPage: pageFilter.size,
        currentPage: pageFilter.page,
        isLengthAware: true
    });
    return {
        content: result.data,
        pagination: result.pagination
    };
};
