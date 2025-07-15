"use client";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
// Import ini di paling atas
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />
      </head>
      <body>
        <SessionProvider>
          <CartProvider>
            <Toaster position="top-right" />
            {children}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
