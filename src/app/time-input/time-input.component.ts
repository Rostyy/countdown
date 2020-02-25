import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent implements OnInit {

  timeForm = new FormGroup({
    minutes: new FormControl('')
  });

  constructor(private shareDataService: ShareDataService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const {minutes} = this.timeForm.value;
    this.shareDataService.changeMinutes(minutes);
  }

}
