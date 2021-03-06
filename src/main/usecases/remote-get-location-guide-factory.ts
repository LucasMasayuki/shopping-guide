import RemoteGetLocationGuide from '@/src/data/usecases/remote-get-location-guide'
import { GetLocationGuide } from '@/src/domain/usecases/get-location-guide'
import { makeLocationApiUrl } from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteGetLocationGuide = (): GetLocationGuide =>
  new RemoteGetLocationGuide(makeLocationApiUrl('/local'), makeAxiosHttpClient())

export default makeRemoteGetLocationGuide
