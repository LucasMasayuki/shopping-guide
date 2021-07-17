import { Store } from '../models/store-model'

export interface GetStore {
  getStore: (name: string) => Promise<Store>
}
