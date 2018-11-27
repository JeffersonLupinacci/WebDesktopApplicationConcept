import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GenericRepository } from '../../shared/generic-repository';
import { ClientDO } from '../../model/client';


@Injectable()
export class ClientService extends GenericRepository<ClientDO> {

  getUrl(): string {
    return `http://localhost:3000/clients?_start=0`;
  }

}
