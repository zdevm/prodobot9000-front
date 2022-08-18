import { HumanizeStatusPipe } from './humanize-status.pipe';

describe('HumanizeStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new HumanizeStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
