'use client'
import { Routs } from "@/comman/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace(Routs.HOME)
  })
  return null;
};

export default Page;
