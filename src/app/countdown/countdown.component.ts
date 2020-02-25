import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';
import { Timer } from 'src/models/timer.model';
import { CONSTANT } from '../constants/constants';
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
  timerClass: string = '';
  initDuration: Timer = {minutes: 0, seconds: 0};
  coefficient: number;

  notification: string = '';
  intervalRef: any;
  paused: Timer = {minutes: null, seconds: null};

  ngOnChanges(): void {
    this.controlClick();
  }

  ngOnInit(): void {
    this.changeMinutesSubscription = this.shareDataService.changeMinutes$
      .subscribe(minutesDuration => {
        this.halfTimeSec = minutesDuration*60/2;
        this.notification = '';
        this.timerClass = '';
        this.coefficient = 1;
        this.activateTimer(minutesDuration, 0);
      })
  }

  ngOnDestroy(): void {
    this.changeMinutesSubscription.unsubscribe();
  }

  controlClick(): void {
    switch(this.buttonName) {
      case CONSTANT.BUTTON.PAUSE:
        this.pause();
        break;
      case CONSTANT.BUTTON.CONTINUE:
        this.continue();
        break;
      case CONSTANT.BUTTON.X1:
        this.applyCoefficient();
        break;
      case CONSTANT.BUTTON.X1_5:
        this.applyCoefficient(1.5);
        break;
      case CONSTANT.BUTTON.X2:
        this.applyCoefficient(2);
        break;
    }
  }

  displayNumbers(value: number): number|string {
    return value < 10 ? `0${value}` : value;
  }

  pause() {
    this.paused = Object.assign({}, this.initDuration);
    clearInterval(this.intervalRef);
  }

  applyCoefficient(coefficient: number = 1) {
    this.coefficient = coefficient;
    const {minutes, seconds} = this.initDuration;
    this.activateTimer(minutes, seconds);
  }

  continue() {
    const {minutes, seconds} = this.paused;
    this.activateTimer(minutes, seconds);
  }

  intervalFn(): void {
    if (this.initDuration.seconds === 0) {
      this.initDuration.seconds = 59;
      this.initDuration.minutes--;
    } else {
      this.initDuration.seconds--;
    }
    this.applyTimerStyles();
    this.showHalfTimeNotification();
    this.showTimerIsOver();
  }

  applyTimerStyles(): void {
    const {seconds} = this.initDuration;
    if (seconds <= 10) {
      this.timerClass = 'blink';
      return;
    }
    if (seconds <= 20) {
      this.timerClass = 'red';
    }
  }

  showHalfTimeNotification(): void {
    const currentSec = this.initDuration.minutes*60 + this.initDuration.seconds;
    if (currentSec <= this.halfTimeSec) {
      this.notification = 'More than halfway there!';
    }
  }

  showTimerIsOver(): boolean {
    let {minutes, seconds} = this.initDuration;
    if (!seconds && !minutes) {
      this.notification = 'Time is over';
      this.timerClass = '';
      clearInterval(this.intervalRef);
      return true;
    }
  }

  activateTimer(minDuration: number, seconds: number): void {
    if (this.intervalRef) clearInterval(this.intervalRef);
    const frequency = 1000 / this.coefficient;
    this.initDuration.minutes = minDuration;
    this.initDuration.seconds = seconds;
    if (this.showTimerIsOver()) return;
    this.intervalRef = setInterval(this.intervalFn.bind(this), frequency);
  }

}
