import { DOMAINS_STATUS } from "@/comman/types"

export type AccountDomainDetailsResponse = {
    id: string,
    ownerAddress: string,
    transaction: string,
    domainName: string,
    domainImg: string,
    amount: number,
    reservationTimestamp: number,
    expirationTime: number,
    startTimestamp: number,
    domainStatus: DOMAINS_STATUS,
    isSendToCloudWorker: boolean,
    isDefault: boolean
  }