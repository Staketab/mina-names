"use client";
import classNames from "classnames";

import style from "./index.module.css";
import { Navigation } from "@/components/organisms/navigation";
import { AccountContent } from "@/components/organisms/accountConent";
export default function Page() {
  return (
    <div className={classNames(style.wrapper)}>
      <Navigation />
      <AccountContent />
    </div>
  );
}
