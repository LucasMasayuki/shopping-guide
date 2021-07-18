import LocalStorage from '@/src/infra/cache/local-storage'

const makeLocalStorage = (): LocalStorage => new LocalStorage()

export default makeLocalStorage
