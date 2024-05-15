import { useState, useEffect } from "react";

export type Balance = {
  balance: number;
  balanceUsd: number;
};

const useAddressBalance = (address): Balance  => {
  const [balance, setBalance] = useState<Balance>(null);

  const getBalance = async (address): Promise<void> => {
    try {
      fetch(
        `https://minascan.io/qanet/api/api/core/accounts/${address}/balance`
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          setBalance(data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    if (address) {
      getBalance(address);
    }
  }, [address]);

  return balance;
};

export default useAddressBalance;
