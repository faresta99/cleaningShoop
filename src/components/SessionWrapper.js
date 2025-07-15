"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/lib/CartContext";

export default function SessionWrapper({ children }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
