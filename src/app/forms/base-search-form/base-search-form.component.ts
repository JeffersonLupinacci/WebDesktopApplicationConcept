import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { WindowPosition } from '../../core/classes/window-position';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { IService } from '../../shared/service.interface';
import { WindowManagerService } from '../../core/window-manager.service';
import { DialogType } from '../../core/classes/dialog-type.enum';
import { DialogResultType } from '../../core/classes/dialog-resulttype.enum';

@Component({
  selector: 'app-base-search-form',
  templateUrl: './base-search-form.component.html',
  styleUrls: ['./base-search-form.component.css']
})
export class BaseSearchFormComponent implements OnInit, AfterViewInit {

  // Base Search Form Component
  @ViewChild('searchContent') searchContent: ElementRef;
  @ViewChild('actionbarContent') actionbarContent: ElementRef;
  @ViewChild('actionbarFilters') actionbarFilters: ElementRef;

  @ViewChild('table') table: Table;
  @ViewChild('paginator') paginator: Paginator;

  private loading: boolean;

  /* Columns */
  private cols: any[];
  private selectedColumns: any[];

  /* Export Menu */
  private exportItems: MenuItem[];

  /* the Data Result  */
  private dataSource: any[] = [];

  /* The Service Instance */
  private service: IService;

  /* The Height of The Grid */
  private gridHeight: any;

  private selectedRecord: any;

  private canDelete: Boolean = false;
  private canEdit: Boolean = false;

  private showSearchPlus: Boolean = false;

  constructor(private windowManagerService: WindowManagerService) { }

  ngOnInit() {
    this.paginator.rows = 20; // default paginator rows
    this.table.rows = this.paginator.rows;

    this.cols = this.service.getColumns();
    this.selectedColumns = this.service.getUserSelectedColumns();

    this.exportItems = [
      {
        label: 'Export to CSV', icon: 'fa fa-file-excel-o', command: () => {
          this.service.exportToCsv();
        }
      },
      {
        label: 'Export to HTML', icon: 'fa fa-file-code-o', command: () => {
          this.service.exportToHtml();
        }
      },
      {
        label: 'Export to TXT', icon: 'fa fa-file-text-o', command: () => {
          this.service.exportToTxt();
        }
      }
    ];

  }

  public ngAfterViewInit(): void {
    this.onResize(null);
  }

  /**
   * Change the Selected Columns
   */
  private changeColumns() {
    /* Notify The Service */
    this.service.setUserSelectedColumns(this.selectedColumns);
  }

  /**
   * Window Resize Event
   * @param position the New Position
   */
  public onResize(position: WindowPosition) {
    /* Resize the Grid */

    setTimeout(() => {
      let filterOffSet = (this.actionbarContent.nativeElement.clientHeight > 0 ? 5 : 0 );
      filterOffSet = this.showSearchPlus ? filterOffSet + 5 : filterOffSet;
      const h =
        this.searchContent.nativeElement.clientHeight -
        this.actionbarContent.nativeElement.clientHeight -
        filterOffSet -
        this.actionbarFilters.nativeElement.clientHeight - 32;
      this.gridHeight = h + 'px';
    }, 100);
  }

  /**
   * Pagination
   * @param event the Event
   */
  private paginate(event) {
    this.table.rows = event.rows;
    this.table.first = event.first;
    const lazy: LazyLoadEvent = { first: event.first, rows: event.rows };
    /* Get the Page */
    this.loadLazy(lazy);
  }

  private search(value) {
    const searchEvent:
      LazyLoadEvent = {
        first: 0,
        rows: this.table.rows,
        globalFilter : value
      };
    this.loadLazy(searchEvent);
  }

  /**
   * Load the Data in Lazy Mode
   * @param event the Event
   */
  private loadLazy(event: LazyLoadEvent) {
    this.loading = true;
    this.service.getResults(event).then(data => {
      this.dataSource = data.getResults();
      this.paginator.totalRecords = data.getRecordCount();
      this.table.totalRecords = data.getRecordCount();
    });

    this.loading = false;
  }

  /**
   * Set the Service
   * @param service the Service to Set
   */
  public setService(service: IService) {
    this.service = service;
  }

  private deleteClick() {
    this.windowManagerService
      .showDialog('Remove the selected record?', DialogType.CONFIRMATION)
      .then((result) => {
        if (DialogResultType.OK === result) {
          this.service.delete(this.selectedRecord);
        }
      });
  }

  private onRowSelect($event) {
    this.canDelete = true;
    this.canEdit = true;
  }
  private onRowUnselect($event) {
    this.canDelete = false;
    this.canEdit = false;
  }

  private searchPlusToggle() {
    this.showSearchPlus = !this.showSearchPlus;
    this.onResize(null);
  }

}
