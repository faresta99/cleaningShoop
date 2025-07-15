"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react"; // tambahkan useState untuk mobile menu toggle
import Link from "next/link";

const Hero = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // state untuk toggle menu mobile
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
        {/* Kiri - Logo */}
        <div className="flex items-center space-x-2">
          <img src="/Logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold">CleanPro</span>
        </div>
        {/* Tengah - Menu Desktop */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link href="/produk">Produk</Link>
          </li>
        </ul>
        {/* Kanan - Login/Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <Image
                src={session.user.image}
                alt="profile"
                width={36}
                height={36}
                className="rounded-full"
              />
              <button
                onClick={() => signOut()}
                className="text-sm text-red-600 hover:underline cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="relative group">
              <button className="bg-blue-600 text-white px-7 py-2 rounded hover:bg-blue-700 transition">
                Akun
              </button>
              <div className="absolute right-0 w-32 bg-white rounded shadow-md hidden group-hover:block z-50">
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => setRegisterModalOpen(true)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Daftar
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center ">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
            <li
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-600 cursor-pointer"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-600 cursor-pointer"
            >
              <Link href="/produk">Produk</Link>
            </li>

            <li>
              {session ? (
                <div className="flex items-center space-x-3">
                  <Image
                    src={session.user.image}
                    alt="profile"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <button
                    onClick={() => signOut()}
                    className="text-sm text-red-600 hover:underline cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => setLoginModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer w-full"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setRegisterModalOpen(true)}
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition cursor-pointer w-full"
                  >
                    Daftar
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center px-6 md:px-16 py-16 bg-[url('/background.png')] bg-cover bg-center">
        {/* Kiri - Teks */}
        <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            ALAT KEBERSIHAN BERKUALITAS
            <br />
            UNTUK RUMAH DAN BISNIS
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            Dapatkan Peralatan Terbaik Untuk Menjaga Kebersihan Dengan Mudah Dan
            Efisien.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <button className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 transition">
              Jelajahi Produk Kami
            </button>
            <button className="border border-blue-600 text-white px-5 py-3 rounded hover:bg-blue-50 hover:text-blue-600 transition">
              Belanja Sekarang
            </button>
          </div>
        </div>
      </section>

      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
            <button
              onClick={() =>
                signIn("google", {
                  prompt: "select_account",
                })
              }
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Login dengan Google
            </button>
          </div>
        </div>
      )}

      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Daftar</h2>
            <p className="text-sm mt-2">
              Belum punya akun?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Daftar di sini
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
