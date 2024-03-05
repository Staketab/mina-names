"use client";
import { Logo } from "@/components/atoms/logo";
import classNames from "classnames";

import style from "./index.module.css";
import { ConnectWalletButton } from "@/components/molecules/connectWalletButton";
import { interMedium, interSemiBold } from "@/app/fonts";
import { Input } from "@/components/atoms/input";
import { ResultItem } from "@/components/atoms/resultItem";
import { InputVariant } from "@/components/atoms/input/input";
import { useState } from "react";
import { useKeyPress } from "@/hooks/useKeyPress";
import { checkReservedName } from "@/app/actions/clientActions";

const HomeSection = () => {
  const [statusName, setStatusName] = useState<{
    isReserved: boolean;
    name: string;
  }>(null);
  const [value, setValue] = useState("");

  const handleInput = async () => {
    const response = await checkReservedName(value);
    setStatusName({
      isReserved: response,
      name: value,
    });
  };

  useKeyPress("Enter", handleInput);

  return (
    <div className={classNames(style.wrapper, "container")}>
      <div className={style.header}>
        <Logo />
        <ConnectWalletButton />
      </div>
      <div className={style.content}>
        <h1 className={interSemiBold.className}>Reveal Your True Self</h1>
        <p className={interMedium.className}>
          A creative ID that showcases your personality
        </p>
        <Input
          placeholder="Search .mina Names"
          value={value}
          className={style.input}
          onChange={(e) => setValue(e.target.value)}
          variant={InputVariant.search}
        />
        {statusName?.name && (
          <ResultItem statusName={statusName} className={style.resultItem} />
        )}
      </div>
    </div>
  );
};

export default HomeSection;
