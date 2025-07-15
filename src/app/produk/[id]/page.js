"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const formatHarga = (harga) => {
  return "Rp " + harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const DetailProdukPage = () => {
  const router = useRouter();
  const params = useParams();
  const { addToCart } = useCart();
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const id = parseInt(params.id);

  useEffect(() => {
    const fetchProduk = async () => {
      const { data, error } = await supabase
        .from("produk")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal mengambil produk:", error.message);
        setProduk(null);
      } else {
        setProduk(data);
      }

      setLoading(false);
    };

    if (id) fetchProduk();
  }, [id]);

  if (loading) return <p className="p-6">Memuat data produk...</p>;

  if (!produk) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
        <Link href="/produk" className="text-blue-600 hover:underline">
          ← Kembali ke produk
        </Link>
      </div>
    );
  }

  const handleTambahKeKeranjang = () => {
    addToCart(produk);
    toast.success("Produk berhasil ditambahkan ke keranjang!");
  };

  return (
    <div className="p-6">
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
      <Link
        href="/produk"
        className="bg-blue-600 py-1 px-4 rounded-sm text-white mb-4 inline-block mt-4"
      >
        ← Back
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={produk.gambar}
          alt={produk.nama}
          className="w-full md:w-1/3 object-contain"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{produk.nama}</h1>
          <p className="text-xl text-blue-600 font-semibold mb-4">
            {formatHarga(produk.harga)}
          </p>
          <p className="mb-4">{produk.deskripsi}</p>
          <p className="text-gray-500 text-sm mb-2">
            Kategori: {produk.kategori}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleTambahKeKeranjang}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              + Tambah ke Keranjang
            </button>
            <button
              onClick={() =>
                router.push(
                  `/pembelian?nama=${encodeURIComponent(produk.nama)}&harga=${produk.harga}&gambar=${encodeURIComponent(produk.gambar)}`
                )
              }
              className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
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

export default DetailProdukPage;
