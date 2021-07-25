import { LocationGuide } from '../models/location-guide-model'

export interface GetLocationGuide {
  getLocationGuide: (storeName: string) => Promise<LocationGuide>
}
