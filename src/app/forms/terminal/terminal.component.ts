import { Component } from '@angular/core';
import { TerminalService } from 'primeng/components/terminal/terminalservice';
import { Subscription } from 'rxjs';
import { WindowForm } from '../../core/classes/window-form';
import { WindowPosition } from '../../core/classes/window-position';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})

export class TerminalComponent implements WindowForm {

  width = 500;
  height = 300;
  subscription: Subscription;

  onResize(position: WindowPosition) {}

  constructor(private terminalService: TerminalService) {
    this.terminalService.commandHandler.subscribe(command => {
      const response = (command === 'date') ? new Date().toDateString() : 'Unknown command: ' + command;
      this.terminalService.sendResponse(response);
    });
  }
}
