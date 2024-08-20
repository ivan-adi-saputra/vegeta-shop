import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // try {
  // ambil buat ngecek user yang sedang login dari authOptions
  const session = await getServerSession(authOptions);
  const user = session?.user;

  console.log("session");
  console.log(session?.user);
  const payload = await req.json();
  const product = await prisma.product.findFirst({
    where: {
      id: payload.product_id,
    },
  });

  if (!product) {
    return Response({
      message: "Product tidak tersedia",
      status: 404,
    });
  }

  const pricePerItem = +product.price;
  console.log("Price per item:", pricePerItem);
  const checkout = await prisma.checkout.create({
    data: {
      productId: product.id,
      userId: user.id,
      qty: payload.qty,
      pricePerItem: pricePerItem,
    },
  });
  console.log("checkout");
  console.log(checkout);

  return Response({
    message: "Checkout berhasil",
    data: checkout,
    status: 200,
  });
  // } catch (error) {
  //   return Response({
  //     message: "Checkout gagal",
  //     data: error,
  //     status: 500,
  //   });
  // }
}
