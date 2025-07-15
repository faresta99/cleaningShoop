"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import toast from "react-hot-toast";
import { BsCart2 } from "react-icons/bs";
const ProdukPage = () => {
  const { data: session } = useSession();
  const { cart, addToCart } = useCart();

  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [harga, setHarga] = useState("Semua");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await fetch("/api/produk");
        const data = await res.json();
        if (!res.ok) throw new Error("Gagal mengambil data produk");
        setProdukList(data);
      } catch (error) {
        console.error("Error fetching produk:", error.message || error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduk();
  }, []);

  const filteredProduk = produkList.filter((p) => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase());
    const matchKategori = kategori === "Semua" || p.kategori === kategori;
    const matchHarga =
      harga === "Semua" ||
      (harga === "<20000" && p.harga < 20000) ||
      (harga === "20000-40000" && p.harga >= 20000 && p.harga <= 40000) ||
      (harga === ">40000" && p.harga > 40000);
    return matchSearch && matchKategori && matchHarga;
  });

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
          <li className="font-normal">
            <Link href="/keranjang">Keranjang( {cart.length} )</Link>
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
        <div className="md:hidden flex items-center gap-2">
          <Link href="/keranjang" className="flex text-[14px]">
            <BsCart2 className="text-2xl" />({cart.length})
          </Link>
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

      {/* Filter & Search */}
      <div className="p-6 flex flex-col md:flex-row gap-4 md:items-center">
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/3"
        />
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded"
        >
          <option value="Semua">Semua Kategori</option>
          <option value="Alat">Alat</option>
          <option value="Elektronik">Elektronik</option>
          <option value="Cairan">Cairan</option>
        </select>
        <select
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded"
        >
          <option value="Semua">Semua Harga</option>
          <option value="<20000">Di bawah 20rb</option>
          <option value="20000-40000">20rb - 40rb</option>
          <option value=">40000">Di atas 40rb</option>
        </select>
      </div>

      {/* Produk */}
      <div className="p-6">
        {loading ? (
          <p className="text-center">Memuat produk...</p>
        ) : filteredProduk.length === 0 ? (
          <p className="text-center">Tidak ada produk ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProduk.map((produk) => (
              <div
                key={produk.id}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={produk.gambar}
                  alt={produk.nama}
                  className="w-full h-40 object-contain mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{produk.nama}</h2>
                <p className="text-blue-600 font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(produk.harga)}
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/produk/${produk.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full text-center"
                  >
                    Lihat Detail
                  </Link>
                  <button
                    onClick={() => {
                      addToCart(produk);
                      toast.success(
                        "Produk berhasil ditambahkan ke keranjang!"
                      );
                    }}
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition w-full"
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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

export default ProdukPage;
