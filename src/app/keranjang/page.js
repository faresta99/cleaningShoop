"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";
import { useSession } from "next-auth/react";

const formatRupiah = (angka) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);

const KeranjangPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { data: session } = useSession();

  const totalHarga = cart.reduce((acc, item) => acc + item.harga, 0);

  const handleCOD = async () => {
    if (!session) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    const orderData = {
      items: cart,
      total: totalHarga,
      metode: "COD",
      email: session.user.email,
    };

    try {
      const res = await fetch("/api/order-cod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        alert("Pesanan COD berhasil dibuat!");
        clearCart();
      } else {
        alert("Gagal membuat pesanan COD.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    }
  };

  const handleMidtransCheckout = async () => {
    if (!session) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          total: totalHarga,
          email: session.user.email,
        }),
      });

      const data = await res.json();

      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: () => {
            alert("Pembayaran berhasil!");
            clearCart();
          },
          onPending: () => alert("Menunggu pembayaran..."),
          onError: () => alert("Pembayaran gagal."),
        });
      } else {
        alert("Gagal membuat transaksi.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat membuat transaksi.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Keranjang</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Keranjang kamu kosong.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-20 h-20 object-contain rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.nama}</h2>
                  <p className="text-blue-600 font-bold">
                    {formatRupiah(item.harga)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.uniqueId)}
                className="text-red-500 hover:underline text-sm"
              >
                Hapus
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-lg font-semibold">
              Total: {formatRupiah(totalHarga)}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button
              onClick={handleMidtransCheckout}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition w-full md:w-auto"
            >
              Bayar via E-Wallet / Virtual Account
            </button>
            <button
              onClick={handleCOD}
              className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-900 transition w-full md:w-auto"
            >
              Bayar di Tempat (COD)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeranjangPage;
