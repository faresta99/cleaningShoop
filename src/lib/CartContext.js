// lib/CartContext.js
"use client";

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const itemWithUniqueId = { ...product, uniqueId: crypto.randomUUID() };
    setCart((prev) => [...prev, itemWithUniqueId]);
  };

  const removeFromCart = (uniqueId) => {
    setCart((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
