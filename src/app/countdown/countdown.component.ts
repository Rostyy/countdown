import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {

  @Input() buttonName: any;

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

  ngOnChanges(): void {
    this.controlClick();
  }

  ngOnInit(): void {
    this.changeMinutesSubscription = this.shareDataService.changeMinutes$
      .subscribe(minutesDuration => {
        this.halfTimeSec = minutesDuration*60/2;
        this.notification = '';
        this.timerClass = '';
        clearInterval(this.intervalRef);
        this.activateTimer(minutesDuration);
      })
  }

  ngOnDestroy(): void {
    this.changeMinutesSubscription.unsubscribe();
  }

  controlClick(): void {
    switch(this.buttonName) {
      case 'pause':
        console.log('pause case');
        this.pause();
        break;
      case 'continue':
        console.log('continue case');
        break;
      case '1x':
        // this.activateTimer(minutesDuration);
        break;
      case '1.5x':
        console.log('1.5x case')
        break;
      case '2x':
        console.log('2x case')
        break;
    }
  }

  displayNumbers(value: number): number|string {
    return value < 10 ? `0${value}` : value;
  }

  pause() {
    clearInterval(this.intervalRef);
  }

  continue() {

  }

  intervalFn(): void {
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

  applyTimerStyles(): void {
    if (this.seconds <= 10) {
      this.timerClass = 'blink';
      return;
    }
    if (this.seconds <= 20) {
      this.timerClass = 'red';
    }
  }

  showHalfTimeNotification(): void {
    const currentSec = this.minutes*60 + this.seconds;
    if (currentSec <= this.halfTimeSec) {
      this.notification = 'More than halfway there!';
    }
  }

  showTimerIsOver(): boolean {
    if (!this.seconds && !this.minutes) {
      this.notification = 'Time is over';
      this.timerClass = '';
      clearInterval(this.intervalRef);
      return true;
    }
  }

  activateTimer(duration: number, frequency = 1000): void {
    this.minutes = duration;
    this.seconds = 0;
    if (this.showTimerIsOver()) return;
    this.intervalRef = setInterval(this.intervalFn.bind(this), frequency);
  }

}
