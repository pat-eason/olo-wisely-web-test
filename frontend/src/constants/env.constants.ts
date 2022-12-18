interface EnvConstants {
  apiUrlBase: string
}

export const envConstants: EnvConstants = {
  apiUrlBase: process.env.VUE_APP_API_URL_BASE
}
