import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  buttonName = '';
  isPause = true;

  constructor() { }

  ngOnInit(): void {
  }

  buttonClick(buttonName: string): void {
    this.buttonName = buttonName;
    if (buttonName === 'pause' || buttonName === 'continue') {
      this.isPause = !this.isPause;
    }
  }

}
