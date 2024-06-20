"use client";
import {
  accountAddress,
  amount,
  amountUSD,
  fees,
  rate,
} from "@/comman/constants";
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
import { PriceContent } from "./components";
import classNames from "classnames";
import { interSemiBold, manropeBold } from "@/app/fonts";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import { Modals } from "@/components/molecules/modals/modals.types";
import { DATA_STATUS, Routs } from "@/comman/types";
import { DomainForTable, DomainsForTable } from "./cartContent.types";
import { useRouter } from "next/navigation";
import { addMinaText, sliceName } from "@/helpers/name.helper";
import { useWallet } from "@/hooks";
import { useEffect, useState } from "react";
import { RadioGroup } from "@/components/molecules/radioGroup";
import { RadioGroupOption } from "@/components/molecules/radioGroup/radioGroup.types";

const CartContent = ({
  hasCardPayment,
}: {
  hasCardPayment?: boolean;
}): JSX.Element => {
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  const [initTab, setInitTab] = useState<number | string>(1);
  const {
    balance,
    actions: { onSendClick, onConnectWallet },
  } = useWallet();
  const router = useRouter();

  const isUSDTab = initTab === 2;
  const isInsufficientBalance = balance?.balance < amount;

  const {
    state: {
      bag,
      walletData: { accountId, connectMessage },
    },
    actions: { addPeriod, openModal, closeModal, clearBag, deleteFromBag },
  } = useStoreContext();

  const currentDomainsByAccount = bag?.[accountId]?.domains || [];

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

  const newDomains: DomainsForTable = currentDomainsByAccount
    .map((item) => {
      return {
        ...item,
        name: addMinaText(item.name),
        amount: Number(item.amount) * item.years * rate + " MINA",
        onClick: deleteReservedName,
        onCount: onCount,
      };
    })
    ?.reverse();

  const totalAmount = newDomains.reduce((acc, domain) => {
    return (acc += parseInt(domain.amount));
  }, 0);

  const handlePurchase = async (): Promise<void> => {
    setDisableNextBtn(true);
    if (isUSDTab) {
      console.log("credit card payment");
      return;
    }
    if (connectButton) {
      openModal(Modals.walletConnect, {
        connectMessage,
        onConnectWallet,
      });
      setDisableNextBtn(false);
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
              closeModal(Modals.transactionFailed);
              handlePurchase();
            },
          },
        });
      }
    } catch (error) {
    } finally {
    }
    setDisableNextBtn(false);
  };

  const options: RadioGroupOption[] = [
    { value: "1", label: "Mina" },
    {
      value: "2",
      label: (
        <span>
          Credit or debit card
          <span className={style.additionalFee}> (Additional fee)</span>
        </span>
      ),
    },
  ];

  const handleRadioChange = (value) => {
    setInitTab(Number(value));
  };

  const connectButton = !accountId && "Connect Wallet";
  const insufficientBalanceButton =
    isInsufficientBalance && "Insufficient Balance";
  const nextButton = "Next";

  const buttonText =
    (isUSDTab && nextButton) ||
    connectButton ||
    insufficientBalanceButton ||
    nextButton;

  useEffect(() => {
    if (isUSDTab && newDomains.length) {
      setDisableNextBtn(false);
      return;
    }
    setDisableNextBtn(
      !!(isInsufficientBalance && !connectButton) ||
        !!(!newDomains.length && !connectButton)
    );
  }, [initTab, isInsufficientBalance, connectButton, newDomains.length]);

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
          onTabChange={handleRadioChange}
          items={[
            {
              content: (
                <PriceContent
                  amount={newDomains.reduce((acc, domain) => {
                    return (acc += parseFloat(domain.amount));
                  }, 0)}
                  amountByYear={amount}
                  currency="MINA"
                />
              ),
              title: hasCardPayment ? "MINA" : "",
              value: 1,
            },
            ...(hasCardPayment
              ? [
                  {
                    content: (
                      <PriceContent
                        amount={newDomains.reduce((acc, domain) => {
                          return (acc += Number(
                            (amountUSD * domain.years).toFixed(2)
                          ));
                        }, 0)}
                        currency="USD"
                        amountByYear={amountUSD}
                      />
                    ),
                    title: "USD",
                    value: 2,
                  },
                ]
              : []),
          ]}
          initValue={initTab}
        />
        {hasCardPayment && (
          <div className={style.paymentMethod}>
            <div
              className={classNames(
                style.paymentMethodHeader,
                interSemiBold.className
              )}
            >
              Payment Method
            </div>
            <RadioGroup
              className={style.radioGroup}
              name="paymentMethod"
              options={options}
              defaultValue={initTab.toString()}
              onChange={handleRadioChange}
            />
          </div>
        )}
        <Button
          text={buttonText}
          variant={Variant.black}
          onClick={handlePurchase}
          disabled={disableNextBtn}
        />
      </div>
    </div>
  );
};

export default CartContent;
