import { DisplayNumberPipe } from './display-number.pipe';

describe('DisplayNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new DisplayNumberPipe();
    expect(pipe).toBeTruthy();
  });

  it('search trough pipe number < 10', () => {
    const pipe = new DisplayNumberPipe();
    expect(pipe.transform(2)).toEqual('02');
  });

  it('search trough pipe number > 10', () => {
    const pipe = new DisplayNumberPipe();
    expect(pipe.transform(22)).toEqual(22);
  });
});
