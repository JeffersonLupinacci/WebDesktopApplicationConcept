import { Component } from '@angular/core';
import { SearchMenuService } from '../search-menu.service';
import { WindowManagerService } from '../window-manager.service';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent {

  constructor(
    private searchMenuService: SearchMenuService,
    private windowManagerService: WindowManagerService) {
  }

  toggleMenu() {
    this.searchMenuService.toggle();
  }

  // the Window List
  windowList(): WindowComponent[] {
    return this.windowManagerService.getWindowList();
  }

  // Focus a windows
  focusWindow(window: WindowComponent) {
    if (window.isMinimized()) {
      window.restore();
    }

    this.windowManagerService.focusWindow(window);

    if (this.searchMenuService.isVisible()) {
      this.searchMenuService.toggle();
    }

  }

  dragStart($event) {
    $event.dataTransfer.setData('changeOrder', $event.target.dataset.order);
  }

  dragOver($event) {
    $event.preventDefault();
    let destination: HTMLLIElement;
    destination = $event.target;
    destination.className = destination.className
      .replace('fullBox', 'emptyBox')
      .replace(destination.dataset.color, 'emptyColor');
  }

  dragLeave($event) {
    $event.preventDefault();
    let destination: HTMLLIElement;
    destination = $event.target;
    destination.className = destination.className
      .replace('emptyBox', 'fullBox')
      .replace('emptyColor', destination.dataset.color);
  }

  drop($event) {
    $event.preventDefault();
    const sourceId = $event.dataTransfer.getData('changeOrder');
    const source = this.windowManagerService.getWindowByOrderId(sourceId);
    let destination: WindowComponent = null;
    destination = this.windowManagerService.getWindowByOrderId($event.target.parentElement.dataset.order);
    $event.target.className = $event.target.className
      .replace('emptyBox', 'fullBox')
      .replace('emptyColor', $event.target.dataset.color);
    if ((undefined !== source) && (undefined !== destination)) {
      source.setTaskOrder(destination.getTaskOrder());
      destination.setTaskOrder(Number(sourceId));
      this.windowManagerService.reorderWindowList();
    }
  }

}
