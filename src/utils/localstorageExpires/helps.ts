/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// 字符化
import { CacheItem } from './types';

export function serialize(val: CacheItem) {
  return JSON.stringify(val);
}

// 反字符化
export function deserialize(val: string): CacheItem {
  return JSON.parse(val);
}

// 混合对象
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}
