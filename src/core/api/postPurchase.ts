import { httpClient } from "../httpClient"
import { OrderStatus, PaymentMethod, PurchaseType } from "../OrderHelperEnum";

export interface OrderRequest {
  id?: string;
  paymentId?: string;
  status: OrderStatus;
  purchaseType: PurchaseType;
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