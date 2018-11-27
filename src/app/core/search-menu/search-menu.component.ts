import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SearchMenuService } from '../search-menu.service';
import { GridComponent } from '../../forms/grid/grid.component';
import { ChartComponent } from '../../forms/chart/chart.component';
import { WindowManagerService } from '../window-manager.service';
import { WindowElement } from '../classes/window-element';
import { FilterWindowPipe } from '../classes/filter-window.pipe';
import { ClientSearchComponent } from '../../forms/client/client-search/client-search.component';
import { TerminalComponent } from '../../forms/terminal/terminal.component';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.css']
})
export class SearchMenuComponent implements OnInit {

  @ViewChild('searchControl') searchControl: ElementRef;

  visible: Boolean;
  windowElementList: WindowElement[] = [];

  constructor(private searchMenuService: SearchMenuService,
    private windowManagerService: WindowManagerService,
    private filter: FilterWindowPipe) {
    this.searchMenuService.observer().subscribe(isVisible => {
      this.visible = isVisible;
      if (isVisible) {
        this.searchControl.nativeElement.value = '';
        setTimeout(() => this.searchControl.nativeElement.focus(), 10);
      }
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.windowElementList.push(new WindowElement('Chart Form', 'fa fa-bar-chart', 'green-icon', ChartComponent));
    this.windowElementList.push(new WindowElement('Grid Form', 'fa fa-th', 'orange-icon', GridComponent));
    this.windowElementList.push(new WindowElement('Clients', 'fa fa-users', 'blue-icon', ClientSearchComponent));
    this.windowElementList.push(new WindowElement('Terminal', 'fa fa-terminal', 'blue-icon', TerminalComponent));
  }

  private createWindow(windowElement: WindowElement) {
    this.windowManagerService.createWindow(windowElement);
    this.searchMenuService.toggle();
  }

  public onKeyUp(event: any) {
    if (event.keyCode === 13) {
      let filteredItems: any[] = [];
      const value = this.searchControl.nativeElement.value;
      if (value !== '') {
        filteredItems = this.filter.transform(this.windowElementList, value);
        if (filteredItems.length === 1) {
          this.createWindow(filteredItems[0]);
        }
      }
    }
  }

  // Keyboard navigation
  // http://jsfiddle.net/KgBpx/2/

}
