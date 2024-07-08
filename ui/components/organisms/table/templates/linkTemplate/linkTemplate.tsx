import Link from "next/link";
import { FC } from "react";

import style from "./index.module.css";
import TruncateText from "@/components/molecules/truncateText";

type LinkTemplateProps = {
  data: any;
  config: {
    fields: {
      link: string;
      value: string;
    };
  };
};
const LinkTemplate: FC<LinkTemplateProps> = ({ data, config }) => {
  const link = data[config.fields.link];
  const value = data[config.fields.value];

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
