"use client";

import { getAccountDomainDetails } from "@/app/actions/actions";
import { useEffect, useState } from "react";

import DetailsNameHeader from "@/components/organisms/detailsNameHeader/detailsNameHeader";
import DetailsNameTable from "@/components/organisms/detailsNameTable/detailsNameTable";

export default function Page({ params }: { params: { id: string } }) {
  const [accountDomainDetails, setAccountDomainDetails] = useState(null);
  const getAccountDomainDetailsById = async () => {
    const response = await getAccountDomainDetails(params.id);
    setAccountDomainDetails(response);
  };
  useEffect(() => {
    if (params.id) {
      getAccountDomainDetailsById();
    }
  }, [params]);

  if (!accountDomainDetails) return null;

  return (
    <div>
      <DetailsNameHeader accountDomainDetails={accountDomainDetails} />
      <DetailsNameTable />
    </div>
  );
}
