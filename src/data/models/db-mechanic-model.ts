import { DbProfileModel } from '@/data/models/db-profile-model';

export type DbMechanicModel = Omit<DbProfileModel, 'birthday' | 'username' | 'contact' | 'id_profile'> & {
    id_mecanico: number;
};
