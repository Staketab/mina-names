"use client";
import classNames from "classnames";
import { manropeSemiBold, wixMadeforDisplayExtraBold } from "@/app/fonts";
import { Input } from "@/components/atoms/input";
import { ResultItem } from "@/components/atoms/resultItem";
import { useEffect, useMemo, useState } from "react";
import { InputVariant } from "@/components/atoms/input/types";

import style from "./index.module.css";
import { DOMAIN_STATUS } from "@/comman/types";
import { debounceAsync } from "@/helpers/debounce.helper";
import { checkReservedName } from "@/app/actions/actions";
import AlertMessage from "@/components/atoms/alertMessage";

const HomeSection = () => {
  const [statusName, setStatusName] = useState<{
    id: string | null;
    name: string;
    status: DOMAIN_STATUS;
  }>(null);
  const [value, setValue] = useState("");
  const [isCorrectInput, setIsCorrectInput] = useState<boolean>(false);

  const handleInput = async (asyncValue: string): Promise<any> => {
    const currentValue = typeof asyncValue === "string" ? asyncValue : value;
    if (currentValue) {
      const response = await checkReservedName(currentValue);

      return response;
    }
  };
  const debouncedServerFetch = useMemo(
    () => debounceAsync(handleInput, 1000),
    []
  );

  const clearInput = (): void => {
    setValue("");
  };

  const handleChange = async (value: string) => {
    const regex = /^[a-z0-9-]*$/;
    const isValid =
      regex.test(value) &&
      value === value.trim() &&
      value === value.toLocaleLowerCase();
    setIsCorrectInput(isValid);
    setValue(value);

    try {
      if (!value || !isValid) return;
      const result = await debouncedServerFetch(value);

      if (result === "skipped") {
        return;
      }

      if (result) {
        setStatusName({
          id: result.id,
          name: `${value}`,
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
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          onSubmit={handleInput}
          variant={InputVariant.search}
          maxLength={25}
          enableClear
        />
        {isCorrectInput && statusName?.name && value && (
          <ResultItem
            statusName={statusName}
            className={style.resultItem}
            clearInput={clearInput}
          />
        )}
        {!isCorrectInput && value && (
          <AlertMessage
            noIcon
            type="error"
            text={`Invalid characters in the name. Allowed characters are a-z, 0-9, and
            - as long as it doesn’t appear at the beginning or end of the
            string.`}
            className={style.alertMessage}
          />
        )}
      </div>
    </div>
  );
};

export default HomeSection;
