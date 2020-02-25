import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimeInputComponent } from './time-input/time-input.component';
import { CountdownComponent } from './countdown/countdown.component';
import { ControlsComponent } from './controls/controls.component';
import { DisplayNumberPipe } from './pipes/display-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TimeInputComponent,
    CountdownComponent,
    ControlsComponent,
    DisplayNumberPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
