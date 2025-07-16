"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

const formatRupiah = (angka) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);

function PembelianContent() {
  const searchParams = useSearchParams();
  const nama = searchParams.get("nama");
  const harga = searchParams.get("harga");
  const gambar = searchParams.get("gambar");

  const { data: session } = useSession();

  const handleCOD = async () => {
    if (!session) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    try {
      const res = await fetch("/api/order-cod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          harga,
          metode: "COD",
          email: session.user.email,
        }),
      });

      res.ok
        ? alert("Pesanan COD berhasil dibuat!")
        : alert("Gagal membuat pesanan COD.");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ nama, harga: parseInt(harga) }],
          total: parseInt(harga),
          email: session.user.email,
        }),
      });

      const data = await res.json();
      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: () => alert("Pembayaran berhasil!"),
          onPending: () => alert("Menunggu pembayaran..."),
          onError: () => alert("Pembayaran gagal."),
        });
      } else {
        alert("Gagal membuat transaksi.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    }
  };

  if (!nama || !harga || !gambar) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-xl font-semibold text-red-600">
          Data produk tidak ditemukan.
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/produk"
        className="bg-blue-600 py-1 px-4 rounded-sm text-white inline-block mt-4 ml-6"
      >
        ← Back
      </Link>

      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Pembelian Produk</h1>
        <image
          src={gambar}
          alt={nama}
          className="w-80 object-cover rounded-lg shadow mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">{nama}</h2>
        <p className="text-gray-700 mb-6">Harga: {formatRupiah(harga)}</p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleMidtransCheckout}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Bayar via E-Wallet / Virtual Account
          </button>
          <button
            onClick={handleCOD}
            className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-900 transition"
          >
            Bayar di Tempat (COD)
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PembelianPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <PembelianContent />
    </Suspense>
  );
}
