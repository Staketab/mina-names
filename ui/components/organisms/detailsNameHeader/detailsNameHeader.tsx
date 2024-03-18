"use client";
import { AccountDomainDetailsResponse } from "@/app/actions/types";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import { Switcher } from "@/components/atoms/switcher";
import { StaticEllipse } from "@/components/molecules/staticEllipse";
import Image from "next/image";

import style from "./index.module.css";
import classNames from "classnames";
import { interMedium } from "@/app/fonts";
import { Name } from "@/components/atoms/name";

const DetailsNameHeader = ({
  accountDomainDetails,
}: {
  accountDomainDetails: AccountDomainDetailsResponse;
}): JSX.Element => {
  const { domainImg, domainName } = accountDomainDetails;

  return (
    <div className={style.wrapper}>
      <div className={style.leftSide}>
        <Image src={domainImg} alt="icon" width={120} height={120} />
        <div>
          <Name name={domainName} />
          <div className={classNames(interMedium.className, style.address)}>
            Owned by
            <StaticEllipse
              text={accountDomainDetails.ownerAddress}
              view={{ sm: 10, md: 10, lg: 10 }}
              isActive
            />
          </div>
        </div>
      </div>
      <div className={style.rightSide}>
        <Switcher text="Set as default name" className={style.switcher} initialState={accountDomainDetails.isDefault}/>
        <Button text="Set reminder" variant={Variant.blue} />
      </div>
    </div>
  );
};

export default DetailsNameHeader;
