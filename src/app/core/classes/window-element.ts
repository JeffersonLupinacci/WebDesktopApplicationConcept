import { WindowForm } from './window-form';
import { Type } from '@angular/core';

export class WindowElement {

  constructor(
    private caption: string, private icon: string,
    private iconColor: string,
    private classType: Type<WindowForm>) {
  }

  getCaption(): string {
    return this.caption;
  }

  getClassType(): Type<WindowForm> {
    return this.classType;
  }

  getIcon(): string {
    return this.icon;
  }
  getIconColor(): string {
    return this.iconColor;
  }

}
