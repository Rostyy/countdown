import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit, OnDestroy {

  changeMinutesSubscription: Subscription;
  buttonName = '';
  isPause = true;

  constructor(private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.changeMinutesSubscription = this.shareDataService.changeMinutes$
      .subscribe(minutesDuration => {
        this.isPause = true;
      })
  }

  ngOnDestroy(): void {
    this.changeMinutesSubscription.unsubscribe();
  }

  buttonClick(buttonName: string): void {
    this.buttonName = buttonName;
    if (buttonName === 'pause' || buttonName === 'continue') {
      this.isPause = !this.isPause;
    }
  }

}
