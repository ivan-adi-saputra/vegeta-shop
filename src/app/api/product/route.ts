import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({});

    return Response({
      message: "berhasil mengambil data product",
      data: products,
      status: 200,
    });
  } catch (error) {
    return Response({
      message: "gagal mengambil data product",
      data: error,
      status: 500,
    });
  }
}
