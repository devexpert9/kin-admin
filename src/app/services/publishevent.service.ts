import { Subject } from 'rxjs/Subject';



export class PublisheventService {
  private _subject = new Subject<any>();

  newEvent(event) {
    this._subject.next(event);
  }

  get events$ () {
    return this._subject.asObservable();
  }
}