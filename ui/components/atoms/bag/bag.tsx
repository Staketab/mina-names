"use client";
import { manropeBold, manropeSemiBold } from "@/app/fonts";
import style from "./index.module.css";
import classNames from "classnames";
import { BAG_VARIANTS, BagProps } from "./bag.type";

const Bag = ({
  onClick,
  disabled,
  text,
  variant,
  size,
}: BagProps): JSX.Element => {
  if (variant === BAG_VARIANTS.GRADIENT) {
    return (
      <span className={style.gradientIcon}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.86426 18.6553H20.0947C20.5078 18.6553 20.8857 18.3301 20.8857 17.8643C20.8857 17.4072 20.5078 17.082 20.0947 17.082H10.0664C9.64453 17.082 9.38086 16.792 9.31934 16.3438L9.1875 15.4297H20.165C21.5098 15.4297 22.2217 14.6123 22.415 13.2764L23.0742 8.87305C23.0918 8.75879 23.1094 8.60938 23.1094 8.5127C23.1094 7.99414 22.749 7.64258 22.1426 7.64258H8.05371L7.92188 6.69336C7.80762 5.92871 7.5 5.54199 6.52441 5.54199H3.50977C3.07031 5.54199 2.68359 5.92871 2.68359 6.37695C2.68359 6.83398 3.07031 7.2207 3.50977 7.2207H6.26074L7.62305 16.5195C7.81641 17.8467 8.51953 18.6553 9.86426 18.6553ZM21.2813 9.21582L20.7275 13.1182C20.6572 13.5664 20.4199 13.8477 19.9893 13.8477L8.95899 13.8564L8.28223 9.21582H21.2813ZM10.585 23.0674C11.4375 23.0674 12.123 22.3818 12.123 21.5293C12.123 20.6768 11.4375 19.9912 10.585 19.9912C9.73242 19.9912 9.04688 20.6768 9.04688 21.5293C9.04688 22.3818 9.73242 23.0674 10.585 23.0674ZM18.7061 23.0674C19.5586 23.0674 20.2354 22.3818 20.2354 21.5293C20.2354 20.6768 19.5586 19.9912 18.7061 19.9912C17.8535 19.9912 17.1592 20.6768 17.1592 21.5293C17.1592 22.3818 17.8535 23.0674 18.7061 23.0674Z"
            fill="url(#paint0_linear_1257_27436)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1257_27436"
              x1="2.68359"
              y1="14.3047"
              x2="23.1094"
              y2="14.3047"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#D1F150" />
              <stop offset="0.509" stop-color="#97C4DD" />
              <stop offset="1" stop-color="#9747FF" />
            </linearGradient>
          </defs>
        </svg>
        {!!size && (
          <span
            className={classNames(style.domainsAmount, manropeBold.className)}
          >
            {size}
          </span>
        )}
      </span>
    );
  }
  return (
    <span className={style.icon} aria-disabled={disabled} onClick={onClick}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="#949499"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.86426 18.6553H20.0947C20.5078 18.6553 20.8857 18.3301 20.8857 17.8643C20.8857 17.4072 20.5078 17.082 20.0947 17.082H10.0664C9.64453 17.082 9.38086 16.792 9.31934 16.3438L9.1875 15.4297H20.165C21.5098 15.4297 22.2217 14.6123 22.415 13.2764L23.0742 8.87305C23.0918 8.75879 23.1094 8.60938 23.1094 8.5127C23.1094 7.99414 22.749 7.64258 22.1426 7.64258H8.05371L7.92188 6.69336C7.80762 5.92871 7.5 5.54199 6.52441 5.54199H3.50977C3.07031 5.54199 2.68359 5.92871 2.68359 6.37695C2.68359 6.83398 3.07031 7.2207 3.50977 7.2207H6.26074L7.62305 16.5195C7.81641 17.8467 8.51953 18.6553 9.86426 18.6553ZM21.2813 9.21582L20.7275 13.1182C20.6572 13.5664 20.4199 13.8477 19.9893 13.8477L8.95899 13.8564L8.28223 9.21582H21.2813ZM10.585 23.0674C11.4375 23.0674 12.123 22.3818 12.123 21.5293C12.123 20.6768 11.4375 19.9912 10.585 19.9912C9.73242 19.9912 9.04688 20.6768 9.04688 21.5293C9.04688 22.3818 9.73242 23.0674 10.585 23.0674ZM18.7061 23.0674C19.5586 23.0674 20.2354 22.3818 20.2354 21.5293C20.2354 20.6768 19.5586 19.9912 18.7061 19.9912C17.8535 19.9912 17.1592 20.6768 17.1592 21.5293C17.1592 22.3818 17.8535 23.0674 18.7061 23.0674Z" />
      </svg>
      {text && (
        <span className={classNames(manropeSemiBold.className, style.text)}>
          {text}
        </span>
      )}
    </span>
  );
};

export default Bag;