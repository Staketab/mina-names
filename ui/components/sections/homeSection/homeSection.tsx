"use client";
import classNames from "classnames";
import { manropeSemiBold, wixMadeforDisplayExtraBold } from "@/app/fonts";
import { Input } from "@/components/atoms/input";
import { ResultItem } from "@/components/atoms/resultItem";
import { useMemo, useState } from "react";
import { InputVariant } from "@/components/atoms/input/types";

import style from "./index.module.css";
import { DOMAIN_STATUS } from "@/comman/types";
import { debounceAsync } from "@/helpers/debounce.helper";
import { checkReservedName } from "@/app/actions/actions";

const HomeSection = () => {
  const [statusName, setStatusName] = useState<{
    id: string | null;
    name: string;
    status: DOMAIN_STATUS;
  }>(null);
  const [value, setValue] = useState("");

  const handleInput = async (asyncValue: string): Promise<any> => {
    const currentValue = typeof asyncValue === "string" ? asyncValue : value;
    const response = await checkReservedName(currentValue);

    return response;
  };
  const debouncedServerFetch = useMemo(
    () => debounceAsync(handleInput, 1000),
    []
  );

  const clearInput = (): void => {
    setValue("");
  };

  const handleChange = async (value) => {
    const cleanInput = value.replace(/[^a-z0-9- ]/g, "");
    setValue(cleanInput);

    try {
      if (!cleanInput) return;
      const result = await debouncedServerFetch(`${cleanInput}.mina`);

      if (result === "skipped") {
        return;
      }

      if (result) {
        setStatusName({
          id: result.id,
          name: `${cleanInput}.mina`,
          status: result.status,
        });
      }
    } catch (error) {}
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
          <ResultItem
            statusName={statusName}
            className={style.resultItem}
            clearInput={clearInput}
          />
        )}
      </div>
    </div>
  );
};

export default HomeSection;
