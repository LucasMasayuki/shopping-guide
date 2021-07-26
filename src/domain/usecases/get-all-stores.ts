import { Store } from '../models/store-model'

export type GetStoresResult = Array<Store>

// eslint-disable-next-line no-shadow
export enum OrderBy {
  NAME = 'nome',
  ACTIVITY = 'atividade',
}

export interface GetAllStores {
  getAllStores: (orderBy: OrderBy) => Promise<GetStoresResult>
}
