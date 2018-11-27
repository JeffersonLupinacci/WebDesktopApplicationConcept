import { Component, ComponentRef, ViewChild, Renderer2 } from '@angular/core';

import { SearchMenuService } from '../search-menu.service';
import { WindowManagerComponent } from '../window-manager/window-manager.component';
import { HTMLReferenceComponent } from '../classes/html-reference';
import { WindowForm } from '../classes/window-form';
import { WindowCursor } from '../classes/window-cursor.enum';
import { WindowPosition } from '../classes/window-position';
import { WindowProperties } from '../classes/window-properties';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent {

  // The HTML window Container
  @ViewChild('body') body: HTMLReferenceComponent;

  // The TypeScript Component Reference
  private reference: ComponentRef<WindowComponent>;

  // the Injected Window Form
  private form: WindowForm;

  // Various Window Properties
  public props: WindowProperties;

  // The Windows Manager
  private manager: WindowManagerComponent;

  // The Actual Widows Position Css Helper
  public position: WindowPosition;

  // The Resize Window Position
  private resizeProps: WindowPosition;

  // The Undo Reference Over Maximized Window
  private undo_position: WindowPosition;

  private taskOrder: number;

  private showProgressBar: Boolean = false;
  private progressBarType: String = '';

  // Events
  headerMouseMoveEvent: any;
  headerMouseUpEvent: any;
  resizeMouseMoveEvent: any;
  resizeMouseUpEvent: any;

  headerMouseMove: (event: any) => void;
  headerMouseUp: (event: any) => void;
  resizeMouseMove: (event: any) => void;
  resizeMouseUp: (event: any) => void;

  // blurred class observable
  public cssClass = '';

  constructor(
    private searchMenuService: SearchMenuService,
    private renderer: Renderer2) {

    this.props = new WindowProperties();
    this.position = new WindowPosition();
    this.undo_position = new WindowPosition();

    this.headerMouseUp = this.removeHeaderMouseUp.bind(this);
    this.headerMouseMove = this.headerWindowMove.bind(this);
    this.resizeMouseUp = this.removeResizeMouseUp.bind(this);
    this.resizeMouseMove = this.resizeWindowMove.bind(this);

    this.searchMenuService.observer().subscribe(isVisible => {
      this.props.floatingMenuVisible = isVisible;
      this.changeCSS();
    }, (error) => {
      console.log(error);
    });

  }

  public getTaskOrder(): number {
    return this.taskOrder;
  }

  public setTaskOrder(taskOrder: number): WindowComponent {
    this.taskOrder = taskOrder;
    return this;
  }

  /**
   * Get The Body
   */
  public getBody(): HTMLReferenceComponent {
    return this.body;
  }

  /**
   * Change the CSS Class
   */
  private changeCSS() {
    this.cssClass = this.props.focused ? 'focused' : '';
    if (this.props.floatingMenuVisible) {
      this.cssClass += ' blurred';
    }
  }

  /**
   * Close the Window
   */
  public close() {
    this.manager.closeWindow(this);
  }

  /**
   * Maximize the Window
   */
  public maximize() {
    this.props.maximized = !this.props.maximized;
    if (this.props.maximized) {

      this.undo_position.height = this.position.height;
      this.undo_position.width = this.position.width;
      this.undo_position.X = this.position.X;
      this.undo_position.Y = this.position.Y;
      this.undo_position.zIndex = this.position.zIndex;

      this.resizeMaximized();

    } else {
      this.position.height = this.undo_position.height;
      this.position.width = this.undo_position.width;
      this.position.X = this.undo_position.X;
      this.position.Y = this.undo_position.Y;
      this.position.zIndex = this.undo_position.zIndex;
      this.onResizeEvent();
    }
  }

  public resizeMaximized() {
    if (this.props.maximized) {
      this.position.X = this.manager.getOffsetLeft() + 20;
      this.position.Y = 5;
      this.position.width = this.manager.getInnerWidth() - this.position.X - 5;
      this.position.height = this.manager.getInnerHeight() - 10;
      this.onResizeEvent();
    }
  }

  /**
   * Verify if window is Minimized
   */
  public isMinimized(): Boolean {
    return this.props.minimized;
  }

  /**
   * Minimize this Window
   */
  public minimize() {
    this.props.minimized = !this.props.minimized;
    this.props.focused = false;
    this.cssClass = 'hide';
    this.position.zIndex = 1;
  }

  public isMaximized(): Boolean {
    return this.props.maximized;
  }

  public restore() {
    this.props.minimized = false;
    this.props.focused = true;
    this.cssClass = 'show focused';
  }

  public getReference(): ComponentRef<WindowComponent> {
    return this.reference;
  }

  public setReference(reference: ComponentRef<WindowComponent>): WindowComponent {
    this.reference = reference;
    return this;
  }


  public getForm(): WindowForm {
    return this.form;
  }

  public setForm(form: WindowForm): WindowComponent {
    this.form = form;
    return this;
  }

  public setManager(manager: WindowManagerComponent): WindowComponent {
    this.manager = manager;
    return this;
  }

  public getCaption(): string {
    return this.props.caption;
  }

  public setCaption(caption: string): WindowComponent {
    this.props.caption = caption;
    return this;
  }

  public setFocus(focus: boolean) {
    const old_focused = this.props.focused;
    this.position.zIndex = focus ? 9 : 2;
    this.props.focused = focus;
    if (old_focused !== this.props.focused) {
      this.changeCSS();
      if (!this.props.focused) {
        this.props.cursor = WindowCursor.DEFAULT_CURSOR;
      }
    }
  }

  public isFocused(): Boolean {
    return this.props.focused;
  }

  public setWidth(width: number): WindowComponent {
    this.position.width = width;
    return this;
  }

  public getWidth(): number {
    return this.position.width;
  }

  public setHeight(height: number): WindowComponent {
    this.position.height = height;
    return this;
  }

  public getHeight(): number {
    return this.position.height;
  }

  public show(): WindowComponent {
    if ((this.position.X === 0) && (this.position.Y === 0)) {
      this.position.X = (this.manager.getInnerWidth() - this.getWidth()) / 2;
      this.position.Y = (this.manager.getInnerHeight() - this.getHeight()) / 2;
      if (this.position.Y < 0) {
        this.position.Y = 5;
      }
    }
    return this;
  }

  public getIcon(): string {
    return this.props.icon;
  }

  public setIcon(icon: string): WindowComponent {
    this.props.icon = icon;
    return this;
  }

  public getIconColor(): string {
    return this.props.iconColor;
  }

  public setIconColor(iconColor: string): WindowComponent {
    this.props.iconColor = iconColor;
    return this;
  }

  public setBlurred(blurred: Boolean) {
    if (blurred) {
      this.cssClass = this.cssClass.trim() + ' blurred';
    } else {
      this.cssClass = this.cssClass.replace('blurred', '').trim();
    }
  }

  public windowMoveMouseDown(event: any) {
    if (event.button === 0) {

      if (!this.props.focused) {
        this.manager.focusWindow(this);
      }

      if (this.position.X === undefined) {
        this.position.X = 0;
      }

      if (this.position.Y === undefined) {
        this.position.Y = 0;
      }

      this.props.elementX = this.position.X;
      this.props.elementY = this.position.Y;
      this.props.mouseX = event.pageX;
      this.props.mouseY = event.pageY;

      if (this.headerMouseMoveEvent) {
        this.headerMouseMoveEvent();
      }
      if (this.headerMouseUpEvent) {
        this.headerMouseUpEvent();
      }

      this.headerMouseMoveEvent = this.renderer.listen('document', 'mousemove', this.headerMouseMove);
      this.headerMouseUpEvent = this.renderer.listen('document', 'mouseup', this.headerMouseUp);
    }
  }

  private headerWindowMove(event: any) {
    if (this.isMaximized()) {
      return;
    }

    this.position.X = this.props.elementX + (event.pageX - this.props.mouseX);
    this.position.Y = this.props.elementY + (event.pageY - this.props.mouseY);

    if (this.position.Y < 0) {
      this.position.Y = 0;
    }

  }

  private removeHeaderMouseUp(event: any) {
    this.headerMouseMoveEvent();
    this.headerMouseUpEvent();
  }

  public windowsResizeMouseOver(event: any) {

    let tmpCursor = WindowCursor.DEFAULT_CURSOR;

    if ((!this.isFocused()) || (this.isMaximized())) {
      if (this.props.cursor !== tmpCursor) {
        this.props.setCursor(tmpCursor);
      }
      return;
    }

    const MARGIN = 6;
    const HEADER_SIZE = 49;
    const isRightPosition = (this.getWidth() - event.layerX) <= MARGIN;
    const isLeftPosition = event.layerX <= MARGIN;
    const isBottomPosition = (this.getHeight() - HEADER_SIZE - event.layerY) <= MARGIN;

    if (isLeftPosition) {
      tmpCursor = WindowCursor.LEFT_CURSOR;
    }
    if (isRightPosition) {
      tmpCursor = WindowCursor.RIGHT_CURSOR;
    }

    if (isBottomPosition) {
      tmpCursor = WindowCursor.BOTTOM_CURSOR;
    }
    if (isLeftPosition && isBottomPosition) {
      tmpCursor = WindowCursor.LEFTBOTTOM_CURSOR;
    }
    if (isRightPosition && isBottomPosition) {
      tmpCursor = WindowCursor.RIGHTBOTTOM_CURSOR;
    }

    this.props.setCursor(tmpCursor);
  }

  public windowResizeMouseDown(event: any) {

    this.resizeProps = null;

    if (event.button === 0) {

      if (!this.props.focused) {
        this.windowClick();
        return;
      }

      if (this.resizeMouseMoveEvent) {
        this.resizeMouseMoveEvent();
      }
      if (this.resizeMouseUpEvent) {
        this.resizeMouseUpEvent();
      }

      this.resizeProps = new WindowPosition();
      this.resizeProps.height = this.position.height;
      this.resizeProps.width = this.position.width;
      this.resizeProps.X = event.x;
      this.resizeProps.Y = event.y;
      this.resizeProps.cursor = this.props.cursor;

      this.resizeMouseMoveEvent = this.renderer.listen('document', 'mousemove', this.resizeMouseMove);
      this.resizeMouseUpEvent = this.renderer.listen('document', 'mouseup', this.resizeMouseUp);
    }
  }

  private removeResizeMouseUp(event: any) {
    this.resizeMouseMoveEvent();
    this.resizeMouseUpEvent();
  }

  private resizeWindowMove(event: any) {

    const actualPosition = new WindowPosition();
    if (typeof event.clientX === 'number') {
      actualPosition.X = event.clientX;
      actualPosition.Y = event.clientY;
    } else if (event.originalEvent.touches) {
      actualPosition.X = event.originalEvent.touches[0].clientX;
      actualPosition.Y = event.originalEvent.touches[0].clientY;
    }

    let oldWidth = this.position.width;
    let newWidth = this.position.width;
    let newHeight = this.position.height;

    if ((this.resizeProps.cursor === WindowCursor.LEFT_CURSOR) ||
      (this.resizeProps.cursor === WindowCursor.LEFTBOTTOM_CURSOR)) {
      newWidth = this.resizeProps.width + (this.resizeProps.X - actualPosition.X);
    }

    if ((this.resizeProps.cursor === WindowCursor.RIGHT_CURSOR) ||
      (this.resizeProps.cursor === WindowCursor.RIGHTBOTTOM_CURSOR)) {
      newWidth = this.resizeProps.width - (this.resizeProps.X - actualPosition.X);
      oldWidth = newWidth;
    }

    if ((this.resizeProps.cursor === WindowCursor.BOTTOM_CURSOR) ||
      (this.resizeProps.cursor === WindowCursor.LEFTBOTTOM_CURSOR) ||
      (this.resizeProps.cursor === WindowCursor.RIGHTBOTTOM_CURSOR)) {
      newHeight = this.resizeProps.height + actualPosition.Y - this.resizeProps.Y;
    }

    if (newHeight < 200) {
      newHeight = 200;
    }

    if (newWidth < 200) {
      oldWidth = 200;
      newWidth = 200;
    }

    this.position.width = newWidth;
    this.position.height = newHeight;
    this.position.X = this.position.X - (newWidth - oldWidth);
    this.onResizeEvent();
  }

  private windowClick() {
    this.manager.focusWindow(this);
  }

  public windowMaximizeDoubleClick(event: any) {
    this.maximize();
  }

  public onResizeEvent() {
    this.form.onResize(this.position);
  }

}


