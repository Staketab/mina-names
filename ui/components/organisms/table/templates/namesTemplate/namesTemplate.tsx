import Image from "next/image";
import defaultIcon from "../../../../../assets/default.svg";

import style from "../index.module.css";
import classNames from "classnames";
import { manropeSemiBold } from "@/app/fonts";
import { StaticEllipse } from "@/components/molecules/staticEllipse";
import { CopyIcon } from "@/components/atoms/copyIcon";
import { TableConfig } from "@/comman/types";

type NamesTemplateProps = {
  data: any;
  config: TableConfig;
};

const NamesTemplate = ({ data, config }: NamesTemplateProps) => {
  const value = data[config.fields.value];
  const imgUrl = data[config.fields.url];
  const view = config.view;
  const hiddenImg = config.hiddenImg;
  return (
    <div className={classNames(style.namesTemplate, manropeSemiBold.className)}>
      {!hiddenImg && (
        <Image src={imgUrl || defaultIcon} alt="" width={32} height={32} />
      )}
      <StaticEllipse
        style={config.style}
        className={manropeSemiBold.className}
        text={value}
        view={view || { sm: 8, md: 12, lg: 14 }}
      >
        <CopyIcon value={value} />
      </StaticEllipse>
    </div>
  );
};

export default NamesTemplate;
