export enum PaymentMethod {
  CreditCard = 0,
  Pok = 1,
}

export enum OrderStatus {
  Pending = 0,
  Completed = 1,
  Cancelled = 2,
}
export enum PurchaseType {
  Price = 0,
  RentPrice = 1,
}
export interface PokPaymentData {
  currencyCode: string;
  products: Product[];
  redirectUrl: string;
  failRedirectUrl: string;
}

export interface PokPaymentResponse {
  confirmationUrl: string;
  orderId: string;
}

export interface Product {
  name: string;
  quantity: number;
  id: string;
}