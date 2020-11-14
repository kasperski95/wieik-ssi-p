// import { AbstractRepository as ORMAbstractRepository } from 'typeorm';
import { Repository as ORMRepository } from 'typeorm';

export abstract class AbstractRepository<T> extends ORMRepository<T> {
  abstract createAndSave(data: { [key: string]: any }): Promise<T>;
}
