import RemoteGetStore from '@/src/data/usecases/remote-get-store'
import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { Store } from '@/src/domain/models/store-model'
import { GetStore } from '@/src/domain/usecases/get-store'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import HttpClientSpy from '@/tests/mocks/data/http-client-spy'

import faker from 'faker'

type SutTypes = {
  sut: GetStore
  httpClientSpy: HttpClientSpy<Store>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<Store>()
  const sut = new RemoteGetStore(url, httpClientSpy)
  return {
    sut,
    httpClientSpy,
  }
}

describe('RemoteGetStore', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    const expectedResponse = {
      name: faker.name.findName(),
      activity: faker.commerce.department(),
      photo: faker.name.title(),
      description: faker.name.jobDescriptor(),
      phone: faker.phone.phoneNumber(),
      site: faker.internet.email(),
      products: [],
    }

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: expectedResponse,
    }

    await sut.getStore('test')

    expect(httpClientSpy.url).toBe(`${url}?name=test`)
    expect(httpClientSpy.method).toBe(HttpMethods.GET)
  })

  test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    }

    const promise = sut.getStore('test')

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    const promise = sut.getStore('test')

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ERROR,
    }

    const promise = sut.getStore('test')

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    }

    const promise = sut.getStore('test')

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if response body is undefined', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: undefined,
    }

    const promise = sut.getStore('test')

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an Authentication.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const expectedResponse = {
      name: faker.name.findName(),
      activity: faker.commerce.department(),
      photo: faker.name.title(),
      description: faker.name.jobDescriptor(),
      phone: faker.phone.phoneNumber(),
      site: faker.internet.email(),
      products: [],
    }

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: expectedResponse,
    }

    const store = await sut.getStore('test')

    expect(store).toEqual(expectedResponse)
  })
})
