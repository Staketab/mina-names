import classNames from "classnames";
import PopupOverlay from "../../popupOverlay";

import style from "./index.module.css";
import { interBold, interMedium, interSemiBold } from "@/app/fonts";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import { useEffect, useState } from "react";
import useWallet from "@/hooks/useWallet";
import { saveName } from "@/app/actions/actions";
import { accountAddress, fees } from "@/comman/constants";

type ModalPurchaseProps = {
  name: string;
  open: boolean;
  onClose: () => void;
};

const ModalPurchase = ({
  open,
  onClose,
  name,
}: ModalPurchaseProps): JSX.Element => {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(1);

  const maxPeriod = 3;
  const minPeriod = 1;
  const amount = selectedPeriod * 20;

  const {
    balance,
    sendResultMessage,
    accountId,
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
    await onSendClick({
      amount: amount,
      to: accountAddress,
      fee: fees.default,
    });
  };

  useEffect(() => {
    if (sendResultMessage?.hash) {
      (async () => {
        await saveName({
          name,
          amount,
          ownerAddress: accountId[0],
          txHash: sendResultMessage.hash,
          expirationTime: selectedPeriod,
        });
      })();
    }
  }, [sendResultMessage?.hash]);

  return (
    <PopupOverlay
      position="center"
      animation="appear"
      onClose={onClose}
      show={open}
    >
      <div className={style.wrapper}>
        <div className={classNames(style.header, interMedium.className)}>
          {name}
          <span>.mina</span>
        </div>
        <div
          className={classNames(style.periodWrapper, interSemiBold.className)}
        >
          <span
            className={classNames(style.minus, {
              [style.disableActionIcon]: selectedPeriod === minPeriod,
            })}
            onClick={decrement}
          >
            -
          </span>
          <div className={interMedium.className}>{selectedPeriod} year</div>
          <span
            className={classNames(style.plus, {
              [style.disableActionIcon]: selectedPeriod === maxPeriod,
            })}
            onClick={increment}
          >
            +
          </span>
        </div>
        <div
          className={classNames(style.costInformation, interMedium.className)}
        >
          <div>
            <span>1 year registration</span>
            <span className={interSemiBold.className}>{amount} MINA</span>
          </div>
          <div>
            <span>Est. network fee</span>
            <span className={interSemiBold.className}>0.00000312 MINA</span>
          </div>
          <div>
            <span className={classNames(style.totalText, interBold.className)}>
              Estimated Total
            </span>
            <span className={interSemiBold.className}>10.00000312 MINA</span>
          </div>
        </div>
        <Button
          text={isInsufficientBalance ? "Insufficient Balance" : "Purchase"}
          variant={Variant.blue}
          onClick={handlePurchase}
          disabled={isInsufficientBalance}
        />
      </div>
    </PopupOverlay>
  );
};

export default ModalPurchase;
