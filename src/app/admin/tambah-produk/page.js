"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function TambahProdukPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
    gambar: "",
    kategori: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nama, harga, gambar, kategori, deskripsi } = form;

    const data = {
      nama,
      harga: parseInt(harga),
      gambar,
      kategori,
      deskripsi,
    };

    try {
      const res = await fetch("/api/produk", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Gagal:", result.message);
        alert("Gagal menambahkan produk: " + result.message);
      } else {
        alert("Produk berhasil ditambahkan!");
        // Tetap di halaman ini
        setForm({
          nama: "",
          harga: "",
          deskripsi: "",
          gambar: "",
          kategori: "",
        }); // reset form jika mau
      }
    } catch (error) {
      console.error("Kesalahan fetch:", error);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nama"
          placeholder="Nama Produk"
          value={form.nama}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          name="harga"
          placeholder="Harga"
          value={form.harga}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="gambar"
          placeholder="URL Gambar"
          value={form.gambar}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="kategori"
          placeholder="Kategori"
          value={form.kategori}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="deskripsi"
          placeholder="Deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan Produk
        </button>
      </form>
    </div>
  );
}
