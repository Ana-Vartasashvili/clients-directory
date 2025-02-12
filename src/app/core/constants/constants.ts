import { ClientGender } from '@core/models/client.model'
import { AccountStatus, AccountType, Currency } from '../models/account.model'

export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 20, 50]
export const FILTERS_NOT_TO_RESET = ['Page', 'PageSize', 'SortBy']
export const GENDERS = [
  { name: ClientGender[ClientGender.Female], code: ClientGender.Female },
  { name: ClientGender[ClientGender.Male], code: ClientGender.Male },
]
export const ACCOUNT_TYPES = [
  {
    name: AccountType[AccountType.Accrual],
    code: AccountType.Accrual,
  },
  {
    name: AccountType[AccountType.Current],
    code: AccountType.Current,
  },
  {
    name: AccountType[AccountType.Savings],
    code: AccountType.Savings,
  },
]
export const ACCOUNT_STATUSES = [
  { name: AccountStatus[AccountStatus.Active], code: AccountStatus.Active },
  { name: AccountStatus[AccountStatus.Closed], code: AccountStatus.Closed },
]
export const CURRENCIES = [
  { name: Currency[Currency.GEL], code: Currency.GEL },
  { name: Currency[Currency.USD], code: Currency.USD },
  { name: Currency[Currency.EUR], code: Currency.EUR },
]
