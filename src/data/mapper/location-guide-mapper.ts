/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { LocationGuide } from '@/src/domain/models/location-guide-model'

const LocationGuideMapper = (body: any): LocationGuide => {
  return {
    localization: body.local,
    hall: body.corredor,
    floor: body.andar,
    bloc: body.bloco,
    stairs: body.escadas,
    nearestLadder: body.escadas,
    path: body.caminho,
    pathM: body.caminhoM,
  }
}
export default LocationGuideMapper
