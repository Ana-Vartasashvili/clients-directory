export class ErrorHandler {
  static getErrorMessageSummary(error: any) {
    switch (error?.status) {
      case 400:
        return 'Bad request'
      case 500:
        return 'Something went wrong'
      case 404:
        return 'Not found'

      default:
        return 'Something went wrong'
    }
  }

  static getErrorMessageDetails(error: any) {
    switch (error?.status) {
      case 400:
        return this.getValidationErrorMessages(error)
      case 500:
        return 'Internal server error'
      case 404:
        return this.getNotFoundErrorMessage(error)

      default:
        return 'Please try again later'
    }
  }

  private static getValidationErrorMessages(error: any, maxMessages: number = 3): string {
    if (error?.error?.errors) {
      const messages = Object.values(error?.error?.errors).flat()
      const displayedMessages = messages.slice(0, maxMessages)
      const moreMessagesCount = messages.length - displayedMessages.length

      let result = displayedMessages.join('\n')
      if (moreMessagesCount > 0) {
        result += `\n...and ${moreMessagesCount} more error(s)`
      }

      return result
    }

    return 'Validation error occurred'
  }

  private static getNotFoundErrorMessage(error: any) {
    return typeof error?.error === 'string' ? error.error : 'Resource not found'
  }
}
