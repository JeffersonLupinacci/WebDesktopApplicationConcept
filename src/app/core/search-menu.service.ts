import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchMenuService {

  private subject = new Subject<Boolean>();
  private visible: Boolean = false;

  toggle() {
    this.visible = !this.visible;
    this.subject.next(this.visible);
  }

  observer(): Observable<Boolean> {
    return this.subject.asObservable();
  }

  public isVisible(): Boolean {
    return this.visible;
  }

}
