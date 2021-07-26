/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Store } from '@/src/domain/models/store-model'

const StoreMapper = (body: any): Store => {
  return {
    about: body.about,
    activity: body.atividade,
    name: body.nome,
    site: body.site,
    phone: body.telefone,
    photo: body.pictureURI,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi elit, varius vitae blandit nec, egestas id purus. Suspendisse mattis nisi at arcu consequat maximus. Fusce mattis lacinia hendrerit. Suspendisse potenti. Sed non molestie justo. Pellentesque euismod purus ut fringilla malesuada. Aliquam erat volutpat. Vestibulum tincidunt ac nisi at elementum. In consequat, dolor eu aliquet laoreet, augue lorem iaculis massa, id fringilla tortor nibh eu nunc. Suspendisse a sem non velit pharetra luctus hendrerit intortor. Etiam gravida urna nec nunc venenatis, a dignissim metus congue. Vivamus sit amet lorem sem. Inaliquam efficitur eros, vitae molestie libero accumsan at. Integer arcu odio, cursus a consequat interdum,aliquet in sem. Cras molestie risus at fringilla malesuada. Nunc dictum rutrum magna vulputate viverra. Nullameu risus commodo, ullamcorper felis sit amet, tempor tortor. Ut a ultricies metus. Nulla et ultricies ligula. Duis id ligula nec tortor placerat porttitor id quis neque. Phasellus vel urna gravida, posuere magna sit amet, interdum velit. Duis pharetra, justo eget lacinia efficitur, leo purus commodo tellus, at euismod neque ligula eu nibh. Curabitur vulputate iaculis arcu non luctus. Curabitur nec rutrum velit. Cras facilisis odio vitae venenatis semper. Nam sit amet dapibus diam, non lobortis augue. In mollis mi in elit gravida, id porttitor neque sagittis. Nunc vitae fermentum enim.',
    products: [],
  }
}
export default StoreMapper
