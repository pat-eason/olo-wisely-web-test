interface EnvConstants {
  apiUrlBase: string
}

console.log(process.env)

export const envConstants: EnvConstants = {
  apiUrlBase: process.env.VUE_APP_API_URL_BASE
}
