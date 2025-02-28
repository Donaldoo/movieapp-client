"use client";

import React, { useEffect, useRef } from "react";
import { loadScript, type PayPalScriptOptions } from "@paypal/paypal-js";

interface PayPalCheckoutProps {
  clientId: string;
  createOrder: () => Promise<string>;
  onApprove: () => Promise<void>;
}

const PayPalCheckout = ({
  clientId,
  createOrder,
  onApprove,
}: PayPalCheckoutProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || !paypalRef.current) return;

    const loadPayPalScript = async () => {
      try {
        const options: PayPalScriptOptions = {
          clientId,
          currency: "USD",
          disableFunding: ["card"],
        };

        const paypalInstance = await loadScript(options);
        if (!paypalInstance) {
          throw new Error("Failed to load PayPal SDK");
        }

        const buttons = paypalInstance.Buttons!({
          createOrder: async () => {
            const orderId = await createOrder();
            if (!orderId) {
              throw new Error("Failed to create order");
            }
            return orderId;
          },
          onApprove: async (data, actions: any) => {
            await actions?.order?.get();
            await onApprove();
          },
          onError: (err: unknown) => {
            console.error("PayPal Checkout Error:", err);
          },
        });

        if (paypalRef.current?.children.length === 0) {
          await buttons.render(paypalRef.current);
          scriptLoaded.current = true;
        }
      } catch (err) {
        console.error("Error initializing PayPal:", err);
      }
    };

    void loadPayPalScript();

    return () => {
      scriptLoaded.current = false;
    };
  }, [clientId, createOrder, onApprove]);

  return <div ref={paypalRef} />;
};

export default PayPalCheckout;
