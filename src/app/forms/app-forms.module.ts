import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table';
import { ScheduleModule } from 'primeng/schedule';
import { GMapModule } from 'primeng/gmap';
import { ChartModule } from 'primeng/chart';
import { TerminalModule } from 'primeng/terminal';
import { TerminalService } from 'primeng/components/terminal/terminalservice';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ChipsModule } from 'primeng/chips';

import { CoreModule } from '../core/core.module';

import { ClientModule } from './client/client.module';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { GridComponent } from './grid/grid.component';
import { ChartComponent } from './chart/chart.component';

import { BaseSearchFormComponent } from './base-search-form/base-search-form.component';
import { TerminalComponent } from './terminal/terminal.component';
import { BaseSearchFilterFormComponent } from './base-search-filter-form/base-search-filter-form.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,

    InputTextModule,
    DataTableModule,
    TableModule,
    ScheduleModule,
    ChartModule,
    GMapModule,
    TerminalModule,
    ButtonModule,
    TooltipModule,
    MenuModule,
    MultiSelectModule,
    DropdownModule,
    PaginatorModule,
    ChipsModule,

    ClientModule

  ],
  entryComponents: [SchedulerComponent, GridComponent, ChartComponent, TerminalComponent],
  declarations: [SchedulerComponent, GridComponent, ChartComponent, TerminalComponent,
    BaseSearchFormComponent, BaseSearchFilterFormComponent],
  providers: [TerminalService]
})

export class AppFormsModule { }
