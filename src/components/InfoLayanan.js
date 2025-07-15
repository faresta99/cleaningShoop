import React from "react";
import { Truck, Clock, MapPin } from "lucide-react"; // pastikan kamu install lucide-react

const InfoLayanan = () => {
  const info = [
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: "Area Pengiriman",
      description:
        "Kami melayani seluruh wilayah kota Makassar dan sekitarnya.",
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Estimasi Waktu",
      description:
        "Pesanan dikirim dalam 1×24 jam setelah pembayaran dikonfirmasi.",
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "Gratis Ongkir",
      description: "Nikmati gratis ongkir untuk pesanan di atas Rp100.000.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Info Layanan & Pengiriman
        </h2>
        <p className="text-gray-600 mb-12">
          Pelayanan cepat, aman, dan terpercaya untuk seluruh pelanggan di
          Makassar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {info.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoLayanan;
