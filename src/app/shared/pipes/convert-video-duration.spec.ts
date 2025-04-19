import {ConvertVideoDurationPipe} from "./convert-video-duration.pipe";

describe('ConvertVideoDurationPipe Test', () => {
  const pipe = new ConvertVideoDurationPipe();

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('pipe should convert ISO 8601 string (empty) to 0:00 format ', () => {
    const duration = '';
    expect(pipe.transform(duration)).toEqual('0:00');
  });

  it('pipe should convert ISO 8601 string (only seconds) to 0:XX format ', () => {
    const duration = 'PT5S';
    expect(pipe.transform(duration)).toEqual('0:05');
  });

  it('pipe should convert ISO 8601 string (only minutes) to XX:00 format ', () => {
    const duration = 'PT34M';
    expect(pipe.transform(duration)).toEqual('34:00');
  });

  it('pipe should convert ISO 8601 string (only hours) to XX:00:00 format ', () => {
    const duration = 'PT16H';
    expect(pipe.transform(duration)).toEqual('16:00:00');
  });

  it('pipe should convert ISO 8601 string (minutes and seconds) to XX:XX format', () => {
    const duration = 'PT12M7S';
    expect(pipe.transform(duration)).toEqual('12:07');
  });

  it('pipe should convert ISO 8601 string (hours and seconds) to X:XX:XX format', () => {
    const duration = 'PT6H7S';
    expect(pipe.transform(duration)).toEqual('6:00:07');
  });

  it('pipe should convert ISO 8601 string (hours, minutes, and seconds) to X:XX:XX format', () => {
    const duration = 'PT1H3M45S';
    expect(pipe.transform(duration)).toEqual('1:03:45');
  });
});
