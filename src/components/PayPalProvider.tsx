'use client';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PayPalScriptProvider options={{
      clientId: "AXy8ds0Z9GVBJjiW_NBj2TlamROnGskRGyTY3dbNQiogS7YsIpCDoatsqP7bCVqxcg2SP1fCcl65VjO3"
    }}>
      {children}
    </PayPalScriptProvider>
  );
} 