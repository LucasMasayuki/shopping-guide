import { StoreModel } from '../models/store-model'

export type GetStoresResult = Array<StoreModel>

export interface GetAllStores {
  getAllStores: () => Promise<GetStoresResult>
}
