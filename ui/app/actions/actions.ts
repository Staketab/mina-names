"use server";
import { DATA_STATUS, ORDER_BY, SORT_BY } from "@/comman/types";
import { DOMAIN_STATUS } from "@/comman/types";
import {
  AccountDomainDetailsResponse,
  ReserveNameResponse,
  ReserveNameProps,
  reserveApplyNameProps,
} from "./types";
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

  const res = await fetch(
    `${process.env.Non_NEXT_PUBLIC_API_URL}/domains/save`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
      },
    }
  );
  return await res.json();
}

/**
 * Fetches the list of domains associated with a specific account.
 *
 * @async
 * @function getAccountDomains
 * @param {Object} params - The parameters for fetching account domains.
 * @param {string} params.accountAddress - The address of the account.
 * @param {number} params.page - The page number for pagination.
 * @param {number} params.size - The number of domains per page.
 * @param {ORDER_BY} params.orderBy - The order by which to sort the results.
 * @param {SORT_BY} params.sortBy - The field by which to sort the results.
 * @param {DOMAIN_STATUS} [params.domainStatus] - The status of the domains to filter by (optional).
 * @returns {Promise<Object>} The JSON response from the API containing the list of domains.
 * @throws Will throw an error if the fetch request fails.
 */

export async function getAccountDomains({
  accountAddress,
  page,
  size,
  orderBy,
  sortBy,
  domainStatus,
}: {
  accountAddress: string;
  page: number;
  size: number;
  orderBy: ORDER_BY;
  sortBy: SORT_BY;
  domainStatus?: DOMAIN_STATUS;
}) {
  if (!accountAddress) return;
  const res = await fetch(
    `${
      process.env.Non_NEXT_PUBLIC_API_URL
    }/domains/accounts/${accountAddress}?page=${page}&size=${size}&orderBy=${orderBy}&sortBy=${sortBy}&domainStatus=${
      domainStatus || ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
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
    `${process.env.Non_NEXT_PUBLIC_API_URL}/domains/?page=${page}&size=${size}&orderBy=${orderBy}&sortBy=${sortBy}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
      },
    }
  );
  return await res.json();
}

export async function getDomainsMetadata(id: string) {
  const res = await fetch(
    `${process.env.Non_NEXT_PUBLIC_API_URL}/domains/${id}/reserved`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
      },
    }
  );
  return await res.json();
}

export async function checkReservedName(
  domainName: string
): Promise<{ id: string | null; status: DOMAIN_STATUS | null }> {
  const res = await fetch(
    `${process.env.Non_NEXT_PUBLIC_API_URL}/domains/${domainName}/reserved`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
      },
    }
  );

  return await res.json();
}

export async function getAccountDomainDetails(
  id: string
): Promise<AccountDomainDetailsResponse> {
  const res = await fetch(
    `${process.env.Non_NEXT_PUBLIC_API_URL}/domains/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
      },
    }
  );
  return await res.json();
}

export async function editDomainImg(payload: {
  id: string;
  img: string;
}): Promise<AccountDomainDetailsResponse> {
  const res = await fetch(
    `${process.env.Non_NEXT_PUBLIC_API_URL}/domains/edit`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
      },
      body: JSON.stringify(payload),
    }
  );
  return await res.json();
}

/**
 * Sets the default name for a domain by its ID.
 *
 * @param {string} id - The ID of the domain.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the operation was successful.
 */

export const setDefaultName = async (id: string): Promise<boolean> => {
  const res = await fetch(
    `${process.env.Non_NEXT_PUBLIC_API_URL}/domains/${id}/default`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
      },
    }
  );
  return await res.json();
};

/**
 * Removes the default name for a domain by its ID.
 *
 * @param {string} id - The ID of the domain.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the operation was successful.
 */

export const removeDefaultName = async (id: string): Promise<boolean> => {
  const res = await fetch(
    `${process.env.Non_NEXT_PUBLIC_API_URL}/domains/${id}/default/remove`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
      },
    }
  );
  return await res.json();
};

export async function reserveName(
  payload: ReserveNameProps
): Promise<ReserveNameResponse> {
  if (!payload) return;

  try {
    const res = await fetch(
      `${process.env.Non_NEXT_PUBLIC_API_URL}/domains/reserve`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const responseData = await res.json();
    return responseData;
  } catch (error) {}
}

export async function reserveApplyName({
  txHash,
  domains,
  ownerAddress,
}: reserveApplyNameProps): Promise<{ status: DATA_STATUS }> {
  if (!txHash) return;

  try {
    const res = await fetch(
      `${process.env.Non_NEXT_PUBLIC_API_URL}/domains/reserve/apply`,
      {
        method: "POST",
        body: JSON.stringify({ txHash, domains, ownerAddress }),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return {
      status: DATA_STATUS.SUCCESS,
    };
  } catch (error) {}
}

export async function deleteName({
  id,
}: {
  id: string;
}): Promise<{ status: DATA_STATUS }> {
  if (!id) return;
  try {
    const res = await fetch(
      `${process.env.Non_NEXT_PUBLIC_API_URL}/domains/reserve/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return {
      status: DATA_STATUS.SUCCESS,
    };
  } catch (error) {}
}

export async function changeExpirationTime(payload: {
  id: string;
  expirationTime: number;
  amount: number;
}): Promise<{ status: DATA_STATUS.SUCCESS }> {
  try {
    const res = await fetch(
      `${process.env.Non_NEXT_PUBLIC_API_URL}/domains/reserve`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return { status: DATA_STATUS.SUCCESS };
  } catch (error) {}
}

export async function zkCloudWorkerRequest(params: {
  command: string;
  task?: string;
  transactions?: string[];
  args?: string;
  metadata?: string;
  mode?: string;
  jobId?: string;
}) {
  const { command, task, transactions, args, metadata, mode, jobId } = params;
  const apiData = {
    auth: process.env.Non_NEXT_PUBLIC_ZKCLOUDWORKER_AUTH,
    command: command,
    jwtToken: process.env.Non_NEXT_PUBLIC_ZKCLOUDWORKER_JWR_TOKEN,
    data: {
      task,
      transactions: transactions ?? [],
      args,
      repo: "nameservice",
      developer: "@staketab",
      metadata,
      mode: mode ?? "sync",
      jobId,
    },
    chain: `devnet`,
  };
  const endpoint = process.env.Non_NEXT_PUBLIC_ZKCLOUDWORKER_ENDPOINT;

  const response = await axios.post(endpoint, apiData);
  return response.data;
}

export async function getActivities({
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
    `${process.env.Non_NEXT_PUBLIC_API_URL}/activities/${accountAddress}?page=${page}&size=${size}&orderBy=${orderBy}&sortBy=${sortBy}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
      },
    }
  );
  return await res.json();
}

export async function getDomainActivities({
  domainName,
  page,
  size,
  orderBy,
  sortBy,
}: {
  domainName: string;
  page: number;
  size: number;
  orderBy: ORDER_BY;
  sortBy: SORT_BY;
}) {
  if (!domainName) return;

  const res = await fetch(
    `${process.env.Non_NEXT_PUBLIC_API_URL}/activities/domain/${domainName}?page=${page}&size=${size}&orderBy=${orderBy}&sortBy=${sortBy}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.Non_NEXT_PUBLIC_API_KEY,
      },
    }
  );
  return await res.json();
}
