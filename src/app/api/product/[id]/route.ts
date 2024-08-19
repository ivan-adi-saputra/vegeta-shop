import { NextRequest } from "next/server";
import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: NextRequest, params: Params) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.params.id,
      },
    });

    return Response({
      message: "Berhasil mengambil data",
      data: product,
      status: 200,
    });
  } catch (error) {
    return Response({
      message: "Gagal mengambil data",
      data: error,
      status: 500,
    });
  }
}
