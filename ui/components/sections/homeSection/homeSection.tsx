"use client";
import { Logo } from "@/components/atoms/logo";
import classNames from "classnames";

import style from "./index.module.css";
import { ConnectWalletButton } from "@/components/molecules/connectWalletButton";
import { interSemiBold } from "@/app/fonts";
import { Input } from "@/components/atoms/input";
import { ResultItem } from "@/components/atoms/resultItem";
import { InputVariant } from "@/components/atoms/input/input";
import { useState } from "react";
import { useKeyPress } from "@/hooks/useKeyPress";
import { checkName } from "@/app/actions";

const HomeSection = () => {
  const [response, setResponse] = useState(null);
  const [value, setValue] = useState("");
  const [resultContent, setResultContent] = useState({
    isShow: false,
    text: "",
  });

  const handleInput = async () => {
    const isShow = !!value;
    setResultContent({
      text: value,
      isShow: isShow,
    });
    const res = await checkName(value);
    const result = await res;
    setResponse(result);
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
        {response && (
          <ResultItem text={response.domainName} className={style.resultItem} />
        )}
      </div>
    </div>
  );
};

export default HomeSection;
