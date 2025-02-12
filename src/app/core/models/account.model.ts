export interface Account {
  id: number
  clientId: number
  type: AccountType
  currency: Currency
  status: AccountStatus
}

export enum AccountType {
  Current = 1,
  Savings,
  Accrual,
}

export enum Currency {
  GEL,
  USD,
  EUR,
}

export enum AccountStatus {
  Active,
  Inactive,
}
