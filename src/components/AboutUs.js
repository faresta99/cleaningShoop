import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gray-50 py-16 px-6" id="Tentang">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Gambar */}
        <div className="md:w-1/2 w-full">
          <img
            src="/AboutUs.jpg"
            alt="Tentang Kami"
            className="rounded-xl shadow-md w-full object-cover"
            style={{ maxHeight: "400px" }} // supaya gambar tidak terlalu tinggi di desktop
          />
        </div>

        {/* Teks */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Tentang Kami
          </h2>
          <p className="text-gray-600 mb-4 text-base md:text-lg leading-relaxed">
            CleanPro adalah penyedia alat kebersihan berkualitas tinggi yang
            berdedikasi untuk membantu rumah tangga dan bisnis menjaga
            lingkungan tetap bersih, sehat, dan nyaman.
          </p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Kami percaya bahwa kebersihan adalah kunci utama untuk hidup yang
            lebih baik. Dengan pengalaman dan produk terpercaya, kami hadir
            untuk memberikan solusi kebersihan terbaik sesuai kebutuhan Anda.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
