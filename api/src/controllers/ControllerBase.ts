import ResponseEnvelope from '../types/ResponseEnvelope'

export abstract class ControllerBase {
  protected generateSuccessResponse<T>(data: T): ResponseEnvelope<T> {
    return {data}
  }

  protected generateErrorResponse(error: Error, message: string = ""): ResponseEnvelope<void> {
    return {
      error,
      errorMessage: message ?? error.message
    }
  }
}