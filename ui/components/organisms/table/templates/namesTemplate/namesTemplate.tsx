import Image from "next/image";

import style from "../index.module.css";
import classNames from "classnames";

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
    <div className={classNames(style.namesTemplate, "t-inter-medium")}>
      <Image src={imgUrl} alt="" />
      {value}
    </div>
  );
};

export default NamesTemplate;
