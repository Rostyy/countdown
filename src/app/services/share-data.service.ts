import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  changeCoefficientSubject =  new BehaviorSubject<number>(1);
  changeCoefficient$ = this.changeCoefficientSubject.asObservable();

  private changeMinutesSubject = new Subject<number>();
  changeMinutes$ = this.changeMinutesSubject.asObservable();

  constructor() { }

  changeMinutes(minutes: number) {
    this.changeMinutesSubject.next(minutes);
  }

  changeCoefficient(minutes: number) {
    this.changeCoefficientSubject.next(minutes);
  }
}
