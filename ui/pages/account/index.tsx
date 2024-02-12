import classNames from "classnames";
import AccountContent from "../../components/organisms/accountConent/accountContent";
import Navigation from "../../components/organisms/navigation/navigation";
import style from "./index.module.css";
import { Table } from "../../components/organisms/table";
import { ScoringConfig } from "../../components/organisms/accountConent/constants";

export default function Account() {
  return (
    <div className={classNames(style.wrapper)}>
      <Navigation />
      <AccountContent />
    </div>
  );
}
