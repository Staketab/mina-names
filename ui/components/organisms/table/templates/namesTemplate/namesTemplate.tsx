import Image from "next/image";
import defaultIcon from '../../../../../assets/logo.svg'

import style from "../index.module.css";
import classNames from "classnames";
import { interMedium } from "@/app/fonts";

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
    <div className={classNames(style.namesTemplate, interMedium.className)}>
      <Image src={imgUrl || defaultIcon} alt="" width={32} height={32}/>
      {value}
    </div>
  );
};

export default NamesTemplate;
