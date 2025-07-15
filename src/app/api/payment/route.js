import midtransClient from "midtrans-client";

export async function POST(req) {
  const body = await req.json();
  const { items, total, email } = body;

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });

  const parameter = {
    transaction_details: {
      order_id: `ORDER-${Date.now()}`,
      gross_amount: total,
    },
    customer_details: {
      email,
    },
    item_details: items.map((item, index) => ({
      id: `item-${index + 1}`,
      price: item.harga,
      quantity: 1,
      name: item.nama,
    })),
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    return Response.json({ token: transaction.token });
  } catch (error) {
    console.error("Gagal membuat transaksi Midtrans:", error);
    return new Response(
      JSON.stringify({ error: "Gagal membuat transaksi Midtrans" }),
      { status: 500 }
    );
  }
}
