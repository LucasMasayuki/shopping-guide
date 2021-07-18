/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Storage<R = any> {
  get: (key: string) => R | null
  set: (key: string, data: R) => void
  delete: (key: string) => void
  reset: () => void
}
