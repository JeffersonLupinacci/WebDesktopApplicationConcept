import { Component, OnInit, ViewChild } from '@angular/core';
import { WindowForm } from '../../core/classes/window-form';
import { WindowPosition } from '../../core/classes/window-position';
import { BaseSearchFormComponent } from '../base-search-form/base-search-form.component';
import { Service } from '../../shared/service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements WindowForm, OnInit {

  width = 600;
  height = 600;
  id = 'grid-form';

  // Base Search Form Component
  @ViewChild('search') search: BaseSearchFormComponent;

  onResize(position: WindowPosition) {
    this.search.onResize(position);
  }

  constructor(private carService: Service) {
  }

  ngOnInit() {
    this.search.setService(this.carService);
  }

}
