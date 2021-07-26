/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Store } from '@/src/domain/models/store-model'

const StoreListMapper = (body: Array<any>): Array<Store> => {
  return body.map((bodyValue) => {
    return {
      activity: bodyValue.atividade,
      name: bodyValue.nome,
      site: bodyValue.site,
      phone: bodyValue.telefone,
      photo: bodyValue.pictureURI,
      description: bodyValue.descricao,
      products: [],
    }
  })
}
export default StoreListMapper
