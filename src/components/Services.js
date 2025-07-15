import React from "react";

const Services = () => {
  const services = [
    {
      title: "Pembersih Rumah Tangga",
      description:
        "Berbagai alat dan bahan untuk menjaga kebersihan rumah Anda setiap hari.",
      icon: "🧹",
    },
    {
      title: "Peralatan Industri",
      description:
        "Solusi kebersihan untuk kantor, hotel, dan fasilitas bisnis lainnya.",
      icon: "🏢",
    },
    {
      title: "Jasa Konsultasi Kebersihan",
      description:
        "Kami membantu Anda memilih produk terbaik untuk kebutuhan spesifik.",
      icon: "🧑‍💼",
    },
  ];

  return (
    <section className="bg-white py-16 px-6" id="Layanan">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Layanan Kami
        </h2>
        <p className="text-gray-600 mb-12 text-sm md:text-base">
          Kami menyediakan berbagai layanan terbaik untuk memenuhi kebutuhan
          kebersihan Anda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
