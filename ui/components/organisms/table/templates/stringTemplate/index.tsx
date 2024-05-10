import React from "react";
import classNames from "classnames";

import styles from "../index.module.css";
import { manropeSemiBold } from "@/app/fonts";
import { TableConfig } from "@/comman/types";
import TruncateText from "@/components/molecules/truncateText";

type StringTemplateProps = {
  data: any;
  config: TableConfig;
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
    <div
      className={classNames(manropeSemiBold.className, styles.stringTemplate)}
      style={config.style}
    >
      {isShowDash ? (
        "-"
      ) : (
        <>
          {prefix}
          <TruncateText>{!valFunc ? value : valFunc(value)}</TruncateText>
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
