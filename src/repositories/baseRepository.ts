import {
  EntityManager,
  EntityTarget,
  FindOneOptions,
  FindOptionsWhere,
  DeepPartial,
} from "typeorm";

export function createBaseRepository<T extends { id: string }>(
  entityManager: EntityManager,
  entity: EntityTarget<T>
) {
  return {
    async create(data: DeepPartial<T>): Promise<T> {
      const entityInstance = entityManager.create(entity, data);
      return entityManager.save(entity, entityInstance);
    },

    async findOne(id: string): Promise<T | null> {
      const options: FindOneOptions<T> = {
        where: { id } as unknown as FindOptionsWhere<T>,
      };
      return entityManager.findOne(entity, options);
    },

    async update(id: string, data: Partial<T>): Promise<T | null> {
      const entityInstance = await this.findOne(id);

      if (!entityInstance) {
        return null;
      }
      Object.assign(entityInstance, data);
      return entityManager.save(entity, entityInstance);
    },

    async delete(id: string): Promise<boolean> {
      const result = await entityManager.delete(entity, id);
      return result.affected !== 0;
    },

    async findAll(): Promise<T[]> {
      return entityManager.find(entity);
    },
  };
}
