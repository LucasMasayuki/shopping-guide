import { Store } from '../models/store-model'

export interface SearchStoreByName {
  search: (storeName: string) => Promise<Store[]>
}
