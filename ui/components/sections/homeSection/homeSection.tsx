"use client";
import { Logo } from "@/components/atoms/logo";
import classNames from "classnames";

import style from "./index.module.css";
import { ConnectWalletButton } from "@/components/molecules/connectWalletButton";
import { interSemiBold } from "@/app/fonts";
import { Input } from "@/components/atoms/input";
import { ResultItem } from "@/components/atoms/resultItem";
import { InputVariant } from "@/components/atoms/input/input";
import { useRef, useState } from "react";
import { useKeyPress } from "@/hooks/useKeyPress";
import { checkName, checkReservedName } from "@/app/actions";

const HomeSection = () => {
  const [statusName, setStatusName] = useState<{
    isReserved: boolean;
    name: string;
  }>(null);
  const [value, setValue] = useState("");
  const [resultContent, setResultContent] = useState({
    isShow: false,
    text: "",
  });
  const ref = useRef();

  const handleInput = async () => {
    const isShow = !!value;
    setResultContent({
      text: value,
      isShow: isShow,
    });
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
        <p className="t-inter-medium">
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
