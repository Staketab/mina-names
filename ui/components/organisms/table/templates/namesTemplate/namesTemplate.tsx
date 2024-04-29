import Image from "next/image";
import defaultIcon from "../../../../../assets/default.svg";

import style from "../index.module.css";
import classNames from "classnames";
import { manropeSemiBold } from "@/app/fonts";

type NamesTemplateProps = {
  data: any;
  config: {
    fields: {
      value: string;
      url: string;
    };
  };
};

const NamesTemplate = ({ data, config }: NamesTemplateProps) => {
  const value = data[config.fields.value];
  const imgUrl = data[config.fields.url];

  return (
    <div className={classNames(style.namesTemplate, manropeSemiBold.className)}>
      <Image src={defaultIcon} alt="" width={32} height={32} />
      {value}
    </div>
  );
};

export default NamesTemplate;
