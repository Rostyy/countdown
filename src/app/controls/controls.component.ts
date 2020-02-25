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
  isPause = true;
  BUTTON = CONSTANT.BUTTON;
  coefficient: number;

  constructor(private shareDataService: ShareDataService) { }

  @ViewChild('countdown') countdownReference: CountdownComponent;

  ngOnInit(): void {
    this.changeMinutesSubscription = this.shareDataService.changeMinutes$
      .subscribe(() => {
        this.isPause = true;
        this.coefficient = CONSTANT.INIT_COEFFICIENT;
      })
  }

  ngOnDestroy(): void {
    this.changeMinutesSubscription.unsubscribe();
  }

  buttonClick(buttonName: string): void {
    this.controlClick(buttonName);
    this.isPause = (buttonName === this.BUTTON.PAUSE) || (buttonName === this.BUTTON.CONTINUE) ? !this.isPause : true;
  }

  isDisabled(name: string): boolean {
    return name === `${this.coefficient}x`;
  }

  private controlClick(buttonName: string): void {
    switch(buttonName) {
      case CONSTANT.BUTTON.PAUSE:
        this.countdownReference.pause();
        break;
      case CONSTANT.BUTTON.CONTINUE:
        this.countdownReference.continue(this.coefficient);
        break;
      case CONSTANT.BUTTON.X1:
        this.createApplyCoefficient(CONSTANT.BUTTON.X1);
        break;
      case CONSTANT.BUTTON.X1_5:
        this.createApplyCoefficient(CONSTANT.BUTTON.X1_5);
        break;
      case CONSTANT.BUTTON.X2:
        this.createApplyCoefficient(CONSTANT.BUTTON.X2);
        break;
    }
  }

  private createApplyCoefficient(buttonName: string): void {
    this.coefficient = this.createCoefficient(buttonName);
    this.countdownReference.applyCoefficient(this.coefficient);
  }

  private createCoefficient(buttonName: string): number {
    return +buttonName.substring(0, buttonName.length - 1);
  }

}
