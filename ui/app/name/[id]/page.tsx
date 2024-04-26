"use client";

import { editDomainImg, getAccountDomainDetails } from "@/app/actions/actions";
import { useEffect, useState } from "react";

import DetailsNameInfo from "@/components/organisms/detailsNameInfo/detailsNameInfo";
import DetailsNameTable from "@/components/organisms/detailsNameTable/detailsNameTable";
import { AccountDomainDetailsResponse } from "@/app/actions/types";

export default function Page({ params }: { params: { id: string } }) {
  const [accountDomainDetails, setAccountDomainDetails] =
    useState<AccountDomainDetailsResponse>(null);

  const getAccountDomainDetailsById = async () => {
    const response = await getAccountDomainDetails(params.id);
    setAccountDomainDetails(response);
  };

  const editImg = async (ipfsHash: string) => {
    const response = await editDomainImg({
      img: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      id: params.id,
    });
    setAccountDomainDetails(response);
  };

  useEffect(() => {
    if (params.id) {
      getAccountDomainDetailsById();
    }
  }, [params]);

  if (!accountDomainDetails) return null;

  return (
    <div className="container">
      <DetailsNameInfo
        accountDomainDetails={accountDomainDetails}
        editImg={editImg}
      />
      <DetailsNameTable />
    </div>
  );
}
