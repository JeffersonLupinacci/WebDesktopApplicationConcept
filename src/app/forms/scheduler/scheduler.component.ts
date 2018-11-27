import { Component, OnInit } from '@angular/core';
import { WindowForm } from '../../core/classes/window-form';
import { WindowPosition } from '../../core/classes/window-position';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements WindowForm, OnInit {

  width = 600;
  height = 600;
  id = 'scheduler-form';

  events: any[];

  onResize(position: WindowPosition) {}

  ngOnInit() {
      this.events = [
          {
              'title': 'All Day Event',
              'start': '2016-01-01'
          },
          {
              'title': 'Long Event',
              'start': '2016-01-07',
              'end': '2016-01-10'
          },
          {
              'title': 'Repeating Event',
              'start': '2016-01-09T16:00:00'
          },
          {
              'title': 'Repeating Event',
              'start': '2016-01-16T16:00:00'
          },
          {
              'title': 'Conference',
              'start': '2016-01-11',
              'end': '2016-01-13'
          }
      ];
  }

}
