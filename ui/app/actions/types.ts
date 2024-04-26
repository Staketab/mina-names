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
};
