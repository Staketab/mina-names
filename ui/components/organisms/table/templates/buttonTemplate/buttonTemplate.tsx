import { Button } from "../../../../atoms/button";
import { Variant } from "../../../../atoms/button/types";

type ButtonTemplateProps = {
  data: any;
  config: {
    fields: {
      value: string;
      url: string;
    };
  };
};
const ButtonTemplate = ({ data, config }: ButtonTemplateProps) => {
  const buttonText = config.fields.value;
  return <Button variant={Variant.grey} text={buttonText} />;
};

export default ButtonTemplate;
