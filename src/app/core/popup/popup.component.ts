import { Component, ComponentRef, ViewChild } from '@angular/core';
import { WindowPosition } from '../classes/window-position';
import { WindowManagerComponent } from '../window-manager/window-manager.component';
import { HTMLReferenceComponent } from '../classes/html-reference';
import { WindowForm } from '../classes/window-form';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  // The Actual Widows Position Css Helper
  public position: WindowPosition;

  // The Windows Manager
  private manager: WindowManagerComponent;

  // The TypeScript Component Reference
  private reference: ComponentRef<PopupComponent>;

  // The HTML window Container
  @ViewChild('body') body: HTMLReferenceComponent;

  private caption: string;
  private icon: string;

  // the Injected Window Form
  private form: WindowForm;

  constructor() {
    this.position = new WindowPosition();
  }

  public setManager(manager: WindowManagerComponent): PopupComponent {
    this.manager = manager;
    return this;
  }

  public close() {
    this.manager.closeActivePopup();
  }

  public getReference(): ComponentRef<PopupComponent> {
    return this.reference;
  }

  public setReference(reference: ComponentRef<PopupComponent>): PopupComponent {
    this.reference = reference;
    return this;
  }

  public reAlign() {
    this.position.X = (this.manager.getInnerWidth() - this.position.width) / 2;
    this.position.Y = (this.manager.getInnerHeight() - this.position.height) / 2;
  }

  public setForm(form: WindowForm): PopupComponent {
    this.form = form;
    return this;
  }

  public getForm(): WindowForm {
    return this.form;
  }

  public setWidth(width: number): PopupComponent {
    this.position.width = width;
    return this;
  }

  public getWidth(): number {
    return this.position.width;
  }

  public setHeight(height: number): PopupComponent {
    this.position.height = height;
    return this;
  }

  public getHeight(): number {
    return this.position.height;
  }

  public show() {
    this.reAlign();
  }

  public setCaption(caption: string): PopupComponent {
    this.caption = caption;
    return this;
  }

  public getCaption(): string {
    return this.caption;
  }

  public setIcon(icon: string): PopupComponent {
    this.icon = icon;
    return this;
  }

  public getIcon(): string {
    return this.icon;
  }

}
