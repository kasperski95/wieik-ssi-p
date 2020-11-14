import { AbstractRepository as ORMAbstractRepository } from 'typeorm';

export abstract class AbstractRepository<T> extends ORMAbstractRepository<T> {
  abstract createAndSave(data: { [key: string]: any }): Promise<T>;
}
