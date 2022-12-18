export interface ResponseEnvelope<T = never> {
  data?: T
  error?: Record<string, string>
  errorMessage?: string
}
