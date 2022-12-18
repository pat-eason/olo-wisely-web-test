export type ResponseEnvelopeError = Record<string, string>

export interface ResponseEnvelope<T> {
  data?: T
  error?: ResponseEnvelopeError
  errorMessage?: string
}