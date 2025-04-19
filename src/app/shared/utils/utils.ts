export default class Utils {
  static reducePrecision(num: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  }

  static reverseMap<K, V>(map: Map<K, V>): Map<V, K> {
    return new Map(Array.from(map, ([key, value]) => [value, key]));
  }

  static getRouteFromUrl(url: string): string {
    return url.split('/')[1];
  }
}
