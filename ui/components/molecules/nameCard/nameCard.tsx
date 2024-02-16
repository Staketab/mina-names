import Image from "next/image";
import { Button } from "../../atoms/button";

import style from "./index.module.css";
import { Variant } from "../../atoms/button/types";

type NameCardProps = {
  img: string;
  name: string;
};

const NameCard = ({ img, name }: NameCardProps): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <Image src={img} alt="" />
      <span className="t-inter-semi-bold">{name}</span>
      <Button
        text="Manage"
        onClick={() => console.log("Manage")}
        variant={Variant.grey}
      />
    </div>
  );
};

export default NameCard;
