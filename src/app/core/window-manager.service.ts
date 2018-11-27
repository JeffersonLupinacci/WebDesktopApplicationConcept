import { Injectable, ComponentFactoryResolver, Type } from '@angular/core';

import { WindowManagerComponent } from './window-manager/window-manager.component';

import { WindowComponent } from './window/window.component';
import { WindowElement } from './classes/window-element';
import { PopupComponent } from './popup/popup.component';
import { DialogPopupComponent } from './popup/dialog-popup/dialog-popup.component';
import { DialogType } from './classes/dialog-type.enum';
import { PopupService } from './popup-service.service';
import { DialogResultType } from './classes/dialog-resulttype.enum';

@Injectable()
export class WindowManagerService {

  // List of Windows
  private windowList: WindowComponent[] = [];
  private activePopup: PopupComponent;
  private windowCounter = 1;

  // html Container
  private manager: WindowManagerComponent;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private popupService: PopupService ) {
  }

  // Set the Window Manager
  public setManager(manager: any) {
    this.manager = manager;
  }

  // Create a new window popup
  public createPopup(windowElement: WindowElement, height: number): PopupComponent {

    // Create the Background
    const factoryBackground = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
    const popupComponent = this.manager.popupReference.viewContainerRef.createComponent(factoryBackground);

    // Create the user component
    const factoryUserComponent = this.componentFactoryResolver.resolveComponentFactory(windowElement.getClassType());
    const formReference = popupComponent.instance.body.viewContainerRef.createComponent(factoryUserComponent);

    popupComponent.instance
      .setManager(this.manager)
      .setForm(formReference.instance)
      .setReference(popupComponent)
      .setWidth(formReference.instance.width)
      .setHeight(height)
      .setIcon(windowElement.getIcon())
      .setCaption(windowElement.getCaption())
      .show();

    this.blurWindows(true);

    this.activePopup = popupComponent.instance;
    return popupComponent.instance;

  }

  // Create a new window
  public createWindow(windowElement: WindowElement): WindowComponent {

    // Create the window
    const factoryWindow = this.componentFactoryResolver.resolveComponentFactory(WindowComponent);
    const component = this.manager.reference.viewContainerRef.createComponent(factoryWindow);

    // Create the user component
    const factoryUserComponent = this.componentFactoryResolver.resolveComponentFactory(windowElement.getClassType());
    const formReference = component.instance.body.viewContainerRef.createComponent(factoryUserComponent);

    this.windowCounter = this.windowCounter + 1;

    // Setting the window params

    component.instance
      .setManager(this.manager)
      .setTaskOrder(this.windowCounter)
      .setReference(component)
      .setForm(formReference.instance)
      .setIcon(windowElement.getIcon())
      .setIconColor(windowElement.getIconColor())
      .setCaption(windowElement.getCaption())
      .setWidth(formReference.instance.width)
      .setHeight(formReference.instance.height)
      .show();

    this.windowList.push(component.instance);
    this.focusWindow(component.instance);
    return component.instance;
  }

  // Close a window
  public closeWindow(window: WindowComponent) {
    let itemIndex = null;
    this.windowList.forEach((item, index) => {
      if (item === window) {
        itemIndex = index;
      }
    });

    if (null !== itemIndex) {
      window.getReference().destroy();
      this.windowList.splice(itemIndex, 1);
    }
  }

  public closePopup() {
    this.blurWindows(false);
    this.activePopup.getReference().destroy();
  }

  // Focus a window
  public focusWindow(window: WindowComponent) {
    this.windowList.forEach((item, index) => {
      if ((item !== window) && (item.isFocused())) {
        item.setFocus(false);
      }
    });
    window.setFocus(true);
  }

  // Get all windows
  public getWindowList(): WindowComponent[] {
    return this.windowList;
  }

  public resizeMaximizedWindows() {
    this.windowList.forEach((item, index) => {
      if (item.isMaximized()) {
        item.resizeMaximized();
      }
    });
  }

  public realignActivePopup() {
    if ((null !== this.activePopup) && (undefined !== this.activePopup)) {
      this.activePopup.reAlign();
    }
  }

  // Blur the Visible Windows
  public blurWindows(isVisible: Boolean) {
    this.windowList.forEach((item, index) => {
      item.setBlurred(isVisible);
    });
  }

  public getWindowByOrderId(orderId: string): WindowComponent {
    return this.windowList.filter(x => x.getTaskOrder() === Number(orderId))[0];
  }

  public reorderWindowList() {
    this.windowList = this.windowList.sort((t1, t2) => t1.getTaskOrder() - t2.getTaskOrder());
  }

  public showDialog(message: String, dialogType: DialogType): Promise<DialogResultType> {

    let windowElement = null;

    switch (dialogType) {
      case DialogType.CONFIRMATION: {
        windowElement = new WindowElement('Confirmation', 'fa fa-question-circle', '', DialogPopupComponent);
        break;
      }
      case DialogType.EXCLAMATION: {
        windowElement = new WindowElement('Exclamation', 'fa fa-exclamation-circle', '', DialogPopupComponent);
        break;
      }
    }

    // Calculate the Windows Size based in the input text
    let height = 130;
    if (undefined !== message) {
      const lines = Math.ceil(message.length / 50);
      if (lines > 1) {
        height = height + ((lines) * 10);
      }
    }

    const popup = this.createPopup(windowElement, height);
    const dialogForm = popup.getForm() as DialogPopupComponent;
    dialogForm.message = message;

    return new Promise((resolve, reject) => {
      return this.popupService.observer().then((result) => {
        this.closePopup();
        resolve(result);
      });
    });

  }

}
