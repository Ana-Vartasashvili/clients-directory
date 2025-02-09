export class FormUtils {
  static trimFormValues(values: { [key: string]: any }): { [key: string]: any } {
    const trimmedValues: { [key: string]: any } = {}

    Object.keys(values).forEach((key) => {
      const value = values[key]
      trimmedValues[key] = typeof value === 'string' ? value.trim() : value
    })

    return trimmedValues
  }
}
