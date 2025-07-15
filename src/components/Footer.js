import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Kiri - Logo atau Nama */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">CleanPro</h2>
          <p className="text-sm text-gray-400">
            Solusi kebersihan terpercaya untuk rumah & bisnis.
          </p>
        </div>

        {/* Tengah - Navigasi kecil */}
        <ul className="flex space-x-6 text-sm mb-4 md:mb-0">
          <li className="hover:text-blue-400 cursor-pointer">Home</li>
          <li className="hover:text-blue-400 cursor-pointer">Layanan</li>
          <li className="hover:text-blue-400 cursor-pointer">Tentang Kami</li>
          <li className="hover:text-blue-400 cursor-pointer">Kontak</li>
        </ul>

        {/* Kanan - Copyright */}
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} CleanPro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
