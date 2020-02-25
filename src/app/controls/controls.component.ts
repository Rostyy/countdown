import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';
import { Subscription } from 'rxjs';
import { CONSTANT } from '../constants/constants';

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
    this.buttonName = buttonName;
    this.isPause = (buttonName === this.BUTTON.PAUSE) || (buttonName === this.BUTTON.CONTINUE) ? !this.isPause : true;
  }

  isDisabled(name: string): boolean {
    return name === `${this.coefficient}x`;
  }

}
