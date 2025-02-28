import { httpClient } from "../httpClient"
import { OrderStatus, PaymentMethod } from "../OrderHelperEnum";

export interface OrderRequest {
  id?: string;
  paymentId?: string;
  status: OrderStatus;
  productId?: string;
  redirectUrl?: string;
  failRedirectUrl?: string;
}

export type SaveOrderResponse = {
  orderId: string;
  pokOrderUrl: string;
};

export default function postPurchase(data: OrderRequest): Promise<SaveOrderResponse> {
    return httpClient.post("api/save-order", data)
}