import Utils from "./utils";

describe('Utils', () => {
  describe('getRouteFromUrl', () => {
    it('should get route from URL', () => {
      expect(Utils.getRouteFromUrl('/splice/CXBFU97X61I')).toEqual('splice');
    });
  });
});

