import { DeepPartial, Equal, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from '../entities';

export class CrudRepository<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async getAll(): Promise<T[]> {
    return this.repository.find();
  }

  async getById(id: string): Promise<T> {
    return this.repository.findOne({
      where: { id: Equal(id) } as FindOptionsWhere<T>,
    }) as never;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    await this.repository.update(id, data as never);
    return this.getById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
