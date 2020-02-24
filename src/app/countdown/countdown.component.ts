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
  duration: number;
  minutes: number;
  seconds: number;

  notification: string = '';
  intervalRef: any

  ngOnInit(): void {
    this.changeMinutesSubscription = this.shareDataService.changeMinutes$
      .subscribe(minutesDuration => {
        this.duration = minutesDuration;
        this.notification = ''
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

    this.showHalfTimeNotification();

    if (this.seconds === 0 && this.minutes === 0 ) {
      this.notification = 'Time is over';
      clearInterval(this.intervalRef);
      return;
    }
  }

  // showHalfTimeNotification() {
  //   const halfTime = this.duration/2
  //   console.log('halfTime', halfTime);
    
  // }

  activateTimer(duration: number) {
    this.minutes = duration;
    this.seconds = 0;
    if (this.seconds === 0 && this.minutes === 0 ) {
      this.notification = 'Time is over';
      clearInterval(this.intervalRef);
      return;
    }
    this.intervalRef = setInterval(this.intervalFn.bind(this), 1000);
  }

}
