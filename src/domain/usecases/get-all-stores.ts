import { StoreModel } from '../models/store-model'

export type GetStoresResult = Array<StoreModel>

// eslint-disable-next-line no-shadow
export enum OrderBy {
  NAME = 'name',
  ACTIVITY = 'activity',
}

export interface GetAllStores {
  getAllStores: (orderBy: OrderBy) => Promise<GetStoresResult>
}
