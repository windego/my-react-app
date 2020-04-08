/* eslint-disable no-console */
import moment from 'moment';
import { serialize, deserialize } from './helps';

import { AllRes, CacheItem } from './types';

const defaultExpiresTime = '9999-12-31 23:59:59';
/**
 *
 * @param {String} key
 * @returns 判断输入的key是否是字符串,否则进行转换.
 */
function checkAndWrapKeyAsString(key: any) {
  if (typeof key !== 'string') {
    console.warn(`${key} used as a key, but it is not a string.`);
    key = String(key);
  }
  return key;
}

/**
 * @description 判断localStorage中值的类型
 * @param {*} item
 */
function isCacheItem(item: any) {
  if (typeof item !== 'object') {
    return false;
  }
  if (item) {
    if (item.value && item.createTime && item.expiresTime) {
      return true;
    }
  }
  return false;
}

/**
 * @param {*} value 值
 * @param {*} expires 过期时间
 */
function cacheItemConstructor(value: any, expires: number | string) {
  // 序列话value
  const val = serialize(value);
  // 获取当前时间,创建时间
  const c = new Date(); // 当前时间戳
  let exp;
  if (typeof expires === 'number') {
    exp =
      expires === Infinity
        ? new Date(defaultExpiresTime)
        : new Date(c.getTime() + expires * 1000 * 60);
  } else if (typeof expires === 'string') {
    const times = new Date(expires).getTime();
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(times)) {
      throw new Error('expires格式错误,Number或者String[2020-10-10 10:10:10]');
    } else {
      exp = times;
    }
  }

  const expiresTime = moment(exp).format('YYYY-MM-DD HH:mm:ss');
  const createTime = moment(c).format('YYYY-MM-DD HH:mm:ss');

  return { value: val, expiresTime, createTime };
}

class CacheStorage {
  allData: AllRes;

  storage: Window['localStorage'];

  constructor() {
    this.allData = {};
    this.storage = window.localStorage as Window['localStorage'];
    this.initRun();
  }

  /**
   * @description 初始化执行,判断是否过期
   */
  initRun() {
    const timeNow = new Date().getTime();
    const data = this.storage;
    const allData = {};
    Object.entries(data).forEach(item => {
      const [key, val] = item;
      const cacheItem: CacheItem = deserialize(val);

      if (isCacheItem(cacheItem)) {
        const exp = new Date(cacheItem.expiresTime).getTime();
        if (timeNow > exp) {
          console.log(`超时删除 {${key}:${cacheItem.value}}`);
          this.remove(key);
        } else {
          allData[key] = deserialize(cacheItem.value);
        }
      } else {
        allData[key] = val;
      }
    });
    this.allData = allData;
  }

  /**
   * @description 在localStorage中 存储值
   * @param {String} key key
   * @param {*} val value
   * @param {*} exp 过期时间，Number=>分钟,String=>时间
   */
  set(key: string, val: any, exp = defaultExpiresTime) {
    const { storage } = this;
    key = checkAndWrapKeyAsString(key);
    if (val === undefined) {
      return this.remove(key);
    }
    const cacheItem = cacheItemConstructor(val, exp);
    try {
      storage[key] = serialize(cacheItem);
    } catch (e) {
      console.error(e);
    }
    return val;
  }

  /**
   * @description 返回所有localStorage 的内容
   */
  getAll() {
    return this.allData;
  }

  /**
   * @description
   * @param {*} 	key
   *
   * *  * ### key 类型
   *  - String    : 返回单个值
   *  - Array     : 返回对象
   *  - Undefined : 返回所有
   *
   */
  // eslint-disable-next-line consistent-return
  get(key: string | Array<string> | undefined): any {
    const type = Object.prototype.toString.call(key);
    if (type === '[object String]') {
      const { storage } = this;
      const timeNow = new Date().getTime();
      let value: any;
      key = checkAndWrapKeyAsString(key);
      try {
        const cacheItem: CacheItem = deserialize(storage[key as string]);
        if (isCacheItem(cacheItem)) {
          const exp = new Date(cacheItem.expiresTime).getTime();
          if (timeNow < exp) {
            value = deserialize(cacheItem.value);
          } else {
            value = null;
            this.remove(key);
          }
        }
        return value;
      } catch (e) {
        return null;
      }
    }
    if (type === '[object Undefined]') {
      return this.allData;
    }
    if (type === '[object Array]') {
      return (key as Array<string>).reduce((pre, item) => {
        const val = this.get(item);
        return { ...pre, [item]: val };
      }, {});
    }
    // throw new Error('参数类型错误!');
  }

  /**
   * @description 删除localStorage 的key
   * @param {*} 	key
   * *  * ### key 类型
   *  - String    : 删除单个值
   *  - Array     : 删除多个
   *  - Undefined : 删除所有
   */
  remove(key: string | Array<string> | undefined) {
    const type = Object.prototype.toString.call(key);
    if (type === '[object String]') {
      const data = this.storage;
      const value = data[key as string];
      delete data[key as string];
    }
    if (type === '[object Array]') {
      (key as Array<string>).forEach(item => this.remove(item));
    } else if (type === '[object Undefined]') {
      this.clear();
    } else {
      throw new Error('参数类型错误!');
    }
    return key;
  }

  clear() {
    const { storage } = this;
    storage.clear();
  }
}
export default new CacheStorage();
