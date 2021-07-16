import AxiosHttpClient from '@/src/infra/http/axios-http-client/axios-http-client'

const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient()

export default makeAxiosHttpClient
