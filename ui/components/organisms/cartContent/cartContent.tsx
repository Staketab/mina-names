"use client";
import { accountAddress, amount, bag, fees, rate } from "@/comman/constants";
import { Table } from "../table";
import { tableConfig } from "./constants";
import { TypeView } from "@/components/atoms/switchView/switchView";
import style from "./index.module.css";
import { useStoreContext } from "@/store";
import { deleteName, reserveApplyName } from "@/app/actions/actions";
import { TABS_VARIANT, Tabs } from "@/components/molecules/tabs";
import { MinaContent } from "./components/minaContent";
import classNames from "classnames";
import { manropeBold } from "@/app/fonts";
import { Button } from "@/components/atoms/button";
import useWallet from "@/hooks/useWallet";
import { Variant } from "@/components/atoms/button/types";
import { Modals } from "@/components/molecules/modals/modals.types";

const CartContent = (): JSX.Element => {
  const {
    balance,
    accountId,
    actions: { onSendClick },
  } = useWallet();

  const isInsufficientBalance = balance.balance < amount;

  const {
    state: {
      bag: { domains },
    },
    actions: { deleteFromBag, addPeriod, openModal },
  } = useStoreContext();

  const handleIcon = async (value) => {
    try {
      await deleteName(value?.id);
      deleteFromBag(value?.id);
    } catch (error) {}
  };

  const onCount = (value, count) => {
    addPeriod(value?.id, count);
  };

  const newDomains = domains.map((item) => {
    return {
      ...item,
      amount: Number(item.amount) * item.years * rate + " MINA",
      onClick: handleIcon,
      onCount: onCount,
    };
  });

  const totalAmount = newDomains.reduce((acc, domain) => {
    return (acc += parseInt(domain.amount));
  }, 0);

  const handlePurchase = async (): Promise<void> => {
    await onSendClick({
      amount: totalAmount,
      to: accountAddress,
      fee: fees.default,
    })
      .then((data) => {
        if (data?.hash) {
          reserveApplyName({
            txHash: data?.hash,
            ownerAddress: accountId[0],
            domains: domains.map(({ name, amount }) => {
              return {
                domainName: name,
                amount: Number(amount) * rate,
              };
            }),
          }).then(() => {
            openModal(Modals.transactionApplied);
            domains.forEach(({ id }) => deleteFromBag(id));
          });
        } else {
          openModal(Modals.transactionFailed, {
            tryAgain: handlePurchase,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
    </div>
  );
};

export default CartContent;
