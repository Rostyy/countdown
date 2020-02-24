import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  changeMinutesSubject = new Subject<number>();
  changeMinutes$ = this.changeMinutesSubject.asObservable();

  constructor() { }

  changeMinutes(minutes: number) {
    this.changeMinutesSubject.next(minutes);
  }
}
