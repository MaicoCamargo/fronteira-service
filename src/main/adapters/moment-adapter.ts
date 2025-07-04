import moment from 'moment';

moment().locale('pt-br');

const now = moment();

export const MomentAdapter = {
    format(date?: Date | string, format?: string): string {
        return moment(date || now).format(format || 'YYYY-MM-DD');
    }
};
