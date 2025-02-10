import { ClientGender } from '@core/models/client.model'

export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 20, 50]
export const FILTERS_NOT_TO_RESET = ['Page', 'PageSize', 'SortBy']
export const GENDERS = [
  { name: ClientGender[ClientGender.Male], code: ClientGender.Male },
  { name: ClientGender[ClientGender.Female], code: ClientGender.Female },
]
