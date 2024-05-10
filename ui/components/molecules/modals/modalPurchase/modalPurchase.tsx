"use client";
import classNames from "classnames";

import style from "./index.module.css";
import { interSemiBold, manropeBold } from "@/app/fonts";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import React, { useState } from "react";
import useWallet from "@/hooks/useWallet";
import { saveName } from "@/app/actions/actions";
import { accountAddress, fees } from "@/comman/constants";
import Image from "next/image";
import plusIcon from "../../../../assets/plus.svg";
import minusIcon from "../../../../assets/minus.svg";
import { MinaContent } from "./tabContents";
import { useStoreContext } from "@/store";
import { Modals } from "../modals.types";
import { TABS_VARIANT, Tabs } from "../../tabs";

import { useRouter } from "next/navigation";
import { Routs } from "@/comman/types";

type ModalPurchaseProps = {
  name: string;
};

const ModalPurchase = ({ name }: ModalPurchaseProps): JSX.Element => {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(1);
  const {
    state: {
      walletData: { accountId },
    },
    actions: { openModal, closeModal },
  } = useStoreContext();
  const router = useRouter();

  const maxPeriod = 3;
  const minPeriod = 1;
  const amount = 1;

  const {
    balance,
    actions: { onSendClick },
  } = useWallet();

  const isInsufficientBalance = balance.balance < amount;

  const increment = (): void => {
    if (selectedPeriod === maxPeriod) return;
    setSelectedPeriod(selectedPeriod + 1);
  };

  const decrement = (): void => {
    if (selectedPeriod === minPeriod) return;
    setSelectedPeriod(selectedPeriod - 1);
  };

  const handlePurchase = async (): Promise<void> => {
    await await onSendClick({
      amount: amount,
      to: accountAddress,
      fee: fees.default,
    })
      .then((data) => {
        closeModal();
        if (data?.hash) {
          (async () => {
            await saveName({
              name,
              amount,
              ownerAddress: accountId,
              txHash: data?.hash,
              expirationTime: selectedPeriod,
            });
          })();
          openModal(Modals.transactionApplied, {
            header: "Transaction applied",
            text: "The Domain was successfully purchased!",
            button: {
              text: "See Domains",
              action: () => router.push(Routs.NAMES),
            },
          });
        } else {
          openModal(Modals.transactionFailed, {
            header: "Transaction failed",
            text: "The Domain has not been purchased!",
            button: {
              text: "Try Again",
              action: handlePurchase,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.wrapper}>
      <div className={classNames(style.header, manropeBold.className)}>
        {name}.mina
      </div>
      <div className={classNames(style.periodWrapper, interSemiBold.className)}>
        <span
          className={classNames(style.minus, {
            [style.disableActionIcon]: selectedPeriod === minPeriod,
          })}
          onClick={decrement}
        >
          <Image src={minusIcon} alt="" />
        </span>
        <div className={manropeBold.className}>{selectedPeriod} year</div>
        <span
          className={classNames(style.plus, {
            [style.disableActionIcon]: selectedPeriod === maxPeriod,
          })}
          onClick={increment}
        >
          <Image src={plusIcon} alt="" />
        </span>
      </div>
      <Tabs
        className={style.tabs}
        variant={TABS_VARIANT.blackButton}
        items={[
          {
            content: <MinaContent amount={amount} />,
            title: "MINA",
            value: 1,
          },
        ]}
        initValue={1}
      />
      <Button
        text={isInsufficientBalance ? "Insufficient Balance" : "Next"}
        variant={Variant.black}
        onClick={handlePurchase}
        disabled={isInsufficientBalance}
      />
    </div>
  );
};

export default React.memo(ModalPurchase);
