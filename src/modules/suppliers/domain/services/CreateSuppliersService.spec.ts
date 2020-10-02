import AppError from '@shared/errors/AppError';
import FakeSupplierRepository from '../repositories/fakes/FakeSupplierRepository';
import FakeSupplierTokensRepository from '../repositories/fakes/FakeSupplierTokensRepository';

let fakeSupplierRepository: FakeSupplierRepository;
let fakeSupplierTokensRepository: FakeSupplierTokensRepository;

describe('Create Supplier', () => {
  beforeEach(() => {
    fakeSupplierRepository = new FakeSupplierRepository();
  });
});
