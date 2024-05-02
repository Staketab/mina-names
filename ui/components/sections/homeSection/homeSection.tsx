"use client";
import classNames from "classnames";
import { manropeSemiBold, wixMadeforDisplayExtraBold } from "@/app/fonts";
import { Input } from "@/components/atoms/input";
import { ResultItem } from "@/components/atoms/resultItem";
import { useState } from "react";
import { useKeyPress } from "@/hooks/useKeyPress";
import { checkReservedName } from "@/app/actions/clientActions";
import { InputVariant } from "@/components/atoms/input/types";

import style from "./index.module.css";
import { useStoreContext } from "@/store";
import { Modals } from "@/components/molecules/modals/modals.types";
import { DOMAIN_STATUS } from "@/comman/types";

const HomeSection = () => {
  const [statusName, setStatusName] = useState<{
    id: string | null;
    name: string;
    status: DOMAIN_STATUS;
  }>(null);
  const [value, setValue] = useState("");

  const handleInput = async (): Promise<void> => {
    const response = await checkReservedName(value);
    setStatusName({
      id: response.id,
      name: value,
      status: response.status,
    });
  };

  useKeyPress("Enter", handleInput);
  const handleChange = (value) => {
    const cleanInput = value.replace(/[^a-z0-9- ]/g, "");
    setValue(cleanInput);
    setStatusName({
      id: null,
      name: "",
      status: null,
    });
  };

  return (
    <div className={classNames(style.wrapper, "container")}>
      <div className={style.content}>
        <h1 className={wixMadeforDisplayExtraBold.className}>
          Reveal your true self
        </h1>
        <p className={manropeSemiBold.className}>
          A creative ID that showcases your personality
        </p>
        <Input
          placeholder="Search Names.mina"
          value={value}
          className={style.input}
          onChange={(e) => handleChange(e.target.value)}
          onSubmit={handleInput}
          variant={InputVariant.search}
          maxLength={30}
          enableClear
        />
        {statusName?.name && value && (
          <ResultItem statusName={statusName} className={style.resultItem} />
        )}
      </div>
    </div>
  );
};

export default HomeSection;
