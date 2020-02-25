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

  @Input() buttonName: string;

  constructor(private shareDataService: ShareDataService) {
    this.shareDataService = shareDataService;
  }
  
  changeMinutesSubscription: Subscription;
  halfTimeSec: number;
  timerClass: string = '';
  initDuration: Timer = {minutes: 0, seconds: 0};
  paused: Timer = {minutes: null, seconds: null};
  notification: {message: string, class: string} = {message: '', class: ''};
  intervalRef: number;

  ngOnChanges(): void {
    this.controlClick();
  }

  ngOnInit(): void {
    this.changeMinutesSubscription = this.shareDataService.changeMinutes$
      .subscribe((minutesDuration: number) => {
        this.initStartClick(minutesDuration)
        this.activateTimer(minutesDuration, 0);
      })
  }

  ngOnDestroy(): void {
    this.changeMinutesSubscription.unsubscribe();
  }

  initStartClick(minutesDuration: number): void {
    this.halfTimeSec = minutesDuration*60/2;
    this.notification = {message: '', class: ''};;
    this.timerClass = '';
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

  pause(): void {
    this.paused = Object.assign({}, this.initDuration);
    clearInterval(this.intervalRef);
  }

  applyCoefficient(coefficient: number = 1): void {
    this.shareDataService.changeCoefficient(coefficient);
    const {minutes, seconds} = this.initDuration;
    this.activateTimer(minutes, seconds);
  }

  continue(): void {
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
      this.notification = {message: 'More than halfway there!', class: 'success'};
    }
  }

  showTimerIsOver(): boolean {
    let {minutes, seconds} = this.initDuration;
    if (!seconds && !minutes) {
      this.notification = {message: 'Time’s up!', class: 'danger'};
      this.timerClass = '';
      clearInterval(this.intervalRef);
      return true;
    }
  }

  activateTimer(minDuration: number, seconds: number): void {
    if (this.intervalRef) clearInterval(this.intervalRef);
    const coefficient = this.shareDataService.changeCoefficientSubject.getValue();
    const frequency = 1000 / coefficient;
    this.initDuration.minutes = minDuration;
    this.initDuration.seconds = seconds;
    if (this.showTimerIsOver()) return;
    this.intervalRef = <any>setInterval(this.intervalFn.bind(this), frequency);
  }

}
