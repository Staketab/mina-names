import Image from "next/image";
import { StaticEllipse } from "../staticEllipse";
import disconnect from "./img/disconnect.svg";
import account from "./img/account.svg";

import style from "./index.module.css";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import DropdownWrapper from "../dropdownWrapper";
import { interSemiBold } from "@/app/fonts";
import Link from "next/link";
import { Routs } from "@/comman/types";

const ButtonWithAddress = ({
  address,
  onDisconnect,
}: {
  address: string;
  onDisconnect: () => void;
}) => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, []);

  const handleClickListener = (event) => {
    const clickedInside =
      wrapperRef?.current && wrapperRef.current?.contains(event.target);

    if (clickedInside) {
      setIsShowDropdown(true);
    } else {
      setIsShowDropdown(false);
    }
  };

  return (
    <>
      <div className={style.buttonWithAddress} ref={wrapperRef}>
        <Image src={account} alt="" className={style.accountIcon} />
        <StaticEllipse
          text={address}
          view={{ sm: 7, md: 7, lg: 7 }}
          className={style.staticEllipse}
        />
        <DropdownWrapper
          className={style.dropdownWrapper}
          show={isShowDropdown}
          onClose={() => setIsShowDropdown(false)}
          minWidth="185px"
        >
          <Link
            className={classNames(style.item, interSemiBold.className)}
            href={Routs.NAMES}
          >
            <Image src={account} alt="" className={style.icon} />
            Names
          </Link>
          {onDisconnect && (
            <div
              className={classNames(style.item, interSemiBold.className)}
              onClick={() => {
                onDisconnect();
                setIsShowDropdown(false);
              }}
            >
              <Image src={disconnect} alt="" className={style.icon} />
              Disconnect
            </div>
          )}
        </DropdownWrapper>
      </div>
    </>
  );
};

export default ButtonWithAddress;
