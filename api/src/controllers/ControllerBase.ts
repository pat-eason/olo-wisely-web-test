import { ResponseEnvelope, ResponseEnvelopeError } from '../types/ResponseEnvelope'

export abstract class ControllerBase {
  protected generateSuccessResponse<T>(data: T): ResponseEnvelope<T> {
    return {data}
  }

  protected generateErrorResponse(error: ResponseEnvelopeError, message: string = ""): ResponseEnvelope<void> {
    return {
      error,
      errorMessage: message ?? error.message
    }
  }
}