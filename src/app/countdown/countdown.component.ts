import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShareDataService } from '../services/share-data.service';
import { Timer } from 'src/models/timer.model';
import { CONSTANT } from '../constants/constants';
import { MessageNotification } from 'src/models/message-notification.model';

@Component({
  selector: 'countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {

  constructor(private shareDataService: ShareDataService) { }
  
  changeMinutesSubscription: Subscription;
  notification: MessageNotification = {message: '', messageClass: ''};
  initDuration: Timer = {minutes: 0, seconds: 0};

  halfTimeSec: number;
  timerClass: string = '';
  paused: Timer = {minutes: null, seconds: null};
  intervalRef: number;
  coefficient: number;

  ngOnInit(): void {
    this.changeMinutesSubscription = this.shareDataService.changeMinutes$
      .subscribe((minutesDuration: number) => {
        this.initStartClick(minutesDuration)
        this.activateTimer(minutesDuration, 0, CONSTANT.INIT_COEFFICIENT);
      });
  }

  ngOnDestroy(): void {
    this.changeMinutesSubscription.unsubscribe();
  }

  pause(): void {
    this.paused = Object.assign({}, this.initDuration);
    clearInterval(this.intervalRef);
  }

  continue(coefficient: number): void {
    const {minutes, seconds} = this.paused;
    this.activateTimer(minutes, seconds, coefficient);
  }

  applyCoefficient(coefficient: number): void {
    const {minutes, seconds} = this.initDuration;
    this.activateTimer(minutes, seconds, coefficient);
  }

  private initStartClick(minutesDuration: number): void {
    this.halfTimeSec = minutesDuration*60/2;
    this.notification = {message: '', messageClass: ''};;
    this.timerClass = '';
  }

  private calculate(): void {
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

  private applyTimerStyles(): void {
    const {seconds} = this.initDuration;
    if (seconds <= 10) {
      this.timerClass = 'blink';
      return;
    }
    if (seconds <= 20) {
      this.timerClass = 'red';
    }
  }

  private showHalfTimeNotification(): void {
    const currentSec = this.initDuration.minutes*60 + this.initDuration.seconds;
    if (currentSec <= this.halfTimeSec) {
      this.notification = {message: 'More than halfway there!', messageClass: 'success'};
    }
  }

  private showTimerIsOver(): boolean {
    let {minutes, seconds} = this.initDuration;
    if (!seconds && !minutes) {
      this.notification = {message: 'Time’s up!', messageClass: 'danger'};
      this.timerClass = '';
      this.playAudio();
      clearInterval(this.intervalRef);
      return true;
    }
  }

  private playAudio() {
    const audio = new Audio('../assets/alarm.mp3');
    audio.play();
  }

  private activateTimer(minDuration: number, seconds: number, coefficient = 1): void {
    if (this.intervalRef) clearInterval(this.intervalRef);
    const frequency = 1000 / coefficient;
    this.initDuration.minutes = minDuration;
    this.initDuration.seconds = seconds;
    if (this.showTimerIsOver()) return;
    this.intervalRef = <any>setInterval(this.calculate.bind(this), frequency);
  }

}
