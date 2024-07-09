import Link from "next/link";
import { FC } from "react";

import style from "./index.module.css";
import TruncateText from "@/components/molecules/truncateText";
import StringTemplate from "../stringTemplate";
import { TableConfig } from "@/comman/types";

type LinkTemplateProps = {
  data: any;
  config: TableConfig;
};
const LinkTemplate: FC<LinkTemplateProps> = (props) => {
  const { data, config } = props;
  const link = data[config.fields.link];
  const value = data[config.fields.value];

  if (value && !link) {
    return <StringTemplate {...props}/>;
  }

  return (
    <>
      {link && value ? (
        <Link href={link} className={style.link}>
          <TruncateText>{value}</TruncateText>
        </Link>
      ) : (
        "-"
      )}
    </>
  );
};

export default LinkTemplate;
