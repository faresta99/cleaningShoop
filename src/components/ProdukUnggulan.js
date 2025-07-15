"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const ProdukUnggulan = () => {
  const router = useRouter();
  const produk = [
    {
      nama: "Sapu Super Clean",
      harga: "Rp25.000",
      gambar: "/produk/sapu.jpg",
      diskon: "10%",
    },
    {
      nama: "Pel Serap Air Max",
      harga: "Rp40.000",
      gambar: "/produk/pel.jpg",
      diskon: "15%",
    },
    {
      nama: "Ember Anti Pecah",
      harga: "Rp18.000",
      gambar: "/produk/ember.jpg",
      diskon: "20%",
    },
    {
      nama: "Pengki",
      harga: "Rp10.000",
      gambar: "/produk/pengki.jpg",
      diskon: "20%",
    },
  ];

  return (
    <section className="bg-white py-16 px-6" id="ProdukUnggulan">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Produk Unggulan
        </h2>
        <p className="text-gray-600 mb-10">
          Dapatkan produk terbaik kami dengan harga spesial!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {produk.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.gambar}
                  alt={item.nama}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
                {item.diskon && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {item.diskon} OFF
                  </span>
                )}
              </div>
              <div className="p-4 text-left">
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.nama}
                </h3>
                <p className="text-blue-600 font-bold">{item.harga}</p>
                <button
                  onClick={() => router.push("/produk")}
                  className="mt-4 bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
                >
                  Lihat Lebih
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProdukUnggulan;
