import { HttpRequest } from '@/src/data/protocols/http/http-client'
import HttpMethods from '@/src/utils/http-methods'
import faker from 'faker'

const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement([HttpMethods.DELETE, HttpMethods.GET, HttpMethods.POST, HttpMethods.PUT]),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
})

export default mockHttpRequest
