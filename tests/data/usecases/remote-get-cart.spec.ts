import RemoteGetCart from '@/src/data/usecases/remote-get-cart'
import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { Cart } from '@/src/domain/models/cart-model'
import { GetCart } from '@/src/domain/usecases/get-cart'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import HttpClientSpy from '@/tests/mocks/data/http-client-spy'

import faker from 'faker'

type SutTypes = {
  sut: GetCart
  httpClientSpy: HttpClientSpy<Cart>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<Cart>()
  const sut = new RemoteGetCart(url, httpClientSpy)
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
      total: 10,
      about: '',
      products: [
        {
          about: '',
          id: 1,
          name: faker.name.title(),
          photo: faker.internet.url(),
          category: faker.name.jobDescriptor(),
          price: 10,
          description: faker.lorem.paragraph(),
          quantity: 10,
          inStock: 10,
        },
      ],
    }

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: expectedResponse,
    }

    await sut.getCart()

    expect(httpClientSpy.url).toBe(`${url}`)
    expect(httpClientSpy.method).toBe(HttpMethods.GET)
  })

  test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    }

    const promise = sut.getCart()

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    const promise = sut.getCart()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ERROR,
    }

    const promise = sut.getCart()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    }

    const promise = sut.getCart()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if response body is undefined', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: undefined,
    }

    const promise = sut.getCart()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an Authentication.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()

    const expectedResponse = {
      about: '',
      total: 10,
      products: [
        {
          about: '',
          id: 1,
          name: faker.name.title(),
          photo: faker.internet.url(),
          category: faker.name.jobDescriptor(),
          price: 10,
          description: faker.lorem.paragraph(),
          inStock: 10,
          quantity: 10,
        },
      ],
    }

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: expectedResponse,
    }

    const store = await sut.getCart()

    expect(store).toEqual(expectedResponse)
  })
})
