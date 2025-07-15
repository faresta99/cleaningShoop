"use client";
import React, { useState } from "react";

const Contact = () => {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nomorWA = "6285398715501"; // Ganti dengan nomor WA tujuan

    const text = `Hai kaka ganteng! Saya ${nama}, Pesan saya: ${pesan}`;
    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="bg-white py-16 px-6" id="Contact">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Hubungi Kami
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Kontak */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Informasi Kontak
            </h3>
            <p className="text-gray-600 mb-2">
              📍 Alamat: Jl.Bontoloe Baru, Daya, Makassar
            </p>
            <p className="text-gray-600 mb-2">📞 Telepon: 0853-9871-5501</p>
            <p className="text-gray-600 mb-2">✉️ Email: info@cleanpro.id</p>
            <p className="text-gray-600 mt-4">
              Kami siap membantu Anda setiap hari kerja pukul 08.00 - 17.00
              WITA.
            </p>
          </div>

          {/* Form Kontak */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nama Anda"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pesan
              </label>
              <textarea
                className="w-full border border-gray-300 px-4 py-2 rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tulis pesan Anda..."
                required
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              Kirim via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
