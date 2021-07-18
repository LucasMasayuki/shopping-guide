/* eslint-disable class-methods-use-this */
import { Storage } from '@/src/data/protocols/cache/storage'

export default class LocalStorage implements Storage {
  get(key: string): string | null {
    return localStorage.getItem(key)
  }

  set(key: string, data: string): void | null {
    localStorage.setItem(key, data)
  }

  delete(key: string): void {
    localStorage.removeItem(key)
  }

  reset(): void {
    return localStorage.clear()
  }
}
