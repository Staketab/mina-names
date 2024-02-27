"use server";

import { ORDER_BY, SORT_BY } from "@/comman/types";

export async function checkName(name: string) {
  if (!name) return;
  const payload = {
    ownerAddress: "string",
    domainName: name,
    expirationTime: 0,
    amount: 0,
    txHash: "string",
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/domains/save`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
    },
  });
  return await res.json();
}

export async function getAccountDomains({
  accountAddress,
  page,
  size,
  orderBy,
  sortBy,
}: {
  accountAddress: string;
  page: number;
  size: number;
  orderBy: ORDER_BY;
  sortBy: SORT_BY;
}) {
  if (!accountAddress) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/domains/accounts/${accountAddress}?page=${page}&size=${size}&orderBy=${orderBy}&sortBy=${sortBy}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
      },
    }
  );
  return await res.json();
}
