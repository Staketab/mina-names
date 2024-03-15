import Image from "next/image";
import { Button } from "../../atoms/button";

import style from "./index.module.css";
import { Variant } from "../../atoms/button/types";
import { interSemiBold } from "@/app/fonts";
import blur from "../../../assets/blur.jpg";

import Link from "next/link";
import { encode } from "js-base64";
import { Routs } from "@/comman/types";

type NameCardProps = {
  img: string;
  name: string;
  id: string;
};

const NameCard = ({ img, name, id }: NameCardProps): JSX.Element => {
const base64Data = encode('../../../assets/blur.jpg');
  return (
    <div className={style.wrapper}>
      <Image
        src={img}
        alt=""
        width={100}
        height={100}
        placeholder="blur"
        blurDataURL={base64Data}
      />
      <span className={interSemiBold.className}>{name}</span>
      <Link href={`${Routs.NAME}/${id}`}>
        <Button text="Manage" variant={Variant.grey} />
      </Link>
    </div>
  );
};

export default NameCard;
