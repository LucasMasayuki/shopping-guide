import RemoteDeleteProductOfCart from '@/src/data/usecases/remote-delete-product-of-cart'
import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { Cart } from '@/src/domain/models/cart-model'
import { DeleteProductOfCart } from '@/src/domain/usecases/delete-product-of-cart'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import HttpClientSpy from '@/tests/mocks/data/http-client-spy'

import faker from 'faker'

type SutTypes = {
  sut: DeleteProductOfCart
  httpClientSpy: HttpClientSpy<Cart>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<Cart>()
  const sut = new RemoteDeleteProductOfCart(url, httpClientSpy)
  return {
    sut,
    httpClientSpy,
  }
}

describe('RemoteDeleteProductOfCart', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    const product = {
      id: 1,
      about: '',
      name: faker.name.title(),
      photo: faker.internet.url(),
      category: faker.name.jobDescriptor(),
      price: 10,
      description: faker.lorem.paragraph(),
      inStock: 10,
      quantity: 10,
    }

    const expectedResponse = {
      about: '',
      total: 10,
      products: [product],
    }

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: expectedResponse,
    }

    await sut.deleteProductOfCart(product, '')

    expect(httpClientSpy.url).toBe(`${url}`)
    expect(httpClientSpy.method).toBe(HttpMethods.DELETE)
    expect(httpClientSpy.body).toStrictEqual({ id: 1 })
  })

  test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    }

    const product = {
      id: 1,
      about: '',
      name: faker.name.title(),
      photo: faker.internet.url(),
      category: faker.name.jobDescriptor(),
      price: 10,
      description: faker.lorem.paragraph(),
      inStock: 10,
      quantity: 10,
    }

    const promise = sut.deleteProductOfCart(product, '')

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    const product = {
      id: 1,
      about: '',
      name: faker.name.title(),
      photo: faker.internet.url(),
      category: faker.name.jobDescriptor(),
      price: 10,
      description: faker.lorem.paragraph(),
      inStock: 10,
      quantity: 10,
    }

    const promise = sut.deleteProductOfCart(product, '')

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ERROR,
    }

    const product = {
      id: 1,
      about: '',
      name: faker.name.title(),
      photo: faker.internet.url(),
      category: faker.name.jobDescriptor(),
      price: 10,
      description: faker.lorem.paragraph(),
      inStock: 10,
      quantity: 10,
    }

    const promise = sut.deleteProductOfCart(product, '')

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    }

    const product = {
      id: 1,
      about: '',
      name: faker.name.title(),
      photo: faker.internet.url(),
      category: faker.name.jobDescriptor(),
      price: 10,
      description: faker.lorem.paragraph(),
      inStock: 10,
      quantity: 10,
    }

    const promise = sut.deleteProductOfCart(product, '')

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if response body is undefined', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: undefined,
    }

    const product = {
      id: 1,
      about: '',
      name: faker.name.title(),
      photo: faker.internet.url(),
      category: faker.name.jobDescriptor(),
      price: 10,
      description: faker.lorem.paragraph(),
      inStock: 10,
      quantity: 10,
    }

    const promise = sut.deleteProductOfCart(product, '')

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an Authentication.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()

    const product = {
      about: '',
      id: 1,
      name: faker.name.title(),
      photo: faker.internet.url(),
      category: faker.name.jobDescriptor(),
      price: 10,
      description: faker.lorem.paragraph(),
      inStock: 10,
      quantity: 10,
    }

    const expectedResponse = {
      about: '',
      total: 10,
      products: [product],
    }

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: expectedResponse,
    }

    const store = await sut.deleteProductOfCart(product, '')

    expect(store).toEqual(expectedResponse)
  })
})
