import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { EntityDO } from '../model/entity';
import { IGenericRepository } from './generic-repository.interface';
import { Http } from '@angular/http';

@Injectable()
export abstract class GenericRepository<T extends EntityDO> implements IGenericRepository<T> {

    abstract getUrl(): string;

    constructor(
        protected http: Http) { }

    onGetData(): Promise<any> {
        const url = `${this.getUrl()}`;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return (response) ? response.json() : Promise.resolve('');
            }).catch(erro => {
                // return this.messageService.setResponseError(erro);
            });
    }

    onGet(id: number): Promise<T> {
        return this.http.get(`${this.getUrl()}/${id}`)
            .toPromise()
            .then(response => {
                return (response) ? response.json() : Promise.resolve('');
            }).catch(erro => {
                // return this.messageService.setResponseError(erro);
            });
    }

    onRemove(entity: T): Promise<void> {
        return this.http.delete(`${this.getUrl()}/${entity.id}`)
            .toPromise()
            .then(() => {
                // this.messageService.setInformation(`Registro removido com sucesso.`);
            }
            ).catch(erro => {
                // return this.messageService.setResponseError(erro);
            });
    }

    onPersist(entity: T): Promise<any> {
        if (entity.id) {
            return this.onUpdate(entity);
        } else {
            return this.onCreate(entity);
        }
    }

    onUpdate(entity: T): Promise<any> {
        return this.http.put(`${this.getUrl()}/${entity.id}`, entity)
            .toPromise()
            .then(() => {
                // this.messageService.setInformation(`Registro Atualizado com sucesso.`);
            }
            ).catch(erro => {
                // return this.messageService.setResponseError(erro);
            });
    }

    onCreate(entity: T): Promise<any> {
        return this.http.post(`${this.getUrl()}/`, entity)
            .toPromise()
            .then(() => {
                // this.messageService.setInformation(`Registro adicionado com sucesso.`);
            }
            ).catch(erro => {
                // return this.messageService.setResponseError(erro);
            });
    }

}
