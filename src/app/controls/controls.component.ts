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
  buttonName = '';
  isPause = true;
  BUTTON = CONSTANT.BUTTON;

  constructor(private shareDataService: ShareDataService) {
  }

  ngOnInit(): void {
    this.changeMinutesSubscription = this.shareDataService.changeMinutes$
      .subscribe(() => {
        this.isPause = true;
        this.buttonName = this.BUTTON.X1;
      })
  }

  ngOnDestroy(): void {
    this.changeMinutesSubscription.unsubscribe();
  }

  buttonClick(buttonName: string): void {
    this.buttonName = buttonName;
    this.isPause = (buttonName === this.BUTTON.PAUSE) || (buttonName === this.BUTTON.CONTINUE) ? !this.isPause : true;
  }

  isDisabled(name: string): boolean {
    return this.buttonName === name;
  }

}
