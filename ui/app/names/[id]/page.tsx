"use client";
import classNames from "classnames";

import style from "../index.module.css";
import { AccountContent } from "@/components/organisms/accountConent";

export default function Page() {
  return (
    <div className={classNames(style.wrapper, "container")}>
      <AccountContent />
    </div>
  );
}
