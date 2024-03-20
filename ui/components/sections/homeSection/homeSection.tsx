"use client";
import { Logo } from "@/components/atoms/logo";
import classNames from "classnames";

import style from "./index.module.css";
import { ConnectWalletButton } from "@/components/molecules/connectWalletButton";
import { interMedium, interSemiBold } from "@/app/fonts";
import { Input } from "@/components/atoms/input";
import { ResultItem } from "@/components/atoms/resultItem";
import { useState } from "react";
import { useKeyPress } from "@/hooks/useKeyPress";
import { checkReservedName } from "@/app/actions/clientActions";
import { InputVariant } from "@/components/atoms/input/types";

const HomeSection = () => {
  const [statusName, setStatusName] = useState<{
    id: string | null;
    name: string;
  }>(null);
  const [value, setValue] = useState("");

  const handleInput = async () => {
    const response = await checkReservedName(value);
    setStatusName({
      id: response.id,
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
