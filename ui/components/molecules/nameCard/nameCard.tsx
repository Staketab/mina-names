import Image from "next/image";
import { Button } from "../../atoms/button";

import style from "./index.module.css";
import { Variant } from "../../atoms/button/types";
import { interSemiBold } from "@/app/fonts";

type NameCardProps = {
  img: string;
  name: string;
};

const NameCard = ({ img, name }: NameCardProps): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <Image src={img} alt="" />
      <span className={interSemiBold.className}>{name}</span>
      <Button
        text="Manage"
        onClick={() => console.log("Manage")}
        variant={Variant.grey}
      />
    </div>
  );
};

export default NameCard;