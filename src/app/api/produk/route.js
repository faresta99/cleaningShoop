import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("produk").select("*");

  if (error) {
    console.error("Supabase error:", error.message);
    return Response.json({ message: error.message }, { status: 500 });
  }

  return Response.json(data);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { nama, harga, gambar, kategori, deskripsi } = body;

    if (!nama || !harga || !gambar) {
      return Response.json({ message: "Request tidak valid" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("produk")
      .insert([{ nama, harga, gambar, kategori, deskripsi }]);

    if (error) {
      console.error("Supabase error:", error.message);
      return Response.json({ message: error.message }, { status: 500 });
    }

    return Response.json({ message: "Produk berhasil ditambahkan", data });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json({ message: "Request tidak valid" }, { status: 400 });
  }
}
