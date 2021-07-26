/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Store } from '@/src/domain/models/store-model'
import StoreMapper from './store-mapper'

const StoreListMapper = (body: Array<any>): Array<Store> => {
  return body.map((bodyValue) => {
    return StoreMapper(bodyValue)
  })
}
export default StoreListMapper
