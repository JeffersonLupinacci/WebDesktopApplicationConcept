import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DialogResultType } from './classes/dialog-resulttype.enum';

@Injectable()
export class PopupService {

  private subject;

  public setResult(result: DialogResultType) {
    this.subject.next(result);
    this.subject.complete();
  }

  observer(): Promise<any> {
    this.subject = new Subject<DialogResultType>();
    return this.subject.asObservable().toPromise();
  }

}
