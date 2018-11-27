import { EntityDO } from '../model/entity';

export interface IGenericRepository<T extends EntityDO> {

  onGetData(): Promise<any>;

  onGet(id: number): Promise<T>;

  onRemove(entity: T): Promise<void>;

  onPersist(entity: T): Promise<any>;

  onUpdate(entity: T): Promise<any>;

  onCreate(entity: T): Promise<any>;

}
