import { interMedium } from "@/app/fonts";
import classNames from "classnames";

import style from "./index.module.css";

const Name = ({ name, className }: {name: string; className?: string}): JSX.Element => {
  return (
    <div className={classNames(interMedium.className, style.name, className)}>
      {name}
      <span>.mina</span>
    </div>
  );
};

export default Name;
