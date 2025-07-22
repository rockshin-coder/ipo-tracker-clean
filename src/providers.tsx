"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

/** react‑query 전역 Provider */
export default function Providers({ children }: { children: ReactNode }) {
  // 한 번만 생성
  const [client] = useState(() => new QueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
