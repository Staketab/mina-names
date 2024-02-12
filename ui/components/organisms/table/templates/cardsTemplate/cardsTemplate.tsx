import React from "react";
import classNames from "classnames";

import styles from "../index.module.css";

type CardsTemplateProps = {
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

const CardsTemplate = ({ data, config }: CardsTemplateProps) => {
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
    <div className={classNames("t-inter-medium", styles.stringTemplate)}>
      sdfkjsdnjfm
    </div>
  );
};

export default CardsTemplate;
