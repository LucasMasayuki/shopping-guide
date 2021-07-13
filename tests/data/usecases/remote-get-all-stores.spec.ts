import RemoteGetAllStores from '@/src/data/usecases/remote-get-all-stores'
import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { GetAllStores, GetStoresResult } from '@/src/domain/usecases/get-all-stores'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import HttpClientSpy from '@/tests/mocks/http-client-spy'

import faker from 'faker'

type SutTypes = {
  sut: GetAllStores
  httpClientSpy: HttpClientSpy<GetStoresResult>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<GetStoresResult>()
  const sut = new RemoteGetAllStores(url, httpClientSpy)
  return {
    sut,
    httpClientSpy,
  }
}

describe('RemoteGetAllStores', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    const expectedResponse = [{ name: faker.name.findName(), activity: faker.commerce.department() }]

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: expectedResponse,
    }

    await sut.getAllStores()

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe(HttpMethods.GET)
  })

  test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    }

    const promise = sut.getAllStores()

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    const promise = sut.getAllStores()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ERROR,
    }

    const promise = sut.getAllStores()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    }

    const promise = sut.getAllStores()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if response body is undefined', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: undefined,
    }

    const promise = sut.getAllStores()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an Authentication.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const expectedResponse = [{ name: faker.name.findName(), activity: faker.commerce.department() }]

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: expectedResponse,
    }

    const stores = await sut.getAllStores()

    expect(stores).toEqual(expectedResponse)
  })
})
