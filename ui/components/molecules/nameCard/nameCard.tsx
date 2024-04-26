import Image from "next/image";
import { Button } from "../../atoms/button";

import style from "./index.module.css";
import { Variant } from "../../atoms/button/types";
import { interSemiBold, manropeSemiBold } from "@/app/fonts";
import blur from "../../../assets/blur.jpg";
import defaultImg from "../../../assets/default.svg";

import Link from "next/link";
import { encode } from "js-base64";
import { DOMAIN_STATUS, Routs } from "@/comman/types";
import { Status } from "@/components/atoms/status";

type NameCardProps = {
  img: string;
  name: string;
  id: string;
  domainStatus: DOMAIN_STATUS;
};

const NameCard = ({
  img,
  name,
  id,
  domainStatus,
}: NameCardProps): JSX.Element => {
  const base64Data = encode("../../../assets/blur.jpg");
  return (
    <div className={style.wrapper}>
      <div className={style.imgWrapper}>
        <Image
          src={img || defaultImg}
          alt=""
          width={100}
          height={100}
          placeholder="blur"
          blurDataURL={base64Data}
        />
      </div>
      <span className={manropeSemiBold.className}>{name}</span>
      {domainStatus === DOMAIN_STATUS.PENDING ? (
        <Status status={domainStatus} />
      ) : (
        <Link href={`${Routs.NAME}/${id}`}>
          <Button text="Manage" variant={Variant.grey} />
        </Link>
      )}
    </div>
  );
};

export default NameCard;
