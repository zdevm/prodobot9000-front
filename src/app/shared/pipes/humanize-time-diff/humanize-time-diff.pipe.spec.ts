import { HumanizeTimeDiffPipe } from './humanize-time-diff.pipe';

describe('HumanizeTimeDiffPipe', () => {
  it('create an instance', () => {
    const pipe = new HumanizeTimeDiffPipe();
    expect(pipe).toBeTruthy();
  });
});
