export class FormUtils {
  static trimFormValues(values: { [key: string]: any }): { [key: string]: any } {
    const trimmedValues: { [key: string]: any } = {}

    Object.keys(values).forEach((key) => {
      const value = values[key]
      trimmedValues[key] = typeof value === 'string' ? value.trim() : value
    })

    return trimmedValues
  }

  static getFormDataFromObject(object: { [key: string]: any }): FormData {
    const formData = new FormData()

    Object.entries(object).forEach(([key, value]) => {
      formData.append(key, value)
    })

    return formData
  }
}
