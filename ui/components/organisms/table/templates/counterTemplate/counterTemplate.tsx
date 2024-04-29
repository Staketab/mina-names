import Image from "next/image";
import pluseIcon from "../../../../../assets/plus.svg";
import minusIcon from "../../../../../assets/minus.svg";

import style from "./index.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { manropeSemiBold } from "@/app/fonts";

type CounterTemplateProps = {
  data: any;
  config: {
    fields: {
      onClick: string;
    };
  };
};

const CounterTemplate = ({
  data,
  config,
}: CounterTemplateProps): JSX.Element => {
  const onClick = data[config.fields.onClick];
  const [count, setCount] = useState<number>(1);

  const increment = (): void => {
    if (count === 3) return;
    setCount(count + 1);
  };
  const decrement = (): void => {
    if (count === 1) return;
    setCount(count - 1);
  };

  useEffect(() => {
    onClick?.(data, count);
  }, [count]);
  return (
    <div className={classNames(style.wrapper, manropeSemiBold.className)}>
      <Image src={minusIcon} alt="minus" onClick={decrement} />
      <span>{count}</span>
      <Image src={pluseIcon} alt="plus" onClick={increment} />
    </div>
  );
};
export { CounterTemplate };
