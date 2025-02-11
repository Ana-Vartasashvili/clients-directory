export interface Client {
  id: number
  firstName: string
  lastName: string
  gender: ClientGender
  documentId: string
  phoneNumber: string
  legalAddressCountry: string
  legalAddressCity: string
  legalAddressLine: string
  actualAddressCountry: string
  actualAddressCity: string
  actualAddressLine: string
  profileImageUrl: string
}

export enum ClientGender {
  Female = 1,
  Male,
}

export type CreatedClient = Omit<Client, 'id'> & { profileImage: File | null }
