'use client';

import { PayPalButtons } from "@paypal/react-paypal-js";

function Page() {
  const createOrder = (data: any) => {
    // Return a promise that resolves with the order ID
    return Promise.resolve("test-order-id");
  };

  return (
    <PayPalButtons 
      createOrder={createOrder}
    />
  );
}

export default Page;
