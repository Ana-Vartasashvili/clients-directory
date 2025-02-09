export class ErrorHandler {
  static getErrorMessageSummary(error: any) {
    switch (error?.status) {
      case 500:
        return 'Something went wrong'

      default:
        return 'Something went wrong'
    }
  }

  static getErrorMessageDetails(error: any) {
    switch (error?.status) {
      case 500:
        return 'Internal server error'

      default:
        return 'Please try again later'
    }
  }
}
