import classNames from "classnames";
import { Navigation } from "../../components/organisms/navigation";
import { AccountContent } from "../../components/organisms/accountConent";

import style from "./index.module.css";

export default function Account() {
  return (
    <div className={classNames(style.wrapper)}>
      <Navigation />
      <AccountContent />
    </div>
  );
}
