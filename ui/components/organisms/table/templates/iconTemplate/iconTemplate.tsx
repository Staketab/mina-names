import Image from "next/image";
import style from "./index.module.css";

type IconTemplateProps = {
  data: any;
  config: {
    fields: {
      onClick?: string;
      icon: string;
    };
  };
};
const IconTemplate = ({ data, config }: IconTemplateProps): JSX.Element => {
  const onClick = data[config.fields.onClick];
  const Icon = config.fields.icon;

  const handleButton = (): void => {
    onClick?.(data);
  };

  if (typeof Icon === "function") {
    // @ts-ignore
    return <Icon />;
  }

  return (
    <Image src={Icon} onClick={handleButton} alt="" className={style.icon} />
  );
};

export { IconTemplate };
