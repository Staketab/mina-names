import Image from "next/image";

import cardsIcon from "./img/cardsList.svg";
import listIcon from "./img/list.svg";

import style from "./index.module.css";
import classNames from "classnames";
import { useState } from "react";

export enum TypeView {
  CARD = "card",
  LIST = "list",
}

type SwitchViewProps = {
  onClick: (value: TypeView) => void;
  className?: string;
};

const SwitchView = ({ onClick, className }: SwitchViewProps) => {
  const [selectedType, setSelectedType] = useState<TypeView>(TypeView.CARD);
  const handleView = (type: TypeView): void => {
    setSelectedType(type);
    onClick?.(type);
  };

  return (
    <div className={classNames(style.wrapper, className)}>
      <div>
        <span
          className={classNames({
            [style.activeCard]: selectedType === TypeView.CARD,
          })}
          onClick={() => handleView(TypeView.CARD)}
        >
          <Image src={cardsIcon} alt="" />
        </span>
        <span
          className={classNames({
            [style.activeList]: selectedType === TypeView.LIST,
          })}
          onClick={() => handleView(TypeView.LIST)}
        >
          <Image src={listIcon} alt="" />
        </span>
      </div>
    </div>
  );
};

export default SwitchView;
