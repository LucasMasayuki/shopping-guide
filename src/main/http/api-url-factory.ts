const makeApiUrl = (path: string): string => `${process.env.API_URL}${path}`

export default makeApiUrl
