"use server";
import { ORDER_BY, SORT_BY } from "@/comman/types";
import { AccountDomainDetailsResponse } from "./types";
import axios from "axios";

export async function saveName({
  name,
  ownerAddress,
  amount,
  txHash,
  expirationTime,
}) {
  if (!name) return;
  const payload = {
    ownerAddress,
    amount,
    txHash,
    domainName: name,
    expirationTime: expirationTime,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/domains/save`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
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
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );
  return await res.json();
}

export async function getDomains({
  page,
  size,
  orderBy,
  sortBy,
}: {
  page: number;
  size: number;
  orderBy: ORDER_BY;
  sortBy: SORT_BY;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/domains/?page=${page}&size=${size}&orderBy=${orderBy}&sortBy=${sortBy}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );
  return await res.json();
}

export async function getDomainsMetadata(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/domains/${id}/reserved`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );
  return await res.json();
}

export async function getAccountDomainDetails(
  id: string
): Promise<AccountDomainDetailsResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/domains/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  });
  return await res.json();
}

export async function pinFile(formData): Promise<string> {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_IPFS_URL,
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_IPFS_KEY,
        },
      }
    );
    console.log("pinFile result:", response.data);
    if (response && response.data && response.data.IpfsHash) {
      return response.data.IpfsHash;
    } else {
      console.error("pinFile error", response.data.error);
      return undefined;
    }
  } catch (err) {
    console.error("pinFile error 2 - catch", err);
    return undefined;
  }
}

export async function editDomainImg(payload: { id: string; img: string }): Promise<AccountDomainDetailsResponse>  {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/domains/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
}
