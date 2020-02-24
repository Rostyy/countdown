import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {

  constructor(private shareDataService: ShareDataService) {
    this.shareDataService = shareDataService;
  }
  
  changeMinutesSubscription: Subscription;
  halfTimeSec: number;
  timerClass: string = ''
  minutes: number;
  seconds: number;

  notification: string = '';
  intervalRef: any

  ngOnInit(): void {
    this.changeMinutesSubscription = this.shareDataService.changeMinutes$
      .subscribe(minutesDuration => {
        this.halfTimeSec = minutesDuration*60/2;
        this.notification = '';
        clearInterval(this.intervalRef);
        this.activateTimer(minutesDuration);
      })
  }

  ngOnDestroy(): void{
    this.changeMinutesSubscription.unsubscribe();
  }

  displayNumbers(value: number) {
    return value < 10 ? `0${value}` : value;
  }

  intervalFn() {
    if (this.seconds === 0) {
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.applyTimerStyles();
    this.showHalfTimeNotification();
    this.showTimerIsOver();
  }

  applyTimerStyles() {
    if (this.seconds <= 10) {
      this.timerClass = 'blink';
      return;
    }
    if (this.seconds <= 20) {
      this.timerClass = 'red';
    }
  }

  showHalfTimeNotification() {
    const currentSec = this.minutes*60 + this.seconds;
    if (currentSec <= this.halfTimeSec) {
      this.notification = 'More than halfway there!';
    }
  }

  showTimerIsOver(): boolean {
    if (this.seconds === 0 && this.minutes === 0 ) {
      this.notification = 'Time is over';
      this.timerClass = '';
      clearInterval(this.intervalRef);
      return true;
    }
  }

  activateTimer(duration: number): void {
    this.minutes = duration;
    this.seconds = 0;
    if (this.showTimerIsOver()) return;
    this.intervalRef = setInterval(this.intervalFn.bind(this), 1000);
  }

}
