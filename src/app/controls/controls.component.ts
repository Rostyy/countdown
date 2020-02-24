import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  buttonName = '';

  constructor() { }

  ngOnInit(): void {
  }

  buttonClick(buttonName: string): void {
    this.buttonName = buttonName;
  }

}
