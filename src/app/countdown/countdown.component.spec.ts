import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownComponent } from './countdown.component';
import { DisplayNumberPipe } from '../pipes/display-number.pipe';

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownComponent, DisplayNumberPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test applyCoefficient methode returns void type', () => {
    const value = component.applyCoefficient(2);
    expect(value).toBeFalsy();
  });

  it('should test continue methode returns void type', () => {
    const value = component.continue(100);
    expect(value).toBeFalsy();
  });

  it('should test pause methode returns void type', () => {
    const value = component.pause();
    expect(value).toBeFalsy();
  });

  it('should test initDuration before init', () => {
    const initDuration = {minutes: 0, seconds: 0};
    const minutes = component.initDuration.minutes;
    const seconds = component.initDuration.seconds;
    expect(minutes).toBe(initDuration.minutes);
    expect(seconds).toBe(initDuration.seconds);
  });
});
