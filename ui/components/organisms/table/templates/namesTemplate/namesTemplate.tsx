import Image from "next/image";
import defaultIcon from "../../../../../assets/default.svg";

import style from "../index.module.css";
import classNames from "classnames";
import { manropeSemiBold } from "@/app/fonts";
import { StaticEllipse } from "@/components/molecules/staticEllipse";
import { CopyIcon } from "@/components/atoms/copyIcon";
import { TableConfig } from "@/comman/types";
import TruncateText from "@/components/molecules/truncateText";

type NamesTemplateProps = {
  data: any;
  config: TableConfig;
};

const NamesTemplate = ({ data, config }: NamesTemplateProps) => {
  const hash = data[config.fields.hash];
  const name = data[config.fields.value];
  const imgUrl = data[config.fields.url];
  const view = config.view;
  const hiddenImg = config.hiddenImg;
  return (
    <div className={classNames(style.namesTemplate, manropeSemiBold.className)}>
      {!hiddenImg && (
        <Image src={imgUrl || defaultIcon} alt="" width={32} height={32} />
      )}
      <div style={config.style}>
        <TruncateText>{name}</TruncateText>
        {hash && (
          <StaticEllipse
            style={config.style}
            className={manropeSemiBold.className}
            text={hash}
            view={view || { sm: 8, md: 12, lg: 14 }}
          >
            <CopyIcon value={hash} />
          </StaticEllipse>
        )}
      </div>
    </div>
  );
};

export default NamesTemplate;
