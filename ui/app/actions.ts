"use server";

import { revalidateTag } from "next/cache";

export async function checkName(name: string) {
  if (!name) return;
  const payload = {
    ownerAddress: "string",
    domainName: name,
    expirationTime: 0,
    amount: 0,
    txHash: "string",
  };

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
    },
  });
  return await res.json();
}
