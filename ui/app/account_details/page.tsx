"use client";

import { AccountDetails } from "@/components/organisms/accountDetails";
import { Navigation } from "@/components/organisms/navigation";

import style from "./index.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AccountDetailsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <div className={style.wrapper}>
      <Navigation />
      <AccountDetails />
    </div>
  );
}
