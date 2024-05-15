"use client";
import { accountAddress, amount, fees, rate } from "@/comman/constants";
import { Table } from "../table";
import { tableConfig } from "./constants";
import { TypeView } from "@/components/atoms/switchView/switchView";
import style from "./index.module.css";
import { useStoreContext } from "@/store";
import {
  changeExpirationTime,
  deleteName,
  reserveApplyName,
} from "@/app/actions/actions";
import { TABS_VARIANT, Tabs } from "@/components/molecules/tabs";
import { MinaContent } from "./components/minaContent";
import classNames from "classnames";
import { manropeBold } from "@/app/fonts";
import { Button } from "@/components/atoms/button";
import useWallet from "@/hooks/useWallet";
import { Variant } from "@/components/atoms/button/types";
import { Modals } from "@/components/molecules/modals/modals.types";
import { DATA_STATUS, Routs } from "@/comman/types";
import { DomainForTable, DomainsForTable } from "./cartContent.types";
import { useRouter } from "next/navigation";
import getWalletConfig from "@/components/molecules/connectWalletButton/hellper";

const CartContent = (): JSX.Element => {
  const {
    balance,
    connectMessage,
    actions: { onSendClick, onConnectWallet },
  } = useWallet();
  const router = useRouter();

  const isInsufficientBalance = balance?.balance < amount;

  const {
    state: {
      bag: { domains },
      walletData: { accountId },
    },
    actions: { deleteFromBag, addPeriod, openModal, clearBag },
  } = useStoreContext();

  const connectButton = !accountId && "Connect Wallet";
  const insufficientBalanceButton =
    isInsufficientBalance && "Insufficient Balance";

  const deleteReservedName = async (value: DomainForTable): Promise<void> => {
    try {
      const response = await deleteName({ id: value.id });
      if (response.status === DATA_STATUS.SUCCESS) {
        deleteFromBag(value?.id);
      }
    } catch (error) {}
  };

  const onCount = async (
    value: DomainForTable,
    count: number
  ): Promise<void> => {
    try {
      const response = await changeExpirationTime({
        id: value.id,
        expirationTime: count,
        amount: count * amount,
      });
      if (response.status === DATA_STATUS.SUCCESS) {
        addPeriod(value.id, count);
      }
    } catch (error) {}
  };

  const newDomains: DomainsForTable = domains.map((item) => {
    return {
      ...item,
      amount: Number(item.amount) * item.years * rate + " MINA",
      onClick: deleteReservedName,
      onCount: onCount,
    };
  });

  const totalAmount = newDomains.reduce((acc, domain) => {
    return (acc += parseInt(domain.amount));
  }, 0);

  const handlePurchase = async (): Promise<void> => {
    if (connectButton) {
      const walletName = accountId ? "Auro Wallet" : null;
      openModal(Modals.walletConnect, {
        walletName: walletName,
        connected: !!accountId,
        rejected: connectMessage === "user reject",
        connectFunction: onConnectWallet,
        list: getWalletConfig(),
        keyID: "walletConnectPopUp",
        zIndex: 52,
      });
      return;
    }
    try {
      await onConnectWallet();
      const response = await onSendClick({
        amount: totalAmount,
        to: accountAddress,
        fee: fees.default,
      });
      if (response?.hash) {
        openModal(Modals.transactionApplied, {
          header: "Transaction applied",
          text: "The Domain was successfully purchased!",
          button: {
            text: "See Domains",
            action: () => router.push(Routs.NAMES),
          },
        });
        const data = await reserveApplyName({
          txHash: response?.hash,
          ownerAddress: accountId,
          domains: newDomains.map(({ name, amount }) => {
            return {
              domainName: name,
              amount: parseFloat(amount),
            };
          }),
        });
        if (data.status === DATA_STATUS.SUCCESS) {
          domains.forEach(({ id }) => deleteFromBag(id));
          clearBag();
        }
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
    } catch (error) {}
  };

  return (
    <div className={style.wrapper}>
      <div>
        <Table
          data={{
            content: newDomains,
          }}
          config={tableConfig}
          isLoading={false}
          typeView={TypeView.LIST}
          isHiddenPagination
        />
      </div>
      <div className={style.summary}>
        <div className={classNames(style.summaryHeader, manropeBold.className)}>
          Order Summary
        </div>
        <Tabs
          className={style.tabs}
          variant={TABS_VARIANT.blackButton}
          items={[
            {
              content: (
                <MinaContent
                  amount={newDomains.reduce((acc, domain) => {
                    return (acc += parseInt(domain.amount));
                  }, 0)}
                />
              ),
              title: "",
              value: 1,
            },
          ]}
          initValue={1}
        />
        <Button
          text={connectButton || insufficientBalanceButton || "Next"}
          variant={Variant.black}
          onClick={handlePurchase}
          disabled={
            !!(isInsufficientBalance && !connectButton) ||
            !!(!newDomains.length && !connectButton)
          }
        />
      </div>
    </div>
  );
};

export default CartContent;
