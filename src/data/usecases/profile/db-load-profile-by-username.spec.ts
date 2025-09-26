import { DbLoadProfileByUsername } from './db-load-profile-by-username';
import { LoadProfileByUsernameRepository } from '@/data/protocols/db/profile/load-profile-by-username-repository';
import { LoadPositionByProfileIdRepository } from '@/data/protocols/db/position/load-position-by-profile-id-repository';
import { DbProfileModel } from '@/data/models/db-profile-model';
import { DbPositionModel } from '@/data/models/db-position-model';
import { mockFakeDbProfileModel } from '../../../../tests/mock/mock-profile';
import { mockFakeDbPositionModelList } from '../../../../tests/mock/mock-profile-position';

describe('DbLoadProfileByUsername Use Case', () => {
    test('Deve chamar LoadProfileByUsernameRepository com valor correto', async () => {
        const { sut, loadProfileByUsernameRepositoryStub } = makeSut();
        const spy = jest.spyOn(loadProfileByUsernameRepositoryStub, 'loadByUsername');
        await sut.load(mockFakeDbProfileModel().username);
        expect(spy).toHaveBeenCalledWith(mockFakeDbProfileModel().username);
    });

    test('Deve retornar o profile em caso de sucesso', async () => {
        const { sut } = makeSut();
        const profile = await sut.load(mockFakeDbProfileModel().username);
        expect(profile.username).toBe(mockFakeDbProfileModel().username);
        expect(profile.mail).toBe(mockFakeDbProfileModel().mail);
        expect(profile.positions).toEqual([
            { id: mockFakeDbPositionModelList()[0].id_position, name: mockFakeDbPositionModelList()[0].name },
            { id: mockFakeDbPositionModelList()[1].id_position, name: mockFakeDbPositionModelList()[1].name }
        ]);
    });
});

interface SutTypes {
    sut: DbLoadProfileByUsername;
    loadProfileByUsernameRepositoryStub: LoadProfileByUsernameRepository;
    loadPositionByProfileIdRepositoryStub: LoadPositionByProfileIdRepository;
}

const makeSut = (): SutTypes => {
    const loadProfileByUsernameRepositoryStub = makeLoadProfileByUsernameRepository();
    const loadPositionByProfileIdRepositoryStub = makeLoadPositionByProfileIdRepository();
    const sut = new DbLoadProfileByUsername(loadProfileByUsernameRepositoryStub, loadPositionByProfileIdRepositoryStub);
    return { sut, loadProfileByUsernameRepositoryStub, loadPositionByProfileIdRepositoryStub };
};

const makeLoadProfileByUsernameRepository = (): LoadProfileByUsernameRepository => {
    class LoadProfileByUsernameRepositoryStub implements LoadProfileByUsernameRepository {
        async loadByUsername(username: string): Promise<DbProfileModel> {
            return mockFakeDbProfileModel();
        }
    }

    return new LoadProfileByUsernameRepositoryStub();
};

const makeLoadPositionByProfileIdRepository = (): LoadPositionByProfileIdRepository => {
    class LoadPositionByProfileIdRepositoryStub implements LoadPositionByProfileIdRepository {
        async loadByIdProfile(profile: number): Promise<DbPositionModel[]> {
            return mockFakeDbPositionModelList();
        }
    }

    return new LoadPositionByProfileIdRepositoryStub();
};
