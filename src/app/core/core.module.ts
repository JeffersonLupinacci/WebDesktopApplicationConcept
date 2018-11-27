import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { TooltipModule } from 'primeng/tooltip';
import { GrowlModule } from 'primeng/growl';

import { WindowManagerComponent } from './window-manager/window-manager.component';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { WindowComponent } from './window/window.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { VersionComponent } from './version/version.component';

import { SearchMenuService } from './search-menu.service';
import { WindowManagerService } from './window-manager.service';

import { HTMLReferenceComponent } from './classes/html-reference';
import { FilterWindowPipe } from './classes/filter-window.pipe';
import { PopupComponent } from './popup/popup.component';

import {ButtonModule} from 'primeng/button';
import { DialogPopupComponent } from './popup/dialog-popup/dialog-popup.component';
import { PopupService } from './popup-service.service';
import { MessageService } from 'primeng/components/common/messageservice';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TooltipModule,
    GrowlModule,
    ButtonModule
  ],

  entryComponents: [WindowComponent, PopupComponent, DialogPopupComponent],

  declarations: [WindowManagerComponent, WindowComponent, HTMLReferenceComponent,
    TaskbarComponent, SearchMenuComponent, FilterWindowPipe, VersionComponent, PopupComponent, DialogPopupComponent],

  exports: [WindowManagerComponent],

  providers: [SearchMenuService, WindowManagerService,
    PopupService, FilterWindowPipe, MessageService]

})
export class CoreModule { }
