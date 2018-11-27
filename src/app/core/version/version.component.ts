import { Component} from '@angular/core';
import { WindowManagerService } from '../window-manager.service';
import { DialogType } from '../classes/dialog-type.enum';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent {

  constructor(private windowManagerService: WindowManagerService) { }

  versionPopup() {

    this.windowManagerService
        .showDialog('Você gostaria de?', DialogType.CONFIRMATION)
        .then((result) => { console.log(result); }  );

  }

}
