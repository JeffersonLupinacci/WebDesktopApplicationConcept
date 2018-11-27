import { Component, OnInit, ViewChild } from '@angular/core';

import { WindowForm } from '../../../core/classes/window-form';
import { ClientService } from '../client.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { PaginationData } from '../../../shared/pagination';
import { ClientDO } from '../../../model/client';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { WindowPosition } from '../../../core/classes/window-position';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css']
})

export class ClientSearchComponent implements WindowForm, OnInit {

  width = 500;
  height = 300;
  id = 'client-search-form';

  datasource: ClientDO[];

  cars: ClientDO[];

  totalRecords: number;

  cols: any[];

  loading: boolean;

  onResize(position: WindowPosition) {}

  constructor(private carService: ClientService) { }

  ngOnInit() {
      // datasource imitation
      this.carService.onGetData().then(cars => {
          this.datasource = cars;
          this.totalRecords = this.datasource.length;
      });

      this.cols = [
          { field: 'id', header: 'Id' },
          { field: 'firstName', header: 'First Name' },
          { field: 'lastName', header: 'Last Name' }
      ];

      this.loading = true;
  }

  loadCarsLazy(event: LazyLoadEvent) {
      this.loading = true;

      // in a real application, make a remote request to load data using state metadata from event
      // event.first = First row offset
      // event.rows = Number of rows per page
      // event.sortField = Field name to sort with
      // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
      // filters: FilterMetadata object having field as key and filter value, filter matchMode as value

      // imitate db connection over a network
      setTimeout(() => {
          if (this.datasource) {
              this.cars = this.datasource.slice(event.first, (event.first + event.rows));
              this.loading = false;
          }
      }, 1);
  }
}
