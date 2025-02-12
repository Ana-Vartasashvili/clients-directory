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
  GEL = 1,
  USD,
  EUR,
}

export enum AccountStatus {
  Active = 1,
  Closed,
}

export interface CreatedAccount {
  type: AccountType
  currency: Currency
}
