import {ConvertSecondsToTimestampPipe} from "./convert-seconds-to-timestamp.pipe";

describe('ConvertSecondsToTimestampPipe', () => {
  const pipe = new ConvertSecondsToTimestampPipe();

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  describe('ConvertSecondsToTimestampPipe with milliseconds', () => {
    it('pipe should convert seconds (<=0) to 0:00.000 format', () => {
      expect(pipe.transform(0, true)).toEqual('0:00.000');
    });

    it('pipe should convert seconds (<60) to 0:XX.XXX format', () => {
      expect(pipe.transform(0.123, true)).toEqual('0:00.123');
      expect(pipe.transform(3.000, true)).toEqual('0:03.000');
      expect(pipe.transform(36.496, true)).toEqual('0:36.496');
    });

    it('pipe should convert seconds (<3600) to XX:XX.XXX format', () => {
      expect(pipe.transform(3000.000, true)).toEqual('50:00.000');
      expect(pipe.transform(3213.462, true)).toEqual('53:33.462');
    });

    it('pipe should convert seconds (>=3600) to X:XX:XX.XXX format', () => {
      expect(pipe.transform(3605.123, true)).toEqual('1:00:05.123');
      expect(pipe.transform(4278.956, true)).toEqual('1:11:18.956');
    });
  });

  describe('ConvertSecondsToTimestampPipe without milliseconds', () => {
    it('pipe should convert seconds (<=0) to 0:00 format', () => {
      expect(pipe.transform(0, false)).toEqual('0:00');
    });

    it('pipe should convert seconds (<60) to 0:XX format', () => {
      expect(pipe.transform(0.123, false)).toEqual('0:00');
      expect(pipe.transform(3.000, false)).toEqual('0:03');
      expect(pipe.transform(36.496, false)).toEqual('0:36');
    });

    it('pipe should convert seconds (<3600) to XX:XX format', () => {
      expect(pipe.transform(3000.000, false)).toEqual('50:00');
      expect(pipe.transform(3213.462, false)).toEqual('53:33');
    });

    it('pipe should convert seconds (>=3600) to X:XX:XX format', () => {
      expect(pipe.transform(3605.123, false)).toEqual('1:00:05');
      expect(pipe.transform(4278.956, false)).toEqual('1:11:18');
    });
  });
});
