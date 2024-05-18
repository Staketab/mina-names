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
import { addMinaText, sliceName } from "@/helpers/name.helper";

const CartContent = (): JSX.Element => {
  const {
    balance,
    actions: { onSendClick, onConnectWallet },
  } = useWallet();
  const router = useRouter();

  const isInsufficientBalance = balance?.balance < amount;

  const {
    state: {
      bag,
      walletData: { accountId, connectMessage },
    },
    actions: { addPeriod, openModal, closeModal, clearBag, deleteFromBag },
  } = useStoreContext();

  const currentDomainsByAccount = bag?.[accountId]?.domains || [];

  const connectButton = !accountId && "Connect Wallet";
  const insufficientBalanceButton =
    isInsufficientBalance && "Insufficient Balance";

  const deleteReservedName = async (value: DomainForTable): Promise<void> => {
    try {
      const response = await deleteName({ id: value.id });
      if (response.status === DATA_STATUS.SUCCESS) {
        deleteFromBag({ id: value?.id, key: accountId });
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
        addPeriod({ id: value.id, value: count, key: accountId });
      }
    } catch (error) {}
  };

  const newDomains: DomainsForTable = currentDomainsByAccount.map((item) => {
    return {
      ...item,
      name: addMinaText(item.name),
      amount: Number(item.amount) * item.years * rate + " MINA",
      onClick: deleteReservedName,
      onCount: onCount,
    };
  })?.reverse();

  const totalAmount = newDomains.reduce((acc, domain) => {
    return (acc += parseInt(domain.amount));
  }, 0);

  const handlePurchase = async (): Promise<void> => {
    if (connectButton) {
      openModal(Modals.walletConnect, {
        connectMessage,
        onConnectWallet,
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
            action: () => router.push(`${Routs.NAMES}/${accountId}`),
          },
        });
        const data = await reserveApplyName({
          txHash: response?.hash,
          ownerAddress: accountId,
          domains: newDomains.map(({ name, amount }) => {
            return {
              domainName: sliceName(name),
              amount: parseFloat(amount),
            };
          }),
        });
        if (data.status === DATA_STATUS.SUCCESS) {
          currentDomainsByAccount.forEach(({ id }) =>
            deleteFromBag({ id, key: accountId })
          );
          clearBag();
        }
      } else {
        openModal(Modals.transactionFailed, {
          header: "Transaction failed",
          text: "The Domain has not been purchased!",
          button: {
            text: "Try Again",
            action: () => {
              closeModal(Modals.transactionFailed)
              handlePurchase()
            } ,
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
