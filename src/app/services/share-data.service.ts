import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private changeMinutesSubject = new Subject<number>();
  changeMinutes$ = this.changeMinutesSubject.asObservable();

  constructor() { }

  changeMinutes(minutes: number) {
    this.changeMinutesSubject.next(minutes);
  }
}
