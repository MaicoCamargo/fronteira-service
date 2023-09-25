import { Wrapper } from '../protocols/http-wrapper';
import { PageFilter } from '../protocols/page-filter';

export const knexPaginateAdapter = async <T>(query: any, pageFilter?: PageFilter): Promise<Wrapper<T>> => {
    if (!pageFilter?.size || !pageFilter?.page) {
        return {
            content: await query
        };
    }
    const result = await query.paginate({
        perPage: pageFilter.size,
        currentPage: pageFilter.page,
        isFromStart: false,
        isLengthAware: true
    });
    const { pagination } = result;
    return {
        content: result.data,
        pagination: {
            perPage: parseInt(pagination.perPage),
            currentPage: parseInt(pagination.currentPage),
            total: parseInt(pagination.total),
            lastPage: parseInt(pagination.lastPage),
            prevPage:
                parseInt(pagination.prevPage) > parseInt(pagination.lastPage) || pagination.prevPage === null
                    ? null
                    : parseInt(pagination.prevPage),
            nextPage:
                parseInt(pagination.currentPage) >= parseInt(pagination.lastPage)
                    ? null
                    : parseInt(pagination.currentPage) + 1,
            totalItemPage: parseInt(result.data.length),
            from: parseInt(pagination.from),
            to: parseInt(pagination.to)
        }
    };
};
