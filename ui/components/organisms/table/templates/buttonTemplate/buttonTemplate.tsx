"use client";
import Link from "next/link";
import { Button } from "../../../../atoms/button";
import { Variant } from "../../../../atoms/button/types";
import { DOMAIN_STATUS } from "@/comman/types";
import { Status } from "@/components/atoms/status";

import style from "./index.module.css";
import { ReactNode } from "react";

type ButtonTemplateProps = {
  data: any;
  config: {
    fields: {
      value: string;
      url: string;
      parentPage?: string;
      status?: string;
      onClick?: string;
      icon?: ReactNode;
    };
  };
};
const ButtonTemplate = ({ data, config }: ButtonTemplateProps) => {
  const buttonText = config.fields.value;
  const url = data[config.fields.url];
  const parentPage = config.fields.parentPage;
  const status = data[config.fields.status];
  const onClick = data[config.fields.onClick];

  const handleButton = (): void => {
    onClick?.();
  };

  if (status === DOMAIN_STATUS.PENDING) {
    return (
      <Status status={status} className={style.status} onClick={handleButton} />
    );
  }

  if (url) {
    return (
      <Link href={`/${parentPage}/${url}`}>
        <Button variant={Variant.grey} text={buttonText} />
      </Link>
    );
  }

  return (
    <Button variant={Variant.grey} text={buttonText} onClick={handleButton} />
  );
};

export default ButtonTemplate;
