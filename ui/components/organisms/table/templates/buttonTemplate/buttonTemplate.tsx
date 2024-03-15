import Link from "next/link";
import { Button } from "../../../../atoms/button";
import { Variant } from "../../../../atoms/button/types";

type ButtonTemplateProps = {
  data: any;
  config: {
    fields: {
      value: string;
      url: string;
      parentPage?: string;
    };
  };
};
const ButtonTemplate = ({ data, config }: ButtonTemplateProps) => {
  const buttonText = config.fields.value;
  const url = data[config.fields.url];
  const parentPage = config.fields.parentPage;
  if (url) {
    return (
      <Link href={`/${parentPage}/${url}`}>
        <Button variant={Variant.grey} text={buttonText} />
      </Link>
    );
  }
  return <Button variant={Variant.grey} text={buttonText} />;
};

export default ButtonTemplate;
