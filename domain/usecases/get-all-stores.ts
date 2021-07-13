import { StoreModel } from '../models/store-model'

export type GetStoresResult = {
  stores: Array<StoreModel>
}

export interface AddUser {
  getAllStores: () => Promise<GetStoresResult>
}
