import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user || !bcrypt.compareSync(payload.password, user.password))
      return Response({
        message: "Email atau kata sandi salah",
        status: 401,
      });

    const data: Partial<User> = {
      ...user,
      password: undefined,
    };

    return Response({
      message: "Login berhasil",
      data,
      status: 200,
    });
  } catch (error: any) {
    return Response({
      message: "Login gagal",
      data: error,
      status: 500,
    });
  }
}
