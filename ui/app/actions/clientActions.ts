import { DOMAIN_STATUS } from "@/comman/types";

export async function checkReservedName(
  domainName: string
): Promise<{ id: string | null; status: DOMAIN_STATUS | null }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/domains/${domainName}/reserved`
  );
  return await res.json();
}
