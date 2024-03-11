"use client";

import { getAccountDomainDetails } from "@/app/actions/actions";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [name, setName] = useState(null);
  const getAccountDomainDetailsById = async () => {
    const response = await getAccountDomainDetails(params.id);
    setName(response);
  };
  useEffect(() => {
    if (params.id) {
      getAccountDomainDetailsById();
    }
  }, [params]);
  
  if (!name) return null;

  return <div>My Post: {name.domainName}</div>;
}
