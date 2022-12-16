export default interface ResponseEnvelope<T> {
  data?: T
  error?: Error
  errorMessage?: string
}
