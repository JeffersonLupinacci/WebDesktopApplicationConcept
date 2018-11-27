import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { Message } from 'primeng/api';

import { WindowComponent } from '../window/window.component';
import { HTMLReferenceComponent } from '../classes/html-reference';
import { WindowManagerService } from '../window-manager.service';
import { SearchMenuService } from '../search-menu.service';


@Component({
  selector: 'app-window-manager',
  templateUrl: './window-manager.component.html',
  styleUrls: ['./window-manager.component.css']
})

export class WindowManagerComponent {

  messages: Message[] = [];

  // The HTML window Container
  @ViewChild('windowManagerReference') reference: HTMLReferenceComponent;

  @ViewChild('popupContainerReference') popupReference: HTMLReferenceComponent;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowManagerService.resizeMaximizedWindows();
    this.windowManagerService.realignActivePopup();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.keyCode === 32) {
      this.searchMenuService.toggle();
    }
  }

  constructor(
    private windowManagerService: WindowManagerService,
    private searchMenuService: SearchMenuService) {
    this.windowManagerService.setManager(this);

    this.searchMenuService.observer().subscribe(isVisible => {
      this.windowManagerService.blurWindows(isVisible);
    }, (error) => {
      console.log(error);
    });

  }

  // Close a window
  public closeWindow(component: WindowComponent) {
    this.windowManagerService.closeWindow(component);
  }

  public closeActivePopup() {
    this.windowManagerService.closePopup();
  }

  // Focus a window
  public focusWindow(component: WindowComponent) {
    this.windowManagerService.focusWindow(component);
  }

  // Window Container Offset
  public getOffsetLeft(): number {
    return this.reference.elementRef.nativeElement.offsetLeft;
  }

  public getWidth(): number {
    return window.screen.width;
  }

  public getAvailWidth(): number {
    return window.screen.availHeight;
  }

  public getInnerWidth() {
    return window.innerWidth;
  }

  public getHeight(): number {
    return window.screen.height;
  }

  public getAvailHeight(): number {
    return window.screen.availHeight;
  }

  public getInnerHeight(): number {
    return window.innerHeight;
  }

}

