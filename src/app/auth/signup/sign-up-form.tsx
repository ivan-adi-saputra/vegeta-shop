"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type userAuthForm = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

const schema = yup
  .object({
    email: yup.string().email().required("Email wajib diisi"),
    password: yup
      .string()
      .min(8, "Kata sandi harus minimal 8 karakter")
      .required("Kata sandi wajib diisi"),
    name: yup.string().required("Nama lengkap wajib diisi"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "Kata sandi konfirmasi harus sama dengan kata sandi"
      )
      .required("Kata sandi konfirmasi wajib diisi"),
  })
  .required();

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<userAuthForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: userAuthForm) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[100%] gap-4 items-center"
    >
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">
        Buat akun baru
      </div>
      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm"
          type="text"
          placeholder="Nama Lengkap"
          {...register("name")}
          error={errors.name?.message}
        />
      </div>

      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm"
          type="text"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm"
          type={showPassword ? "text" : "password"}
          placeholder="Kata Sandi"
          suffix="Eye"
          onPressSuffix={() => setShowPassword(!showPassword)}
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm"
          type={showConfirmationPassword ? "text" : "password"}
          placeholder="Konfirmasi Kata Sandi"
          suffix="Eye"
          onPressSuffix={() =>
            setShowConfirmationPassword(!showConfirmationPassword)
          }
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>

      <Button
        type="submit"
        className={cn("w-[320px] bg-leaf mt-6", hover.shadow)}
      >
        Buat Akun
      </Button>
    </form>
  );
}

export default SignUpForm;
