import { interSemiBold } from "@/app/fonts";
import classNames from "classnames";

import style from "./index.module.css";

const SubHeader = ({
  header,
  className,
}: {
  header: string;
  className?: string;
}): JSX.Element => {
  return (
    <div className={classNames(interSemiBold.className, style.subHeader,className)}>
      {header}
    </div>
  );
};

export default SubHeader;
