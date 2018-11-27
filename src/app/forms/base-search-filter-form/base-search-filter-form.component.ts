import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-search-filter-form',
  templateUrl: './base-search-filter-form.component.html',
  styleUrls: ['./base-search-filter-form.component.css']
})
export class BaseSearchFilterFormComponent {

  @Input() fields: any[];

  private conditionalType: any = undefined;
  private selected: any = undefined;
  private value: any = undefined;
  private values: string[] = undefined;
  private conditional: any = undefined;

  constructor() {}

  private selectedChanged() {

    this.conditionalType = [];
    this.conditional = 'Equals';
    this.value = undefined;
    this.values = undefined;

    if (this.selected.type === 'String') {
      this.conditionalType = [
        {'name': 'Equals'},
        {'name': 'In'},
        {'name': 'Contains'},
        {'name': 'Starting With'},
        {'name': 'Ending With'}
      ];
    }

    if (this.selected.type === 'Number') {
      this.conditionalType = [
        {'name': 'Equals'},
        {'name': 'In'},
        {'name': 'Greater Than'},
        {'name': 'Less Than'},
        {'name': 'Greater Than or Equal'},
        {'name': 'Less Than or Equal'},
      ];
    }

  }

}
