import { BaseEntity } from '../entities';
import { CrudRepository } from '../repositories';

export abstract class CrudService<T extends BaseEntity> {
  constructor(private readonly repository: CrudRepository<T>) {}

  async getAll(): Promise<T[]> {
    return this.repository.getAll();
  }

  async getById(id: string): Promise<T> {
    return this.repository.getById(id);
  }

  async create(data: T): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
