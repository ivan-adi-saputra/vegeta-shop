import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { ProductCategory } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const take = 9;
    const query = req.nextUrl.searchParams;
    const page = query.get("page")
      ? parseInt(query.get("page") as string) - 1
      : 0;
    const skip = take * page;
    const categories = query.get("category")?.split(",") || undefined;
    console.log("backend");
    console.log(categories);

    const queryCondition = {
      AND: [
        {
          category: {
            in: categories as ProductCategory[],
          },
        },
      ],
    };

    const totalProducts = await prisma.product.count();
    const products = await prisma.product.findMany({
      take,
      skip,
      where: queryCondition,
    });

    return Response({
      message: "berhasil mengambil data product",
      data: {
        total: totalProducts,
        data: products,
      },
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
