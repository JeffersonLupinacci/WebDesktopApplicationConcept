import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IService } from './service.interface';
import { DataResultSet } from '../shared/dataResultSet';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { WindowManagerService } from '../core/window-manager.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class Service implements IService {

    userSelectedColumns: any[];

    constructor(
        private windowManagerService: WindowManagerService,
        private messageService: MessageService,
        private http: HttpClient) {

        this.userSelectedColumns = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' }
          ];

    }

    /**
     * Get the Results
     * @param event the Lazy Load Event
     */
    public getResults(event: LazyLoadEvent): Promise<DataResultSet> {

        const filter = event.globalFilter;

        const first = event.first;
        const rows = event.rows;
        const sortFilter = event.sortField;
        const sortOrder = event.sortOrder;

        return this.http.get<any>('assets/cars.json')
            .toPromise()
            .then(res => new DataResultSet(res.data.length, res.data.slice(event.first, event.first + event.rows))
            );
    }

    /**
     * Get the Active Columns
     */
    public getColumns(): any {
        return [
            { field: 'id', header: 'Id', type : 'Number' },
            { field: 'vin', header: 'Vin', type : 'String' },
            { field: 'year', header: 'Year', type : 'Number' },
            { field: 'brand', header: 'Brand', type : 'Date' },
            { field: 'color', header: 'Color', type : 'DateTime' },
          ];
    }

    /**
     * Get the User Selected Columns
     */
    public getUserSelectedColumns() {
        return this.userSelectedColumns;
    }

    /**
     * Set the User Selected Columns
     * @param userSelectedColumns the userSelectedColumns to Set
     */
    public setUserSelectedColumns(userSelectedColumns: any) {
        this.userSelectedColumns = userSelectedColumns;
    }

    delete(entity: any) {
        this.messageService.add(
            {severity: 'info',
             summary: 'Info Message',
             detail: 'Deleted with success!'});
    }

    /**
     * Export to Csv
     */
    public exportToCsv() {
        // Need Implementation
    }

    /**
     * Export To Html
     */
    public exportToHtml() {
        // Need Implementation
    }

    /**
     * Export to Txt
     */
    public exportToTxt() {
        // Need Implementation
    }

}
