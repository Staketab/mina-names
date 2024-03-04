import React from "react";
import classNames from "classnames";

import styles from "../index.module.css";
import { interMedium } from "@/app/fonts";

type StringTemplateProps = {
  data: any;
  config: {
    fields: {
      value: string;
      tooltipFromData?: string;
      tooltipText?: string;
      func: (value: string) => void;
      prefix?: string;
      postfix?: string;
      additionValue?: string;
    };
  };
};

const StringTemplate = ({ data, config }: StringTemplateProps) => {
  const value = data[config.fields?.value];
  const prefix = config.fields?.prefix;
  const postfix = config.fields?.postfix;
  const additionValue =
    data[config.fields?.additionValue] || config.fields?.additionValue;
  const valFunc = config.fields?.func;
  const hideValues = ["wrong", "invalid"];

  const isShowDash =
    (typeof value === "string" &&
      hideValues.includes(String(value).toLowerCase())) ||
    value === null;

  return (
    <div className={classNames(interMedium.className, styles.stringTemplate)}>
      {isShowDash ? (
        "-"
      ) : (
        <>
          {prefix}
          {!valFunc ? value : valFunc(value)}
          {postfix}
          {additionValue && (
            <span className={styles.stringTemplateAdionValue}>
              {additionValue}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default StringTemplate;
