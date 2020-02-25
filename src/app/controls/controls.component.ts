import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShareDataService } from '../services/share-data.service';
import { CONSTANT } from '../constants/constants';
import { CountdownComponent } from '../countdown/countdown.component';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit, OnDestroy {

  changeMinutesSubscription: Subscription;
  changeCoefficientSubscription: Subscription;
  buttonName = '';
  isPause = true;
  BUTTON = CONSTANT.BUTTON;
  coefficient: number;

  constructor(private shareDataService: ShareDataService) { }

  @ViewChild('countdown') countdownReference: CountdownComponent;

  ngOnInit(): void {
    this.changeMinutesSubscription = this.shareDataService.changeMinutes$
      .subscribe(() => {
        this.isPause = true;
        this.buttonName = this.BUTTON.X1;
      })

    this.changeCoefficientSubscription = this.shareDataService.changeCoefficient$
      .subscribe(coefficient => {
        this.coefficient = coefficient;
      })
  }

  ngOnDestroy(): void {
    this.changeMinutesSubscription.unsubscribe();
    this.changeCoefficientSubscription.unsubscribe();
  }

  buttonClick(buttonName: string): void {
    this.controlClick(buttonName);
    this.isPause = (buttonName === this.BUTTON.PAUSE) || (buttonName === this.BUTTON.CONTINUE) ? !this.isPause : true;
  }

  isDisabled(name: string): boolean {
    return name === `${this.coefficient}x`;
  }

  private controlClick(buttonName): void {
    switch(buttonName) {
      case CONSTANT.BUTTON.PAUSE:
        this.countdownReference.pause();
        break;
      case CONSTANT.BUTTON.CONTINUE:
        this.countdownReference.continue();
        break;
      case CONSTANT.BUTTON.X1:
        this.countdownReference.applyCoefficient();
        break;
      case CONSTANT.BUTTON.X1_5:
        this.countdownReference.applyCoefficient(1.5);
        break;
      case CONSTANT.BUTTON.X2:
        this.countdownReference.applyCoefficient(2);
        break;
    }
  }

}
