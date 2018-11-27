import { Component, Input } from '@angular/core';
import { WindowForm } from '../../classes/window-form';
import { WindowManagerComponent } from '../../window-manager/window-manager.component';
import { WindowManagerService } from '../../window-manager.service';
import { PopupService } from '../../popup-service.service';
import { DialogResultType } from '../../classes/dialog-resulttype.enum';
import { WindowPosition } from '../../classes/window-position';

@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.css']
})
export class DialogPopupComponent implements WindowForm {

  width = 400;
  height = 0;

  @Input() message: String;

  constructor(private popupService: PopupService) { }

  public onClick(selected: string) {
    this.popupService.setResult(DialogResultType[selected]);
  }

  onResize(position: WindowPosition) {}

}
