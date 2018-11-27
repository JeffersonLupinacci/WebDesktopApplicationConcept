import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableModule} from 'primeng/table';

import { ClientFormComponent } from './client-form/client-form.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { ClientService } from './client.service';

@NgModule({
  imports: [
    CommonModule,
    TableModule
  ],
  declarations: [ClientFormComponent, ClientSearchComponent],
  entryComponents: [ClientFormComponent, ClientSearchComponent],
  providers: [ClientService]
})
export class ClientModule { }
