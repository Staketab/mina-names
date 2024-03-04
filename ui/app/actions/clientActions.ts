export async function checkReservedName(domainName: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/domains/${domainName}/reserved`
  );
  return await res.json();
}
