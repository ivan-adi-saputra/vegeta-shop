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
    const min_price = query.get("min_price")
      ? parseInt(query.get("min_price") as string)
      : undefined;
    const max_price = query.get("max_price")
      ? parseInt(query.get("max_price") as string)
      : undefined;
    const ratings =
      query
        .get("rating")
        ?.split(",")
        .map((value) => +value) || undefined;

    const queryCondition = {
      AND: [
        {
          category: {
            in: categories as ProductCategory[],
          },
          price: {
            gte: min_price,
            lte: max_price,
          },
          rating: {
            in: ratings,
          },
        },
      ],
    };

    const totalProducts = await prisma.product.count({ where: queryCondition });
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
