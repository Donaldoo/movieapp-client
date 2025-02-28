"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export default function ReactQueryWrapper(props: any) {
  return (
    <QueryClientProvider client={client}>{props.children}</QueryClientProvider>
  );
}
