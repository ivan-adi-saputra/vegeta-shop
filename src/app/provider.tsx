"use client";
import { SessionProvider } from "next-auth/react";
import { Provider as ReactProvider } from "react-redux";
import { store } from "@/store";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactProvider store={store}>{children}</ReactProvider>
    </SessionProvider>
  );
}

export default Provider;
