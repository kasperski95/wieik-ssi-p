import { AbstractRepository as ORMAbstractRepository } from 'typeorm';

export abstract class AbstractRepository<T> extends ORMAbstractRepository<T> {
  abstract create(data: { [key: string]: any }): T;
}
