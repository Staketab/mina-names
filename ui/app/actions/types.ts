import { DOMAIN_STATUS } from "@/comman/types";

export type AccountDomainDetailsResponse = {
  id: string;
  ownerAddress: string;
  transaction: string;
  domainName: string;
  domainImg: string;
  amount: number;
  reservationTimestamp: number;
  expirationTime: number;
  startTimestamp: number;
  domainStatus: DOMAIN_STATUS;
  isSendToCloudWorker: boolean;
  isDefault: boolean;
  endTimestamp: number;
  ipfs: string;
  oldMetadata: {
    description?: string;
    discord?: string;
    domainMetadata: string;
    email?: string;
    github?: string;
    ipfsImg?: string;
    telegram?: string;
    website?: string;
    xtwitter?: string;
  };
};

export type ReserveNameProps = {
  ownerAddress: string;
  domainName: string;
  expirationTime: number;
  amount: number;
};

export type ReserveNameResponse = {
  id: string;
  ownerAddress: string;
  transaction: string;
  domainName: string;
  domainImg?: string;
  amount: number;
  reservationTimestamp: number;
  expirationTime: number;
  startTimestamp: number;
  endTimestamp: number;
  domainStatus: string;
  isSendToCloudWorker: boolean;
  isDefault: boolean;
};

export type reserveApplyNameProps = {
  txHash: string;
  ownerAddress: string;
  domains: {
    domainName: string;
    amount: number;
  }[];
};
